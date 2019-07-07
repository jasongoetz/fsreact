import {Component} from "react";
import {Button, Nav, NavItem, NavLink} from "reactstrap";
import React from "react";
import {Link} from "react-router-dom";
import {Gambler} from "../types";
import {getLeague, getLeagueGamblers} from "../league/leagueSelector";
import {loadUserContext} from "../user/userActions";
import {connect} from "react-redux";
import HomePagePanel from "./HomePagePanel";

export interface State {
}

export interface Props {
    league: any; //TODO: Fix
}

const pendingBetPanelStyle = {
    borderRadius: "0px",
    border: "0px",
    paddingTop: "0px"
};

const pendingMiniBetCardStyle =  {
    backgroundColor: "#ececec",
    marginTop: "0",
    padding: "10px",
    width: "100%",
    marginBottom: "15px"
};

const betHeadlineStyle = {
    fontWeight: "bold" as 'bold'
};

class MiniBets extends Component<Props, State> {

    shortenTeamName = teamName => {
        if (this.props.league.sport == "NFL") {
            const lastIndex = teamName.lastIndexOf(" ");
            return teamName.substring(0, lastIndex);
        }
        else {
            return teamName;
        }
    };

    render() {
        return (
            <div style={pendingBetPanelStyle}>
                {this.props.league.topBets.bets.map(bet => {
                    return <div style={pendingMiniBetCardStyle}>
                        <div style={betHeadlineStyle}>
                            ${bet.amount} by {bet.gambler.user.firstName} {bet.gambler.user.lastName}
                        </div>
                        <div>
                            {this.getBetSummary(bet)}
                        </div>
                        <div>
                            {this.shortenTeamName(bet.bettable.team1)} @ {this.shortenTeamName(bet.bettable.team2)}
                        </div>
                    </div>
                })}
            </div>
        );
    }

    private getBetSummary(bet: any) {
        if (bet.sideId == bet.bettable.sideId1) {
            return `${bet.bettable.team1} ${bet.line}`;
        } else if (bet.sideId == bet.bettable.sideId2) {
            return `${bet.bettable.team2} ${bet.line}`;
        } else {
            return `${bet.overunder === 'OVER' ? "Over" : "Under"} ${bet.line}`;
        }
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
)(MiniBets);