import React from "react";
import {League} from "../types";
import {Col, Container, Row, Table} from "reactstrap";

export const leagueTableStyle = {
    marginTop: '20px',
};

export const leagueTableHeadStyle = {
    backgroundColor: '#ececec', //TODO
};

export const firstColumnStyle = {
    width: '200px',
};

export const settingValueStyle = {
    fontWeight: 'bold' as 'bold',
};

interface Props {
    league: League;
}

export const LeagueSettings: React.FC<Props> = ({league}) => <Container>
    <Row>
        <Col lg={6} md={8} sm={10}>
            <Table size={"sm"} style={leagueTableStyle}>
                <thead style={leagueTableHeadStyle}>
                <tr>
                    <th style={firstColumnStyle}>
                        League Settings
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>League Name:</td>
                    <td style={settingValueStyle}>{league.name}</td>
                </tr>
                <tr>
                    <td>Sport:</td>
                    <td style={settingValueStyle}>{league.sport}</td>
                </tr>
                <tr>
                    <td>Starting Account Balance:</td>
                    <td style={settingValueStyle}>${league.startingAccount}</td>
                </tr>
                <tr>
                    <td>Weekly Bet Balance Ratio:</td>
                    <td style={settingValueStyle}>{(league.weeklyBetAccountRatio * 100)}%</td>
                </tr>
                <tr>
                    <td>Weekly Bet Count Max:</td>
                    <td style={settingValueStyle}>{league.weeklyBetCountMax}</td>
                </tr>
                </tbody>
            </Table>
        </Col>
    </Row>
</Container>;