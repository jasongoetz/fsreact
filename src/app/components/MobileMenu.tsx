import React from "react";
import {Button, Nav, NavItem, NavLink} from "reactstrap";
import {Colors} from "../theme/theme";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {logout} from "../auth/authActions";

const MobileMenuOverlay = styled.div({
    width: "100%",
    top: "0px",
    bottom: "0px",
    height: "100vh",
    paddingTop: "50px",
    zIndex: 2000,
    fontSize: "28px",
    opacity: .97,
    textAlign: 'center',
    position: 'fixed',
    background: `linear-gradient(${Colors.lighterDarkBlue}, ${Colors.darkBlue})`,
    color: Colors.white,
});

const closeButtonStyle = {
    top: 0,
    left: 0,
    marginLeft: "10px",
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

interface Props {
    isAdmin: boolean;
    gamblerMoney: number;
    closeMenu: () => void;
}

const MobileMenu: React.FC<Props> = ({closeMenu, isAdmin, gamblerMoney}) => {

    const navLink = (label: string, path: string, onClick?: (e) => void) => {
        return <NavItem><NavLink style={navLinkStyle} tag={Link} to={path} onClick={onClick}>{label}</NavLink></NavItem>;
    };

    const handleLogout = async () => {
        await logout();
        closeMenu();
    };

    return (
        <MobileMenuOverlay>
            <Button type="button" style={closeButtonStyle} className="menu-close" onClick={closeMenu}>
                <span>&times;</span>
            </Button>
            <Nav vertical>
                {navLink("HOME", "/", closeMenu)}
                {navLink("GAMES", "/games", closeMenu)}
                {navLink("STANDINGS", "/standings", closeMenu)}
                {navLink("BETS", "/bets", closeMenu)}
                {isAdmin && navLink("MANAGE", "/league/settings", closeMenu)}
                {navLink("PROFILE", "/profile", closeMenu)}
                {navLink("PASSWORD", "/user/password/", closeMenu)}
                {navLink("SIGN OUT", "/", handleLogout)}
            </Nav>

            <div>
                <a style={accountBalanceStyle} className="menu-account-bottom money" href="/account">
                    You have ${gamblerMoney}.00
                </a>
            </div>

        </MobileMenuOverlay>
    );

};

export default MobileMenu;

