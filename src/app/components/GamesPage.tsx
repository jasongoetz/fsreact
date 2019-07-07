import React, {Component} from "react";
import {connect} from "react-redux";
import {loadUserContext} from "../user/userActions";
import {getLeague} from "../league/leagueSelector";
import {Col, Container, Row} from "reactstrap";
import {loadGames} from "../bettables/bettableActions";
import {getBettables} from "../bettables/bettableSelector";
import {GameRow} from "./GameRow";

export interface Props {
    loadUserContext: () => void;
    loadGames: () => void;
    league: any; //TODO: Fix
    bettables: any[]; //TODO: Fix
}

export interface State {
}

const sidebarOuterStyle = {
    display: "none"
};

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
                    <h3>Games</h3>
                    {
                        this.props.bettables.map(bettable => <GameRow bettable={bettable}/>)
                    }
                </Col>
                <Col md={4} style={sidebarOuterStyle}>
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
