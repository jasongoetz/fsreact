import React, {useEffect} from "react";
import {Col, FormGroup, Row} from "reactstrap";
import {FSForm} from "./FSForm";
import {oAuthAuthenticate} from "../auth/auth.actions";
import {GoogleButton} from "./FSComponents";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useGlobalStores} from "../context/global_context";
import {loadInviteByToken} from "../invite/invite.actions";
import {LoadingContainer} from "./LoadingContainer";
import {joinLeagueWithInvite} from "../user/user.actions";
import {useGoogleLogin} from "react-google-login";
import {requireEnv} from "../../util/require-env";
import {GoogleIcon} from "./svg/google_icon";

const formSigninStyle = {
    paddingBottom: "15px"
};

const formSigninHeading = {
    fontSize: '16px',
    marginBottom: '10px',
    marginTop: '0px',
};

interface Props {
}

interface LoginValues {
    token?: string;
    email: string;
    password: string;
}

const Login: React.FC<Props> = () => {

    const location = useLocation();
    const history = useHistory();
    const useQuery = () => {
        return new URLSearchParams(location.search);
    }

    const {inviteStore, authStore} = useGlobalStores();
    const query = useQuery();
    const token = query.get("token");
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
        isSignedIn: true,
    })

    if (token && !inviteStore.invite) {
        return <LoadingContainer/>;
    }

    return (
        <Row>
            <Col
                xs={{offset: 1, size: 10}}
                sm={{offset: 2, size: 8}}
                md={{offset: 3, size: 6}}
                lg={{offset: 4, size: 4}}
            >
                <FSForm style={formSigninStyle}>
                    {invite && <FormGroup><h3 style={formSigninHeading}>Sign in to join this league.</h3></FormGroup>}
                    <GoogleButton data-testid="google-login-button" outline onClick={signIn}>
                        <GoogleIcon />
                        Sign in with Google
                    </GoogleButton>
                    <hr/>
                    <GoogleButton data-testid="fs-login-button" outline onClick={() => history.push('/fslogin')}>
                        Sign in with Fake Stacks
                    </GoogleButton>
                    <div style={{marginTop: '10px'}}>New to Fake Stacks? <Link to={"/register" + (!!token ? `?token=${token}` : '')}>Sign up.</Link></div>
                </FSForm>
            </Col>
        </Row>
    );
};

export default Login;














