import React, {FC} from 'react';
import {Col, Row} from "reactstrap";
import {Link} from "react-router-dom";

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
    color: '#001c20',
};

const explanationStyle = {
    marginTop: '20px',
    border: '2px solid #ececec',
    paddingBottom: '15px',
    paddingLeft: '20px',
    paddingRight: '20px',
};

const UnknownError = ({errorMessage}) => <>
    <h1 style={h1Style}>Something is wrong with fake stacks!</h1>
    <p style={pStyle}>Something is going wrong here.</p>
    <p style={pStyle}>Let your admin know there's something up with your Fake Stacks and your faithful admin will jump into action immediately.</p>
    {!!errorMessage && <p style={pStyle}>{errorMessage}</p>}
</>;

const Error404 = () => <>
    <h1 style={h1Style}>Oh No! We lost your stacks!</h1>
    <p style={pStyle}>We didn't really lose your stacks. All your fake money is still there. Count it.</p>
    <p style={pStyle}>Anyway, the page you were trying to reach doesn't exist.</p>
</>;

const ErrorPanel: FC<{statusCode: number, errorMessage?: string}> = ({statusCode, errorMessage}) => {
    return (
        <Row>
            <Col style={explanationStyle} xs={{offset: 1, size: 10}} md={{offset: 2, size: 8}} lg={{offset: 3, size: 6}}>
                {statusCode === 404 && <Error404/>}
                {statusCode !== 404 && <UnknownError errorMessage={errorMessage}/>}
                <p style={pStyle}>
                    <a href="/">Return to Fake Stacks</a>
                </p>
                <div style={logoSmallStyle}>
                    <Link to="/">
                        <img src="/images/bets-menu.svg"/>
                    </Link>
                </div>
            </Col>
        </Row>
    );
};

export default ErrorPanel;