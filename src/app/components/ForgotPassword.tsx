import React, {useState} from "react";
import {Col, FormGroup, Row} from "reactstrap";
import {FSForm, FSFormFeedback, FSInput} from "./FSForm";
import {FSWideButton} from "./FSComponents";
import {useFormik} from "formik";
import * as yup from "yup";
import {requestPasswordReset} from "../api/api";

const formSigninStyle = {
    paddingBottom: "15px"
};

const formSigninHeading = {
    fontSize: '16px',
    marginBottom: '10px',
    marginTop: '0px',
};

interface Props {
}

interface ForgotPasswordValues {
    email: string;
}

const ForgotPassword: React.FC<Props> = () => {

    const [resetRequested, setResetRequested] = useState(false);

    const emailSchema = yup.object().shape({
        email: yup.string()
            .email('Your account email is required')
            .required('Your account email is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: emailSchema,
        onSubmit: async (values, actions) => {
            submitResetRequest(values.email);
            actions.setSubmitting(false);
        }
    });

    const submitResetRequest = async (email: string) => {
        try {
            await requestPasswordReset(email);
            setResetRequested(true);
        } catch (err) {
            formik.setErrors({email: 'Email not found'});
        }
    };

    if (resetRequested) {
        return <Row>
            <Col
                xs={{offset: 1, size: 10}}
                sm={{offset: 2, size: 8}}
                md={{offset: 3, size: 6}}
                lg={{offset: 4, size: 4}}
            >
                <FSForm style={formSigninStyle}>
                    <FormGroup><h3 style={formSigninHeading}>An email has been sent to {formik.values.email} with your password reset link.</h3></FormGroup>
                </FSForm>
            </Col>
        </Row>
    }

    return (
        <Row>
            <Col
                xs={{offset: 1, size: 10}}
                sm={{offset: 2, size: 8}}
                md={{offset: 3, size: 6}}
                lg={{offset: 4, size: 4}}
            >
                <FSForm style={formSigninStyle} onSubmit={formik.handleSubmit}>
                    <FormGroup><h3 style={formSigninHeading}>Enter your email and we'll send you a reset link.</h3></FormGroup>
                    <FormGroup>
                        <FSInput
                            autoFocus
                            name="email"
                            type="email"
                            placeholder="Email"
                            autoCapitalize={"off"}
                            autoCorrect={"off"}
                            invalid={formik.touched.email && !!formik.errors.email}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.touched.email && <FSFormFeedback>{formik.errors.email}</FSFormFeedback>}
                    </FormGroup>
                    <FSWideButton type="submit" color="primary" size="lg" data-cy="submit">RESET PASSWORD</FSWideButton>
                </FSForm>
            </Col>
        </Row>
    );
};

export default ForgotPassword;














