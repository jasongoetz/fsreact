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
import {loadCart, toggleParlay, editCartBet, removeCartBet, editCartParlay} from "../cart/cartActions";
import {getLeague} from "../league/leagueSelector";
import {loadUserContext} from "../user/userActions";
import PotentialBetCard from "./PotentialBetCard";

const containerStyle = {
    borderRadius: "0px",
    marginTop: "20px",
    minWidth: "400px",
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
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: "#ececec",
    border: "0px",
};

const parlayWagerLineStyle = {
    height: "50px",
    backgroundColor: "transparent",
    border: "0px",
};

const wagerAmountLabelStyle = {
    padding: "7px 0px",
    textAlign: "center" as "center",
    backgroundColor: "transparent",
    float: "right" as "right",
    marginRight: "15px",
    verticalAlign: "middle",
    display: "table-cell",
};

export const inputGroupAddOn = {
    borderRadius: "1px solid #EEEEEE",
    padding: "7px 3px 6px 5px",
    backgroundColor: "#FFFFFF",
    borderLeft: '1px solid lightgray',
    borderTop: '1px solid lightgray',
    borderBottom: '1px solid lightgray',
};

const disabledGroupAddOn = {
    ...inputGroupAddOn,
    backgroundColor: "transparent"
};

const wagerAmountStyle = {
    borderRadius: "0px",
    padding: "6px 3px",
    width: "50px",
    maxWidth: "65px",
};

const wagerWinningsStyle = {
    borderRadius: "0px",
    padding: "6px 3px",
    width: "50px",
    maxWidth: "65px",
};

interface BettingValidationErrors {

}

export interface Props {
    errors: BettingValidationErrors[];
    loadUserContext: () => void;
    league: League;
    loadCart: () => void;
    editCartBet: (cartId, amount) => void;
    removeCartBet: (cartId) => void;
    toggleParlay: (boolean) => void;
    editCartParlay: (amount) => void;
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

                <TabPane tabId="bet-straight">
                    <Row style={{color: "#777574"}} hidden={(potentialBets.length > 0)}>
                        <Col sm={12}>Add games to your bet slip</Col>
                    </Row>
                    <ListGroup>
                        {potentialBets.map(bet =>
                            <PotentialBetCard
                                key={bet.id}
                                cartId={bet.id}
                                bet={bet}
                                partOfParlay={false}
                                onClose={this.props.removeCartBet}
                                onEdit={this.props.editCartBet}
                            />
                        )}
                    </ListGroup>
                    <ListGroup hidden={(potentialBets.length == 0)}>
                        {this.props.errors && <ListGroupItem>Reserve for Error Panel</ListGroupItem>}
                        <ListGroupItem style={totalTallyStyle}>
                            <Button>
                                Review {potentialBets.length} Bet{((potentialBets.length == 1) ? "" : "s")} for ${totalAmount}
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </TabPane>

                <TabPane tabId="bet-parlay">
                    <Row style={{color: "#777574"}} hidden={(potentialBets.length > 1)}>
                        <Col sm="12">Parlays only apply to more than one bet</Col>
                    </Row>
                    <ListGroup>
                        {potentialBets.map(bet =>
                            <PotentialBetCard
                                key={bet.id}
                                cartId={bet.id}
                                bet={bet}
                                partOfParlay={true}
                                onClose={this.props.removeCartBet}
                                onEdit={this.props.editCartBet}
                            />
                        )}
                    </ListGroup>
                    <ListGroup>
                        <ListGroupItem style={parlayWagerLineStyle}>
                            <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                                <div>
                                    <InputGroup>
                                        <span style={inputGroupAddOn}>$</span>
                                        <Input type="number" min="0" step="1" style={wagerAmountStyle} className="form-control" id="amount" onChange={(e) => this.props.editCartParlay(parseInt(e.target.value))} value={parlay.amount || 0} />
                                    </InputGroup>
                                </div>
                                <div>
                                    <span style={wagerAmountLabelStyle}>Wager: </span>
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem style={parlayWagerLineStyle}>
                            <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                                <div>
                                    <InputGroup>
                                        <span style={disabledGroupAddOn}>$</span>
                                        <Input readOnly disabled type="number" min="0" step="1" style={wagerWinningsStyle} className="form-control" value={Math.pow(2, potentialBets.length) * (parlay.amount || 0)} />
                                    </InputGroup>
                                </div>
                                <div>
                                    <span style={wagerAmountLabelStyle}>Potential Winnings: </span>
                                </div>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                        {this.props.errors && <ListGroupItem>Reserve for Error Panel</ListGroupItem>}
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
    editCartParlay,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BetSlip);