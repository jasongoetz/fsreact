import React, { Component } from 'react';
import './App.css';
import NavHeader from "./components/NavHeader";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import {Fonts} from "./theme/theme";
import ImagePage from "./components/ImagePage";
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/PrivateRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import LeaguePage from "./components/LeaguePage";
import GamesPage from "./components/GamesPage";
import Standings from "./components/Standings";
import AccountPage from './components/AccountPage';
import LeagueBetList from "./components/LeagueBetList";
import ConfirmationPage from "./components/ConfirmationPage";

export interface State {
    showMobileMenu: boolean
}

const appStyle = {
    fontFamily: Fonts.mainSite
};

class App extends Component {

    state = {
        showMobileMenu: false,
    };

    toggleMobileMenu = () => {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu
        });
    };

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div style={appStyle} className="App">
                        <NavHeader
                            toggleMobileMenu={this.toggleMobileMenu}
                            toggleBetSlip={() => alert("NOT DONE YET")}
                        />

                        {this.state.showMobileMenu && <MobileMenu
                            isAdmin={true}
                            gamblerMoney={0}
                            closeMenu={this.toggleMobileMenu}
                        />}

                        <UnauthenticatedRoute exact path="/login" component={this.LoginPage} redirectTo="/" />
                        <PrivateRoute exact path="/" component={this.HomePage} />
                        <PrivateRoute exact path="/games" component={this.GamePage} />
                        <PrivateRoute exact path="/standings" component={this.StandingsPage} />
                        <PrivateRoute exact path="/bets" component={this.BetsPage} />
                        <PrivateRoute exact path="/account" component={this.AccountPage}/>
                        <PrivateRoute exact path="/transaction/show/:gamblerId" component={this.AccountPage}/>
                        <PrivateRoute exact path="/league/settings" component={this.LeagueManagePage} />
                        <PrivateRoute exact path="/confirmation" component={this.ConfirmationPage} />
                    </div>
                </Router>
            </Provider>
        );
    }

    HomePage = (navProps) => {
        return (
            <LeaguePage {...navProps}/>
        )
    };

    LoginPage = (navProps) => {
        return (
            <ImagePage headline={"PUT YOUR FAKE MONEY WHERE YOUR MOUTH IS."}>
                <Login {...navProps}/>
            </ImagePage>
        )
    };

    GamePage = () => {
        return <GamesPage/>;
    };

    StandingsPage = () => {
        return <Standings/>;
    };

    BetsPage = () => {
        return <LeagueBetList/>;
    };

    LeagueManagePage = () => {
        return (
            <div>
                <h2>Manage</h2>
            </div>
        )
    };

    ConfirmationPage = () => {
        return <ConfirmationPage/>;
    }

    AccountPage = ({match}) => {
        return <AccountPage gamblerId={match.params.gamblerId}/>
    }
}

export default App;
