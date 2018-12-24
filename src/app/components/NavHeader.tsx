import {Component} from "react";
import React from "react";
import {
    Col,
    Collapse, Container, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink, Row,
    UncontrolledDropdown
} from "reactstrap";
import {Colors} from "../theme/theme";

export interface Props {
    isAdmin: boolean;
    toggleMobileMenu: any; //TODO: Change from any to function
    toggleBetSlip: any; //TODO: Change from any to function
}

export interface State {
    showBetSlip: boolean;
    authenticated: boolean;
    user: object
}

const navbarStyle = {
    backgroundColor: Colors.lightGray,
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

class NavHeader extends Component<Props, State> {

    state = {
        showBetSlip: false,
        authenticated: true,
        user: {
            id: 1,
            firstName: 'Jason',
            lastName: 'Goetz',
        }
    };

    toggleMenu = () => {
        this.props.toggleMobileMenu();
    };

    toggleBetSlip = () => {
        this.props.toggleBetSlip();
    };

    render() {
        return (
            <Navbar style={navbarStyle} fixed="top" light expand="md">

                <NavbarToggler style={menuButtonStyle} onClick={this.toggleMenu}/>
                <Collapse className="w-100" navbar>
                    {this.state.authenticated && this.getLeftNavBar()}
                </Collapse>

                <NavbarBrand style={brandStyle} href="/" className="fixedTop flex-fill justify-content-center" mx="auto">FAKE STACKS</NavbarBrand>

                <NavbarToggler style={betSlipButtonStyle} onClick={this.toggleBetSlip}>
                    <span className="badge bet-slip-badge"></span>
                    <img src="/images/bets-menu.svg"/>
                </NavbarToggler>

                <Collapse className="w-100 justify-content-end" navbar>
                    {this.state.authenticated && this.getRightNavBar()}
                </Collapse>

            </Navbar>
        );
    }

    getLeftNavBar =  () => {
        return <Nav className="justify-content-left" navbar>
            <NavItem>{this.navLink("GAMES", "/games")}</NavItem>
            <NavItem>{this.navLink("STANDINGS", "/standings")}</NavItem>
            <NavItem>{this.navLink("BETS", "/bets")}</NavItem>
            {this.props.isAdmin && <NavItem>{this.navLink("MANAGE", "/league/settings")}</NavItem>}
        </Nav>;
    };

    getRightNavBar = () => {
        return <Nav className="justify-content-end" navbar>
            <UncontrolledDropdown>
                <DropdownToggle style={navbarLinkStyle} nav>
                    {this.state.user.firstName.toUpperCase()} {this.state.user.lastName.toUpperCase()}
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
                {this.navLink("$500.00", "/account")}
            </NavItem>
            <NavItem>
                {this.navLink("SIGN OUT", "/logout")}
            </NavItem>
        </Nav>;
    };

    navLink = (label: string, href: string) => {
        return <NavLink style={navbarLinkStyle} href={href}>{label}</NavLink>;
    };
}

export default NavHeader;

