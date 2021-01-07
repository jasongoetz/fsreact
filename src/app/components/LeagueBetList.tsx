import React, {useEffect} from "react";
import {Container, Row} from "reactstrap";
import PendingBetCard from "./PendingBetCard";
import {PageHeader} from "./PageHeader";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";
import {loadBets} from "../bets/bet.actions";

const LeagueBetList: React.FC = observer(() => {

    const {betStore, leagueStore} = useGlobalStores();
    const league = leagueStore.league!;
    const leagueId = league?.id;

    useEffect(() => {
        if (!!leagueId && !betStore.loaded) {
            loadBets(leagueId);
        }
    }, [leagueId, betStore.loaded]);

    const betsAndParlaysByGambler = betStore.betsAndParlaysByGambler;
    return <Container>
        <PageHeader>Pending Bets</PageHeader>
        <Row>
            {Object.keys(betsAndParlaysByGambler).map(gamblerId => {
                let bets = betsAndParlaysByGambler[gamblerId].bets;
                let parlays = betsAndParlaysByGambler[gamblerId].parlays;
                let betCards = bets.map(bet => {
                    return <PendingBetCard key={bet.id} gambler={bet.gambler} bet={bet} isParlay={false}/>
                });
                let parlayCards = parlays.map(parlay => {
                    return <PendingBetCard key={parlay.id} gambler={parlay.gambler} bet={parlay} isParlay={true}/>
                });
                return betCards.concat(parlayCards);
            })}
        </Row>
    </Container>;
});

export default LeagueBetList;
