import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Col, Container, ListGroup} from "reactstrap";
import {getCart} from "../cart/cartSelector";
import {PageHeader} from "./PageHeader";
import ReadOnlyBetCard from "./ReadOnlyBetCard";
import {FSButton} from "./FSComponents";
import {getButtonMessage} from "../../util/BetUtil";
import { useHistory } from "react-router-dom";
import {confirmBets} from "../cart/cartActions";

const totalTallyStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    border: "0px",
};

const ConfirmationPage: React.FC = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => getCart(state));
    const history = useHistory();

    useEffect(() => {
        if (cart.bets.length === 0) {
            history.push('/games');
        }
    }, []);

    let parlay = cart.parlay || {};
    let potentialBets = cart.bets;
    let insufficientBets = potentialBets.length < 2;
    let parlayActive = !!parlay.active && !insufficientBets;
    let totalAmount = parlayActive ? parlay.amount : potentialBets.reduce((sum, bet) => sum + bet.amount, 0);

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
                <FSButton onClick={() => dispatch(confirmBets())}>
                    {getButtonMessage('Confirm', potentialBets.length, totalAmount, parlayActive)}
                </FSButton>
            </div>
        </Col>
    </Container>;
};

export default ConfirmationPage;
