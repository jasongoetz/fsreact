import {Bet, GameScore, Parlay} from "../types";
import React from "react";
import {observer} from "mobx-react";
import {Container, ListGroup, ListGroupItem, PopoverBody, Row, UncontrolledPopover} from "reactstrap";
import {Colors} from "../theme/theme";
import checkMark from "./icons/checkMark.png";
import xMark from "./icons/xMark.png";
import {getUnofficialBetOutcome} from "../../util/OutcomeUtil";

const hadOrHas = (final: boolean) => {
   return final ? ' had ' : ' has ';
}

const getWagerType = (bet: Bet, parlays: Parlay[], final: boolean) => {
    if (!!bet.parlayId) {
        const parlay = parlays.find(parlay => parlay.id === bet.parlayId);
        if (!parlay) {
            console.error("Could not find parlay " + bet.parlayId);
            return hadOrHas(final);
        }
        return <><span>{hadOrHas(final)}a </span><span>
            <span color="link" style={{cursor: 'pointer', fontWeight: 500, color: Colors.slightlyDarkerFSBlue}} id={`popover-${bet.parlay}-${bet.id}`}>{parlay.bets.length} game ${parlay.amount} parlay</span>
            <UncontrolledPopover trigger="legacy" placement="bottom" target={`popover-${bet.parlay}-${bet.id}`}>
                <PopoverBody>
                    <Container style={{paddingTop: 5, paddingBottom: 5 }}>
                        <Row xs={12}>
                            <ListGroup>
                                {parlay.bets.map(bet =>
                                    <ListGroupItem style={{
                                        borderWidth: 0,
                                        padding: '0.25rem 0.5rem'
                                    }}>{getParlayBetDescription(bet)}</ListGroupItem>
                                )}
                            </ListGroup>
                        </Row>
                    </Container>
                </PopoverBody>
            </UncontrolledPopover>
        </span><span> with </span></>;
    } else {
        return (final ? ' had ' : ' has ') + `$${bet.amount} on `;
    }
};

const getBetSide = (bet: Bet) => {
    if (bet.infoRedacted) {
        return '[Info Redacted]';
    }
    if (bet.sideId) {
        if (bet.bettable.sideId1 === bet.sideId) {
            return `${bet.bettable.team1} ${getLineWording(bet)}`;
        } else {
            return `${bet.bettable.team2} ${getLineWording(bet)}`;
        }
    } else {
        return `${bet.overUnder.toLowerCase()} ${bet.line}`;
    }
};

const getLineWording = (bet: Bet) => {
    if (bet.moneyline) {
        return `to win (${bet.line})`;
    } else {
        return bet.line;
    }
}

const getParlayBetDescription = (bet: Bet) => {
    if (bet.infoRedacted) {
        return '[Info Redacted]';
    }
    if (bet.sideId) {
        if (bet.bettable.sideId1 === bet.sideId) {
            return `${bet.bettable.team1} ${bet.moneyline ? `to win (${bet.bettable.team1MoneyLine})` : bet.bettable.team1Spread} @ ${bet.bettable.team2}`;
        } else {
            return `${bet.bettable.team2} ${bet.moneyline ? `to win (${bet.bettable.team2MoneyLine})` : bet.bettable.team2Spread} vs ${bet.bettable.team1}`;
        }
    } else {
        return `${bet.bettable.team1} @ ${bet.bettable.team2}: ${bet.overUnder.toLowerCase()} ${bet.bettable.overUnder}`;
    }
};

interface GameBetsProps {
    side: string;
    score?: GameScore;
    bets: Bet[],
    parlays: Parlay[];
    gamblerNames: { [id: number]: string };
}

export const LiveBoxScoreBetsPanel: React.FC<GameBetsProps> = observer(({side, score, bets, parlays, gamblerNames}) => {
    return (
        <Container key={`boxscore-${score?.id}`} style={{borderTop: `1px solid ${Colors.graySepia}`, paddingTop: 5, paddingBottom: 5 }}>
            <Row>
                Bets on {side}:
            </Row>
            <Row xs={12}>
                <ListGroup flush>
                    {bets.map(bet =>
                        <ListGroupItem style={{background: Colors.whiteSepia, borderWidth: 0, padding: '0.25rem 0.5rem'}}>
                            {gamblerNames[bet.gamblerId]}{getWagerType(bet, parlays, (!!score && score.clockStatus === 'STATUS_FINAL'))}{getBetSide(bet)} <UnofficialOutcome bet={bet} score={score}/>
                        </ListGroupItem>
                    )}
                </ListGroup>

            </Row>
        </Container>
    );
});

const UnofficialOutcome: React.FC<{score?: GameScore; bet: Bet}> = observer(({score, bet}) => {
    if (!score || !score.team1Score || !score.team2Score) {
        return <span></span>;
    }
    const outcome = getUnofficialBetOutcome(bet, score);
    if (outcome === 'UNDECIDED') {
        return <span></span>;
    }
    return <img style={{marginLeft: 5}} alt={outcome.toLowerCase()} height={12} width={12} src={outcome === 'WIN' ? checkMark : xMark}/>
})
