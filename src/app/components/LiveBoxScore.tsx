import {BettableWithBetsAndScore, Parlay} from "../types";
import React from "react";
import {observer} from "mobx-react";
import {Col, Container, Row} from "reactstrap";
import {Colors} from "../theme/theme";
import styled from "@emotion/styled";
import {LiveBoxScoreBetsPanel} from "./LiveBoxScoreBetsPanel";
import moment from "moment";

interface ScoresFormProps {
    games: BettableWithBetsAndScore[];
    gamblerNames: { [id: number]: string };
    parlays: Parlay[];
}

const OutcomeCard = styled.div({
    marginTop: 0,
    marginBottom: 40,
    border: 'solid ' + Colors.darkerGray,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    background: Colors.whiteSepia,
});

const team1Cond = (bet) => bet.sideId && bet.bettable.sideId1 === bet.sideId;
const team2Cond = (bet) => bet.sideId && bet.bettable.sideId2 === bet.sideId;
const overCond = (bet) => !bet.sideId && bet.overUnder === 'OVER';
const underCond = (bet) => !bet.sideId && bet.overUnder === 'UNDER';

export const ScoreForm: React.FC<ScoresFormProps> = observer(({games, gamblerNames, parlays }) => {
    const scores = games.map(game => ({
        bettable: game.id,
        side1Score: game.gameScore?.team2Score, //FIXME: Determine the correct team here
        side2Score: game.gameScore?.team1Score, //FIXME: Determine the correct team here
    }));

    return <Container>
        {games.map((game, index) => {
            return <OutcomeCard key={`liveScore-${game.id}`}>
                {game.gameScore && <div style={{ textTransform: 'uppercase', color: Colors.fsBlue, marginBottom: 10 }}>{game.gameScore.clockStatus === 'STATUS_SCHEDULED' ? moment(game.gameTime).format("dddd, MMM Do, h:mma z") : game.gameScore.clockText}</div>}
                <Row>
                    <Col xs={8} style={{fontWeight: 600, fontSize:'16px'}}>{game.team1}</Col>
                    <Col xs={4}>{game.gameScore && game.gameScore.clockStatus !== 'STATUS_SCHEDULED' ? scores[index].side1Score : ''}</Col>
                </Row>
                <Row style={{marginBottom: 10}}>
                    <Col xs={8} style={{fontWeight: 600, fontSize:'16px'}}>{game.team2}</Col>
                    <Col xs={4}>{game.gameScore && game.gameScore.clockStatus !== 'STATUS_SCHEDULED' ? scores[index].side2Score : ''}</Col>
                </Row>
                {game.bets.some(bet => team1Cond(bet)) && (
                    <LiveBoxScoreBetsPanel
                        score={game.gameScore}
                        side={game.team1}
                        parlays={parlays}
                        bets={game.bets.filter(team1Cond)}
                        gamblerNames={gamblerNames}
                    />
                )}
                {game.bets.some(bet => team2Cond(bet)) && (
                    <LiveBoxScoreBetsPanel
                        score={game.gameScore}
                        side={game.team2}
                        parlays={parlays}
                        bets={game.bets.filter(team2Cond)}
                        gamblerNames={gamblerNames}
                    />
                )}
                {game.bets.some(bet => overCond(bet)) && (
                    <LiveBoxScoreBetsPanel
                        score={game.gameScore}
                        side={'the over'}
                        parlays={parlays}
                        bets={game.bets.filter(overCond)}
                        gamblerNames={gamblerNames}
                    />
                )}
                {game.bets.some(bet => underCond(bet)) && (
                    <LiveBoxScoreBetsPanel
                        score={game.gameScore}
                        side={'the under'}
                        parlays={parlays}
                        bets={game.bets.filter(underCond)}
                        gamblerNames={gamblerNames}
                    />
                )}
            </OutcomeCard>
        })}
    </Container>

})
