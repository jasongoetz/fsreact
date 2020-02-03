import React, {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {getBettables} from "../bettables/bettableSelector";
import {PageHeader} from "./PageHeader";
import BetSlip from "./BetSlip";
import MediaQuery from "react-responsive";
import {GamblerConsumer} from "../gambler/gamblerContext";
import {getGambler} from "../gambler/gamblerSelector";
import GameRow from "./GameRow";
import {BettableConsumer} from "../bettables/bettableContext";
import {Sport} from "../types";
import {loadGames} from "../bettables/bettableActions";

interface Props {
    sport: Sport;
}

const GamesPage: React.FC<Props> = ({sport}) => {
    useEffect(() => {
        loadGames(sport);
    }, [sport]);
    return (
        <BettableConsumer select={[getBettables]}>
            {bettables =>
                <Container>
                    <Row>
                        <Col md={8}>
                            <PageHeader>Games</PageHeader>
                            {bettables.map(bettable => <GameRow key={`game-${bettable.id}`} bettable={bettable}/>)}
                        </Col>
                        <Col md={4}>
                            <MediaQuery minWidth={576}>
                                <GamblerConsumer select={[getGambler]}>
                                    {gambler =>
                                        <BetSlip gamblerId={gambler.id}/>
                                    }
                                </GamblerConsumer>
                            </MediaQuery>
                        </Col>
                    </Row>
                </Container>
            }
        </BettableConsumer>
    );
};

export default GamesPage;
