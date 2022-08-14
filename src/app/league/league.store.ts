import { FullBet, GamblerInfo, League, LeagueInvite, Parlay, SportWeek } from "../types";
import {action, observable} from "mobx";

class LeagueStore {

    @observable week?: SportWeek;
    @observable league?: League;
    @observable gamblers: GamblerInfo[] = [];
    @observable invites: LeagueInvite[] = [];
    @observable topBets: { bets: FullBet[], parlays: Parlay[] } = {
        bets: [],
        parlays: []
    };

    @action
    saveLeague = (league: League, gamblers: GamblerInfo[], invites: LeagueInvite[], topBets: { bets: FullBet[], parlays: Parlay[] }) => {
        this.league = league;
        this.gamblers = gamblers;
        this.invites = invites;
        this.topBets = topBets;
    }

    @action
    saveWeek = (week: SportWeek) => {
        this.week = week;
    }

    @action
    addInvite = (invitedUser: LeagueInvite) => {
        this.invites.push(invitedUser);
    };

    @action
    removeInvite = (inviteId: number) => {
        this.invites = this.invites.filter((invite: LeagueInvite) => invite.id !== inviteId);
    };

    @action
    clear = () => {
        this.league = undefined;
        this.week = undefined;
        this.gamblers = [];
        this.invites = [];
    }

}

export const leagueStore = new LeagueStore();
