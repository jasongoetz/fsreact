import React from 'react';
import {Container} from "reactstrap";
import {LeagueSettings} from "./LeagueSettings";
import LeagueMembers from "./LeagueMembers";
import LeagueInvites from "./LeagueInvites";
import {getLeague} from "../league/leagueSelector";
import {LeagueConsumer} from "../league/leagueContext";

const LeagueManagement: React.FC = () => {
    return (
        <LeagueConsumer select={[getLeague]}>
            {league =>
                <Container>
                    <Container>
                        <h4>League Management</h4>
                    </Container>
                    <LeagueSettings league={league}/>
                    <LeagueMembers league={league}/>
                    <LeagueInvites league={league}/>
                </Container>
            }
        </LeagueConsumer>
    );
};

export default LeagueManagement;
