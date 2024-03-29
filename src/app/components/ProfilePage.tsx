import React from 'react';
import {Col, Container, FormGroup, Label, Row} from "reactstrap";
import {FakeStacksForm, FSFormFeedback, FSFormSubmitButton, FSInput} from "./FSForm";
import {User} from "../types";
import {useFormik} from "formik";
import * as yup from "yup";
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom';
import {updateUserProfile} from "../user/user.actions";

interface Props extends RouteComponentProps {
    user: User;
}

const ProfilePage: React.FC<Props> = ({ user}) => {

    const history = useHistory();
    const updateProfile = async (values) => {
        try {
            await updateUserProfile(user.id,{
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                notifyprocessedbets: values.notifyprocessedbets,
            });

            history.push('/');
        } catch (err) {
            let message = err.message;
            if (err.payload) {
                let errorJson = await err.payload.json();
                message = errorJson.message;
            }
            formik.setErrors({email: message});
        }
    };

    const profileSchema = yup.object().shape({
        firstName: yup.string()
            .min(2, 'First name is too short')
            .max(30, 'First name is too long')
            .required('Enter a first name'),
        lastName: yup.string()
            .min(2, 'Last name is too short')
            .max(30, 'Last name is too long')
            .required('Enter a last name'),
        email: yup.string()
            .email('A valid email is required')
            .required('Please enter your email'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            notifyprocessedbets: !!user.notifyprocessedbets,
        },
        validationSchema: profileSchema,
        onSubmit: updateProfile
    });

    return (
        <Container>
            <Row>
                <Col xs={{size: 12, offset: 0}} sm={{size: 10, offset: 1}} md={{size: 8, offset: 2}} lg={{size: 6, offset: 3}}>
                    <FakeStacksForm onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <FSInput
                                        placeholder="First Name"
                                        invalid={!!formik.errors.firstName}
                                        name="firstName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        required
                                    />
                                    <FSFormFeedback>{formik.errors.firstName}</FSFormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <FSInput
                                        placeholder="Last Name"
                                        invalid={!!formik.errors.lastName}
                                        name="lastName"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        required
                                    />
                                    <FSFormFeedback>{formik.errors.lastName}</FSFormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <FSInput
                                placeholder="Email"
                                invalid={!!formik.errors.email}
                                name="email"
                                type="email"
                                autoCapitalize={"off"}
                                autoCorrect={"off"}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                required
                            />
                            <FSFormFeedback>{formik.errors.email}</FSFormFeedback>
                        </FormGroup>
                        <FormGroup check>
                            <FSInput
                                type="checkbox"
                                name="notifyprocessedbets"
                                id="notifyprocessedbets"
                                onChange={formik.handleChange}
                                checked={formik.values.notifyprocessedbets}
                            />
                            <Label for="notifyprocessedbets" check>Email me when bets are processed</Label>
                        </FormGroup>
                        <FSFormSubmitButton text="Update Profile" disabled={Object.keys(formik.errors).length > 0} />
                    </FakeStacksForm>
                </Col>
            </Row>
        </Container>
    );

};


export default withRouter(ProfilePage);
