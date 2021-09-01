import {adminStore} from "./admin.store";
import {getAllGamesForOpenBets, postGameScores} from "../api/api";
import {GameScoreRequest} from "../types";
import {loadUserContext} from "../user/user.actions";

export const loadGamesForOpenBets = async (future?: boolean) => {
    const games = await getAllGamesForOpenBets(future);
    await adminStore.saveGamesWithOpenBets(games);
};

export const submitGameScores = async (scores: GameScoreRequest[]) => {
    await postGameScores(scores);
    const games = await getAllGamesForOpenBets();
    await adminStore.saveGamesWithOpenBets(games);
}
