import React from 'react';
import {Col, Container, FormGroup, Row} from "reactstrap";
import {FSForm, FSFormFeedback, FSInput} from "./FSForm";
import {FSWideButton} from "./FSComponents";
import {useFormik} from "formik";
import * as yup from "yup";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {updateUserPassword} from "../user/user.actions";

interface Props extends RouteComponentProps {
    userId: number;
}

const PasswordPage: React.FC<Props> = ({history, userId}) => {

    const updatePassword = async (values) => {
        try {
            await updateUserPassword(userId, values.password);
            history.push('/');
        } catch (err) {
            formik.setErrors({confirmation: 'Your password could not be updated'});
        }
    };

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

    return (
        <Container>
            <Row>
                <Col xs={{size: 12, offset: 0}} sm={{size: 10, offset: 1}} md={{size: 8, offset: 2}} lg={{size: 6, offset: 3}}>
                    <FSForm onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <FSInput
                                placeholder="Password"
                                invalid={!!formik.errors.password}
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                required
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
                                required
                            />
                            <FSFormFeedback>{formik.errors.confirmation}</FSFormFeedback>
                        </FormGroup>
                        <FSWideButton disabled={Object.keys(formik.errors).length > 0} color="primary" size="lg" style={{marginTop: '15px'}}>Update Password</FSWideButton>
                    </FSForm>
                </Col>
            </Row>
        </Container>
    );

};


export default withRouter(PasswordPage);
