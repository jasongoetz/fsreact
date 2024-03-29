import React, {FC, useState} from "react";
import {
    Badge,
    Collapse,
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
import {Gambler, GamblerInfo, League, User} from "../types";
import styled from "@emotion/styled";
import BetSlip from "./BetSlip";
import {logout} from "../auth/auth.actions";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";
import {useGoogleLogout} from "react-google-login";
import {requireEnv} from "../../util/require-env";
import {useScreenSize} from "../hooks/useScreenSize";

const navbarStyle = {
    backgroundColor: Colors.white,
    padding: "15px 3px",
};

const navbarLinkStyle = (underline) => ({
    fontSize: "16px",
    margin: "0px 15px",
    padding: "0px",
    color: Colors.brandBlack,
    borderBottom: underline ? `3px solid ${Colors.brandLightGreen}` : undefined,
});

const brandStyle = {
    color: Colors.brandGreen,
    fontSize: "32px",
    position: 'absolute' as 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'block',
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
    backgroundColor: Colors.badgeRed,
    position: 'absolute' as 'absolute',
    top: '-3px',
    right: '-5px',
};

const BetSlipCollapse = styled(Collapse)({
    width: '100%',
    height: "100vh",
    top: "60px",
    left: '0px',
    zIndex: 4,
    background: 'rgba(255, 255, 255, 0.7)',
    overflow: 'scroll',
    position: 'absolute',
    maxHeight: 'calc(100vh - 50px)',
});

const TranslucentOverlay = styled.div({
    borderTop: '1px solid',
    opacity: 0.75,
    background: 'white',
})

interface Props {
    toggleMobileMenu: () => void;
}

const NavHeader: FC<Props> = observer(({toggleMobileMenu}) => {

    const { isLargeMobile } = useScreenSize();

    const [mobileBetSlipOpen, setMobileBetSlipOpen] = useState(false);

    const {authStore, cartStore, gamblerStore, leagueStore, userStore} = useGlobalStores();

    const toggleBetSlip = () => {
        setMobileBetSlipOpen(!mobileBetSlipOpen);
    };

    const { signOut } = useGoogleLogout({
        onLogoutSuccess: async () => await logout(),
        clientId: requireEnv('REACT_APP_GOOGLE_CLIENT_ID')
    })

    const handleLogout = async (e) => {
        e.preventDefault();
        await signOut();
        // "onLogoutSuccess" never happens if the user wasn't logged in through google
        await logout();
    };

    const getGamblerAccountBalance = (gambler: GamblerInfo) => {
        return gambler.tallies.money - gambler.tallies.pending;
    };

    const navLink = (label: string, path: string, underline: boolean, onClick?: (e) => void, id?: string) => {
        return <NavLink
            id={id ?? label.toLowerCase().split(' ').join('-')}
            tag={Link}
            to={path}
            onClick={onClick}
            style={navbarLinkStyle(underline)}
        >
            {label}
        </NavLink>;
    };

    const getLeftNavBar = (league: League, gambler?: Gambler) => {
        return <Nav className="justify-content-left" navbar>
            <NavItem>{navLink("GAMES", "/games", true)}</NavItem>
            <NavItem>{navLink("STANDINGS", "/standings", true)}</NavItem>
            <NavItem>{navLink("SCORES", "/scores", true)}</NavItem>
        </Nav>;
    };

    const getRightNavBar = (user?: User, gambler?: GamblerInfo) => {
        return <Nav className="justify-content-end" navbar>
            <UncontrolledDropdown>
                {!!user &&
                    <DropdownToggle style={navbarLinkStyle(true)} nav>
                        {user.firstName} {user.lastName}
                    </DropdownToggle>
                }
                <DropdownMenu end>
                    <DropdownItem>
                        {navLink("EDIT", "/profile", false)}
                    </DropdownItem>
                    {userStore.user?.fsAccountId &&
                        <DropdownItem>
                            {navLink("UPDATE PASSWORD", "/user/password", false)}
                        </DropdownItem>
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
            {!!gambler &&
                <NavItem>
                    {navLink(`$${getGamblerAccountBalance(gambler).toFixed(2)}`, "/account", true, undefined, 'account-balance')}
                </NavItem>
            }
            <NavItem>
                {navLink("SIGN OUT", "/logout", true, handleLogout)}
            </NavItem>
        </Nav>;
    };

    const gambler = leagueStore.gamblers.find(g => g.id === gamblerStore.gambler?.id)
    const authenticated = authStore.authenticated;

    if (!authenticated) {
        return <></>
    }

    return (
        <Navbar style={navbarStyle} fixed="top" light expand="lg">
            {/*<Container style={navbarContainerStyle}>*/}
                <NavbarToggler style={menuButtonStyle} onClick={toggleMobileMenu}/>
                <Collapse navbar>
                    {authenticated && leagueStore.league && getLeftNavBar(leagueStore.league, gambler)}
                </Collapse>

                <NavbarBrand style={brandStyle} href="/" mx="auto">FAKE STACKS</NavbarBrand>

                <NavbarToggler style={betSlipButtonStyle}>
                    <span style={badgeContainerStyle}>
                        {cartStore.bets.length > 0 && <Badge style={betSlipBadgeStyle} pill>
                            {cartStore.bets.length}
                        </Badge>}
                        <img src="/images/bets-menu.svg" alt="Bets Menu" onClick={toggleBetSlip}/>
                    </span>
                </NavbarToggler>

                {authenticated && gambler && isLargeMobile &&
                    <BetSlipCollapse isOpen={mobileBetSlipOpen}>
                        <BetSlip gamblerId={gambler.id} onReview={() => setMobileBetSlipOpen(false)} isMobile />
                        <TranslucentOverlay/>
                    </BetSlipCollapse>
                }

                <Collapse className="justify-content-end" navbar>
                    {authenticated && getRightNavBar(userStore.user, gambler)}
                </Collapse>
            {/*</Container>*/}
        </Navbar>
    );
});

export default NavHeader;


