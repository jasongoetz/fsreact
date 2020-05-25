import React, {useEffect, useState} from "react";
import {
    Col,
    Container,
    Input,
    InputGroup,
    ListGroup,
    ListGroupItem,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import PotentialBetCard from "./PotentialBetCard";
import {validateBets} from "../api/api";
import {FSButton} from "./FSComponents";
import {getButtonMessage} from "../../util/BetUtil";
import {useHistory} from "react-router-dom";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";
import {editCartBet, editCartParlay, loadCart, removeCartBet, toggleParlay} from "../cart/cart.actions";

const containerStyle = {
    borderRadius: "0px",
    //marginTop: "20px",
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

const errorPanelStyle = {
    color: "#a94442",
    backgroundColor: "#f2dede",
    borderColor: "#ebccd1",
    padding: "15px",
    marginTop: "20px",
    border: "1px solid transparent",
};

const errorRowStyle = {
    padding: "5px 2px",
};

interface Props {
    gamblerId?: number;
}

const BetSlip: React.FC<Props> = observer(({gamblerId}) => {

    const [errors, setErrors] = useState<string[]>([]);

    const history = useHistory();

    const {cartStore} = useGlobalStores();

    useEffect(() => {
        if (gamblerId) {
            loadCart();
        }
    }, [gamblerId]);

    const tabLinkStyle = (active: boolean) => {
        const style = {
            borderRadius: "0px",
            padding: "5px 10px"
        };
        const activeStyles = {
            color: "#fff",
            backgroundColor: "#595756",
        };
        return active ? {...style, ...activeStyles} : style;
    };

    const confirmBets = async (gamblerId: number) => {
        const errors = await validateBets(gamblerId);
        if (errors.length > 0) {
            setErrors(errors);
        } else {
            history.push('/confirmation');
        }
    };

    if (!gamblerId) {
        return <div></div>;
    }

    const parlay = cartStore.parlay;
    const potentialBets = cartStore.bets;
    const insufficientBets = potentialBets.length < 2;
    const betParlayTabActive = !!parlay?.active && !insufficientBets;
    const totalAmount = potentialBets.reduce((sum, bet) => sum + bet.amount, 0);
    return (<Container style={containerStyle}>
        <Row style={panelHeadingStyle}>
            <div style={panelTitleStyle}>
                BET SLIP
            </div>
        </Row>
        <Nav pills>
            <NavItem>
                <NavLink style={tabLinkStyle(!betParlayTabActive)} href="#bet-straight"
                         active={!betParlayTabActive}
                         onClick={() => toggleParlay(false)}>Straight</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={tabLinkStyle(betParlayTabActive)} href="#bet-parlay"
                         active={betParlayTabActive} onClick={() => toggleParlay(true)}
                         disabled={insufficientBets}>Parlay</NavLink>
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
                            onClose={(cartId) => removeCartBet(cartId)}
                            onEdit={(cartId, amount) => editCartBet(cartId, amount)}
                        />
                    )}
                </ListGroup>
                <ListGroup hidden={(potentialBets.length === 0)}>
                    {errors.length > 0 &&
                    <ListGroupItem style={errorPanelStyle}>
                        {errors.map(error =>
                            <div style={errorRowStyle}>{error}</div>
                        )}
                    </ListGroupItem>
                    }
                    <ListGroupItem style={totalTallyStyle}>
                        <FSButton onClick={() => confirmBets(gamblerId)}>
                            {getButtonMessage('Review', potentialBets.length, totalAmount, !betParlayTabActive)}
                        </FSButton>
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
                            onClose={(cartId) => removeCartBet(cartId)}
                            onEdit={(cartId, amount) => editCartBet(cartId, amount)}
                        />
                    )}
                </ListGroup>
                <ListGroup>
                    <ListGroupItem style={parlayWagerLineStyle}>
                        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                            <div>
                                <InputGroup>
                                    <span style={inputGroupAddOn}>$</span>
                                    <Input type="number" min="0" step="1" style={wagerAmountStyle}
                                           className="form-control" id="amount"
                                           onChange={(e) => editCartParlay(parseInt(e.target.value))}
                                           value={parlay?.amount || 0}/>
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
                                    <Input readOnly disabled type="number" min="0" step="1"
                                           style={wagerWinningsStyle} className="form-control"
                                           value={Math.pow(2, potentialBets.length) * (parlay?.amount || 0)}/>
                                </InputGroup>
                            </div>
                            <div>
                                <span style={wagerAmountLabelStyle}>Potential Winnings: </span>
                            </div>
                        </div>
                    </ListGroupItem>
                </ListGroup>
                <ListGroup>
                    {errors.length > 0 &&
                    <ListGroupItem style={errorPanelStyle}>
                        {errors.map(error =>
                            <div style={errorRowStyle}>{error}</div>
                        )}
                    </ListGroupItem>
                    }
                    <ListGroupItem style={totalTallyStyle}>
                        <FSButton onClick={() => confirmBets(gamblerId)}>
                            {getButtonMessage('Review', potentialBets.length, parlay?.amount || 0, betParlayTabActive)}
                        </FSButton>
                    </ListGroupItem>
                </ListGroup>
            </TabPane>
        </TabContent>
    </Container>)
});

export default BetSlip;
