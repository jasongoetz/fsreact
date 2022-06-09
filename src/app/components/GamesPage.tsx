import React from "react";
import { Col, Container, Row } from "reactstrap";
import { PageHeader } from "./PageHeader";
import BetSlip from "./BetSlip";
import MediaQuery, { useMediaQuery } from "react-responsive";
import GameRow from "./GameRow";
import { observer } from "mobx-react";
import { useGlobalStores } from "../context/global_context";
import { useGetBettablesQuery } from "../../graphql/generated";

interface Props {
}

const GamesPage: React.FC<Props> = observer(() => {

    const {leagueStore, gamblerStore} = useGlobalStores();

    const { data } = useGetBettablesQuery({ sport: leagueStore.league?.sport || '' }, { enabled: !!leagueStore.league });

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    return (
        <Container>
            <Row>
                <Col lg={7} xl={8}>
                    <PageHeader>Games</PageHeader>
                    {data && data.bettables.map(bettable =>
                        <GameRow key={`game-${bettable.id}`} bettable={bettable} isMobile={isMobile}/>
                    )}
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
