import {Sport} from "../types";
import {getGamesForSport} from "../api/api";
import {bettableStore} from "./bettable.store";

export const loadGames = async (sport: Sport) => {
    const games = await getGamesForSport(sport);
    bettableStore.saveBettables(games.bettables);
};
