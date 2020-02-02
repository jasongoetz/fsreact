import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Row} from "reactstrap";
import PendingBetCard from "./PendingBetCard";
import {loadBets} from "../bets/betActions";
import {getBetsAndParlaysByGambler} from "../bets/betSelector";
import {PageHeader} from "./PageHeader";

interface Props {
    leagueId: number;
}

const LeagueBetList: React.FC<Props> = ({leagueId }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBets(leagueId));
    }, []);

    const betsAndParlaysByGambler = useSelector(getBetsAndParlaysByGambler);

    let gamblerIds = Object.keys(betsAndParlaysByGambler);
    return <Container>
        <PageHeader>Pending Bets</PageHeader>
        <Row>
            {gamblerIds.map(gamblerId => {
                let bets = betsAndParlaysByGambler[gamblerId].bets;
                let parlays = betsAndParlaysByGambler[gamblerId].parlays;
                let betCards = bets.map(bet => {
                    return <PendingBetCard key={bet.id} gambler={bet.gambler} bet={bet} isParlay={false}></PendingBetCard>
                });
                let parlayCards = parlays.map(parlay => {
                    return <PendingBetCard key={parlay.id} gambler={parlay.gambler} bet={parlay} isParlay={true}></PendingBetCard>
                });
                return betCards.concat(parlayCards);
            })}
        </Row>
    </Container>;
};

export default LeagueBetList;
