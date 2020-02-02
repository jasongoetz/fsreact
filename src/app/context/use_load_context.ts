import {useCallback, useEffect, useState} from "react";
import {loadUserContext} from "../user/userActions";

export const useLoadContext = (userId: number) => {
    const [loading, setLoading] = useState(false);

    const loadContext = useCallback(
        async (userId: number) => {
            setLoading(true);
            await loadUserContext(userId);
            setLoading(false);
        },
        [loadUserContext, setLoading],
    );

    useEffect(() => {
        loadContext(userId);
    }, []);

    return { loading, loadContext };
};
