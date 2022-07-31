import React, {useEffect, useState} from "react";
import {Col, FormGroup, Row} from "reactstrap";
import {FakeStacksForm, FSFormFeedback, FSFormSubmitButton, FSInput} from "./FSForm";
import {authenticate} from "../auth/auth.actions";
import {useFormik} from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";
import {useGlobalStores} from "../context/global_context";
import {loadInviteByToken} from "../invite/invite.actions";
import {LoadingContainer} from "./LoadingContainer";
import {joinLeagueWithInvite} from "../user/user.actions";
import {useQueryParam} from "../hooks/useQueryParam";
import {Colors} from "../theme/theme";

const FakeStacksLogin: React.FC = () => {

    const token = useQueryParam('token');

    const {inviteStore, authStore} = useGlobalStores();
    const invite = inviteStore.invite;
    useEffect(() => {
        if (token && !invite) {
            loadInviteByToken(token);
        }
    }, [token, invite]);

    const [attemptedLogin, setAttemptedLogin] = useState(false)

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
            password: '',
            token: invite ? invite.token : '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values, actions) => {
            setAttemptedLogin(true);
            await submitLogin(values.email, values.password);
            actions.setSubmitting(false);
        }
    });

    const submitLogin = async (email: string, password: string) => {
        try {
            await authenticate({email, password});
            if (invite) {
                await joinLeagueWithInvite(authStore.userId!, invite);
            }
        } catch (err) {
            formik.setErrors({password: 'Your email or password is incorrect'});
        }
    };

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
                <FakeStacksForm headline={headline} onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <FSInput
                            autoFocus
                            name="email"
                            type="email"
                            placeholder="Email"
                            autoComplete={"username"}
                            autoCapitalize={"off"}
                            autoCorrect={"off"}
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
                            autoComplete={"current-password"}
                            invalid={!!formik.errors.password}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <FSFormFeedback>{formik.errors.password}</FSFormFeedback>
                    </FormGroup>
                    <FSFormSubmitButton text="Sign In" />
                    <div style={{marginTop: '10px'}}>New to Fake Stacks? <Link style={{color: Colors.brandBlack, textDecoration: 'underline'}} to={"/register" + (!!token ? `?token=${token}` : '')}>Sign up.</Link></div>
                    {attemptedLogin && <div style={{marginTop: '10px'}}>Forgot your password? <Link to={"/forgotpassword"}>Reset it.</Link></div>}
                </FakeStacksForm>
            </Col>
        </Row>
    );
};

export default FakeStacksLogin;














