import React, {FC, useState} from 'react';
import {Col, Row} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import {Colors} from "../../theme/theme";
import {useGoogleLogin, useGoogleLogout} from "react-google-login";
import {logout} from "../../auth/auth.actions";
import {requireEnv} from "../../../util/require-env";
import {useTimeout} from "../../hooks/useTimeout";
import {useGlobalStores} from "../../context/global_context";

const logoSmallStyle = {
    width: '100px',
    marginTop: '1em',
    marginLeft: 'auto',
    marginRight: 'auto',
};

const h1Style = {
    marginTop: '30px',
    fontWeight: 'bold' as 'bold',
    fontSize: '1.7em',
    marginBottom: '20px',
    textTransform: 'uppercase' as 'uppercase',
};

const pStyle = {
    fontFamily: '"Open Sans", "Myriad Pro", Arial, sans-serif',
    fontSize: '1.25em',
    color: Colors.offBlack,
};

const boldPStyle = {
    ...pStyle,
    fontWeight: 'bold' as 'bold',
}

const explanationStyle = {
    marginTop: '20px',
    border: `2px solid ${Colors.lightGray}`,
    paddingBottom: '15px',
    paddingLeft: '20px',
    paddingRight: '20px',
};

const UnknownError = ({errorMessage}) => <>
    <h1 style={h1Style}>Something is wrong with fake stacks!</h1>
    <p style={pStyle}>Something is going wrong here.</p>
    <p style={pStyle}>Let your admin know there's something wrong with your stacks and your faithful admin will jump into action immediately.</p>
    {!!errorMessage && <p style={boldPStyle}>{errorMessage}</p>}
</>;

const Error404 = () => <>
    <h1 style={h1Style}>Oh No! We lost your stacks!</h1>
    <p style={pStyle}>We didn't really lose your stacks. All your fake money is still there. Count it.</p>
    <p style={pStyle}>Anyway, the page you were trying to reach doesn't exist.</p>
</>;

const LoggedOutPanel: FC = () => {
    const history = useHistory();
    const [googleLoggedIn, setGoogleLoggedIn] = useState(false);

    const { errorStore, authStore } = useGlobalStores();

    useGoogleLogin({
        onSuccess: () => {
            setGoogleLoggedIn(true);
        },
        onFailure: () => {
            setGoogleLoggedIn(false);
        },
        clientId: requireEnv('REACT_APP_GOOGLE_CLIENT_ID'),
        isSignedIn: authStore.authenticated,
        autoLoad: true,
    })

    const { signOut } = useGoogleLogout({
        onLogoutSuccess: async () => await clearSessionAndRedirect(),
        clientId: requireEnv('REACT_APP_GOOGLE_CLIENT_ID'),
    });

    const clearSessionAndRedirect = async () => {
        await logout();
        errorStore.clearError();
        history.push('/login');
    };

    const handleLogout = async () => {
        if (googleLoggedIn) {
            await signOut();
        } else {
            await clearSessionAndRedirect();
        }
    }

    useTimeout(handleLogout, 2000);

    return (
        <>
            <h1 style={h1Style}>Authentication Expired</h1>
            <p style={pStyle}>You have been logged out of Fake Stacks.</p>
            <p style={pStyle}>You will be redirected to the login page momentarily.</p>
        </>
    );
};

const ErrorPanel: FC<{statusCode?: number, errorMessage?: string}> = ({statusCode, errorMessage}) => {
    return (
        <Row>
            <Col style={explanationStyle} xs={{offset: 1, size: 10}} md={{offset: 2, size: 8}} lg={{offset: 3, size: 6}}>
                {statusCode === 404 && <Error404/>}
                {statusCode === 401 && <LoggedOutPanel/>}
                {statusCode !== 404 && <UnknownError errorMessage={errorMessage}/>}
                {statusCode !== 401 && <p style={pStyle}>
                    <a href="/">Return to Fake Stacks</a>
                </p>}
                <div style={logoSmallStyle}>
                    <Link to="/">
                        <img src="/images/bets-menu.svg" alt={"Bets Menu"} />
                    </Link>
                </div>
            </Col>
        </Row>
    );
};

export default ErrorPanel;
