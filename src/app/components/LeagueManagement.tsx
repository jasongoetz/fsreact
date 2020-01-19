import React, {useEffect} from 'react';
import {Container} from "reactstrap";
import {useHistory} from 'react-router-dom';
import {getLeague} from "../league/leagueSelector";
import {loadUserContext} from "../user/userActions";
import {useDispatch, useSelector} from "react-redux";
import {LeagueSettings} from "./LeagueSettings";
import {LeagueContext} from "../league/leagueReducer";
import LeagueMembers from "./LeagueMembers";
import LeagueInvites from "./LeagueInvites";

const LeagueManagement: React.FC = () => {

    const league: LeagueContext = useSelector(state => getLeague(state));
    const dispatch = useDispatch();

    useEffect(() => {
        const loadContext = async () => {
            if (!league.id) {
                await dispatch(loadUserContext());
            }
        };
        loadContext();
    }, []);

    return (
        <Container>
            <Container>
                <h4>League Management</h4>
            </Container>
            <LeagueSettings league={league}/>
            <LeagueMembers league={league}/>
            <LeagueInvites league={league}/>
        </Container>
    );

};

export default LeagueManagement;