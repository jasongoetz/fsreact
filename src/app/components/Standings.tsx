import React from "react";
import {getLeague} from "../league/leagueSelector";
import {Col, Container, Table} from "reactstrap";
import {PageHeader} from "./PageHeader";
import {FullLeague} from "../types";
import {LeagueConsumer} from "../league/leagueContext";

const Standings: React.FC = () => {

    const getAverageMoney = (league: FullLeague) => {
        if (league.gamblers.length == 0) {
            return 0;
        }
        let totalMoney = league.gamblers.reduce((acc, gambler) => acc + gambler.money, 0);
        return (totalMoney / league.gamblers.length).toFixed(0);
    };

    const getTotalRecord = (league: FullLeague) => {
        let wins = league.gamblers.reduce((acc, gambler) => acc + gambler.wins, 0);
        let losses = league.gamblers.reduce((acc, gambler) => acc + gambler.losses, 0);
        let pushes = league.gamblers.reduce((acc, gambler) => acc + gambler.pushes, 0);
        return `${wins}-${losses}-${pushes}`;
    };

    return (
        <LeagueConsumer select={[getLeague]}>
            {league =>
                <Container>
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
                            {league.gamblers.map((gambler, index) => {
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
                        <div>Average Money: ${getAverageMoney(league)}</div>
                        <div>Total Record: {getTotalRecord(league)}</div>
                        <br/>
                    </Col>
                </Container>
            }
        </LeagueConsumer>
    );
};

export default Standings;
