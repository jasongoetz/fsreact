import {Component} from "react";
import {Button, Nav, NavItem, NavLink} from "reactstrap";
import React from "react";
import {Link} from "react-router-dom";
import {Gambler, League} from "../types";
import {getLeague, getLeagueGamblers} from "../league/leagueSelector";
import {loadUserContext} from "../user/userActions";
import {connect} from "react-redux";
import HomePagePanel from "./HomePagePanel";

export interface State {
}

export interface Props {
    league: League;
}

const ruleStyle = {
    marginBottom: "10px"
};

const lastRuleStyle = {
    marginBottom: "20px"
};

class Rules extends Component<Props, State> {
    render() {
        return (
            <div>
                <div style={ruleStyle}>
                    1. You start out with an imaginary ${this.props.league.startingAccount} in your account. Whoever has
                    the most imaginary money in their account at the end of the season wins.
                </div>
                <div style={ruleStyle}>
                    2. You can make up to {this.props.league.weeklyBetCountMax} bets per week, but don't have to make
                    any bets.
                </div>
                <div style={ruleStyle}>
                    3. You cannot bet more than {this.props.league.weeklyBetAccountRatio}% of the stash you started the
                    week with. If you come into the week with $100, then the most you can spread over your bets is
                    ${this.props.league.weeklyBetAccountRatio}.
                </div>
                <div style={lastRuleStyle}>
                    4. Lines move, so please be aware that you are locked into whatever point spread or over/under you
                    initially wager on.
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state: State) => {
    return {
        league: getLeague(state),
    };
};

export default connect(
    mapStateToProps,
    undefined,
)(Rules);