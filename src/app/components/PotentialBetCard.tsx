import React, {Component} from "react";
import {Button, Col, Input, InputGroup, ListGroupItem, Row} from "reactstrap";
import {Bet, GamblerInfo, Parlay} from "../types";
import {Link} from "react-router-dom";
import moment from "moment";
import {getBetSummary, getGameSummary} from "../../util/BetUtil";

const potentialBetStyle = {
    backgroundColor: "#ececec",
    borderRadius: "0px",
    borderBottom: "0px",
    borderTop: "1px solid",
    borderLeft: "0px",
    borderRight: "0px",
};

const betChoiceStyle = {
    paddingTop: '10px',
    paddingBottom: '20px',
};

const betAmountStyle = {
    padding: "6px 3px",
    borderRadius: "0px",
};

const betWinningsStyle = {
    borderRadius: "0px",
    padding: "6px 3px",
    width: "50px",
};

const wagerAmountLabelStyle = {
    padding: "7px 0px",
    textAlign: "center" as "center",
    backgroundColor: "transparent",
    float: "right" as "right",
    marginRight: "15px",
    verticalAlign: "middle",
    display: "table-cell",
    width: '20%'
};

export const inputGroupAddOn = {
    borderRadius: "1px solid #EEEEEE",
    padding: "7px 3px 6px 5px",
    backgroundColor: "#FFFFFF",
    borderLeft: '1px solid lightgray',
    borderTop: '1px solid lightgray',
    borderBottom: '1px solid lightgray',
};

const disabledGroupAddOn = {
    ...inputGroupAddOn,
    backgroundColor: "transparent"
};

const closeStyle = {
    fontWeight: "normal" as "normal",
    opacity: 0.5,
};

export interface Props {
    cartId: number;
    bet: Bet;
    partOfParlay: boolean;
    onClose: (cartId: number) => void;
    onEdit: (cartId: number, amount: number) => void;
}

export interface State {
}

class PotentialBetCard extends Component<Props, State> {

    async componentDidMount() {
    }

    render() {
        const bet = this.props.bet;
        return <ListGroupItem style={potentialBetStyle}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '10px'}}>
                    <div style={betChoiceStyle}>
                        <strong>{getBetSummary(bet)}</strong>
                        <Button style={closeStyle} close onClick={() => this.props.onClose(this.props.cartId)}>
                            <span>&times;</span>
                        </Button>
                    </div>
                    <div>{getGameSummary(bet)}</div>
                    <div>{moment(bet.bettable.gameTime).format("dddd, MMM Do, h:mma z")}</div>
                </div>
                {!this.props.partOfParlay && this.getWagerFields(bet)
                }
            </div>
        </ListGroupItem>
    }

    private getWagerFields(bet) {
        return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '10px'}}>
            <span style={wagerAmountLabelStyle}>Wager:</span>
            <InputGroup style={{width: '30%'}}>
                <span style={inputGroupAddOn}>$</span>
                <Input
                    type="number"
                    style={betAmountStyle}
                    value={bet.amount}
                    onChange={(e) => this.props.onEdit(this.props.cartId, parseInt(e.target.value))}
                />
            </InputGroup>
            <span style={wagerAmountLabelStyle}>Win:</span>
            <InputGroup style={{width: '30%'}}>
                <span style={disabledGroupAddOn}>$</span>
                <Input readOnly disabled type="number" min="0" style={betWinningsStyle} className="form-control"
                       value={2 * (bet.amount || 0)}/>
            </InputGroup>
        </div>;
    }
}

export default PotentialBetCard;
