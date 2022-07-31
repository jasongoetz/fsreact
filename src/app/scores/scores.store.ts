import {BettableWithBetsAndScore, Parlay, ScoresReport} from "../types";
import {action, observable} from "mobx";

class ScoresStore {
    @observable scores: BettableWithBetsAndScore[] = [];
    @observable gamblerNames: { [id: number]: string } = {};
    @observable parlays: Parlay[] = [];
    @observable loaded: boolean = false;

    @action
    saveLiveScores = async (scoresReport: ScoresReport) => {
        this.scores = scoresReport.scores;
        this.gamblerNames = scoresReport.gamblerNames;
        this.parlays = scoresReport.parlays;
        this.loaded = true;
    };

    @action
    clear = () => {
        this.scores = [];
        this.gamblerNames = {};
        this.parlays = [];
        this.loaded = false;
    }
}

export const scoresStore = new ScoresStore()
