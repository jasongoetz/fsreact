import React, {useEffect} from "react";
import {Col, Row} from "reactstrap";
import {FakeStacksForm} from "./FSForm";
import {oAuthAuthenticate} from "../auth/auth.actions";
import {AuthButton} from "./FSComponents";
import {Link, useHistory} from "react-router-dom";
import {useGlobalStores} from "../context/global_context";
import {loadInviteByToken} from "../invite/invite.actions";
import {LoadingContainer} from "./LoadingContainer";
import {joinLeagueWithInvite} from "../user/user.actions";
import {useGoogleLogin} from "react-google-login";
import {requireEnv} from "../../util/require-env";
import {GoogleIcon} from "./svg/google_icon";
import {FakeStacksIcon} from "./svg/fs_icon";
import {useQueryParam} from "../hooks/useQueryParam";
import {Colors} from "../theme/theme";

interface Props {
}
const Login: React.FC<Props> = () => {

    const history = useHistory();

    const token = useQueryParam("token");

    const {inviteStore, authStore} = useGlobalStores();

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
    })

    if (token && !inviteStore.invite) {
        return <LoadingContainer/>;
    }

    const headline = invite ? 'Sign in to join this league.' : 'Put your fake money where your mouth is.';

    return (
        <Row>
            <Col
                xs={{offset: 1, size: 10}}
                sm={{offset: 2, size: 8}}
                md={{offset: 3, size: 6}}
                lg={{offset: 4, size: 4}}
            >
                <FakeStacksForm headline={headline}>
                    <AuthButton data-testid="google-login-button" outline onClick={signIn}>
                        <GoogleIcon />
                        Sign in with Google
                    </AuthButton>
                    <AuthButton data-testid="fs-login-button" outline onClick={() => history.push('/fslogin')}>
                        <FakeStacksIcon />
                        Sign in with Fake Stacks
                    </AuthButton>
                    <div style={{marginTop: '10px'}}>New to Fake Stacks? <Link style={{color: Colors.brandBlack, textDecoration: 'underline'}} to={"/register" + (!!token ? `?token=${token}` : '')}>Sign up.</Link></div>
                </FakeStacksForm>
            </Col>
        </Row>
    );
};

export default Login;














