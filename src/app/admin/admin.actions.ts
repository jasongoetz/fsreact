import {adminStore} from "./admin.store";
import {getAllGamesForOpenBets, postGameScores} from "../api/api";
import {GameScoreRequest} from "../types";

export const loadGamesForOpenBets = async () => {
    const games = await getAllGamesForOpenBets();
    await adminStore.saveGamesWithOpenBets(games);
};

export const submitGameScores = async (scores: GameScoreRequest[]) => {
    await postGameScores(scores);
    const games = await getAllGamesForOpenBets();
    await adminStore.saveGamesWithOpenBets(games);
}
