import {action, observable} from "mobx";
import { Gambler, GamblerStatus } from "../types";

class GamblerStore {
    @observable gambler?: Gambler;
    @observable gamblerStatus?: GamblerStatus;

    @action
    saveGambler = (gambler: Gambler) => {
        this.gambler = gambler;
    }

    @action
    saveGamblerStatus = (gamblerStatus: GamblerStatus) => {
        this.gamblerStatus = gamblerStatus;
    }

    @action
    clear = () => {
        this.gambler = undefined;
        this.gamblerStatus = undefined;
    }
}

export const gamblerStore = new GamblerStore();
