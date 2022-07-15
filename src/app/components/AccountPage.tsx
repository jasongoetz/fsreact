import React, {useEffect} from "react";
import {Container, Table} from "reactstrap";
import {PageHeader} from "./PageHeader";
import {loadTransactions} from "../transactions/transaction.actions";
import moment from 'moment';
import {TransactionRow} from "./TransactionRow";
import {BetOrParlayWrapper} from "../types";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";

interface Props {
    providedGamblerId?: string;
}

const userRecordStyle = {
    float: "right" as "right",
    paddingRight: "5px",
    paddingBottom: "10px"
};

const userStatsStyle = {
    paddingBottom: "20px"
};

const AccountPage: React.FC<Props> = observer(({providedGamblerId}) => {

    const { gamblerStore, leagueStore, transactionsStore } = useGlobalStores();
    const gamblerId = providedGamblerId ? parseInt(providedGamblerId) : gamblerStore.gambler?.id;

    useEffect(() => {
        if (gamblerId) {
            loadTransactions(gamblerId);
        }
    }, [gamblerId]);


    const gambler = leagueStore.gamblers.find(gambler => gambler.id === gamblerId)
    if (!leagueStore.league || !gamblerId || !gambler) {
        return <div></div>;
    }
    const leagueInfo = leagueStore.league;

    let betsAndParlays = transactionsStore.transactionsByGambler[gamblerId] || [];
    return <Container>
        <PageHeader>{gambler.user.firstName} {gambler.user.lastName}{gambler.defunct ? ' (Defunct)' : ''}</PageHeader>
        <div style={userStatsStyle}>
            Account Balance: ${(gambler.tallies.money - gambler.tallies.pending).toFixed(2)} (Money:
            ${gambler.tallies.money.toFixed(2)} Pending: ${gambler.tallies.pending.toFixed(2)})
            <span style={userRecordStyle}>Record: {gambler.tallies.record}</span>
        </div>
        <Table responsive>
            <thead>
            <tr>
                <th>Date</th>
                <th>Transaction</th>
                <th>Win/Loss</th>
                <th>Paid</th>
                <th>Win</th>
                <th>Tally</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{moment(gambler.user.createdAt).format("dddd, MMMM Do")}</td>
                <td>Account Creation</td>
                <td></td>
                <td>{leagueInfo.startingAccount.toFixed(2)}</td>
                <td>{leagueInfo.startingAccount.toFixed(2)}</td>
            </tr>
            {betsAndParlays && betsAndParlays.map((betOrParlay: BetOrParlayWrapper, index) =>
                <TransactionRow key={`tr-${index}`} betOrParlay={betOrParlay} moneyline={leagueInfo.moneyline}/>)
            }
            </tbody>
        </Table>
    </Container>
});

export default AccountPage;
