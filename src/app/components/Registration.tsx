import React, {useEffect} from "react";
import {Col, FormGroup, Row} from "reactstrap";
import {Link, RouteComponentProps, useHistory, useLocation, withRouter} from 'react-router-dom';
import {FSForm} from "./FSForm";
import {GoogleButton} from "./FSComponents";
import {oAuthAuthenticate} from "../auth/auth.actions";
import {useGlobalStores} from "../context/global_context";
import {loadInviteByToken} from "../invite/invite.actions";
import {LoadingContainer} from "./LoadingContainer";
import {joinLeagueWithInvite} from "../user/user.actions";
import {GoogleIcon} from "./svg/google_icon";
import {useGoogleLogin} from "react-google-login";
import {requireEnv} from "../../util/require-env";

interface Props extends RouteComponentProps {
    token?: string;
}

const formSigninHeading = {
    fontSize: '16px',
    marginBottom: '10px',
    marginTop: '0px',
};

const Registration: React.FC<Props> = () => {

    const history = useHistory();

    const location = useLocation();
    const useQuery = () => {
        return new URLSearchParams(location.search);
    }

    const {authStore, inviteStore} = useGlobalStores();
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
        isSignedIn: true,
    });

    if (token && !inviteStore.invite) {
        return <LoadingContainer/>;
    }

    return (
        <Row>
            <Col xs={{size: 10, offset: 1}} sm={{size: 8, offset: 2}} md={{size: 6, offset: 3}}>
                <FSForm id="registration">
                    {invite && <FormGroup><h3 style={formSigninHeading}>Finish registering an account to join.</h3></FormGroup>}
                    <GoogleButton data-testid="google-registration-button" outline onClick={signIn}>
                        <GoogleIcon />
                        Sign up with Google
                    </GoogleButton>
                    <hr/>
                    <GoogleButton data-testid="fs-registration-button" outline onClick={() => history.push('/fsregister')}>
                        Sign up with email
                    </GoogleButton>
                    <div style={{marginTop: '10px'}}>
                        Already have an account? <Link to={"/login" + (!!token && !!invite ? `?token=${invite.token}` : '')}>Log in.</Link>
                    </div>
                </FSForm>
            </Col>
        </Row>
    );


};

export default withRouter(Registration);
