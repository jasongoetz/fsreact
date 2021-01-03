import {action, observable} from "mobx";

class ErrorStore {
    @observable isError: boolean = false;
    @observable statusCode?: number;
    @observable errorMessage?: string;

    @action
    saveError = (statusCode: number, message?: string) => {
       this.isError = true;
       this.statusCode = statusCode;
       this.errorMessage = message;
    }

    @action
    clearError = () => {
        this.isError = false;
        this.statusCode = undefined;
        this.errorMessage = undefined;
    }
}

export const errorStore = new ErrorStore();
