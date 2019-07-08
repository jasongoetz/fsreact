import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import {TeamBettableButton} from "./TeamBettableButton";
import {OverUnderBettableButton} from "./OverUnderBettableButton";
import moment from 'moment';

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
            <Col md={4} style={gameTimeStyle}>
                {moment(this.props.bettable.gameTime).format("dddd, MMM Do, h:mma z")}
            </Col>
            <Col md={8}>
                <Row style={teamRowStyle}>
                    <Col xs={4} style={teamNameStyle}>{this.props.bettable.team1}</Col>
                    <Col xs={4}>
                        <TeamBettableButton bettable={this.props.bettable} team={1}/>
                    </Col>
                    <Col xs={4}>
                        <OverUnderBettableButton bettable={this.props.bettable} over={true}/>
                    </Col>
                </Row>
                <Row style={teamRowStyle}>
                    <Col xs={4} style={teamNameStyle}>{this.props.bettable.team2}</Col>
                    <Col xs={4}>
                        <TeamBettableButton bettable={this.props.bettable} team={2}/>
                    </Col>
                    <Col xs={4}>
                        <OverUnderBettableButton bettable={this.props.bettable} over={false}/>
                    </Col>
                </Row>
            </Col>
        </Row>;
    }
}