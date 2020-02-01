import React, {Component} from "react";
import {connect} from "react-redux";
import {loadUserContext} from "../user/userActions";
import {getLeague} from "../league/leagueSelector";
import {Col, Container, Row} from "reactstrap";
import {loadGames} from "../bettables/bettableActions";
import {getBettables} from "../bettables/bettableSelector";
import {GameRow} from "./GameRow";
import {PageHeader} from "./PageHeader";
import {League} from "../types";
import {Bettable} from "../bettables/bettableReducer";
import BetSlip from "./BetSlip";
import MediaQuery from "react-responsive";

export interface Props {
    loadUserContext: () => void;
    loadGames: () => void;
    league: League;
    bettables: Bettable[];
}

export interface State {
}

class GamesPage extends Component<Props, State> {

    async componentDidMount() {
        if (!this.props.league.id) {
            await this.props.loadUserContext();
        }
        await this.props.loadGames();
    }

    render() {
        return <Container>
            <Row>
                <Col md={8}>
                    <PageHeader>Games</PageHeader>
                    {this.props.bettables.map(bettable => <GameRow key={`game-${bettable.id}`} bettable={bettable}/>)}
                </Col>
                <Col md={4}>
                    <MediaQuery minWidth={576}>
                        <BetSlip></BetSlip>
                    </MediaQuery>
                </Col>
            </Row>
        </Container>
    }
}


const mapStateToProps = (state: State) => {
    return {
        league: getLeague(state),
        bettables: getBettables(state),
    };
};

const mapDispatchToProps = {
    loadUserContext,
    loadGames,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GamesPage);
