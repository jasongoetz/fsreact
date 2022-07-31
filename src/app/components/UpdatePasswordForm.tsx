import React, {FC} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {Col, Container, FormGroup, Row} from "reactstrap";
import {FakeStacksForm, FSFormFeedback, FSFormSubmitButton, FSInput} from "./FSForm";

interface Props {
    onSubmit: (values) => void;
    instructions?: string;
}

export const UpdatePasswordForm: FC<Props> = ({onSubmit, instructions}) => {
    const updatePassword = async (values) => {
        try {
            await onSubmit(values);
        } catch (err) {
            formik.setErrors({confirmation: 'Your password could not be updated'});
        }
    }

    const passwordSchema = yup.object().shape({
        password: yup.string()
            .required('Please enter a new password'),
        confirmation: yup.string()
            .required('Please enter your password again')
            .oneOf([yup.ref("password"), null], "Your passwords must match"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: '',
            confirmation: '',
        },
        validationSchema: passwordSchema,
        onSubmit: updatePassword
    });

    return <Container>
        <Row>
            <Col xs={{size: 12, offset: 0}} sm={{size: 10, offset: 1}} md={{size: 8, offset: 2}}
                 lg={{size: 6, offset: 3}}>
                <FakeStacksForm headline={instructions} onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <FSInput
                            placeholder="Password"
                            invalid={!!formik.errors.password}
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <FSFormFeedback>{formik.errors.password}</FSFormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <FSInput
                            placeholder="Confirmation"
                            invalid={!!formik.errors.confirmation}
                            name="confirmation"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.confirmation}
                        />
                        <FSFormFeedback>{formik.errors.confirmation}</FSFormFeedback>
                    </FormGroup>
                    <FSFormSubmitButton text="Update Password" disabled={Object.keys(formik.errors).length > 0} />
                </FakeStacksForm>
            </Col>
        </Row>
    </Container>;
};
