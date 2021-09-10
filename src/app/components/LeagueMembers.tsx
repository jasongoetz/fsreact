import React from 'react';
import {Button, Col, Container, Row, Table} from "reactstrap";
import {firstColumnStyle, leagueTableHeadStyle, leagueTableStyle} from "./LeagueSettings";
import {GamblerInfo} from "../types";
import {loadUserContext} from "../user/user.actions";
import {renewGamblerInLeague} from "../league/league.actions";

interface Props {
    adminId: number;
    gamblers: GamblerInfo[];
}

const LeagueMembers: React.FC<Props> = ({adminId, gamblers}) => {

    const renew = async (gamblerId) => {
        await renewGamblerInLeague(gamblerId);
        await loadUserContext(adminId);
    }

    const newerGamblerExistsForUser = async (gambler) => {
        return gamblers.some(g => g.user.id === gambler.user.id && g.id > gambler.id);
    }

    return (
        <Container>
            <Row>
                <Col lg={6} md={8} sm={10}>
                    <Table id={'leagueMembers'} size={'sm'} style={leagueTableStyle}>
                        <thead style={leagueTableHeadStyle}>
                        <tr>
                            <th style={firstColumnStyle}>League Members</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {gamblers
                            .sort((g1, g2) => g1.user.lastName < g2.user.lastName ? -1 : 1)
                            .map(gambler =>
                                <tr key={`member_${gambler.user.id}`}>
                                    <td>
                                        {gambler.user.firstName} {gambler.user.lastName} {(adminId === gambler.user.id) && "(League Admin)"} {gambler.defunct && "(Defunct)"}
                                    </td>
                                    <td>{gambler.money === 0 && !gambler.defunct && <Button size={"sm"} color="link" style={{padding: '0px'}} onClick={() => renew(gambler.id)}>Renew</Button>}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default LeagueMembers;


