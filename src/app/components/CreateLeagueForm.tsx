import React from "react";
import {Col, FormGroup, Label, Row} from "reactstrap";
import {useHistory} from 'react-router-dom';
import {FSForm, FSFormFeedback, FSInput, FSLabelColumn} from "./FSForm";
import {useFormik} from "formik";
import * as yup from "yup";
import {FSWideButton} from "./FSComponents";
import {Sports} from "../types";
import {createLeague} from "../league/league.actions";
import {loadUserContext} from "../user/user.actions";

interface Props {
    userId: number;
}

const CreateLeagueForm: React.FC<Props> = ({ userId}) => {

    const history = useHistory();

    const registerLeague = async (values) => {
        try {
            await createLeague(userId, values);
            await loadUserContext(userId);
            history.push('/');
        } catch (err) {
            formik.setErrors({weeklyBetAccountRatio: 'Your league could not be created'});
        }
    };

    const leagueCreationSchema = yup.object().shape({
        name: yup.string()
            .required('Please enter your league name'),
        sport: yup.string()
            .required('Please select a sport'),
        startingAccount: yup.string()
            .required('Select a starting amount for user accounts'),
        weeklyBetCountMax: yup.string()
            .required('Select the maximum number of bets allowed each week'),
        weeklyBetAccountRatio: yup.string()
            .required('Select the maximum percentage of money each player is allowed to bet each week'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            sport: 'CFB',
            startingAccount: '500',
            weeklyBetCountMax: '6',
            weeklyBetAccountRatio: '50',
        },
        validationSchema: leagueCreationSchema,
        onSubmit: registerLeague
    });

    return (
        <Row>
            <Col xs={{size: 12, offset: 0}} sm={{size: 10, offset: 1}} md={{size: 8, offset: 2}} lg={{size: 6, offset: 3}}>
                <FSForm id="create-league" onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <Row>
                            <FSLabelColumn xs={5} sm={6}>
                                <Label for="leagueName">League Name:</Label>
                            </FSLabelColumn>
                            <Col xs={7} sm={6}>
                                <FSInput
                                    placeholder="League Name"
                                    invalid={!!formik.errors.name}
                                    onChange={formik.handleChange}
                                    id="leagueName"
                                    name="name"
                                    type="text"
                                    required
                                />
                                <FSFormFeedback>{formik.errors.name}</FSFormFeedback>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <FSLabelColumn xs={5} sm={6}>
                                <Label for="leagueSport">Sport:</Label>
                            </FSLabelColumn>
                            <Col xs={7} sm={6}>
                                <FSInput
                                    type="select"
                                    id="leagueSport"
                                    name="sport"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {Object.keys(Sports).map(
                                        sportKey => <option key={`sport-${sportKey}`} value={sportKey}>{Sports[sportKey].name}</option>
                                    )}
                                </FSInput>
                            </Col>
                        </Row>
                        <FSFormFeedback>{formik.errors.sport}</FSFormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <FSLabelColumn xs={5} sm={6}>
                                <Label for="startingAccount">Starting Account Balance:</Label>
                            </FSLabelColumn>
                            <Col xs={7} sm={6}>
                                <FSInput
                                    type="select"
                                    id="startingAccount"
                                    name="startingAccount"
                                    defaultValue="500"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="100">$100</option>
                                    <option value="250">$250</option>
                                    <option value="500">$500</option>
                                    <option value="1000">$1000</option>
                                </FSInput>
                            </Col>
                        </Row>
                        <FSFormFeedback>{formik.errors.startingAccount}</FSFormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <FSLabelColumn xs={5} sm={6}>
                                <Label for="weeklyBetCountMax">Weekly Bet Count Max:</Label>
                            </FSLabelColumn>
                            <Col xs={7} sm={6}>
                                <FSInput
                                    type="select"
                                    id="weeklyBetCountMax"
                                    name="weeklyBetCountMax"
                                    defaultValue="6"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="10">10</option>
                                </FSInput>
                            </Col>
                        </Row>
                        <FSFormFeedback>{formik.errors.weeklyBetCountMax}</FSFormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <FSLabelColumn xs={5} sm={6}>
                                <Label for="weeklyBetAccountRatio">Weekly Bet Account Ratio:</Label>
                            </FSLabelColumn>
                            <Col xs={7} sm={6}>
                                <FSInput
                                    type="select"
                                    id="weeklyBetAccountRatio"
                                    name="weeklyBetAccountRatio"
                                    defaultValue="50"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="25">25%</option>
                                    <option value="50">50%</option>
                                    <option value="75">75%</option>
                                    <option value="100">100%</option>
                                </FSInput>
                            </Col>
                        </Row>
                        <FSFormFeedback>{formik.errors.weeklyBetAccountRatio}</FSFormFeedback>
                    </FormGroup>

                    <FSWideButton type="submit" color="primary" size="lg" data-cy="submit">CREATE LEAGUE</FSWideButton>
                </FSForm>
            </Col>
        </Row>
    );

};

export default CreateLeagueForm;
