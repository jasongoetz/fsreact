import {useCallback, useEffect} from "react";
import {loadUserContext} from "../user/user.actions";

export const useLoadContext = (userId: number, loaded: boolean) => {

    const loadContext = useCallback(
        async (userId: number) => {
            await loadUserContext(userId);
        }, []
    );

    useEffect(() => {
        if (!loaded) {
            loadContext(userId);
        }
    }, [userId, loaded, loadContext]);
};
