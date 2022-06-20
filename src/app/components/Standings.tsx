import React from "react";
import {Col, Container, Table} from "reactstrap";
import {PageHeader} from "./PageHeader";
import {useGlobalStores} from "../context/global_context";
import {GamblerInfo} from "../types";
import {observer} from "mobx-react";

const Standings: React.FC = observer(() => {

    const { leagueStore } = useGlobalStores();

    const getAverageMoney = (gamblers: GamblerInfo[]) => {
        if (gamblers.length === 0) {
            return 0;
        }
        let totalMoney = gamblers.reduce((acc, gambler) => acc + gambler.tallies.money, 0);
        return (totalMoney / gamblers.length).toFixed(0);
    };

    const getTotalRecord = (gamblers: GamblerInfo[]) => {
        let wins = gamblers.reduce((acc, gambler) => acc + gambler.tallies.wins, 0);
        let losses = gamblers.reduce((acc, gambler) => acc + gambler.tallies.losses, 0);
        let pushes = gamblers.reduce((acc, gambler) => acc + gambler.tallies.pushes, 0);
        return `${wins}-${losses}-${pushes}`;
    };

    return (
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
                        <th>Moneyline</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {leagueStore.gamblers.map((gambler, index) => {
                        return <tr key={`standings-${gambler.id}`}>
                            <td>{index + 1}</td>
                            <td>{gambler.user.firstName} {gambler.user.lastName}{gambler.defunct ? ' (Defunct)' : ''}</td>
                            <td>
                                <a href={`transaction/show/${gambler.id}`}>
                                    ${gambler.tallies.money.toFixed(2)}
                                </a>
                            </td>
                            <td>${gambler.tallies.pending.toFixed(2)}</td>
                            <td>{gambler.tallies.record}</td>
                            <td>{gambler.tallies.moneylineRecord}</td>
                            <td></td>
                        </tr>;
                    })}
                    </tbody>
                </Table>
                <div>Average Money: ${getAverageMoney(leagueStore.gamblers)}</div>
                <div>Total Record: {getTotalRecord(leagueStore.gamblers)}</div>
                <br/>
            </Col>
        </Container>
    );
});

export default Standings;
