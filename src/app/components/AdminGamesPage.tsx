import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {useGlobalStores} from "../context/global_context";
import {PageHeader} from "./PageHeader";
import {useFormik} from "formik";
import {loadGamesForOpenBets, submitGameScores} from "../admin/admin.actions";
import {FSWideButton} from "./FSComponents";
import styled from "@emotion/styled";
import {Colors} from "../theme/theme";
import {BettableWithScore} from "../types";
import {loadUserContext} from "../user/user.actions";
import {useQueryParam} from "../hooks/useQueryParam";
import moment from "moment";


const OutcomeCard = styled.div({
    marginTop: 0,
    marginBottom: 40,
    border: 'solid ' + Colors.darkerGray,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    background: Colors.lightGray,
});

const AdminGamesPage: React.FC = observer(() => {
    const future = useQueryParam('future');

    const {adminStore} = useGlobalStores();

    useEffect(() => {
        if (!adminStore.loaded) {
            loadGamesForOpenBets(future === 'true');
        }
    }, [adminStore.loaded, future]);

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
    const initialOutcomes = games.reduce((dict, game) => {
        dict[game.id] = {
            bettable: game.id,
            side1Score: game.gameScore?.team2Score, //FIXME: Determine the correct team here
            side2Score: game.gameScore?.team1Score, //FIXME: Determine the correct team here
        };
        return dict;
    }, {});

    const {authStore} = useGlobalStores();

    const formik = useFormik({
        initialValues: {
            outcomes: initialOutcomes
        },
        onSubmit: async (values, actions) => {
            await submitGameScores(Object.values(values.outcomes));
            if (authStore.userId) {
                await loadUserContext(authStore.userId);
            }
        }
    });

    return <Form onSubmit={formik.handleSubmit}>
        {games.map((game) => {
            return <OutcomeCard key={`gameOutcome-${game.id}`}>
                <FormGroup row>
                    <Label>{moment(game.gameTime).format("dddd, MMMM D, h:mma z")}</Label>
                </FormGroup>
                <FormGroup row>
                    <Label xs={8} for={'team1Score-' + game.id}>
                        {game.team1}
                    </Label>
                    <Col xs={4}>
                        <Input type="number" min="0" step="1"
                               id={'team1Score-' + game.id}
                               name={`outcomes[${game.id}][side1Score]`}
                               value={formik.values.outcomes[game.id].side1Score}
                               error={formik.errors[`outcomes[${game.id}][side1Score]`]}
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
                               name={`outcomes[${game.id}][side2Score]`}
                               value={formik.values.outcomes[game.id].side2Score}
                               error={formik.errors[`outcomes[${game.id}][side2Score]`]}
                               onChange={formik.handleChange}
                        />
                    </Col>
                </FormGroup>
                <Input
                    type="hidden"
                    id={'bettable-' + game.id}
                    name={`outcomes[${game.id}][bettable]`}
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

