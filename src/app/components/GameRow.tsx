import React, {FC} from "react";
import {Col, Row} from "reactstrap";
import moment from 'moment';
import TeamBettableButton from "./TeamBettableButton";
import OverUnderBettableButton from "./OverUnderBettableButton";
import styled from "@emotion/styled";
import { Bettable, OverUnder } from '../types';
import {Colors} from "../theme/theme";
import MoneylineBettableButton from "./MoneylineBettableButton";

const TeamRow = styled(Row)({
    paddingTop: "1px",
    paddingBottom: "1px",
});

const BettableRow = styled(Row)({
    paddingTop: "6px",
    paddingBottom: "6px",
    borderBottom: `1px solid ${Colors.darkerGray}`
});

const GameTimeCol = styled(Col)({
    paddingTop: "5px",
    paddingBottom: "5px"
});

const TeamNameCol = styled(Col)({
    textAlign: "right",
    paddingTop: "10px",
    fontSize: "1.05rem",
});

interface Props {
    bettable: Bettable;
    isMobile: boolean;
    isExactlyLarge: boolean;
}

const MultilineTimeString: FC<{bettable: Bettable}> = ({bettable}) => {
    const gameTime = moment(bettable.gameTime);
    const date = gameTime.format("dddd, MMM D");
    const time = gameTime.format("h:mma z");
    return <>{date}<br/>{time}</>;
}

const GameRow: FC<Props> = ({bettable, isMobile, isExactlyLarge}) => {

    return <BettableRow data-testid={'bettable-row'}>
        <GameTimeCol md={3} sm={12}>
            {isMobile ? moment(bettable.gameTime).format("dddd, MMM Do [at] h:mma z") : <MultilineTimeString bettable={bettable}/>}
        </GameTimeCol>
            <Col md={9} sm={12}>
                <TeamRow>
                    <TeamNameCol>{bettable.team1}</TeamNameCol>
                    <Col style={{padding: '5px'}}>
                        <TeamBettableButton data-testid='team1-bet-button' bettable={bettable} team={'TEAM1'} />
                    </Col>
                    <Col style={{padding: '5px'}}>
                        <MoneylineBettableButton bettable={bettable} team={'TEAM1'} />
                    </Col>
                    <Col style={{padding: '5px'}}>
                        <OverUnderBettableButton data-testid='over-bet-button' bettable={bettable} overUnder={OverUnder.OVER} isMobile={isMobile || isExactlyLarge}/>
                    </Col>
                </TeamRow>
                <TeamRow>
                    <TeamNameCol>{bettable.team2}</TeamNameCol>
                    <Col style={{padding: '5px'}}>
                        <TeamBettableButton data-testid='team2-bet-button' bettable={bettable} team={'TEAM2'} />
                    </Col>
                    <Col style={{padding: '5px'}}>
                        <MoneylineBettableButton bettable={bettable} team={'TEAM2'} />
                    </Col>
                    <Col style={{padding: '5px'}}>
                        <OverUnderBettableButton data-testid='under-bet-button' bettable={bettable} overUnder={OverUnder.UNDER} isMobile={isMobile || isExactlyLarge}/>
                    </Col>
                </TeamRow>
            </Col>
    </BettableRow>;
};

export default GameRow;
