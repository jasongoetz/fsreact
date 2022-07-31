import React, {useState} from "react";
import {Col, FormGroup, Row} from "reactstrap";
import {FakeStacksForm, FSFormFeedback, FSFormSubmitButton, FSInput} from "./FSForm";
import {useFormik} from "formik";
import * as yup from "yup";
import {requestPasswordReset} from "../api/api";

const ForgotPassword: React.FC = () => {

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
                <FakeStacksForm headline={`An email has been sent to ${formik.values.email} with your password reset link.`} />
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
                <FakeStacksForm onSubmit={formik.handleSubmit} headline={"Enter your email and we'll send you a reset link"}>
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
                    <FSFormSubmitButton text="Reset Password" />
                </FakeStacksForm>
            </Col>
        </Row>
    );
};

export default ForgotPassword;














