import React from 'react';
import {Container} from "reactstrap";
import {LeagueSettings} from "./LeagueSettings";
import LeagueMembers from "./LeagueMembers";
import LeagueInvites from "./LeagueInvites";
import {useGlobalStores} from "../context/global_context";

const LeagueManagement: React.FC = () => {
    const { leagueStore } = useGlobalStores();
    const league = leagueStore.league!;

    return (
        <Container>
            <Container>
                <h4>League Management</h4>
            </Container>
            <LeagueSettings league={league}/>
            <LeagueMembers adminId={league.admin} gamblers={leagueStore.gamblers}/>
            <LeagueInvites leagueId={league.id} gamblers={leagueStore.gamblers} invites={leagueStore.invites}/>
        </Container>
    );
};

export default LeagueManagement;
