import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {loadUserContext} from "../user/userActions";
import {getLeague} from "../league/leagueSelector";
import {Container, Table} from "reactstrap";
import {PageHeader} from "./PageHeader";
import {getGamblerWithAccount} from "../gambler/gamblerSelector";
import {loadTransactions} from "../transactions/transactionActions";
import {getTransactionsMap} from "../transactions/transactionsSelector";
import moment from 'moment';
import {TransactionRow} from "./TransactionRow";
import {State} from "../reducers/root";
import {BetOrParlay} from "../types";

export interface Props {
    gamblerId?: number;
}

const userRecordStyle = {
    float: "right" as "right",
    paddingRight: "5px",
    paddingBottom: "10px"
};

const userStatsStyle = {
    paddingBottom: "20px"
};

const AccountPage: React.FC<Props> = ({gamblerId}) => {

    const dispatch = useDispatch();

    const league = useSelector(state => getLeague(state));
    const gambler =  useSelector((state: State) => getGamblerWithAccount(state, !!gamblerId ? gamblerId : state.gambler.id));
    const transactionsMap = useSelector(state => getTransactionsMap(state));

    useEffect(() => {
        const fetchData = async () => {
            if (!league.id) {
                await dispatch(loadUserContext());
            }
            if (gambler && gambler.id) {
                await dispatch(loadTransactions(gambler.id));
            }
        };
        fetchData();
    }, [league, gambler]);

    if (!gambler) {
        return <div></div>;
    }
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
                <TransactionRow key={`tr-${index}`} betOrParlay={betOrParlay} moneyline={league.moneyline}/>)
            }
            </tbody>
        </Table>

    </Container>;
};

export default AccountPage;
