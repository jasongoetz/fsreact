import React, {useEffect} from "react";
import {Col, FormGroup, Row} from "reactstrap";
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom';
import {FakeStacksForm, FSFormFeedback, FSFormSubmitButton, FSInput} from "./FSForm";
import {useFormik} from "formik";
import * as yup from "yup";
import {register} from "../auth/auth.actions";
import {useGlobalStores} from "../context/global_context";
import {loadInviteByToken} from "../invite/invite.actions";
import {LoadingContainer} from "./LoadingContainer";
import {joinLeagueWithInvite} from "../user/user.actions";
import ApiError from "../api/apiError";
import {useQueryParam} from "../hooks/useQueryParam";
import {FSLink} from "./FSComponents";

interface Props extends RouteComponentProps {
    token?: string;
}

const FakeStacksRegistration: React.FC<Props> = () => {

    const history = useHistory();
    const token = useQueryParam('token');

    const {authStore, inviteStore} = useGlobalStores();
    const invite = inviteStore.invite;

    useEffect(() => {
        if (token && !invite) {
            loadInviteByToken(token);
        }
    }, [token, invite]);

    const registrationSchema = yup.object().shape({
        firstName: yup.string()
            .required('Please enter your first name'),
        lastName: yup.string()
            .required('Please enter your last name'),
        email: yup.string()
            .email('Please enter a valid email')
            .required('Please enter a valid email'),
        password: yup.string()
            .required('Please enter a new password'),
        confirmation: yup.string()
            .required('Please enter your password again')
            .oneOf([yup.ref("password"), null], "Your passwords must match"),
    });

    const registerUser = async (values) => {
        try {
            await register(values);
            if (invite) {
                await joinLeagueWithInvite(authStore.userId!, invite);
                history.push('/');
            }
            else {
                history.push('/league/join');
            }
        } catch (err) {
            let errMessage = 'Your user profile could not be created'
            if (ApiError.is(err)) {
                let resp = await err.payload.json();
                if (err.payload.status === 400) {
                    errMessage = resp.message;
                }
            }
            formik.setErrors({confirmation: errMessage});
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: '',
            lastName: '',
            email: invite?.email || '',
            password: '',
            confirmation: '',
        },
        validationSchema: registrationSchema,
        onSubmit: registerUser
    });

    if (token && !inviteStore.invite) {
        return <LoadingContainer/>;
    }

    const headline = invite ? 'Finish registering an account to join.' : 'Create a new Fake Stacks account.';

    return (
        <Row>
            <Col xs={{size: 10, offset: 1}} sm={{size: 8, offset: 2}} md={{size: 6, offset: 3}}>
                <FakeStacksForm id="registration" onSubmit={formik.handleSubmit} headline={headline}>
                    <FormGroup>
                        <FSInput
                            placeholder="First Name"
                            invalid={formik.touched.firstName && !!formik.errors.firstName}
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                        />
                        {formik.touched.firstName && <FSFormFeedback>{formik.errors.firstName}</FSFormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <FSInput
                            placeholder="Last Name"
                            invalid={formik.touched.lastName && !!formik.errors.lastName}
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                        />
                        {formik.touched.lastName && <FSFormFeedback>{formik.errors.lastName}</FSFormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <FSInput
                            placeholder="Email"
                            invalid={formik.touched.email && !!formik.errors.email}
                            name="email"
                            type="email"
                            autoComplete={"username"}
                            autoCapitalize={"off"}
                            autoCorrect={"off"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <FSFormFeedback>{formik.errors.email}</FSFormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <FSInput
                            placeholder="Password"
                            invalid={formik.touched.password && !!formik.errors.password}
                            name="password"
                            type="password"
                            autoComplete={"new-password"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <FSFormFeedback>{formik.errors.password}</FSFormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <FSInput
                            placeholder="Confirmation"
                            invalid={formik.touched.confirmation && !!formik.errors.confirmation}
                            name="confirmation"
                            type="password"
                            autoComplete={"new-password"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmation}
                        />
                        {formik.touched.confirmation && <FSFormFeedback>{formik.errors.confirmation}</FSFormFeedback>}
                    </FormGroup>
                    <FSInput type="hidden" name="token" value={invite ? invite.token : ''} />
                    <FSFormSubmitButton text='Sign Up' />
                    {invite &&
                        <div style={{marginTop: '10px'}}>
                            Already have an account? <FSLink to={"/login" + (!!token ? `?token=${invite.token}` : '')}>Log in.</FSLink>
                        </div>
                    }
                </FakeStacksForm>
            </Col>
        </Row>
    );


};

export default withRouter(FakeStacksRegistration);
