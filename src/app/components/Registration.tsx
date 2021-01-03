import React, {useEffect} from "react";
import {Col, FormGroup, Row} from "reactstrap";
import {Link, RouteComponentProps, useHistory, useLocation, withRouter} from 'react-router-dom';
import {FSForm, FSFormFeedback, FSInput} from "./FSForm";
import {useFormik} from "formik";
import * as yup from "yup";
import {FSWideButton} from "./FSComponents";
import {register} from "../auth/auth.actions";
import {useGlobalStores} from "../context/global_context";
import {loadInviteByToken} from "../invite/invite.actions";
import {LoadingContainer} from "./LoadingContainer";
import {joinLeagueWithInvite} from "../user/user.actions";

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
                console.log("Joining league");
                await joinLeagueWithInvite(authStore.userId!, invite);
                history.push('/');
            }
            else {
                history.push('/league/new');
            }
        } catch (err) {
            formik.setErrors({confirmation: 'Your user profile could not be created'});
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmation: '',
        },
        validationSchema: registrationSchema,
        onSubmit: registerUser
    });

    if (token && !inviteStore.invite) {
        return <LoadingContainer/>;
    }

    return (
        <Row>
            <Col xs={{size: 10, offset: 1}} sm={{size: 8, offset: 2}} md={{size: 6, offset: 3}}>
                <FSForm id="registration" onSubmit={formik.handleSubmit}>
                    {invite && <FormGroup><h3 style={formSigninHeading}>Finish registering an account to join.</h3></FormGroup>}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmation}
                        />
                        {formik.touched.confirmation && <FSFormFeedback>{formik.errors.confirmation}</FSFormFeedback>}
                    </FormGroup>
                    <FSInput type="hidden" name="token" value={invite ? invite.token : ''} />
                    <FSWideButton type="submit" color="primary" size="lg" data-cy="submit">SIGN UP</FSWideButton>
                    {invite &&
                        <div style={{marginTop: '10px'}}>
                            Already have an account? <Link to={`/login?token=${invite.token}`}>Log in.</Link>
                        </div>
                    }
                </FSForm>
            </Col>
        </Row>
    );


};

export default withRouter(Registration);
