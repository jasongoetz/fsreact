import React from "react";
import {useGlobalStores} from "../context/global_context";

const ruleStyle = {
    marginBottom: "10px"
};

const lastRuleStyle = {
    marginBottom: "20px"
};

export const Rules: React.FC = () => {
    const { leagueStore } = useGlobalStores();
    const league = leagueStore.league!;

    const startingAccountRule = `You start out with an imaginary $${league.startingAccount} in your account. Whoever has
                the most imaginary money in their account at the end of the season wins.`;

    const betCountMaxRules = `You can make up to ${league.weeklyBetCountMax} bets per week, but don't have to make
  any bets.`;

    const accountRatioRule = `You cannot bet more than ${league.weeklyBetAccountRatio * 100}% of the stash you started the
                week with. If you come into the week with $100, then the most you can spread over your bets is
                $${100 * league.weeklyBetAccountRatio}.`;

    const bettingBonusRule = `For every bet you win, you get a ${league.moneyline - 100}% bonus on top of your 
                winnings. If you win on a $100 bet, you get $${league.moneyline}. Bet often.`

    const lineMoveWarning = `Lines move, so please be aware that you are locked into whatever point spread or over/under
                you initially wager on.`

    const rules: string[] = [];
    rules.push(startingAccountRule);
    rules.push(betCountMaxRules);
    if (league.weeklyBetAccountRatio < 1) {
        rules.push(accountRatioRule);
    }
    if (league.moneyline > 100) {
        rules.push(bettingBonusRule);
    }
    rules.push(lineMoveWarning);

    return (
        <div>
          {rules.map((rule, index) => (
            <div style={index === rules.length - 1 ? lastRuleStyle: ruleStyle}>
              {index + 1}. {rule}
            </div>
          ))}
        </div>
    )
};
