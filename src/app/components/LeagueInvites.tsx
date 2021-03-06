import React, {useState} from 'react';
import {Button, Col, Container, FormFeedback, FormGroup, Row, Table} from "reactstrap";
import {firstColumnStyle, leagueTableHeadStyle, leagueTableStyle} from "./LeagueSettings";
import {FSButton} from "./FSComponents";
import {isEmailValid} from "../../util/EmailUtil";
import {FSInput} from "./FSForm";
import {GamblerInfo, LeagueInvite} from "../types";
import {inviteUser, uninviteUser} from "../league/league.actions";
import {observer} from "mobx-react";

interface Props {
    leagueId: number;
    gamblers: GamblerInfo[];
    invites: LeagueInvite[];
}

const gamblerHasEmail = (email: string, gamblers: GamblerInfo[]) => gamblers.some(gambler => gambler.user.email === email);

const existingInviteHasEmail = (email: string, invites: LeagueInvite[]) => invites.some(invite => invite.email === email);

const LeagueInvites: React.FC<Props> = observer(({gamblers, invites}) => {

    const [inviteError, setInviteError] = useState<string | undefined>(undefined);
    const [inviteEmail, setInviteEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    return (
        <Container>
            <Row>
                <Col lg={6} md={8} sm={10}>
                <Table id={'leagueInvites'} size={'sm'} style={leagueTableStyle}>
                    <thead style={leagueTableHeadStyle}>
                    <tr>
                        <th style={firstColumnStyle}>League Invites</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {invites.map(invite =>
                        <tr key={`invite_${invite.id}`}>
                            <td>
                                {invite.email}
                            </td>
                            <td>
                                <Button size={"sm"} color="link" style={{padding: '0px'}} onClick={() => uninviteUser(invite.id)}>
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
                                    if (gamblerHasEmail(inviteEmail, gamblers)) {
                                        setInviteError('Existing league member has this email');
                                        setEmailValid(false);
                                        return;
                                    }
                                    else if (existingInviteHasEmail(inviteEmail, invites)) {
                                        setInviteError('Existing invite has this email');
                                        setEmailValid(false);
                                        return;
                                    }
                                    inviteUser(inviteEmail);
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
});

export default LeagueInvites;


