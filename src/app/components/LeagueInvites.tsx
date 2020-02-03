import React, {useState} from 'react';
import {Button, Col, Container, FormFeedback, FormGroup, Row, Table} from "reactstrap";
import {firstColumnStyle, leagueTableHeadStyle, leagueTableStyle} from "./LeagueSettings";
import {FSButton} from "./FSComponents";
import {inviteUser, uninviteUser} from "../league/leagueActions";
import {isEmailValid} from "../../util/EmailUtil";
import {FSInput} from "./FSForm";
import {LeagueInfo} from "../league/leagueContext";

interface Props {
    league: LeagueInfo
}

const gamblerHasEmail = (email: string, league: LeagueInfo) => league.gamblers.some(gambler => gambler.user.email === email);

const existingInviteHasEmail = (email: string, league: LeagueInfo) => league.invites.some(invite => invite.email === email);

const LeagueInvites: React.FC<Props> = ({league}) => {

    const [inviteError, setInviteError] = useState<string | undefined>(undefined);
    const [inviteEmail, setInviteEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    return (
        <Container>
            <Row>
                <Col lg={6} md={8} sm={10}>
                <Table size={'sm'} style={leagueTableStyle}>
                    <thead style={leagueTableHeadStyle}>
                    <tr>
                        <th style={firstColumnStyle}>League Invites</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {league.invites.map(invite =>
                        <tr key={`invite_${invite.id}`}>
                            <td>
                                {invite.email}
                            </td>
                            <td>
                                <Button size={"sm"} color="link" style={{padding: '0px'}} onClick={() => uninviteUser(league.id, invite.id)}>
                                    Revoke Invite
                                </Button>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td>
                            <FormGroup>
                                <FSInput
                                    bsSize={'sm'}
                                    invalid={(!emailValid && inviteEmail.length > 0)}
                                    valid={(emailValid && inviteEmail.length > 0)}
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setInviteEmail(e.target.value);
                                        setEmailValid(isEmailValid(e.target.value));
                                    }}
                                    value={inviteEmail}
                                />
                                <FormFeedback>{inviteError}</FormFeedback>
                            </FormGroup>
                        </td>
                        <td>
                            <FSButton
                                disabled={!emailValid}
                                color="primary"
                                size={"sm"}
                                type="submit"
                                style={{padding: '3px 15px'}}
                                onClick={() => {
                                    if (gamblerHasEmail(inviteEmail, league)) {
                                        setInviteError('Existing league member has this email');
                                        setEmailValid(false);
                                        return;
                                    }
                                    else if (existingInviteHasEmail(inviteEmail, league)) {
                                        setInviteError('Existing invite has this email');
                                        setEmailValid(false);
                                        return;
                                    }
                                    inviteUser(inviteEmail, league);
                                    setInviteEmail('');
                                }}
                            >
                                Invite
                            </FSButton>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default LeagueInvites;


