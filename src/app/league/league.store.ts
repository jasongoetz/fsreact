import {FullBet, GamblerInfo, League, LeagueInfo, LeagueInvite, Parlay} from "../types";
import {action, observable} from "mobx";

class LeagueStore {

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
    addInvite = (invitedUser: LeagueInvite) => {
        this.invites.push(invitedUser);
    };

    @action
    removeInvite = (inviteId: number) => {
        this.invites = this.invites.filter((invite: LeagueInvite) => invite.id !== inviteId);
    };

}

export const leagueStore = new LeagueStore();
