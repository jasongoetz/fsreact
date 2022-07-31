import React, {useEffect} from "react";
import {Col, Row} from "reactstrap";
import {Link, RouteComponentProps, useHistory, withRouter} from 'react-router-dom';
import {FakeStacksForm} from "./FSForm";
import {AuthButton} from "./FSComponents";
import {oAuthAuthenticate} from "../auth/auth.actions";
import {useGlobalStores} from "../context/global_context";
import {loadInviteByToken} from "../invite/invite.actions";
import {LoadingContainer} from "./LoadingContainer";
import {joinLeagueWithInvite} from "../user/user.actions";
import {GoogleIcon} from "./svg/google_icon";
import {useGoogleLogin} from "react-google-login";
import {requireEnv} from "../../util/require-env";
import {useQueryParam} from "../hooks/useQueryParam";
import {FakeStacksIcon} from "./svg/fs_icon";
import {Colors} from "../theme/theme";

interface Props extends RouteComponentProps {
    token?: string;
}

const Registration: React.FC<Props> = () => {
    const token = useQueryParam("token");

    const history = useHistory();

    const {authStore, inviteStore} = useGlobalStores();
    const invite = inviteStore.invite;

    useEffect(() => {
        if (token && !invite) {
            loadInviteByToken(token);
        }
    }, [token, invite]);

    const onSignIn = async (response: any) => {
        const profile = response.getBasicProfile();
        await oAuthAuthenticate(profile.getEmail(), response.tokenId);
        if (invite) {
            await joinLeagueWithInvite(authStore.userId!, invite);
            history.push('/');
        }
    }

    const onSignInFail = async (response) => {
        console.log("SIGN IN FAILED!!!" + JSON.stringify(response));
    }

    const { signIn } = useGoogleLogin({
        onSuccess: onSignIn,
        onFailure: onSignInFail,
        clientId: requireEnv('REACT_APP_GOOGLE_CLIENT_ID'),
        isSignedIn: authStore.authenticated,
    });

    if (token && !inviteStore.invite) {
        return <LoadingContainer/>;
    }

    const headline = invite ? 'Finish registering an account to join.' : 'Register a new Fake Stacks account.';

    return (
        <Row>
            <Col xs={{size: 10, offset: 1}} sm={{size: 8, offset: 2}} md={{size: 6, offset: 3}}>
                <FakeStacksForm id="registration" headline={headline}>
                    <AuthButton data-testid="google-registration-button" outline onClick={signIn}>
                        <GoogleIcon />
                        Sign up with Google
                    </AuthButton>
                    <AuthButton data-testid="fs-registration-button" outline onClick={() => history.push('/fsregister')}>
                        <FakeStacksIcon />
                        Sign up with email
                    </AuthButton>
                    <div style={{marginTop: '10px'}}>
                        Already have an account? <Link style={{color: Colors.brandBlack, textDecoration: 'underline'}} to={"/login" + (!!token && !!invite ? `?token=${invite.token}` : '')}>Log in.</Link>
                    </div>
                </FakeStacksForm>
            </Col>
        </Row>
    );


};

export default withRouter(Registration);
