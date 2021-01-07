import React from "react";
import {Button, Nav, NavItem, NavLink} from "reactstrap";
import {Colors} from "../theme/theme";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {logout} from "../auth/auth.actions";
import {useGoogleLogout} from "react-google-login";
import {requireEnv} from "../../util/require-env";
import {useGlobalStores} from "../context/global_context";

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
    position: 'absolute' as 'absolute',
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
    position: 'absolute' as 'absolute',
    color: Colors.white,
    fontSize: "16px",
    bottom: "0px",
    right: "0px",
    marginBottom: "15px",
    width: "100%",
};

interface Props {
    isAdmin: boolean;
    closeMenu: () => void;
}

const MobileMenu: React.FC<Props> = ({closeMenu, isAdmin}) => {

    const { gamblerStore, leagueStore } = useGlobalStores();

    const navLink = (label: string, path: string, onClick?: (e) => void) => {
        return <NavItem><NavLink style={navLinkStyle} tag={Link} to={path} onClick={onClick}>{label}</NavLink></NavItem>;
    };

    const { signOut } = useGoogleLogout({
        clientId: requireEnv('REACT_APP_GOOGLE_CLIENT_ID'),
    })

    const handleLogout = async () => {
        await signOut();
        await logout();
        closeMenu();
    };

    const gambler = leagueStore.gamblers.find(g => g.id === gamblerStore.gambler?.id)
    const gamblerMoney = gambler ? gambler.money - gambler.pending : 0;

    return (
        <MobileMenuOverlay>
            <Button type="button" style={closeButtonStyle} onClick={closeMenu}>
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
                <NavItem style={accountBalanceStyle}>
                    <NavLink style={navLinkStyle} tag={Link} to="/account" onClick={closeMenu}>You have ${gamblerMoney.toFixed(2)}</NavLink>
                </NavItem>
            </Nav>

        </MobileMenuOverlay>
    );

};

export default MobileMenu;

