import {useCallback, useEffect, useState} from "react";
import {loadUserContext} from "../user/user.actions";

export const useLoadContext = (userId: number) => {
    const [loading, setLoading] = useState(false);

    const loadContext = useCallback(
        async (userId: number) => {
            setLoading(true);
            await loadUserContext(userId);
            setLoading(false);
        },
        [setLoading],
    );

    useEffect(() => {
        loadContext(userId);
    }, [userId, loadContext]);

    return { loading, loadContext };
};
