import React, {Component} from "react";
import {
    Button,
    Card,
    CardBody,
    CardImg, CardSubtitle, CardText, CardTitle,
    Col,
    Container, Input, InputGroup,
    ListGroup, ListGroupItem,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import {Bet, League} from "../types";
import {connect} from "react-redux";
import {getCart} from "../cart/cartSelector";
import {loadCart, toggleParlay, editCartBet, removeCartBet} from "../cart/cartActions";
import {getLeague} from "../league/leagueSelector";
import {loadUserContext} from "../user/userActions";
import PotentialBetCard from "./PotentialBetCard";

const containerStyle = {
    borderRadius: "0px",
    marginTop: "20px",
    backgroundColor: "#ececec",
};

const panelHeadingStyle = {
    borderBottom: "0px",
    borderColor: "#ececec",
    padding: "10px 15px",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    backgroundColor: "#ececec",
};

const panelTitleStyle = {
    paddingTop: "10px",
    fontSize: "16px",
};

const totalTallyStyle = {
    backgroundColor: "#ececec",
    border: "0px",
};

const parlayWagerLineStyle = {
    height: "50px",
    backgroundColor: "transparent",
    border: "0px",
};

const wagerAmountLabelStyle = {
    padding: "3px 6px",
    textAlign: "center" as "center",
    backgroundColor: "transparent",
    float: "right" as "right",
    marginRight: "15px",
    verticalAlign: "middle",
    display: "table-cell",
};

const betAmountStyle = {
    position: "absolute" as "absolute",
    bottom: "15px",
    right: "15px",
    width: "65px",
    textAlign: "right" as "right",
};

export const inputGroupAddOn = {
    borderRadius: "0px",
    padding: "4px 6px",
    backgroundColor: "#FFFFFF",
};

const disabledGroupAddOn = {
    ...inputGroupAddOn,
    backgroundColor: "transparent"
};

const wagerAmountStyle = {
    borderRadius: "0px",
    padding: "6px 3px",
    maxWidth: "50px",
};

const wagerWinningsStyle = {
    borderRadius: "0px",
    padding: "6px 3px",
    maxWidth: "50px",
};

export interface Props {
    loadUserContext: () => void;
    league: League;
    loadCart: () => void;
    editCartBet: (cartId, amount) => void;
    removeCartBet: (cartId) => void;
    toggleParlay: (boolean) => void;
    cart: any;
}

export interface State {
    activeTab: string;
}

class BetSlip extends Component<Props, State> {

    async componentDidMount() {
        if (!this.props.league.id) {
            await this.props.loadUserContext();
        }
        await this.props.loadCart();
    }

    toggleParlay(activeParlay: boolean) {
        this.props.toggleParlay(activeParlay);
    }

    render() {
        let parlay = this.props.cart.parlay || {};
        let potentialBets = this.props.cart.bets;
        let insufficientBets = potentialBets.length < 2;
        let betParlayTabActive = !!parlay.active && !insufficientBets;
        let totalAmount = potentialBets.reduce((sum, bet) => sum + bet.amount, 0);

        return <Container style={containerStyle}>
            <Row style={panelHeadingStyle}>
                <div style={panelTitleStyle}>
                    BET SLIP
                </div>
            </Row>
            <Nav pills>
                <NavItem>
                    <NavLink style={this.tabLinkStyle(!betParlayTabActive)} href="#bet-straight" active={!betParlayTabActive} onClick={() => this.toggleParlay(false)}>Straight</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={this.tabLinkStyle(betParlayTabActive)} href="#bet-parlay" active={betParlayTabActive} onClick={() => this.toggleParlay(true)} disabled={insufficientBets}>Parlay</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={betParlayTabActive ? "bet-parlay" : "bet-straight"}>

                <TabPane fade in tabId="bet-straight">
                    <Row style={{color: "#777574"}} hidden={(potentialBets.length > 0)}>
                        <Col sm={12}>Add games to your bet slip</Col>
                    </Row>
                    <ListGroup>
                        {potentialBets.map(bet =>
                            <PotentialBetCard
                                cartId={bet.id}
                                bet={bet}
                                partOfParlay={false}
                                confirmation={false}
                                onClose={this.props.removeCartBet}
                                onEdit={this.props.editCartBet}
                            />
                        )}
                    </ListGroup>
                    <ListGroup hidden={(potentialBets.length == 0)}>
                        <ListGroupItem>Reserve for Error Panel</ListGroupItem>
                        <ListGroupItem style={totalTallyStyle}>
                            <Button>
                                Review {potentialBets.length} Bet{((potentialBets.length == 1) ? "" : "s")} for ${totalAmount}
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </TabPane>

                <TabPane fade in tabId="bet-parlay">
                    <Row style={{color: "#777574"}} hidden={(potentialBets.length > 1)}>
                        <Col sm="12">Parlays only apply to more than one bet</Col>
                    </Row>
                    <ListGroup>
                        {potentialBets.map(bet =>
                            <PotentialBetCard
                                cartId={bet.id}
                                bet={bet}
                                partOfParlay={true}
                                confirmation={false}
                                onClose={this.props.removeCartBet}
                                onEdit={this.props.editCartBet}
                            />
                        )}
                    </ListGroup>
                    <ListGroup>
                        <ListGroupItem style={parlayWagerLineStyle}>
                                <Col xs={9}>
                                    <span style={wagerAmountLabelStyle}>Wager: </span>
                                </Col>
                                <Col xs={3} style={betAmountStyle}>
                                    <InputGroup>
                                        <span style={inputGroupAddOn}>$</span>
                                        <Input type="number" min="0" step="1" style={wagerAmountStyle} className="form-control" id="amount" value={parlay.amount || 0}/>
                                    </InputGroup>
                                </Col>
                        </ListGroupItem>
                        <ListGroupItem style={parlayWagerLineStyle}>
                            <Row>
                                <Col xs={9}>
                                    <span style={wagerAmountLabelStyle}>Potential Winnings: </span>
                                </Col>
                                <Col xs={3} style={betAmountStyle}>
                                    <InputGroup>
                                        <span style={disabledGroupAddOn}>$</span>
                                        <Input disabled type="number" min="0" step="1" style={wagerWinningsStyle} className="form-control" value={Math.pow(2, potentialBets.length) * (parlay.amount || 0)}/>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                        <ListGroupItem>Reserve for Error Panel</ListGroupItem>
                        <ListGroupItem style={totalTallyStyle}>
                            <Button>Review {potentialBets.length} bet parlay for ${parlay.amount || 0}</Button>
                        </ListGroupItem>
                    </ListGroup>
                </TabPane>
            </TabContent>


        </Container>;
    }

    tabLinkStyle = (active: boolean) => {
        const style = {
            borderRadius: "0px",
            padding: "5px 10px"
        };
        const activeStyles = {
            color: "#fff",
            backgroundColor: "#595756",
        };
        return active ? {...style, ...activeStyles} : style;
    }
}

const mapStateToProps = (state: State) => {
    return {
        league: getLeague(state),
        cart: getCart(state),
    };
};

const mapDispatchToProps = {
    loadUserContext,
    loadCart,
    editCartBet,
    removeCartBet,
    toggleParlay,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BetSlip);