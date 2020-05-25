import {getUserContext, updateUser, updateUserPass} from "../api/api";
import {handleHTTPError} from "../error/error.actions";
import {UserProfile} from "../types";
import {leagueStore} from "../league/league.store";
import {gamblerStore} from "../gambler/gambler.store";
import {userStore} from "./user.store";

export const loadUserContext = async (userId: number) => {
    try {
        const userContext = await getUserContext(userId);
        userStore.saveUser(userContext.user, !!userContext.league);
        if (userContext.league) {
            gamblerStore.saveGambler(userContext.gambler);
            leagueStore.saveLeague(userContext.league, userContext.league.gamblers, userContext.league.invites, userContext.league.topBets);
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




