import {Component} from "react";
import React from "react";
import {Button, Nav, NavItem, NavLink} from "reactstrap";
import {Colors} from "../theme/theme";

const menuStyle = {
    width: "100%",
    top: "0px",
    bottom: "0px",
    height: "100vh",
    paddingTop: "50px",
    zIndex: 2000,
    fontSize: "28px",
    opacity: .97,
    background: `linear-gradient(${Colors.lighterDarkBlue}, ${Colors.darkBlue})`,
    color: Colors.white,
};

const closeButtonStyle = {
    top: 0,
    left: 0,
    marginLeft: "18px",
    marginTop: "0px",
    backgroundColor: 'transparent',
    border: 0,
    fontSize: "28px",
};

const navLinkStyle = {
    color: Colors.white,
    fontWeight: 400,
    marginBottom: "10px",
};

const accountBalanceStyle = {
    color: Colors.white,
    fontSize: "16px",
    bottom: "0px",
    right: "0px",
    marginBottom: "15px",
    width: "100%",
};

export interface State {
}

export interface Props {
    isAdmin: boolean;
    gamblerMoney: number;
    closeMenu: () => void;
}

class MobileMenu extends Component<Props, State> {

    render() {
        return (
            <div className="mobile-menu" style={menuStyle}>
                <Button type="button" style={closeButtonStyle} className="menu-close" onClick={this.props.closeMenu}>
                    <span>&times;</span>
                </Button>
                <Nav vertical>
                    {this.navItem("HOME", "/")}
                    {this.navItem("GAMES", "/games")}
                    {this.navItem("STANDINGS", "/standings")}
                    {this.navItem("BETS", "/bets")}
                    {this.props.isAdmin && this.navItem("MANAGE", "/league/settings")}
                    {this.navItem("PROFILE", "/profile")}
                    {this.navItem("PASSWORD", "/user/password/")}
                    {this.navItem("SIGN OUT", "/logout")}
                </Nav>

                <div>
                    <a style={accountBalanceStyle} className="menu-account-bottom money" href="/account">
                        You have ${this.props.gamblerMoney}.00
                    </a>
                </div>

            </div>
        );
    }

    navItem = (label: string, href: string) => {
        return <NavItem><NavLink style={navLinkStyle} href={href}>{label}</NavLink></NavItem>;
    };
}

export default MobileMenu;

