import React, {Component} from "react";
import {connect} from "react-redux";
import Pluralize from 'pluralize';
import {loadUserContext} from "../user/userActions";
import {Col, Container, Row, Button, ListGroup, ListGroupItem, TabPane} from "reactstrap";
import {getCart} from "../cart/cartSelector";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {loadCart} from "../cart/cartActions";
import {PageHeader} from "./PageHeader";
import PotentialBetCard from "./PotentialBetCard";
import ReadOnlyBetCard from "./ReadOnlyBetCard";
import {FSButton} from "./FSComponents";
import {getButtonMessage} from "../../util/BetUtil";

const totalTallyStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    border: "0px",
};

export interface Props extends RouteComponentProps {
    loadUserContext: () => void;
    loadCart: () => void;
    cart: any;
}

export interface State {
}

class ConfirmationPage extends Component<Props, State> {

    async componentDidMount() {
        if (this.props.cart.bets.length === 0) {
            this.props.history.push('/games');
        }
    }

    render() {
        let parlay = this.props.cart.parlay || {};
        let potentialBets = this.props.cart.bets;
        let insufficientBets = potentialBets.length < 2;
        let parlayActive = !!parlay.active && !insufficientBets;
        let totalAmount = potentialBets.reduce((sum, bet) => sum + bet.amount, 0);

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
                    <FSButton>
                        {getButtonMessage('Confirm', potentialBets.length, totalAmount, parlayActive)}
                    </FSButton>
                </div>
            </Col>
        </Container>;
    }
}


const mapStateToProps = (state: State) => {
    return {
        cart: getCart(state),
    };
};

const mapDispatchToProps = {
    loadUserContext,
    loadCart,
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConfirmationPage));
