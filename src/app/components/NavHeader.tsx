import {Component} from "react";
import React from "react";
import {
    Badge,
    Collapse, Container, DropdownItem, DropdownMenu,
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
import {logout} from "../auth/authActions";
import {getGamblerWithAccount} from "../gambler/gamblerSelector";
import {getLeague} from "../league/leagueSelector";
import {isLoggedIn} from "../auth/authSelector";
import {GamblerInfo, League} from "../types";
import {getCartBets} from "../cart/cartSelector";
import {CartBet} from "../cart/cartReducer";
import MediaQuery from "react-responsive";
import styled from "@emotion/styled";
import BetSlip from "./BetSlip";

interface Props {
    league: League;
    gambler: GamblerInfo;
    loggedIn: boolean;
    cartBets: CartBet[];
    toggleMobileMenu: () => void;
    toggleBetSlip: () => void;
    handleLogout: () => void;
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
        this.props.handleLogout();
    };

    render() {
        return (
            <Navbar style={navbarStyle} fixed="top" light expand="sm">
                <Container style={navbarContainerStyle}>
                    <NavbarToggler style={menuButtonStyle} onClick={this.toggleMenu}/>
                    <Collapse className="w-100" navbar>
                        {this.props.loggedIn && this.getLeftNavBar()}
                    </Collapse>

                    <NavbarBrand style={brandStyle} href="/" className="fixedTop" mx="auto">FAKE STACKS</NavbarBrand>

                    <NavbarToggler style={betSlipButtonStyle} onClick={this.toggleBetSlip}>
                        <span style={badgeContainerStyle}>
                            <Badge style={betSlipBadgeStyle} pill>{this.props.cartBets.length}</Badge>
                            <img src="/images/bets-menu.svg"/>
                        </span>
                    </NavbarToggler>

                    {this.props.loggedIn &&
                        <MediaQuery maxWidth={576}>
                            <BetSlipCollapse isOpen={this.state.mobileBetSlipOpen}>
                                <BetSlip/>
                            </BetSlipCollapse>
                        </MediaQuery>
                    }

                    <Collapse className="w-100 justify-content-end" navbar>
                        {this.props.loggedIn && !!this.props.gambler && this.getRightNavBar()}
                    </Collapse>
                </Container>
            </Navbar>
        );
    }

    getLeftNavBar =  () => {
        return <Nav className="justify-content-left" navbar>
            <NavItem>{this.navLink("GAMES", "/games")}</NavItem>
            <NavItem>{this.navLink("STANDINGS", "/standings")}</NavItem>
            <NavItem>{this.navLink("BETS", "/bets")}</NavItem>
            {this.isAdmin() && <NavItem>{this.navLink("MANAGE", "/league/settings")}</NavItem>}
        </Nav>;
    };

    getRightNavBar = () => {
        return <Nav className="justify-content-end" navbar>
            <UncontrolledDropdown>
                <DropdownToggle style={navbarLinkStyle} nav>
                    {this.props.gambler.user.firstName.toUpperCase()} {this.props.gambler.user.lastName.toUpperCase()}
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
                {this.navLink(`$${this.getGamblerAccountBalance().toFixed(2)}`, "/account")}
            </NavItem>
            <NavItem>
                {this.navLink("SIGN OUT", "/logout", this.handleLogout)}
            </NavItem>
        </Nav>;
    };

    private getGamblerAccountBalance() {
        if (this.props.gambler) {
            return this.props.gambler.money - this.props.gambler.pending;
        }
        return 0;
    }

    navLink = (label: string, path: string, onClick?: (e) => void) => {
        return <NavLink style={navbarLinkStyle} tag={Link} to={path} onClick={onClick}>{label}</NavLink>;
    };

    isAdmin = () => {
        return !!this.props.gambler && this.props.league.admin === this.props.gambler.user.id;
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: isLoggedIn(state),
        league: getLeague(state),
        gambler: getGamblerWithAccount(state, state.gambler.id),
        cartBets: getCartBets(state),
    };
};

const mapDispatchToProps = {
    handleLogout: logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavHeader);


