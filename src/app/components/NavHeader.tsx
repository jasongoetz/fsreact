import React, {FC, useState} from "react";
import {
    Badge,
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import {Colors} from "../theme/theme";
import {Link} from "react-router-dom";
import {Gambler, GamblerInfo, League} from "../types";
import MediaQuery from "react-responsive";
import styled from "@emotion/styled";
import BetSlip from "./BetSlip";
import {logout} from "../auth/auth.actions";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";

const navbarStyle = {
    backgroundColor: Colors.lightGray,
};

const navbarContainerStyle = {
    paddingLeft: "3px",
    paddingRight: "3px",
};

const navbarLinkStyle = {
    fontSize: "14px",
    padding: "0px 15px",
    color: Colors.darkestGray,
};

const brandStyle = {
    color: Colors.darkestGray,
};

const menuButtonStyle = {
    border: 0,
};

const betSlipButtonStyle = {
    border: 0,
    width: "60px",
    paddingRight: "5px"
};

const badgeContainerStyle = {
    position: 'relative' as 'relative',
};

const betSlipBadgeStyle = {
    padding: '3px 4px 4px 4px',
    fontSize: '10px',
    lineHeight: '.8',
    backgroundColor: '#D16565',
    position: 'absolute' as 'absolute',
    top: '-3px',
    right: '-5px',
};

const BetSlipCollapse = styled(Collapse)({
    width: '100%',
    zIndex: 4,
    background: 'white',
    overflow: 'scroll',
    position: 'absolute',
    maxHeight: 'calc(100vh - 50px)',
    top: '50px',
    left: '0px',
});

interface Props {
    toggleMobileMenu: () => void;
}

const NavHeader: FC<Props> = observer(({toggleMobileMenu}) => {

    const [mobileBetSlipOpen, setMobileBetSlipOpen] = useState(false);

    const {authStore, cartStore, gamblerStore, leagueStore} = useGlobalStores();

    const toggleBetSlip = () => {
        setMobileBetSlipOpen(!mobileBetSlipOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const getGamblerAccountBalance = (gambler: GamblerInfo) => {
        return gambler.money - gambler.pending;
    };

    const navLink = (label: string, path: string, onClick?: (e) => void) => {
        return <NavLink style={navbarLinkStyle} tag={Link} to={path} onClick={onClick}>{label}</NavLink>;
    };

    const isAdmin = (league: League, gambler?: Gambler) => {
        return !!gambler && league.admin === gambler.user.id;
    };

    const getLeftNavBar = (league: League, gambler?: Gambler) => {
        return <Nav className="justify-content-left" navbar>
            <NavItem>{navLink("GAMES", "/games")}</NavItem>
            <NavItem>{navLink("STANDINGS", "/standings")}</NavItem>
            <NavItem>{navLink("BETS", "/bets")}</NavItem>
            {isAdmin(league, gambler) && <NavItem>{navLink("MANAGE", "/league/settings")}</NavItem>}
        </Nav>;
    };

    const getRightNavBar = (gambler: GamblerInfo) => {
        return <Nav className="justify-content-end" navbar>
            <UncontrolledDropdown>
                <DropdownToggle style={navbarLinkStyle} nav>
                    {gambler.user.firstName.toUpperCase()} {gambler.user.lastName.toUpperCase()}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        {navLink("EDIT", "/profile")}
                    </DropdownItem>
                    <DropdownItem>
                        {navLink("UPDATE PASSWORD", "/user/password")}
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
                {navLink(`$${getGamblerAccountBalance(gambler).toFixed(2)}`, "/account")}
            </NavItem>
            <NavItem>
                {navLink("SIGN OUT", "/logout", handleLogout)}
            </NavItem>
        </Nav>;
    };

    const gambler = leagueStore.gamblers.find(g => g.id === gamblerStore.gambler.id)
    const authenticated = authStore.authenticated;

    return (
        <Navbar style={navbarStyle} fixed="top" light expand="sm">
            <Container style={navbarContainerStyle}>
                <NavbarToggler style={menuButtonStyle} onClick={toggleMobileMenu}/>
                <Collapse className="w-100" navbar>
                    {authenticated && getLeftNavBar(leagueStore.league!, gambler)}
                </Collapse>

                <NavbarBrand style={brandStyle} href="/" className="fixedTop" mx="auto">FAKE STACKS</NavbarBrand>

                <NavbarToggler style={betSlipButtonStyle}>
                                    <span style={badgeContainerStyle}>
                                    <Badge style={betSlipBadgeStyle}
                                           pill>{cartStore.bets.length}</Badge>
                                    <img src="/images/bets-menu.svg" alt="Bets Menu" onClick={toggleBetSlip}/>
                                    </span>
                </NavbarToggler>

                {authenticated && gambler &&
                <MediaQuery maxWidth={576}>
                    <BetSlipCollapse isOpen={mobileBetSlipOpen}>
                        <BetSlip gamblerId={gambler.id}/>
                    </BetSlipCollapse>
                </MediaQuery>
                }

                <Collapse className="w-100 justify-content-end" navbar>
                    {authenticated && !!gambler && getRightNavBar(gambler)}
                </Collapse>
            </Container>
        </Navbar>
    );
});

export default NavHeader;


