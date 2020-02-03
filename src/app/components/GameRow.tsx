import React, {FC} from "react";
import {Badge, Col, NavbarToggler, Row} from "reactstrap";
import moment from 'moment';
import TeamBettableButton from "./TeamBettableButton";
import OverUnderBettableButton from "./OverUnderBettableButton";
import {GamblerConsumer} from "../gambler/gamblerContext";
import {getGambler} from "../gambler/gamblerSelector";
import styled from "@emotion/styled";
import {Bettable} from "../types";
import {getCartBets} from "../cart/cartSelector";
import {CartConsumer} from "../cart/cartContext";

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
        <GamblerConsumer select={[getGambler]}>
            {gambler =>
                <CartConsumer select={[getCartBets]}>
                    {cartBets =>
                        <Col md={8} sm={12}>
                            <TeamRow>
                                <TeamNameCol>{bettable.team1}</TeamNameCol>
                                <Col style={{width: '70px', padding: '5px'}}>
                                    <TeamBettableButton gamblerId={gambler.id} bettable={bettable} team={1} cartBets={cartBets}/>
                                </Col>
                                <Col style={{width: '70px', padding: '5px'}}>
                                    <OverUnderBettableButton gamblerId={gambler.id} bettable={bettable} overunder='OVER' cartBets={cartBets}/>
                                </Col>
                            </TeamRow>
                            <TeamRow>
                                <TeamNameCol>{bettable.team2}</TeamNameCol>
                                <Col style={{width: '70px', padding: '5px'}}>
                                    <TeamBettableButton gamblerId={gambler.id} bettable={bettable} team={2} cartBets={cartBets}/>
                                </Col>
                                <Col style={{width: '70px', padding: '5px'}}>
                                    <OverUnderBettableButton gamblerId={gambler.id} bettable={bettable} overunder='UNDER' cartBets={cartBets}/>
                                </Col>
                            </TeamRow>
                        </Col>
                    }
                </CartConsumer>
            }
        </GamblerConsumer>
    </BettableRow>;
};

export default GameRow;
