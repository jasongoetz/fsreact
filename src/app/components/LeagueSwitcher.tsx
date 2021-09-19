import React, {useState} from "react";
import {League} from "../types";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {Colors} from "../theme/theme";
import styled from "@emotion/styled";
import {switchLeague} from "../user/user.actions";
import {loadCart, storeCart} from "../cart/cart.actions";

interface Props {
    leagues: League[];
    currentLeagueId: number;
    mobile: boolean;
}

const leagueSwitcherStyle = {
    display: 'inline-block',
    color: Colors.lightGray,
    backgroundColor: Colors.lighterDarkBlue,
    marginLeft: '12px',
    border: '0px',
};

const LeagueDropdownToggle = styled(DropdownToggle, { shouldForwardProp: prop => prop !== "isMobile" })<{ isMobile: boolean }>(
    {
        color: `${Colors.lightGray} !important`,
        backgroundColor: `${Colors.lighterDarkBlue} !important`,
        boxShadow: 'none !important',
        marginBottom: '5px',
        border: '0px',
    },
    ({ isMobile }) => {
        return {
            ':after': {
                borderTop: isMobile ? '.4em solid' : '.3em solid',
                borderLeft: isMobile ? '.4em solid transparent' : '.25em solid transparent',
                borderRight: isMobile ? '.4em solid transparent' : '.25em solid transparent',
            }
        }
    },
);

const dropdownMenuStyle = {
    backgroundColor: Colors.lighterDarkBlue,
    borderRadius: '0px',
    border: '1px',
    padding: '0px',
    paddingBottom: '1px',
};

const LeagueDropdownItem = styled(DropdownItem)({
    color: Colors.lighterGray,
    backgroundColor: Colors.lighterDarkBlue,
    ':focus': {
        color: Colors.white,
        backgroundColor: Colors.fsBlue,
    },
    ':hover': {
        color: Colors.white,
        backgroundColor: Colors.fsBlue,
    }
});

export const LeagueSwitcher: React.FC<Props> = ({leagues, currentLeagueId, mobile}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const switchToLeague = async (leagueId: number) => {
        await storeCart();
        await switchLeague(leagueId);
        await loadCart();
    }

    return (
        <Dropdown style={leagueSwitcherStyle} isOpen={dropdownOpen} toggle={toggle}>
            <LeagueDropdownToggle data-testid={'league-switcher'} isMobile={mobile} caret>
                {!mobile && <span>Switch Leagues</span>}
            </LeagueDropdownToggle>
            <DropdownMenu style={dropdownMenuStyle} right={mobile}>
                {leagues.filter(league => league.id !== currentLeagueId).map((league, i) =>
                    <LeagueDropdownItem data-testid={'lg-switcher-item-'+i} onClick={() => switchToLeague(league.id)} key={league.id}>{league.name} ({league.sport})</LeagueDropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};

