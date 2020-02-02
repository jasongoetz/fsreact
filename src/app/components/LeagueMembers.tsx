import React from 'react';
import {Col, Container, Row, Table} from "reactstrap";
import {firstColumnStyle, leagueTableHeadStyle, leagueTableStyle} from "./LeagueSettings";
import {LeagueInfo} from "../league/leagueContext";

interface Props {
    league: LeagueInfo;
}

const LeagueMembers: React.FC<Props> = ({league}) => {

    return (
        <Container>
            <Row>
                <Col lg={6} md={8} sm={10}>
                    <Table size={'sm'} style={leagueTableStyle}>
                        <thead style={leagueTableHeadStyle}>
                        <tr>
                            <th style={firstColumnStyle}>League Members</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {league.gamblers.map(gambler => gambler.user)
                            .sort((u1, u2) => u1.lastName < u2.lastName ? -1 : 1)
                            .map(user =>
                                <tr key={`member_${user.id}`}>
                                    <td>
                                        {user.firstName} {user.lastName} {(league.admin === user.id) && "(League Admin)"}
                                    </td>
                                    <td></td>
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


