import React from "react";
import {FullBet, OverUnder, Sport} from '../types';
import {useGlobalStores} from "../context/global_context";

const pendingBetPanelStyle = {
    borderRadius: "0px",
    border: "0px",
    paddingTop: "0px"
};

const pendingMiniBetCardStyle =  {
    marginTop: "0",
    padding: "10px 0px 10px 0px",
    width: "100%",
    marginBottom: "15px"
};

const betHeadlineStyle = {
    fontWeight: "bold" as 'bold'
};

const shortenTeamName = (teamName: string, sport: Sport) => {
    if (sport === "NFL") {
        const lastIndex = teamName.lastIndexOf(" ");
        return teamName.substring(0, lastIndex);
    }
    else {
        return teamName;
    }
};

const getBetSummary = (bet: FullBet) => {
    if (bet.sideId === bet.bettable.sideId1) {
        return `${bet.bettable.team1} ${bet.line}`;
    } else if (bet.sideId === bet.bettable.sideId2) {
        return `${bet.bettable.team2} ${bet.line}`;
    } else {
        return `${bet.overUnder === OverUnder.OVER ? "Over" : "Under"} ${bet.line}`;
    }
};

const MiniBets = () => {
    const { leagueStore } = useGlobalStores();
    const league = leagueStore.league!;

    return (
        <div style={pendingBetPanelStyle}>
            {leagueStore.topBets.bets.map(bet => {
                return <div key={`top-bet-card-${bet.id}`} style={pendingMiniBetCardStyle}>
                    <div style={betHeadlineStyle}>
                        ${bet.amount} by {bet.gambler.user.firstName} {bet.gambler.user.lastName}
                    </div>
                    {bet.infoRedacted && <><div>[Info Redacted]</div><div/></>}
                    {!bet.infoRedacted &&
                        <>
                            <div>
                                {getBetSummary(bet)}
                            </div>
                            <div>
                                {shortenTeamName(bet.bettable.team1, league.sport)} @ {shortenTeamName(bet.bettable.team2, league.sport)}
                            </div>
                        </>
                    }
                </div>
            })}
        </div>
    );
};

export default MiniBets;
