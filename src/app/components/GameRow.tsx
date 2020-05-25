import React, {FC} from "react";
import {Col, Row} from "reactstrap";
import moment from 'moment';
import TeamBettableButton from "./TeamBettableButton";
import OverUnderBettableButton from "./OverUnderBettableButton";
import styled from "@emotion/styled";
import {Bettable} from "../types";

const TeamRow = styled(Row)({
    paddingTop: "5px",
    paddingBottom: "5px",
});

const BettableRow = styled(Row)({
    paddingTop: "10px",
    paddingBottom: "10px",
    borderBottom: "1px solid #777574"
});

const GameTimeCol = styled(Col)({
    paddingTop: "5px",
    paddingBottom: "5px"
});

const TeamNameCol = styled(Col)({
    textAlign: "right",
    paddingTop: "5px"
});

interface Props {
    bettable: Bettable
}

const GameRow: FC<Props> = ({bettable}) => {
    return <BettableRow>
        <GameTimeCol md={4} sm={12}>
            {moment(bettable.gameTime).format("dddd, MMM Do, h:mma z")}
        </GameTimeCol>
            <Col md={8} sm={12}>
                <TeamRow>
                    <TeamNameCol>{bettable.team1}</TeamNameCol>
                    <Col style={{width: '70px', padding: '5px'}}>
                        <TeamBettableButton bettable={bettable} team={1} />
                    </Col>
                    <Col style={{width: '70px', padding: '5px'}}>
                        <OverUnderBettableButton bettable={bettable} overunder='OVER' />
                    </Col>
                </TeamRow>
                <TeamRow>
                    <TeamNameCol>{bettable.team2}</TeamNameCol>
                    <Col style={{width: '70px', padding: '5px'}}>
                        <TeamBettableButton bettable={bettable} team={2} />
                    </Col>
                    <Col style={{width: '70px', padding: '5px'}}>
                        <OverUnderBettableButton bettable={bettable} overunder='UNDER' />
                    </Col>
                </TeamRow>
            </Col>
    </BettableRow>;
};

export default GameRow;
