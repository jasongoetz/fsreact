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
import {getLeague} from "../league/leagueSelector";
import {Gambler, GamblerInfo, League} from "../types";
import MediaQuery from "react-responsive";
import styled from "@emotion/styled";
import BetSlip from "./BetSlip";
import {AuthConsumer} from "../auth/authContext";
import {isLoggedIn} from "../auth/authSelectors";
import {logout} from "../auth/authActions";
import {LeagueConsumer} from "../league/leagueContext";
import {GamblerConsumer} from "../gambler/gamblerContext";
import {getCartBets} from "../cart/cartSelector";
import {CartConsumer} from "../cart/cartContext";


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

const NavHeader: FC<Props> = ({toggleMobileMenu}) => {

    const [mobileBetSlipOpen, setMobileMetSlipOpen] = useState(false);

    const toggleBetSlip = () => {
        setMobileMetSlipOpen(!mobileBetSlipOpen);
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

    return (
        <AuthConsumer select={[isLoggedIn]}>
            {authenticated =>
                <Navbar style={navbarStyle} fixed="top" light expand="sm">
                    <Container style={navbarContainerStyle}>
                        <LeagueConsumer select={[getLeague]}>
                            {league =>
                                <GamblerConsumer
                                    select={[(context) => league.gamblers.find(g => g.id == context.gambler.id)]}>
                                    {gambler =>
                                        <>
                                            <NavbarToggler style={menuButtonStyle} onClick={toggleMobileMenu}/>
                                            <Collapse className="w-100" navbar>
                                                {authenticated && getLeftNavBar(league, gambler)}
                                            </Collapse>

                                            <NavbarBrand style={brandStyle} href="/" className="fixedTop" mx="auto">FAKE
                                                STACKS</NavbarBrand>

                                            <CartConsumer select={[getCartBets]}>
                                                {cartBets =>
                                                    <NavbarToggler style={betSlipButtonStyle}>
                                                        <span style={badgeContainerStyle}>
                                                        <Badge style={betSlipBadgeStyle}
                                                               pill>{cartBets.length}</Badge>
                                                        <img src="/images/bets-menu.svg" alt="Bets Menu"/>
                                                        </span>
                                                    </NavbarToggler>
                                                }
                                            </CartConsumer>

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
                                        </>
                                    }
                                </GamblerConsumer>
                            }
                        </LeagueConsumer>
                    </Container>
                </Navbar>
            }
        </AuthConsumer>
    );
};

export default NavHeader;


