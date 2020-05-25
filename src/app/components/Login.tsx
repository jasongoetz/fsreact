import React from "react";
import {Col, FormGroup, Row} from "reactstrap";
import {FSForm, FSFormFeedback, FSInput} from "./FSForm";
import {authenticate} from "../auth/auth.actions";
import {RouteComponentProps} from "react-router";
import {FSWideButton} from "./FSComponents";
import {useFormik} from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";
import {Credentials} from "../types";

const formSigninStyle = {
    paddingBottom: "15px"
};

interface Props extends RouteComponentProps {
    authenticate: (user: Credentials) => void;
}

interface LoginValues {
    email: string;
    password: string;
}

const Login: React.FC<Props> = () => {

    const loginSchema = yup.object().shape({
        email: yup.string()
            .email('Your account username is a valid email')
            .required('Your email username is required'),
        password: yup.string()
            .required('Please enter your password'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async (values, actions) => {
            submitLogin(values.email, values.password);
            actions.setSubmitting(false);
        }
    });

    const submitLogin = async (email: string, password: string) => {
        try {
            await authenticate({email, password});
        } catch (err) {
            formik.setErrors({password: 'Your email or password is incorrect'});
        }
    };

    return (
        <Row>
            <Col
                xs={{offset: 1, size: 10}}
                sm={{offset: 2, size: 8}}
                md={{offset: 3, size: 6}}
                lg={{offset: 4, size: 4}}
            >
                <FSForm style={formSigninStyle} onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <FSInput
                            autoFocus
                            name="email"
                            type="email"
                            placeholder="Email"
                            invalid={!!formik.errors.email}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <FSFormFeedback>{formik.errors.email}</FSFormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <FSInput
                            name="password"
                            type="password"
                            placeholder="Password"
                            invalid={!!formik.errors.password}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <FSFormFeedback>{formik.errors.password}</FSFormFeedback>
                    </FormGroup>
                    <FSWideButton color="primary" size="lg">SIGN IN</FSWideButton>
                    <div style={{marginTop: '10px'}}>New to Fake Stacks? <Link to="/register">Sign up.</Link></div>
                </FSForm>
            </Col>
        </Row>
    );
};

export default Login;














