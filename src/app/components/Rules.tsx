import React from "react";
import {getLeague} from "../league/leagueSelector";
import {LeagueConsumer} from "../league/leagueContext";

const ruleStyle = {
    marginBottom: "10px"
};

const lastRuleStyle = {
    marginBottom: "20px"
};

export const Rules: React.FC = () => {
    return (
        <LeagueConsumer select={[getLeague]}>
            {league =>
                <div>
                    <div style={ruleStyle}>
                        1. You start out with an imaginary ${league.startingAccount} in your account. Whoever has
                        the most imaginary money in their account at the end of the season wins.
                    </div>
                    <div style={ruleStyle}>
                        2. You can make up to {league.weeklyBetCountMax} bets per week, but don't have to make
                        any bets.
                    </div>
                    <div style={ruleStyle}>
                        3. You cannot bet more than {league.weeklyBetAccountRatio * 100}% of the stash you started the
                        week with. If you come into the week with $100, then the most you can spread over your bets is
                        ${100 * league.weeklyBetAccountRatio}.
                    </div>
                    <div style={lastRuleStyle}>
                        4. Lines move, so please be aware that you are locked into whatever point spread or over/under
                        you
                        initially wager on.
                    </div>
                </div>
            }
        </LeagueConsumer>
    )
};
