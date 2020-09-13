import {postInvite, registerLeague, registerUser, revokeInvite} from "../api/api";
import {handleHTTPError} from "../error/error.actions";
import {leagueStore} from "./league.store";
import {LeagueInfo, UserRegistrationInfo} from "../types";

const getLeagueId = (): number => leagueStore.league!.id;

export const inviteUser = async (email: string) => {
    try {
        const invitedUser = await postInvite(getLeagueId(), email);
        leagueStore.addInvite(invitedUser);
    } catch (error) {
        handleHTTPError(error);
    }
};

export const uninviteUser = async (inviteId: number) => {
    try {
        await revokeInvite(getLeagueId(), inviteId);
        leagueStore.removeInvite(inviteId);
    } catch (error) {
        handleHTTPError(error);
    }
};

export const createLeague = async (userId: number, leagueInfo: LeagueInfo) => {
    const league = await registerLeague(userId, leagueInfo);
    leagueStore.createLeague(leagueInfo);
};
