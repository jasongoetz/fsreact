import {action, observable} from "mobx";
import {Invite} from "../types";

class InviteStore {

    @observable invite?: Invite;

    @action
    saveInvite = (invite: Invite) => {
        this.invite = invite;
    }

}

export const inviteStore = new InviteStore();
