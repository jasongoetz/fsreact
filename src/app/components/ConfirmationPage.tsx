import React from "react";
import {Col, Container, ListGroup} from "reactstrap";
import {getCart} from "../cart/cartSelector";
import {PageHeader} from "./PageHeader";
import ReadOnlyBetCard from "./ReadOnlyBetCard";
import {FSButton} from "./FSComponents";
import {getButtonMessage} from "../../util/BetUtil";
import {useHistory} from "react-router-dom";
import {confirmBets} from "../cart/cartActions";
import {GamblerConsumer} from "../gambler/gamblerContext";
import {getGambler} from "../gambler/gamblerSelector";
import {CartConsumer} from "../cart/cartContext";

const totalTallyStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    border: "0px",
};

const ConfirmationPage: React.FC = () => {

    const history = useHistory();

    //TODO: This will need to catch and show errors eventually
    const confirm = async (gamblerId) => {
        await confirmBets(gamblerId);
        history.push('/account');
    };

    return (
        <CartConsumer select={[getCart]}>
            {cart => {
                if (cart.bets.length === 0) {
                    history.push('/games');
                }
                const parlay = cart.parlay || {};
                const potentialBets = cart.bets;
                const insufficientBets = potentialBets.length < 2;
                const parlayActive = !!parlay.active && !insufficientBets;
                const totalAmount = potentialBets.reduce((sum, bet) => sum + bet.amount, 0);
                return <Container>
                    <PageHeader>Bet Confirmation</PageHeader>
                    <Col sm={12} md={{size: 10, offset: 1}} lg={{size: 6, offset: 3}}>
                        <ListGroup>
                            {potentialBets.map(bet =>
                                <ReadOnlyBetCard
                                    key={bet.id}
                                    bet={bet}
                                    partOfParlay={parlayActive}
                                />
                            )}
                        </ListGroup>
                        <div style={totalTallyStyle}>
                            <GamblerConsumer select={[getGambler]}>
                                {gambler =>
                                    <FSButton onClick={() => confirm(gambler.id)}>
                                        {getButtonMessage('Confirm', potentialBets.length, totalAmount, parlayActive)}
                                    </FSButton>
                                }
                            </GamblerConsumer>
                        </div>
                    </Col>
                </Container>
            }}
        </CartConsumer>
    );
};

export default ConfirmationPage;
