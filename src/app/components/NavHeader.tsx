import React, {Component} from "react";
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
import {connect} from "react-redux";
import {getLeague} from "../league/leagueSelector";
import {Gambler, GamblerInfo, League} from "../types";
import {getCartBets} from "../cart/cartSelector";
import {CartBet} from "../cart/cartReducer";
import MediaQuery from "react-responsive";
import styled from "@emotion/styled";
import BetSlip from "./BetSlip";
import {AuthConsumer} from "../auth/authContext";
import {isLoggedIn} from "../auth/authSelectors";
import {logout} from "../auth/authActions";
import {LeagueConsumer} from "../league/leagueContext";
import {GamblerConsumer} from "../gambler/gamblerContext";

interface Props {
    cartBets: CartBet[];
    toggleMobileMenu: () => void;
    toggleBetSlip: () => void;
}

interface State {
    mobileBetSlipOpen: boolean;
}

const navbarStyle = {
    backgroundColor: Colors.lightGray,
    // paddingLeft: "0.5rem",
    // paddingRight: "0.5rem",
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

class NavHeader extends Component<Props, State> {

    state = {
        mobileBetSlipOpen: false,
    };

    toggleMenu = () => {
        this.props.toggleMobileMenu();
    };

    toggleBetSlip = () => {
        this.setState({mobileBetSlipOpen: !this.state.mobileBetSlipOpen});
    };

    handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    render() {
        return (
            <AuthConsumer select={[isLoggedIn]}>
                {authenticated =>
                    <Navbar style={navbarStyle} fixed="top" light expand="sm">
                        <Container style={navbarContainerStyle}>
                            <LeagueConsumer select={[getLeague]}>
                                {league =>
                                    <GamblerConsumer select={[(context) => league.gamblers.find(g => g.id == context.gambler.id)]}>
                                        {gambler =>
                                            <>
                                                <NavbarToggler style={menuButtonStyle} onClick={this.toggleMenu}/>
                                                <Collapse className="w-100" navbar>
                                                    {authenticated && this.getLeftNavBar(league, gambler)}
                                                </Collapse>

                                                <NavbarBrand style={brandStyle} href="/" className="fixedTop" mx="auto">FAKE STACKS</NavbarBrand>

                                                <NavbarToggler style={betSlipButtonStyle} onClick={this.toggleBetSlip}>
                                                    <span style={badgeContainerStyle}>
                                                    <Badge style={betSlipBadgeStyle} pill>{this.props.cartBets.length}</Badge>
                                                    <img src="/images/bets-menu.svg"/>
                                                    </span>
                                                </NavbarToggler>

                                                {authenticated && gambler &&
                                                    <MediaQuery maxWidth={576}>
                                                        <BetSlipCollapse isOpen={this.state.mobileBetSlipOpen}>
                                                            <BetSlip gamblerId={gambler.id} />
                                                        </BetSlipCollapse>
                                                    </MediaQuery>
                                                }

                                                <Collapse className="w-100 justify-content-end" navbar>
                                                    {authenticated && !!gambler && this.getRightNavBar(gambler)}
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
    }

    getLeftNavBar = (league: League, gambler?: Gambler) => {
        return <Nav className="justify-content-left" navbar>
            <NavItem>{this.navLink("GAMES", "/games")}</NavItem>
            <NavItem>{this.navLink("STANDINGS", "/standings")}</NavItem>
            <NavItem>{this.navLink("BETS", "/bets")}</NavItem>
            {this.isAdmin(league, gambler) && <NavItem>{this.navLink("MANAGE", "/league/settings")}</NavItem>}
        </Nav>;
    };

    getRightNavBar = (gambler: GamblerInfo) => {
        return <Nav className="justify-content-end" navbar>
            <UncontrolledDropdown>
                <DropdownToggle style={navbarLinkStyle} nav>
                    {gambler.user.firstName.toUpperCase()} {gambler.user.lastName.toUpperCase()}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        {this.navLink("EDIT", "/profile")}
                    </DropdownItem>
                    <DropdownItem>
                        {this.navLink("UPDATE PASSWORD", "/user/password")}
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
                {this.navLink(`$${this.getGamblerAccountBalance(gambler).toFixed(2)}`, "/account")}
            </NavItem>
            <NavItem>
                {this.navLink("SIGN OUT", "/logout", this.handleLogout)}
            </NavItem>
        </Nav>;
    };

    getGamblerAccountBalance = (gambler: GamblerInfo) => {
        return gambler.money - gambler.pending;
    };

    navLink = (label: string, path: string, onClick?: (e) => void) => {
        return <NavLink style={navbarLinkStyle} tag={Link} to={path} onClick={onClick}>{label}</NavLink>;
    };

    isAdmin = (league: League, gambler?: Gambler) => {
        return !!gambler && league.admin === gambler.user.id;
    }
}

const mapStateToProps = (state) => {
    return {
        cartBets: getCartBets(state),
    };
};

export default connect(
    mapStateToProps,
)(NavHeader);


