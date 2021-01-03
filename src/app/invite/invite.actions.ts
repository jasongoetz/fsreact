import {handleHTTPError} from "../error/error.actions";
import {inviteStore} from "./invite.store";
import {getInviteByToken} from "../api/api";

export const loadInviteByToken = async (token: string) => {
    try {
        const invite = await getInviteByToken(token);
        inviteStore.saveInvite(invite);
    } catch (error) {
        handleHTTPError(error);
    }
};

