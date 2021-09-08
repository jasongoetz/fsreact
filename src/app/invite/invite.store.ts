import {action, observable} from "mobx";
import {Invite} from "../types";

class InviteStore {

    @observable invite?: Invite;

    @action
    saveInvite = (invite: Invite) => {
        this.invite = invite;
    }

    @action
    inviteAccepted = () => {
        if (this.invite) {
            this.invite.accepted = true;
        }
    }

}

export const inviteStore = new InviteStore();
