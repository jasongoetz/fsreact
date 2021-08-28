import React, {useEffect} from "react";
import {observer} from "mobx-react";
import * as yup from 'yup';
import {Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {useGlobalStores} from "../context/global_context";
import {PageHeader} from "./PageHeader";
import {useFormik} from "formik";
import {loadGamesForOpenBets, submitGameScores} from "../admin/admin.actions";
import {FSWideButton} from "./FSComponents";
import styled from "@emotion/styled";
import {Colors} from "../theme/theme";
import {BettableWithScore} from "../types";


const OutcomeCard = styled.div({
    marginTop: 0,
    marginBottom: 40,
    border: 'solid ' + Colors.gray,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    background: Colors.lightGray,
});

const AdminGamesPage: React.FC = observer(() => {
    const {adminStore} = useGlobalStores();

    useEffect(() => {
        if (!adminStore.loaded) {
            loadGamesForOpenBets();
        }
    }, [adminStore.loaded]);

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <PageHeader>Process Bets</PageHeader>
                </Col>
            </Row>
            <Col xs={12} sm={{size:8, offset:2}} md={{size: 6, offset: 3}} lg={{size: 4, offset: 4}}>
                {adminStore.loaded && adminStore.gamesWithOpenBets.length === 0 &&
                    <div>There are currently no bet on games to process</div>
                }
                {adminStore.gamesWithOpenBets.length > 0 &&
                    <AdminGamesForm games={adminStore.gamesWithOpenBets}/>
                }
            </Col>
        </Container>
    );
});

const AdminGamesForm: React.FC<{games: BettableWithScore[]}> = observer(({games}) => {
    const initialOutcomes = games.map(game => ({
        bettable: game.id,
        side1Score: game.gameScore?.team1_score,
        side2Score: game.gameScore?.team2_score,
    }));

    const formik = useFormik({
        initialValues: {
            outcomes: initialOutcomes
        },
        validationSchema: yup.object().shape({
            outcomes: yup.array().of(
                yup.object().shape({
                    bettable: yup.number(),
                    side1Score: yup.number().min(0),
                    side2Score: yup.number().min(0),
                })
            )
        }),
        onSubmit: async (values, actions) => {
            await submitGameScores(values.outcomes);
        }
    });

    return <Form onSubmit={formik.handleSubmit}>
        {games.map((game, index) => {
            return <OutcomeCard key={`gameOutcome-${game.id}`}>
                <FormGroup row>
                    <Label xs={8} for={'team1Score-' + game.id}>
                        {game.team1}
                    </Label>
                    <Col xs={4}>
                        <Input type="number" min="0" step="1"
                               id={'team1Score-' + game.id}
                               name={`outcomes[${index}][side1Score]`}
                               value={game.gameScore?.team1_score}
                               error={formik.errors[`outcomes[${index}][side1Score]`]}
                               onChange={formik.handleChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label xs={8} for={'team2Score-' + game.id}>
                        {game.team2}
                    </Label>
                    <Col xs={4}>
                        <Input type="number" min="0" step="1"
                               id={'team2Score-' + game.id}
                               name={`outcomes[${index}][side2Score]`}
                               value={game.gameScore?.team2_score}
                               error={formik.errors[`outcomes[${game.id}][side2Score]`]}
                               onChange={formik.handleChange}
                        />
                    </Col>
                </FormGroup>
                <Input
                    type="hidden"
                    id={'bettable-' + game.id}
                    name={`outcomes[${index}][bettable]`}
                    value={game.id}
                    required
                    onChange={formik.handleChange}
                />
            </OutcomeCard>
        })}
        <FSWideButton type="submit" color="primary" size="lg" onSubmit={formik.handleSubmit}>SUBMIT SCORES</FSWideButton>
    </Form>

})

export default AdminGamesPage;

