import React, {Component} from "react";
import {connect} from "react-redux";
import {Col, Container, Row} from "reactstrap";
import PendingBetCard from "./PendingBetCard";
import {GamblerInfo} from "../types";
import {loadUserContext} from "../user/userActions";
import {} from "../api/api";
import {loadBets} from "../bets/betActions";
import {getBetsAndParlaysByGambler} from "../bets/betSelector";
import {PageHeader} from "./PageHeader";

export interface Props {
    betsAndParlaysByGambler: { [key:number]:any; };
    loadUserContext: () => void;
    loadBets: () => void;
}

export interface State {
}

class LeagueBetList extends Component<Props, State> {

    async componentDidMount() {
        await this.props.loadUserContext();
        await this.props.loadBets();
    }

    render() {
        let gamblerIds = Object.keys(this.props.betsAndParlaysByGambler);
        return <Container>
            <PageHeader>Pending Bets</PageHeader>
            <Row>
                {gamblerIds.map(gamblerId => {
                    let bets = this.props.betsAndParlaysByGambler[gamblerId].bets;
                    let parlays = this.props.betsAndParlaysByGambler[gamblerId].parlays;
                    let betCards = bets.map(bet => {
                        return <PendingBetCard key={bet.id} gambler={bet.gambler} bet={bet} isParlay={false}></PendingBetCard>
                    });
                    let parlayCards = parlays.map(parlay => {
                        return <PendingBetCard key={parlay.id} gambler={parlay.gambler} bet={parlay} isParlay={true}></PendingBetCard>
                    });
                    return betCards.concat(parlayCards);
                })}
            </Row>
        </Container>;
    }

}

const mapStateToProps = (state) => {
    return {
        betsAndParlaysByGambler: getBetsAndParlaysByGambler(state)
    }
};

const mapDispatchToProps = {
    loadUserContext,
    loadBets,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LeagueBetList);
