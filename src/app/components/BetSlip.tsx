import React, { useEffect, useState } from "react";
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
import { validateBets } from "../api/api";
import { FSButton } from "./FSComponents";
import { getButtonMessage } from "../../util/BetUtil";
import { useHistory } from "react-router-dom";
import { useGlobalStores } from "../context/global_context";
import { observer } from "mobx-react";
import { editCartBet, editCartParlay, loadCart, removeCartBet, toggleParlay } from "../cart/cart.actions";
import { getParlayWinnings } from "../../util/MoneylineUtil";
import { Colors } from "../theme/theme";
import { GamblerStatusPanel } from "./GamblerStatusPanel";

const containerStyle = {
    borderRadius: "0px",
    backgroundColor: Colors.lightestGraySepia,
    position: 'fixed' as 'fixed',
    top: 86,
    right: 26,
    width: 380,
    border: '1px solid',
    maxHeight: '87%',
    display: 'flex',
    flexFlow: 'column',
    paddingLeft: 0,
    paddingRight: 0,
};

const mobileContainerStyle = {
    borderRadius: "0px",
    borderTop: '1px solid',
    backgroundColor: Colors.lightestGraySepia,
    maxWidth: 992,
};

const panelHeadingStyle = {
    borderBottom: "0px",
    borderColor: Colors.lightestGraySepia,
    marginLeft: 0,
    marginRight: 0,
    padding: "10px 15px",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    backgroundColor: Colors.lightestGraySepia,
};

const panelTitleStyle = {
    paddingTop: "10px",
    fontSize: "16px",
};

const totalTallyStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: Colors.lightestGraySepia,
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
    borderRadius: `1px solid ${Colors.lightestGray}`,
    padding: "7px 3px 6px 5px",
    backgroundColor: Colors.white,
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
    width: "100px",
    maxWidth: "65px",
};

const wagerWinningsStyle = {
    backgroundColor: Colors.lightestGraySepia,
    borderRadius: "0px",
    padding: "6px 3px",
    width: "100px",
    maxWidth: "65px",
};

const errorPanelStyle = {
    color: Colors.red,
    backgroundColor: Colors.pinkGray,
    padding: "15px",
    margin: '20px 15px 0px 15px',
    border: `1px solid ${Colors.red}`,
    borderRadius: '0px',
};

const errorRowStyle = {
    padding: "5px 2px",
};

interface Props {
    gamblerId?: number;
    onReview?: () => void;
    isMobile?: boolean;
}

const BetSlip: React.FC<Props> = observer(({gamblerId, onReview, isMobile}) => {

    const [errors, setErrors] = useState<string[]>([]);

    const history = useHistory();

    const {cartStore, leagueStore, gamblerStore} = useGlobalStores();

    useEffect(() => {
        if (gamblerId) {
            loadCart();
        }
    }, [gamblerId]);

    const tabLinkStyle = (active: boolean) => {
        const style = {
            color: Colors.brandBlack,
            borderRadius: "0px",
            padding: "5px 10px"
        };
        const activeStyles = {
            color: Colors.offBlack,
            backgroundColor: Colors.whiteSepia,
            border: '1px solid',
        };
        return active ? {...style, ...activeStyles} : style;
    };

    const reviewBets = async (gamblerId: number) => {
        const errors = await validateBets(gamblerId, cartStore.bets, cartStore.parlay);
        if (errors.length > 0) {
            setErrors(errors);
        } else {
            if (onReview) {
                onReview();
            }
            history.push('/confirmation');
        }
    };

    const parlay = cartStore.parlay;
    const potentialBets = cartStore.bets;

    useEffect(() => {
        setErrors([]);
    }, [potentialBets.length, parlay]);

    if (!gamblerId || !leagueStore.league) {
        return <div></div>;
    }

    const leagueMoneyline = leagueStore.league.moneyline;
    const insufficientBets = potentialBets.length < 2;
    const betParlayTabActive = !!parlay?.active && !insufficientBets;
    const totalAmount = potentialBets.reduce((sum, bet) => sum + (bet.amount || 0), 0);
    return (<Container style={isMobile ? mobileContainerStyle : containerStyle}>
        <Row style={panelHeadingStyle}>
            <div style={panelTitleStyle}>
                BET SLIP
            </div>
        </Row>
        {gamblerStore.gamblerStatus && leagueStore.league &&
          <GamblerStatusPanel gamblerStatus={gamblerStore.gamblerStatus} league={leagueStore.league}/>
        }
        <Nav style={!isMobile ? { margin: '0px 0px 5px 5px' } : undefined} pills>
            <NavItem>
                <NavLink data-testid='straight-navlink' style={tabLinkStyle(!betParlayTabActive)} href="#bet-straight"
                         active={!betParlayTabActive}
                         onClick={() => toggleParlay(false)}>Straight</NavLink>
            </NavItem>
            <NavItem>
                <NavLink data-testid='parlay-navlink' style={tabLinkStyle(betParlayTabActive)} href="#bet-parlay"
                         active={betParlayTabActive} onClick={() => toggleParlay(true)}
                         disabled={insufficientBets}>Parlay</NavLink>
            </NavItem>
        </Nav>
        <TabContent style={{...(!isMobile ? {overflow: 'scroll', borderTop: '1px solid', borderBottom: '1px solid'} : {}), width: '100%' }} activeTab={betParlayTabActive ? "bet-parlay" : "bet-straight"}>
            <TabPane tabId="bet-straight">
                <Row style={{color: Colors.darkerGray, margin: '20px 10px 20px 15px'}} hidden={(potentialBets.length > 0)}>
                    <Col sm={12}>Add games to your bet slip</Col>
                </Row>
                <ListGroup>
                    {potentialBets.map((bet, i) =>
                        <PotentialBetCard
                            index={i}
                            key={bet.id}
                            cartId={bet.id}
                            bet={bet}
                            partOfParlay={false}
                            moneyline={bet.moneyline ? parseInt(bet.line) : leagueMoneyline}
                            onClose={(cartId) => removeCartBet(cartId)}
                            onEdit={(cartId, amount) => editCartBet(cartId, amount)}
                        />
                    )}
                </ListGroup>
            </TabPane>

            <TabPane tabId="bet-parlay">
                <Row style={{color: Colors.darkerGray}} hidden={(potentialBets.length > 1)}>
                    <Col sm="12">Parlays only apply to more than one bet</Col>
                </Row>
                <ListGroup>
                    {potentialBets.map((bet, i) =>
                        <PotentialBetCard
                            index={i}
                            key={bet.id}
                            cartId={bet.id}
                            bet={bet}
                            partOfParlay={true}
                            moneyline={bet.moneyline ? parseInt(bet.line) : leagueMoneyline}
                            onClose={(cartId) => removeCartBet(cartId)}
                            onEdit={(cartId, amount) => editCartBet(cartId, amount)}
                        />
                    )}
                </ListGroup>
            </TabPane>
        </TabContent>
        {!betParlayTabActive && <ListGroup style={{flex: 'auto'}} hidden={(potentialBets.length === 0)}>
            {errors.length > 0 &&
                <ListGroupItem data-testid='bet-validation-error-panel' style={errorPanelStyle}>
                    {errors.map(error =>
                        <div style={errorRowStyle}>{error}</div>
                    )}
                </ListGroupItem>
            }
            <ListGroupItem style={totalTallyStyle}>
                <FSButton data-testid='review-bet-button' onClick={() => reviewBets(gamblerId)}>
                    {getButtonMessage('Review', potentialBets.length, totalAmount, betParlayTabActive)}
                </FSButton>
            </ListGroupItem>
        </ListGroup>}
        {betParlayTabActive &&
            <ListGroup style={{flex: 'auto'}}>
                <ListGroupItem style={parlayWagerLineStyle}>
                    <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <div>
                            <InputGroup>
                                <span style={inputGroupAddOn}>$</span>
                                <Input type="number" min="0" step="1" style={wagerAmountStyle}
                                       className="form-control" id="amount"
                                       onChange={(e) => editCartParlay(parseInt(e.target.value))}
                                       value={parlay?.amount || ''}/>
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
                                <Input readOnly disabled type="number" min="0"
                                       style={wagerWinningsStyle} className="form-control"
                                       value={getParlayWinnings(parlay?.amount || 0, potentialBets, leagueMoneyline)}/>
                            </InputGroup>
                        </div>
                        <div>
                            <span style={wagerAmountLabelStyle}>Potential Winnings: </span>
                        </div>
                    </div>
                </ListGroupItem>
            </ListGroup>
        }
        {betParlayTabActive &&
            <ListGroup style={{flex: 'auto'}}>
                {errors.length > 0 &&
                    <ListGroupItem data-testid='bet-validation-error-panel' style={errorPanelStyle}>
                        {errors.map(error =>
                            <div style={errorRowStyle}>{error}</div>
                        )}
                    </ListGroupItem>
                }
                <ListGroupItem style={totalTallyStyle}>
                    <FSButton data-testid='review-bet-button' onClick={() => reviewBets(gamblerId)}>
                        {getButtonMessage('Review', potentialBets.length, parlay?.amount || 0, betParlayTabActive)}
                    </FSButton>
                </ListGroupItem>
            </ListGroup>
        }
    </Container>)
});

export default BetSlip;
