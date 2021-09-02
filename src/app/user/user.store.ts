import {action, observable} from "mobx";
import {League, User, UserProfile} from "../types";

class UserStore {
    @observable user?: User;
    @observable leagues: League[] = [];
    @observable error: boolean = false;
    @observable hasLeague: boolean = false;
    @observable loaded: boolean = false;

    @action
    saveUser = (user: User, hasLeague: boolean) => {
        this.loaded = true;
        this.user = user;
        this.hasLeague = hasLeague;
    }

    @action
    saveLeagues = (leagues: League[]) => {
        this.leagues = leagues;
    }

    @action
    saveHasLeague = (hasLeague: boolean) => {
        this.hasLeague = hasLeague;
    }

    @action
    saveUserProfile = (userProfile: UserProfile) => {
        if (this.user) {
            this.user = {...this.user, ...userProfile};
        }
    }

    @action
    clear = () => {
        this.loaded = false;
        this.user = undefined;
        this.hasLeague = false;
        this.leagues = [];
    }
}

export const userStore = new UserStore();
