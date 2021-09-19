import React, {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {PageHeader} from "./PageHeader";
import BetSlip from "./BetSlip";
import MediaQuery, {useMediaQuery} from "react-responsive";
import GameRow from "./GameRow";
import {observer} from "mobx-react";
import {useGlobalStores} from "../context/global_context";
import {loadGames} from "../bettables/bettable.actions";

interface Props {
}

const GamesPage: React.FC<Props> = observer(() => {

    const {bettableStore, leagueStore, gamblerStore} = useGlobalStores();

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    useEffect(() => {
        if (leagueStore.league && !bettableStore.loaded) {
            loadGames(leagueStore.league.sport);
        }
    }, [leagueStore.league, bettableStore.loaded]);

    return (
        <Container>
            <Row>
                <Col lg={7} xl={8}>
                    <PageHeader>Games</PageHeader>
                    {bettableStore.bettables.map(bettable => <GameRow key={`game-${bettable.id}`} bettable={bettable} isMobile={isMobile}/>)}
                </Col>
                <Col lg={5} xl={4}>
                    <MediaQuery minWidth={992}>
                        <BetSlip gamblerId={gamblerStore.gambler?.id} />
                    </MediaQuery>
                </Col>
            </Row>
        </Container>
    );
});

export default GamesPage;
