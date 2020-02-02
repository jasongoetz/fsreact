import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import moment from 'moment';
import TeamBettableButton from "./TeamBettableButton";
import OverUnderBettableButton from "./OverUnderBettableButton";
import {GamblerConsumer} from "../gambler/gamblerContext";
import {getGambler} from "../gambler/gamblerSelector";

const teamRowStyle = {
    paddingTop: "5px",
    paddingBottom: "5px",
};

const gameRowStyle = {
    paddingTop: "10px",
    paddingBottom: "10px",
    borderBottom: "1px solid #777574"
};

const gameTimeStyle = {
    paddingTop: "5px",
    paddingBottom: "5px"
};

const teamNameStyle = {
    textAlign:  'right' as 'right', //Weird casting thing gets me past tsc error
    paddingTop: "5px"
};

export class GameRow extends Component<{ bettable: any }> {

    render() {
        return <Row style={gameRowStyle}>
            <Col md={4} sm={12} style={gameTimeStyle}>
                {moment(this.props.bettable.gameTime).format("dddd, MMM Do, h:mma z")}
            </Col>
            <GamblerConsumer select={[getGambler]}>
                {gambler =>
                    <Col md={8} sm={12}>
                        <Row style={teamRowStyle}>
                            <Col style={teamNameStyle}>{this.props.bettable.team1}</Col>
                            <Col style={{width: '70px', padding: '5px'}}>
                                <TeamBettableButton gamblerId={gambler.id} bettable={this.props.bettable} team={1}/>
                            </Col>
                            <Col style={{width: '70px', padding: '5px'}}>
                                <OverUnderBettableButton gamblerId={gambler.id} bettable={this.props.bettable} overunder='OVER'/>
                            </Col>
                        </Row>
                        <Row style={teamRowStyle}>
                            <Col style={teamNameStyle}>{this.props.bettable.team2}</Col>
                            <Col style={{width: '70px', padding: '5px'}}>
                                <TeamBettableButton gamblerId={gambler.id} bettable={this.props.bettable} team={2}/>
                            </Col>
                            <Col style={{width: '70px', padding: '5px'}}>
                                <OverUnderBettableButton gamblerId={gambler.id} bettable={this.props.bettable} overunder='UNDER'/>
                            </Col>
                        </Row>
                    </Col>
                }
            </GamblerConsumer>
        </Row>;
    }
}
