import {action, observable} from "mobx";
import {User, UserProfile} from "../types";

class UserStore {
    @observable user?: User;
    @observable loading: boolean = false;
    @observable error: boolean = false;
    @observable hasLeague: boolean = false;

    @action
    saveUser = (user: User, hasLeague: boolean) => {
        this.user = user;
        this.hasLeague = hasLeague;
    }

    @action
    saveUserProfile = (userProfile: UserProfile) => {
        if (this.user) {
            this.user = {...this.user, ...userProfile};
        }
    }
}

export const userStore = new UserStore();
