import React, {Component} from "react";
import {connect} from "react-redux";
import {loadUserContext} from "../user/userActions";
import {getLeague} from "../league/leagueSelector";
import {Col, Container, Table} from "reactstrap";
import {loadGames} from "../bettables/bettableActions";
import {getBettables} from "../bettables/bettableSelector";
import {PageHeader} from "./PageHeader";
import {Bettable} from "../bettables/bettableReducer";
import {FullLeague, League} from "../types";

export interface Props {
    loadUserContext: () => void;
    loadGames: () => void;
    league: FullLeague;
    bettables: Bettable[];
}

export interface State {
}

class Standings extends Component<Props, State> {

    async componentDidMount() {
        await this.props.loadUserContext();
    }

    getAverageMoney = () => {
        if (this.props.league.gamblers.length == 0) {
            return 0;
        }
        let totalMoney = this.props.league.gamblers.reduce((acc, gambler) => acc + gambler.money, 0);
        return (totalMoney / this.props.league.gamblers.length).toFixed(0);
    };

    getTotalRecord = () => {
        let wins = this.props.league.gamblers.reduce((acc, gambler) => acc + gambler.wins, 0);
        let losses = this.props.league.gamblers.reduce((acc, gambler) => acc + gambler.losses, 0);
        let pushes = this.props.league.gamblers.reduce((acc, gambler) => acc + gambler.pushes, 0);
        return `${wins}-${losses}-${pushes}`;
    };

    render() {
        return <Container>
            <PageHeader>Standings</PageHeader>
            <Col lg={8} md={10} sm={12} style={{paddingLeft: "0px", paddingTop: "15px"}}>
                <Table striped size="sm">
                    <thead>
                    <tr>
                        <th style={{width: "20px"}}>Rank</th>
                        <th>Name</th>
                        <th>Money</th>
                        <th>Pending</th>
                        <th>Record</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.league.gamblers.map((gambler, index) => {
                        return <tr key={`standings-${gambler.id}`}>
                            <td>{index + 1}</td>
                            <td>{gambler.user.firstName} {gambler.user.lastName}</td>
                            <td>
                                <a href={`transaction/show/${gambler.id}`}>
                                    ${gambler.money.toFixed(2)}
                                </a>
                            </td>
                            <td>${gambler.pending.toFixed(2)}</td>
                            <td>{gambler.record}</td>
                            <td></td>
                            <td></td>
                        </tr>;
                    })}
                    </tbody>
                </Table>
                <div>Average Money: ${this.getAverageMoney()}</div>
                <div>Total Record: {this.getTotalRecord()}</div>
                <br/>
            </Col>
        </Container>;
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
)(Standings);
