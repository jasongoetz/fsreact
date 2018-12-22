import {Component} from "react";
import React from "react";
import {FormGroup, Button, Input, Form, Container, Row, Col} from "reactstrap";
import styled from "styled-components";

export interface Props {
}

export interface State {
    email: string
    password: string
}

const FSButton = styled(Button)`
    && {
        border-radius: 0;
    }
`;

class Login extends Component<Props, State> {

    state = {
        email: "",
        password: "",
    };

    render() {
        return (
            <Container>
                <Row className="signin-headline">
                    <Col
                        xs={{offset: 1, size: 10}}
                        sm={{offset: 2, size: 8}}
                        md={{offset: 3, size: 6}}
                    >
                        <h1>PUT YOUR FAKE MONEY WHERE YOUR MOUTH IS.</h1>
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={{offset: 1, size: 10}}
                        sm={{offset: 2, size: 8}}
                        md={{offset: 3, size: 6}}
                        lg={{offset: 4, size: 4}}
                    >
                        <Form onSubmit={this.submitLogin} className="fs-form form-signin">
                            <FormGroup>
                                <Input
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={(event: any) => this.setState({email: event.target.value})}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    value={this.state.password}
                                    onChange={(event: any) => this.setState({password: event.target.value})}
                                />
                            </FormGroup>
                            <FSButton color="primary" size="lg" className="btn-block btn">SIGN IN</FSButton>
                            <div className="register-invite">New to Fake Stacks? <a href="/register">Sign up.</a></div>
                        </Form>
                    </Col>
                </Row>
                <div className="signin-page">
                </div>
                <div className="signin-page-overlay">

                </div>
            </Container>
        );
    }

    submitLogin = () => {
        const { email, password } = this.state;
        alert("HI THERE: " + email);
    };

}

export default Login;














