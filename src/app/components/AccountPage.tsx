import React, {useEffect} from "react";
import {getLeague} from "../league/leagueSelector";
import {Container, Table} from "reactstrap";
import {PageHeader} from "./PageHeader";
import {loadTransactions} from "../transactions/transactionActions";
import {getTransactionsMap} from "../transactions/transactionsSelector";
import moment from 'moment';
import {TransactionRow} from "./TransactionRow";
import {BetOrParlay, GamblerInfo} from "../types";
import {LeagueConsumer} from "../league/leagueContext";
import {TransactionsConsumer} from "../transactions/transactionsContext";

interface Props {
    gambler: GamblerInfo;
}

const userRecordStyle = {
    float: "right" as "right",
    paddingRight: "5px",
    paddingBottom: "10px"
};

const userStatsStyle = {
    paddingBottom: "20px"
};

const AccountPage: React.FC<Props> = ({gambler}) => {

    useEffect(() => {
        loadTransactions(gambler.id);
    }, [gambler]);

    return (
        <LeagueConsumer select={[getLeague]}>
            {league =>
                <TransactionsConsumer select={[getTransactionsMap]}>
                    {transactionsMap => {
                        let betsAndParlays = transactionsMap[gambler.id] || [];
                        return <Container>
                            <PageHeader>{gambler.user.firstName} {gambler.user.lastName}</PageHeader>
                            <div style={userStatsStyle}>
                                Account Balance: ${(gambler.money - gambler.pending).toFixed(2)} (Money:
                                ${gambler.money.toFixed(2)} Pending: ${gambler.pending.toFixed(2)})
                                <span style={userRecordStyle}>Record: {gambler.record}</span>
                            </div>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Transaction</th>
                                    <th>Win/Loss</th>
                                    <th>Amount</th>
                                    <th>Tally</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{moment(gambler.user.createdAt).format("dddd, MMMM Do")}</td>
                                    <td>Account Creation</td>
                                    <td></td>
                                    <td>{league.startingAccount.toFixed(2)}</td>
                                    <td>{league.startingAccount.toFixed(2)}</td>
                                </tr>
                                {betsAndParlays && betsAndParlays.map((betOrParlay: BetOrParlay, index) =>
                                    <TransactionRow key={`tr-${index}`} betOrParlay={betOrParlay}
                                                    moneyline={league.moneyline}/>)
                                }
                                </tbody>
                            </Table>
                        </Container>
                    }}
                </TransactionsConsumer>
            }
        </LeagueConsumer>
    );
};

export default AccountPage;
