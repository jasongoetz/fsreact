import React, {Component} from "react";
import {connect} from "react-redux";
import {loadUserContext} from "../user/userActions";
import {getLeague} from "../league/leagueSelector";
import {Container, Table} from "reactstrap";
import {PageHeader} from "./PageHeader";
import {getGambler, getGamblerWithAccount} from "../gambler/gamblerSelector";
import {loadTransactions} from "../transactions/transactionActions";
import {getTransactionsMap} from "../transactions/transactionsSelector";
import moment from 'moment';
import {GamblerInfo, League} from "../types";

export interface Props {
    loadUserContext: () => void;
    loadTransactions: (gamblerId) => void;
    gamblerId?: number;
    gambler: GamblerInfo;
    league: League;
    transactionsMap: any; //TODO: Fix
}

const sidebarOuterStyle = {
    display: "none"
};

const userRecordStyle = {
    float: "right" as "right",
    paddingRight: "5px",
    paddingBottom: "10px"
};

const userStatsStyle = {
    paddingBottom: "20px"
};

const parlayBetRowStyle = {
    borderTop: "0px",
    lineHeight: "1.0",
    fontSize: "12px",
    padding: "8px",
    color: "#595756" //TODO: Fix
};

const parlayBetDateStyle = {
    paddingLeft: "15px"
};

const parlayBetOutcomeStyle = {
    paddingLeft: "15px"
};

export interface BetOrParlay {
    type: string;
    value: any;
    tally: number;
}

class TransactionRow extends Component<{betOrParlay: BetOrParlay}> {
    render() {
        let betOrParlay = this.props.betOrParlay;
        return (
            <React.Fragment>
                <tr style={{backgroundColor: this.getRowColor(betOrParlay)}}>
                    <td>{betOrParlay.type === 'bet' ? moment(betOrParlay.value.bettable.gameTime).format("dddd, MMMM Do") : ''}</td>
                    <td>{this.getDescription(betOrParlay)}</td>
                    <td>{this.getOutcome(betOrParlay.value)}</td>
                    <td>{this.getAmount(betOrParlay)}</td>
                    <td>{betOrParlay.tally}</td>
                </tr>
                {this.props.betOrParlay.type === 'parlay' && betOrParlay.value.bets.map((bet, index) => {
                    return <tr key={`trr-${index}`} style={{backgroundColor: this.getRowColor(betOrParlay)}}>
                        <td style={{...parlayBetDateStyle, ...parlayBetRowStyle}}>{moment(bet.gameTime).format("dddd, MMMM Do")}</td>
                        <td style={{...parlayBetRowStyle, paddingLeft: "20px"}}>{this.getBetDescription(bet)}</td>
                        <td style={{...parlayBetRowStyle, ...parlayBetOutcomeStyle}}>{bet.outcome}</td>
                        <td style={parlayBetRowStyle}></td>
                        <td style={parlayBetRowStyle}></td>
                    </tr>
                })}
            </React.Fragment>
        );
    }

    getRowColor = (betOrParlay: BetOrParlay) => {
        if (betOrParlay.value.outcome === 'WIN') {
            return "#dff0d8"; //TODO: Color pallet
        } else if (betOrParlay.value.outcome === 'LOSS') {
            return "#f2dede"; //TODO: Color pallet
        } else if (betOrParlay.value.complete === true) {
            return "#fcf8e3"; //TODO: Color pallet
        } else {
            return "#f5f5f5"; //TODO: Color pallet
        }
    };

    getDescription = (betOrParlay: any) => {
        if (betOrParlay.type === 'parlay') {
            return `${betOrParlay.value.bets.length} Bet Parlay:`
        } else if (betOrParlay.value.sideId == betOrParlay.value.bettable.sideId1) {
            return `${betOrParlay.value.bettable.team1} ${betOrParlay.value.line} @ ${betOrParlay.value.bettable.team2}`
        } else if (betOrParlay.value.sideId == betOrParlay.value.bettable.sideId2) {
            return `${betOrParlay.value.bettable.team2} ${betOrParlay.value.line} vs ${betOrParlay.value.bettable.team1}`
        } else {
            return `${betOrParlay.value.overunder === 'OVER' ? " Over" : " Under"} ${betOrParlay.value.line} (${betOrParlay.value.bettable.team2} vs ${betOrParlay.value.bettable.team1})`
        }
    };

    getBetDescription = (bet: any) => {
        if (bet.sideId == bet.bettable.sideId1) {
            return `${bet.bettable.team1} ${bet.line} @ ${bet.bettable.team2}`
        } else if (bet.sideId == bet.bettable.sideId2) {
            return `${bet.bettable.team2} ${bet.line} vs ${bet.bettable.team1}`
        } else {
            return `${bet.overunder === 'OVER' ? " Over" : " Under"} ${bet.line} (${bet.bettable.team2} vs ${bet.bettable.team1})`
        }
    };

    getOutcome = (bet: any) => {
        if (bet.outcome === 'WIN') {
            return "WIN";
        } else if (bet.outcome === 'LOSS') {
            return "LOSS";
        } else if (bet.complete === true) {
            return "PUSH";
        } else {
            return "PENDING";
        }
    };

    getAmount = (betOrParlay: any) => {
        if (betOrParlay.value.outcome === 'WIN') {
            if (betOrParlay.type === 'parlay') {
                return this.parlayWinnings(betOrParlay);
            } else {
                return betOrParlay.value.amount
            }
        } else if (betOrParlay.value.outcome === 'LOSS') {
            return betOrParlay.value.amount;
        } else if (betOrParlay.value.complete === true) {
            return "-";
        } else {
            if (betOrParlay.type === 'parlay') {
                return `${betOrParlay.value.amount} to win ${this.parlayWinnings(betOrParlay)}`;
            } else {
                return betOrParlay.value.amount
            }
        }
    };

    parlayWinnings = (betOrParlay: any) => {
        return (betOrParlay.value.amount * Math.pow(2, betOrParlay.value.bets.length)) - betOrParlay.value.amount;
    };
}

export class AccountPage extends Component<Props> {

    async componentDidMount() {
        if (!this.props.league.id) {
            await this.props.loadUserContext();
        }
        if (this.props.gambler.id) {
            await this.props.loadTransactions(this.props.gambler.id);
        }
    }

    render() {
        if (!this.props.gambler) {
            return <div></div>;
        }
        let gambler = this.props.gambler;
        let betsAndParlays = this.props.transactionsMap[gambler.id] || [];
        return <Container>
            <PageHeader>{gambler.user.firstName} {gambler.user.lastName}</PageHeader>
            <div style={userStatsStyle}>
                Account Balance: ${gambler.money - gambler.pending} (Money: ${gambler.money} Pending: ${gambler.pending})
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
                        <td>{this.props.league.startingAccount}</td>
                        <td>{this.props.league.startingAccount}</td>
                    </tr>
                    {betsAndParlays &&
                        betsAndParlays.map((betOrParlay, index) => <TransactionRow key={`tr-${index}`} betOrParlay={betOrParlay}/>)
                    }
                </tbody>
            </Table>

        </Container>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        league: getLeague(state),
        gambler: getGamblerWithAccount(state, !!ownProps.gamblerId ? ownProps.gamblerId : state.gambler.id),
        transactionsMap: getTransactionsMap(state),
    };
};

const mapDispatchToProps = {
    loadUserContext,
    loadTransactions,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccountPage);
