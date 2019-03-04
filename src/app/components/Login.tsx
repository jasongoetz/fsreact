import {Component} from "react";
import React from "react";
import {FormGroup, Button, Input, Container, Row, Col} from "reactstrap";
import {FSButton, FSForm, FSInput} from "./FSForm";
import {authenticate, Credentials} from "../auth/authActions";
import { connect } from 'react-redux';

export interface Props {
    authenticate: (user: Credentials) => void;
}

export interface State {
    email: string
    password: string
}

class Login extends Component<Props, State> {

    state = {
        email: "",
        password: "",
    };

    render() {
        return (
            <Row>
                <Col
                    xs={{offset: 1, size: 10}}
                    sm={{offset: 2, size: 8}}
                    md={{offset: 3, size: 6}}
                    lg={{offset: 4, size: 4}}
                >
                    <FSForm onSubmit={this.submitLogin} className="form-signin">
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
                        <FSButton color="primary" size="lg" className="btn-block btn">SIGN IN</FSButton>
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

            console.log("I think I successfully logged in");
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














