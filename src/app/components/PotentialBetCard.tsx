import React from "react";
import {Button, Input, InputGroup, ListGroupItem} from "reactstrap";
import {CartBet} from "../types";
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

interface Props {
    cartId: number;
    bet: CartBet;
    partOfParlay: boolean;
    onClose: (cartId: number) => void;
    onEdit: (cartId: number, amount: number) => void;
}

const PotentialBetCard: React.FC<Props> = ({partOfParlay, bet, onEdit, onClose, cartId}) => {

    const getWagerFields = (bet) => {
        return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '10px'}}>
            <span style={wagerAmountLabelStyle}>Wager:</span>
            <InputGroup style={{width: '30%'}}>
                <span style={inputGroupAddOn}>$</span>
                <Input
                    type="number"
                    style={betAmountStyle}
                    value={bet.amount}
                    onChange={(e) => onEdit(cartId, parseInt(e.target.value))}
                />
            </InputGroup>
            <span style={wagerAmountLabelStyle}>Win:</span>
            <InputGroup style={{width: '30%'}}>
                <span style={disabledGroupAddOn}>$</span>
                <Input readOnly disabled type="number" min="0" style={betWinningsStyle} className="form-control"
                       value={2 * (bet.amount || 0)}/>
            </InputGroup>
        </div>;
    };

    return <ListGroupItem style={potentialBetStyle}>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '10px'}}>
                <div style={betChoiceStyle}>
                    <strong>{getBetSummary(bet)}</strong>
                    <Button style={closeStyle} close onClick={() => onClose(cartId)}>
                        <span>&times;</span>
                    </Button>
                </div>
                <div>{getGameSummary(bet)}</div>
                <div>{moment(bet.bettable.gameTime).format("dddd, MMM Do, h:mma z")}</div>
            </div>
            {!partOfParlay && getWagerFields(bet)
            }
        </div>
    </ListGroupItem>

};

export default PotentialBetCard;
