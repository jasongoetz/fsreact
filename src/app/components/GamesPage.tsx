import React, {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {PageHeader} from "./PageHeader";
import BetSlip from "./BetSlip";
import MediaQuery from "react-responsive";
import GameRow from "./GameRow";
import {observer} from "mobx-react";
import {useGlobalStores} from "../context/global_context";
import {loadGames} from "../bettables/bettable.actions";

interface Props {
}

const GamesPage: React.FC<Props> = observer(() => {

    const {bettableStore, leagueStore, gamblerStore} = useGlobalStores();

    useEffect(() => {
        if (leagueStore.league) {
            loadGames(leagueStore.league.sport);
        }
    }, [leagueStore.league]);

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <PageHeader>Games</PageHeader>
                    {bettableStore.bettables.map(bettable => <GameRow key={`game-${bettable.id}`} bettable={bettable}/>)}
                </Col>
                <Col md={4}>
                    <MediaQuery minWidth={576}>
                        <BetSlip gamblerId={gamblerStore.gambler?.id}/>
                    </MediaQuery>
                </Col>
            </Row>
        </Container>
    );
});

export default GamesPage;
