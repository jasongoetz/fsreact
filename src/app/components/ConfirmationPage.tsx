import React from "react";
import {Col, Container, ListGroup} from "reactstrap";
import {PageHeader} from "./PageHeader";
import ReadOnlyBetCard from "./ReadOnlyBetCard";
import {FSButton} from "./FSComponents";
import {getButtonMessage} from "../../util/BetUtil";
import {useHistory} from "react-router-dom";
import {useGlobalStores} from "../context/global_context";
import {confirmBets} from "../cart/cart.actions";

const totalTallyStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    border: "0px",
};

const ConfirmationPage: React.FC = () => {

    const history = useHistory();

    const { cartStore } = useGlobalStores();

    const confirm = async () => {
        await confirmBets();
        history.push('/account');
    };

    if (cartStore.bets.length === 0) {
        history.push('/games');
    }
    const parlay = cartStore.parlay;
    const potentialBets = cartStore.bets;
    const insufficientBets = potentialBets.length < 2;
    const parlayActive = !!parlay?.active && !insufficientBets;
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
                <FSButton onClick={() => confirm()}>
                    {getButtonMessage('Confirm', potentialBets.length, totalAmount, parlayActive)}
                </FSButton>
            </div>
        </Col>
    </Container>
};

export default ConfirmationPage;
