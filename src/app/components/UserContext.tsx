import React from "react";
import UserContextContainer from "./UserContextContainer";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";
import {LeagueNavbar} from "./LeagueNavbar";

interface Props {
    adminRequired?: boolean;
    leagueAdminRequired?: boolean;
    showLeagueNav?: boolean;
}

const UserContext: React.FC<Props> = observer(({adminRequired, leagueAdminRequired, showLeagueNav = true, children}) => {
    const { authStore, userStore, leagueStore } = useGlobalStores();

    return !!authStore.authenticated && authStore.userId ?
        <UserContextContainer userId={authStore.userId} adminRequired={adminRequired} leagueAdminRequired={leagueAdminRequired}>
            {showLeagueNav && leagueStore.league && userStore.user &&
                <LeagueNavbar currentLeague={leagueStore.league} user={userStore.user} userLeagues={userStore.leagues} />
            }
            {children}
        </UserContextContainer>
    : <>{children}</>
});

export default UserContext;
