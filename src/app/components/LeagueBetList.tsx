import React, {useEffect} from "react";
import {Container, Row} from "reactstrap";
import PendingBetCard from "./PendingBetCard";
import {loadBets} from "../bets/betActions";
import {getBetsAndParlaysByGambler} from "../bets/betSelector";
import {PageHeader} from "./PageHeader";
import {BetConsumer} from "../bets/betContext";

interface Props {
    leagueId: number;
}

const LeagueBetList: React.FC<Props> = ({leagueId }) => {

    useEffect(() => {
        if (!!leagueId) {
            loadBets(leagueId);
        }
    }, [leagueId]);

    return <Container>
        <PageHeader>Pending Bets</PageHeader>
        <BetConsumer select={[getBetsAndParlaysByGambler]}>
            {betsAndParlaysByGambler => {
                let gamblerIds = Object.keys(betsAndParlaysByGambler);
                return <Row>
                    {gamblerIds.map(gamblerId => {
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
            }}
        </BetConsumer>
    </Container>;
};

export default LeagueBetList;
