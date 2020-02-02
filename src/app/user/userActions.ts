import {getUserContext, updateUser, updateUserPass} from "../api/api";
import {handleHTTPError} from "../error/errorActions";
import {UserProfile} from "../types";
import {mutate as userMutate, UserContext} from "./userContext";
import {GamblerContext, mutate as gamblerMutate} from "../gambler/gamblerContext";
import {LeagueContext, mutate as leagueMutate} from "../league/leagueContext";

export const loadUserContext = async (userId: number) => {
    try {
        const userContext = await getUserContext(userId);

        userMutate((draft: UserContext) => {
            draft.user = userContext.user;
        });
        gamblerMutate((draft: GamblerContext) => {
            draft.gambler = userContext.gambler;
        });
        leagueMutate((draft: LeagueContext) => {
            draft.league = userContext.league;
        });
    } catch (error) {
        handleHTTPError(error);
    }
};

export const updateUserProfile = async (userId: number, user: UserProfile) => {
    await updateUser(userId, user);
    userMutate((draft) => {
        draft.user = {...draft.user, ...user};
    });
};

export const updateUserPassword = async (userId: number, password: string) => {
    await updateUserPass(userId, password);
};




