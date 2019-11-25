import {Component} from "react";
import React from "react";
import {FormGroup, Button, Input, Container, Row, Col} from "reactstrap";
import {FSForm, FSInput} from "./FSForm";
import {authenticate} from "../auth/authActions";
import { connect } from 'react-redux';
import {Redirect, RouteComponentProps} from "react-router";
import {Credentials} from "../auth/authModels";
import {FSButton, FSWideButton} from "./FSComponents";

const formSigninStyle = {
    paddingBottom: "15px"
};

export interface Props extends RouteComponentProps {
    authenticate: (user: Credentials) => void;
}

export interface State {
    email: string
    password: string
    redirectToReferrer: boolean
}

class Login extends Component<Props, State> {

    state = {
        email: "",
        password: "",
        redirectToReferrer: false,
    };

    private _isMounted: boolean = false;

    componentDidMount(): void {
        this._isMounted = true;
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    //Override
    setState(state: any) {
        if (this._isMounted) {
            super.setState(state);
        }
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <Row>
                <Col
                    xs={{offset: 1, size: 10}}
                    sm={{offset: 2, size: 8}}
                    md={{offset: 3, size: 6}}
                    lg={{offset: 4, size: 4}}
                >
                    <FSForm onSubmit={this.submitLogin} style={formSigninStyle}>
                        <FormGroup>
                            <FSInput
                                autoFocus
                                type="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={(event: any) => this.setState({email: event.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FSInput
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(event: any) => this.setState({password: event.target.value})}
                            />
                        </FormGroup>
                        <FSWideButton color="primary" size="lg">SIGN IN</FSWideButton>
                        {/*<div className="register-invite">New to Fake Stacks? <a href="/register">Sign up.</a></div>*/}
                    </FSForm>
                </Col>
            </Row>
        );
    }

    submitLogin = async (e: any) => {
        e.preventDefault();
        try {
            const {email, password} = this.state;
            await this.props.authenticate({email, password});

            this.setState({ redirectToReferrer: true });
        } catch (err) {
            alert("Nope. You'll get an error message here normally" + err.message);
        }
    };
}

const mapDispatchToProps = {
    authenticate,
};

export default connect(
    undefined,
    mapDispatchToProps,
)(Login);














