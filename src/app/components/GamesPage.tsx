import React, {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {PageHeader} from "./PageHeader";
import BetSlip from "./BetSlip";
import GameRow from "./GameRow";
import {observer} from "mobx-react";
import {useGlobalStores} from "../context/global_context";
import {loadGames} from "../bettables/bettable.actions";
import {useScreenSize} from "../hooks/useScreenSize";

interface Props {
}

const GamesPage: React.FC<Props> = observer(() => {

    const {bettableStore, leagueStore, gamblerStore} = useGlobalStores();

    const { isMedium, isLarge, isMobile, isLargeMobile } = useScreenSize();
    const isExactlyLarge = !isMedium && isLarge;

    useEffect(() => {
        if (leagueStore.league && !bettableStore.loaded) {
            loadGames(leagueStore.league.sport);
        }
    }, [leagueStore.league, bettableStore.loaded]);

    return (
        <Container data-testid="games-page-container">
            <Row>
                <Col lg={7} xl={8}>
                    <PageHeader>Games</PageHeader>
                    {bettableStore.bettables.map(bettable =>
                        <GameRow key={`game-${bettable.id}`} bettable={bettable} isMobile={isMobile} isExactlyLarge={isExactlyLarge} />
                    )}
                </Col>
                <Col lg={5} xl={4}>
                    {!isLargeMobile &&
                        <BetSlip gamblerId={gamblerStore.gambler?.id} />
                    }
                </Col>
            </Row>
        </Container>
    );
});

export default GamesPage;
