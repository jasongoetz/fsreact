import {Component} from "react";
import React from "react";
import {
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

export interface Props {
    league: League;
    gambler: GamblerInfo;
    loggedIn: boolean;
    toggleMobileMenu: () => void;
    toggleBetSlip: () => void;
    handleLogout: () => void;
}

const navbarStyle = {
    backgroundColor: Colors.lightGray,
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
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

class NavHeader extends Component<Props> {

    toggleMenu = () => {
        this.props.toggleMobileMenu();
    };

    toggleBetSlip = () => {
        this.props.toggleBetSlip();
    };

    handleLogout = (e) => {
        e.preventDefault();
        this.props.handleLogout();
    };

    render() {
        return (
            <Navbar style={navbarStyle} fixed="top" light expand="md">
                <Container style={navbarContainerStyle}>
                    <NavbarToggler style={menuButtonStyle} onClick={this.toggleMenu}/>
                    <Collapse className="w-100" navbar>
                        {this.props.loggedIn && this.getLeftNavBar()}
                    </Collapse>

                    <NavbarBrand style={brandStyle} href="/" className="fixedTop" mx="auto">FAKE STACKS</NavbarBrand>

                    <NavbarToggler style={betSlipButtonStyle} onClick={this.toggleBetSlip}>
                        <span className="badge bet-slip-badge"></span>
                        <img src="/images/bets-menu.svg"/>
                    </NavbarToggler>

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
                {this.navLink(`$${this.getGamblerAccountBalance()}.00`, "/account")}
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
    };
};

const mapDispatchToProps = {
    handleLogout: logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavHeader);


