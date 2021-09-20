import React, {FC} from "react";
import {Col, Row} from "reactstrap";
import moment from 'moment';
import TeamBettableButton from "./TeamBettableButton";
import OverUnderBettableButton from "./OverUnderBettableButton";
import styled from "@emotion/styled";
import {Bettable} from "../types";
import {Colors} from "../theme/theme";

const TeamRow = styled(Row)({
    paddingTop: "5px",
    paddingBottom: "5px",
});

const BettableRow = styled(Row)({
    paddingTop: "10px",
    paddingBottom: "10px",
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
}

const GameRow: FC<Props> = ({bettable, isMobile}) => {
    return <BettableRow>
        <GameTimeCol md={3} sm={12}>
            {moment(bettable.gameTime).format("dddd, MMM Do, h:mma z")}
        </GameTimeCol>
            <Col md={9} sm={12}>
                <TeamRow>
                    <TeamNameCol>{bettable.team1}</TeamNameCol>
                    <Col style={{width: '70px', padding: '5px'}}>
                        <TeamBettableButton bettable={bettable} team={'TEAM1'} />
                    </Col>
                    <Col style={{width: '70px', padding: '5px'}}>
                        <OverUnderBettableButton bettable={bettable} overunder='OVER' isMobile={isMobile}/>
                    </Col>
                </TeamRow>
                <TeamRow>
                    <TeamNameCol>{bettable.team2}</TeamNameCol>
                    <Col style={{width: '70px', padding: '5px'}}>
                        <TeamBettableButton bettable={bettable} team={'TEAM2'} />
                    </Col>
                    <Col style={{width: '70px', padding: '5px'}}>
                        <OverUnderBettableButton bettable={bettable} overunder='UNDER' isMobile={isMobile}/>
                    </Col>
                </TeamRow>
            </Col>
    </BettableRow>;
};

export default GameRow;
