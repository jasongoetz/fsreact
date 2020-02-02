import {LeagueContext, LeagueInfo, LeagueInvite, mutate} from "./leagueContext";
import {postInvite, revokeInvite} from "../api/api";
import {handleHTTPError} from "../error/errorActions";

export const inviteUser = async (email: string, league: LeagueInfo) => {
    try {
        const invitedUser = await postInvite(league.id, email);
        mutate((draft: LeagueContext) => {
            draft.league.invites.push(invitedUser);
        });
    } catch (error) {
        handleHTTPError(error);
    }
};

export const uninviteUser = async (leagueId: number, inviteId: number) => {
    try {
        await revokeInvite(leagueId, inviteId);
        mutate((draft: LeagueContext) => {
            draft.league.invites = draft.league.invites.filter((invite: LeagueInvite) => invite.id !== inviteId);
        });
    } catch (error) {
        handleHTTPError(error);
    }
};
