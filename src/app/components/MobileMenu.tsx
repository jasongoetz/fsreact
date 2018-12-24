import {Component} from "react";
import React from "react";
import {Button, Nav, NavItem, NavLink} from "reactstrap";
import {Colors} from "../theme/theme";

const menuStyle = {
    //textAlign: "center",
    width: "100%",
    top: "0px",
    bottom: "0px",
    height: "100vh",
    paddingTop: "50px",
    zIndex: 2000,
    fontSize: "28px",
    //fontWeight: 'lighter',
    opacity: .97,
    background: `linear-gradient(${Colors.lighterDarkBlue}, ${Colors.darkBlue})`,
    color: Colors.white,
};

export interface State {
}

export interface Props {
    isAdmin: boolean;
    gamblerMoney: number;
}

class MobileMenu extends Component<Props, State> {

    state = {
        showMobileMenu: true,
        showBetSlip: false,
        authenticated: true,
    };

    render() {
        return (
            <div className="mobile-menu" style={menuStyle}>
                <Button type="button" className="menu-close mobile-show">
                    <span>&times;</span>
                </Button>
                <Nav vertical>
                    <NavItem>
                        <NavLink href="/">HOME</NavLink>
                    </NavItem>
                    <NavItem><NavLink href="/games">GAMES</NavLink></NavItem>
                    <NavItem><NavLink href="/standings">STANDINGS</NavLink></NavItem>
                    <NavItem><NavLink href="/bets">BETS</NavLink></NavItem>
                    {this.props.isAdmin && <NavItem><NavLink href="/league/settings">MANAGE</NavLink></NavItem>}
                    <NavItem><NavLink href="/profile">PROFILE</NavLink></NavItem>
                    <NavItem><NavLink href="/user/password/<%= session.userId %>">PASSWORD</NavLink></NavItem>
                    <NavItem><NavLink href="/logout">SIGN OUT</NavLink></NavItem>
                </Nav>

                <div className="menu-bottom">
                    <a className="menu-account-bottom money" href="/account" id="account-balance">
                        You have ${this.props.gamblerMoney}.00
                    </a>
                </div>

            </div>
        );
    }
}

export default MobileMenu;

