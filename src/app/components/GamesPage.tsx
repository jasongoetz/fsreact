import React from "react";
import {useSelector} from "react-redux";
import {Col, Container, Row} from "reactstrap";
import {getBettables} from "../bettables/bettableSelector";
import {GameRow} from "./GameRow";
import {PageHeader} from "./PageHeader";
import BetSlip from "./BetSlip";
import MediaQuery from "react-responsive";
import {GamblerConsumer} from "../gambler/gamblerContext";
import {getGambler} from "../gambler/gamblerSelector";

export interface State {
}

const GamesPage: React.FC = () => {
    const bettables = useSelector(getBettables);

    return <Container>
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
};

export default GamesPage;
