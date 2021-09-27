import {getLiveScores} from "../api/api";
import {scoresStore} from "./scores.store";

export const loadLiveScores= async (leagueId: number, week?: number) => {
    const scores = await getLiveScores(leagueId, week);
    await scoresStore.saveLiveScores(scores);
};
