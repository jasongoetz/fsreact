import React from 'react';
import {LeagueSettings} from "./LeagueSettings";
import LeagueMembers from "./LeagueMembers";
import LeagueInvites from "./LeagueInvites";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";
import {FSPageContainer} from "./FSComponents";
import {PageHeader} from "./PageHeader";

const LeagueManagement: React.FC = observer(() => {
    const { leagueStore } = useGlobalStores();
    const league = leagueStore.league;

    return (
        !league ? <></> :
            <FSPageContainer>
                <PageHeader>
                    League Management
                </PageHeader>
                <LeagueSettings league={league}/>
                <LeagueMembers adminId={league.admin} gamblers={leagueStore.gamblers}/>
                <LeagueInvites leagueId={league.id} gamblers={leagueStore.gamblers} invites={leagueStore.invites}/>
            </FSPageContainer>
    );
});

export default LeagueManagement;
