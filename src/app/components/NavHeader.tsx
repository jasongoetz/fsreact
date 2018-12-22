import {Component} from "react";
import React from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

export interface Props {
}

export interface State {
    collapsed: boolean;
    showBetSlip: boolean;
}

class NavHeader extends Component<Props, State> {

    state = {
        collapsed: true,
        showBetSlip: false,
        authenticated: true,
    };

    toggleNavbar = () => {
        alert("HEYYOOOO");
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    // toggleBetSlip = () => {
    //     this.setState({
    //         showBetSlip: !this.state.showBetSlip
    //     });
    // };

    render() {
        return (
            <Navbar className="navbar-inverse" fixed="top" light expand="md">

                <NavbarToggler onClick={this.toggleNavbar}/>
                <Collapse isOpen={!this.state.collapsed} navbar>
                    {this.getNavBar(false)}
                </Collapse>

                <NavbarBrand>FAKE STACKS</NavbarBrand>

                {/*<NavbarToggler onClick={this.toggleBetSlip} />*/}
                {/*<Collapse isOpen={!!this.state.showBetSlip} navbar>*/}
                    {/*{this.getNavBar(true)}*/}
                {/*</Collapse>*/}

            </Navbar>
        );
    }

    private getNavBar(isToggleBar: boolean) {
        return <Nav navbar>
            {isToggleBar &&
                <NavItem>
                    <NavLink href="/">HOME</NavLink>
                </NavItem>
            }

            {this.state.authenticated &&
                <NavItem>
                    <NavLink href="/games">GAMES</NavLink>
                </NavItem>
            }
            {this.state.authenticated &&
                <NavItem>
                    <NavLink href="/standings">STANDINGS</NavLink>
                </NavItem>
            }
        </Nav>;
    }
}

export default NavHeader;

