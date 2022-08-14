import { Colors } from "../theme/theme";
import { GamblerStatus, League } from "../types";
import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const iconStyle = {
  height: 10,
  width: 10,
  marginRight: 5,
  marginBottom: 5,
};
const gamblerInfoPanelStyle = {
  backgroundColor: Colors.lightestGraySepia,
  marginBottom: '15px',
}
const gamblerInfoStyle = {
  padding: "2px 2px",
};

interface Props {
  gamblerStatus: GamblerStatus;
  league: League;
}

export const GamblerStatusPanel: React.FC<Props> = ({gamblerStatus, league}) => {
  return <ListGroup>
    <ListGroupItem style={gamblerInfoPanelStyle}>
      <div style={gamblerInfoStyle}>
        <img style={iconStyle} src="/images/svg/caret-right.svg" alt="info"/>
        {`You made ${gamblerStatus.betsThisWeek.length} out of ${league.weeklyBetCountMax} maximum bets this week`}
      </div>
      {league.weeklyBetAccountRatio < 1 && <div style={gamblerInfoStyle}>
        <img style={iconStyle} src="/images/svg/caret-right.svg" alt="info"/>
        {`You bet $${gamblerStatus.moneyBetThisWeek} out of $${(gamblerStatus.startingMoneyThisWeek * league.weeklyBetAccountRatio).toFixed(0)} allowed this week`}
      </div>}
    </ListGroupItem>
  </ListGroup>;
}