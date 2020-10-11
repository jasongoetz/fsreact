import React from "react";
import {Col, FormGroup, NavLink, Row} from "reactstrap";
import {Link, RouteComponentProps, withRouter, useHistory} from 'react-router-dom';
import {FSForm, FSFormFeedback, FSInput} from "./FSForm";
import {useFormik} from "formik";
import * as yup from "yup";
import {FSWideButton} from "./FSComponents";
import {register} from "../auth/auth.actions";

interface Props extends RouteComponentProps {
    invite: any; //FIXME
}

const formSigninHeading = {
    fontSize: '16px',
    marginBottom: '10px',
    marginTop: '0px',
};

const Registration: React.FC<Props> = ({invite}) => {

    const history = useHistory();

    const registerUser = async (values) => {
        try {
            await register(values);
            history.push('/league/new');
        } catch (err) {
            formik.setErrors({confirmation: 'Your user profile could not be created'});
        }
    };

    const registrationSchema = yup.object().shape({
        firstName: yup.string()
            .required('Please enter your first name'),
        lastName: yup.string()
            .required('Please enter your last name'),
        email: yup.string()
            .required('Please enter your email'),
        password: yup.string()
            .required('Please enter a new password'),
        confirmation: yup.string()
            .required('Please enter your password again')
            .oneOf([yup.ref("password"), null], "Your passwords must match"),
    });

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

    return (
        <Row>
            <Col xs={{size: 10, offset: 1}} sm={{size: 8, offset: 2}} md={{size: 6, offset: 3}}>
                <FSForm id="registration" onSubmit={formik.handleSubmit}>
                    {invite && <h3 style={formSigninHeading}>Welcome. Finish registering an account to join.</h3>}
                    <FormGroup>
                        <FSInput
                            placeholder="First Name"
                            invalid={formik.touched.firstName && !!formik.errors.firstName}
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            required
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
                            required
                        />
                        {formik.touched.lastName && <FSFormFeedback>{formik.errors.lastName}</FSFormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <FSInput
                            placeholder="Email"
                            invalid={formik.touched.email && !!formik.errors.email}
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            required
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
                            required
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
                            required
                        />
                        {formik.touched.confirmation && <FSFormFeedback>{formik.errors.confirmation}</FSFormFeedback>}
                    </FormGroup>
                    <FSInput type="hidden" name="token" value={invite ? invite.token : ''} />
                    <FSWideButton type="submit" color="primary" size="lg">SIGN UP</FSWideButton>
                    {invite &&
                        <div style={{marginTop: '10px'}}>
                            Have an account under a different email? <NavLink tag={Link} to={`/login?${invite.token}`}>Log in.</NavLink>
                        </div>
                    }
                </FSForm>
            </Col>
        </Row>
    );


};

export default withRouter(Registration);
