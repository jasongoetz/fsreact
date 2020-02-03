import {getGamesForSport} from "../api/api";
import {Sport} from "../types";
import {BettableContext, mutate} from "./bettableContext";

export const loadGames = async (sport: Sport) => {
    const games = await getGamesForSport(sport);
    mutate((draft: BettableContext) => {
        draft.bettables = games.bettables;
    });
};



