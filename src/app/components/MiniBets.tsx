import React from "react";
import {Bet, FullLeague, Sport} from "../types";
import {getLeague} from "../league/leagueSelector";
import {useSelector} from "react-redux";

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

const shortenTeamName = (teamName: string, sport: Sport) => {
    if (sport == "NFL") {
        const lastIndex = teamName.lastIndexOf(" ");
        return teamName.substring(0, lastIndex);
    }
    else {
        return teamName;
    }
};

const getBetSummary = (bet: Bet) => {
    if (bet.sideId == bet.bettable.sideId1) {
        return `${bet.bettable.team1} ${bet.line}`;
    } else if (bet.sideId == bet.bettable.sideId2) {
        return `${bet.bettable.team2} ${bet.line}`;
    } else {
        return `${bet.overunder === 'OVER' ? "Over" : "Under"} ${bet.line}`;
    }
};

const MiniBets = () => {
    const league: FullLeague = useSelector(state => getLeague(state));

    return (
        <div style={pendingBetPanelStyle}>
            {league.topBets.bets.map(bet => {
                return <div key={`top-bet-card-${bet.id}`} style={pendingMiniBetCardStyle}>
                    <div style={betHeadlineStyle}>
                        ${bet.amount} by {bet.gambler.user.firstName} {bet.gambler.user.lastName}
                    </div>
                    <div>
                        {getBetSummary(bet)}
                    </div>
                    <div>
                        {shortenTeamName(bet.bettable.team1, league.sport)} @ {shortenTeamName(bet.bettable.team2, league.sport)}
                    </div>
                </div>
            })}
        </div>
    );
};

export default MiniBets;
