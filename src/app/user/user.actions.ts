import {getUserContext, joinLeague, switchUserLeague, updateUser, updateUserPass} from "../api/api";
import {handleHTTPError} from "../error/error.actions";
import {Invite, UserProfile} from "../types";
import {leagueStore} from "../league/league.store";
import {gamblerStore} from "../gambler/gambler.store";
import {userStore} from "./user.store";
import {inviteStore} from "../invite/invite.store";
import {bettableStore} from "../bettables/bettable.store";
import {scoresStore} from "../scores/scores.store";

export const loadUserContext = async (userId: number) => {
    try {
        const userContext = await getUserContext(userId);
        userStore.saveUser(userContext.user, !!userContext.league);
        userStore.saveLeagues(userContext.userLeagues);
        if (userContext.league) {
            gamblerStore.saveGambler(userContext.gambler);
            gamblerStore.saveGamblerStatus(userContext.gamblerStatus);
            leagueStore.saveLeague(userContext.league, userContext.league.gamblers, userContext.league.invites, userContext.league.topBets);
            leagueStore.saveWeek(userContext.week);
        }
    } catch (error) {
        handleHTTPError(error);
    }
};

export const updateUserProfile = async (userId: number, user: UserProfile) => {
    await updateUser(userId, user);
    userStore.saveUserProfile(user);
};

export const updateUserPassword = async (userId: number, password: string) => {
    await updateUserPass(userId, password);
};

export const joinLeagueWithInvite = async (userId: number, invite: Invite) => {
    await joinLeague(userId, invite.token);
    inviteStore.inviteAccepted();
    await loadUserContext(userId);
}

export const switchLeague = async (leagueId: number) => {
    if (userStore.user) {
        await switchUserLeague(userStore.user.id, leagueId);
        await loadUserContext(userStore.user.id);
        bettableStore.clear();
        scoresStore.clear();
    }
}




