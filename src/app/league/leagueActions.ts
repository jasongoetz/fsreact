import {LeagueContext} from "./leagueReducer";
import {postInvite, revokeInvite} from "../api/api";
import {handleHTTPError} from "../error/errorActions";

export const INVITE_SUCCESS = "INVITE_SUCCESS";
export const REVOKE_INVITE_SUCCESS = "REVOKE_INVITE_SUCCESS";

export const inviteUser = (email: string, league: LeagueContext) => {
    return async (dispatch) => {
        try {
            const invitedUser = await postInvite(league.id, email);
            dispatch({
                type: INVITE_SUCCESS,
                data: invitedUser
            });
        } catch (error) {
            dispatch(handleHTTPError(error));
        }
    };
};

export const uninviteUser = (leagueId: number, inviteId: number) => {
    return async (dispatch) => {
        try {
            await revokeInvite(leagueId, inviteId);
            dispatch({
                type: REVOKE_INVITE_SUCCESS,
                data: {inviteId}
            });
        } catch (error) {
            dispatch(handleHTTPError(error));
        }
    };
};