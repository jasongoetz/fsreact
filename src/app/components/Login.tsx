import {Component} from "react";
import React from "react";
import {FormGroup, Button, Input, Container, Row, Col} from "reactstrap";
import {FSButton, FSForm, FSInput} from "./FSForm";

export interface Props {
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

    submitLogin = () => {
        const { email, password } = this.state;
        alert("HI THERE: " + email);
    };

}

export default Login;














