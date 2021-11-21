import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {Col, Container, Row} from "reactstrap";
import {useGlobalStores} from "../context/global_context";
import {PageHeader} from "./PageHeader";
import {useLocation} from "react-router-dom";
import {loadLiveScores} from "../scores/scores.actions";
import {ScoreForm} from "./LiveBoxScore";

const LiveScoresPage: React.FC = observer(() => {
    const location = useLocation();
    const useQuery = () => {
        return new URLSearchParams(location.search);
    }

    const query = useQuery();
    const weekParam = query.get("week")
    const week = !!weekParam ? parseInt(weekParam) : undefined;

    const {leagueStore, scoresStore} = useGlobalStores();

    const league = leagueStore.league!;
    const leagueId = league?.id;

    useEffect(() => {
        if (!!leagueId && !scoresStore.loaded) {
            loadLiveScores(leagueId, week);
        }
    }, [scoresStore.loaded, leagueId, week]);

    useEffect(() => {
        let timer = window.setTimeout(() => loadLiveScores(leagueId, week), 60 * 1000);
        return () => {
            clearTimeout(timer);
        };
    });

    const scores = scoresStore.scores.filter(game => game.bets.some(bet => !bet.infoRedacted));
    const parlays = scoresStore.parlays.filter(parlay => parlay.bets.some(bet => !bet.infoRedacted));

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <PageHeader subheader={'Scores update every 10 minutes'}>Live Scores</PageHeader>
                </Col>
            </Row>
            <Col xs={12} md={{size:10, offset:1}} lg={{size: 8, offset: 2}}>
                {scoresStore.loaded && scores.length === 0 &&
                    <div>There are currently no bet on games to process</div>
                }
                {scoresStore.scores.length > 0 &&
                    <ScoreForm games={scores} parlays={parlays} gamblerNames={scoresStore.gamblerNames} />
                }
            </Col>
        </Container>
    );
});

export default LiveScoresPage;

