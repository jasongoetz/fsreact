import React from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavLink, UncontrolledDropdown} from "reactstrap";
import {League, User} from "../types";
import {Colors} from "../theme/theme";
import {loadCart, storeCart} from "../cart/cart.actions";
import {switchLeague} from "../user/user.actions";
import {useHistory} from "react-router-dom";

const brandStyle = {
    color: Colors.brandGreen,
    fontSize: "24px",
    position: 'absolute' as 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'block',
    zIndex: 100,
};

interface Props {
    currentLeague: League;
    user: User;
    userLeagues: League[];
}

export const LeagueNavbar: React.FC<Props> = ({ currentLeague, user, userLeagues }) => {

    const history = useHistory();

    const switchToLeague = async (leagueId: number) => {
        await storeCart();
        await switchLeague(leagueId);
        await loadCart();
    }

    return <Navbar light expand="lg" container="fluid">
        <Nav style={{marginBottom: 50}} navbar>
            <UncontrolledDropdown style={brandStyle} nav inNavbar>
                <DropdownToggle id='league-menu' data-testid='league-switcher' style={{color: Colors.brandBlack}} nav caret>
                    {currentLeague.name}
                </DropdownToggle>
                <DropdownMenu end>
                    {currentLeague.adminId === user.id && (
                        <>
                            <DropdownItem data-testid='league-settings' onClick={() => history.push('/league/settings')}>
                                Manage League
                            </DropdownItem>
                            <DropdownItem divider/>
                        </>
                    )}
                    {userLeagues.length > 1 && userLeagues.map((league, i) =>
                        <DropdownItem
                            data-testid={'lg-switcher-item-'+i}
                            onClick={() => switchToLeague(league.id)}
                            key={league.id}
                        >
                            {league.name} ({league.sport})
                        </DropdownItem>
                    )}
                    <DropdownItem>
                        <NavLink href="/league/new">+ Create League</NavLink>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    </Navbar>;
}