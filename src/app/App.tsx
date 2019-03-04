import React, { Component } from 'react';
import logo from './logo.svg';
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
                    <div style={appStyle} className="App MainBody">
                        <NavHeader
                            isAdmin={true}
                            toggleMobileMenu={this.toggleMobileMenu}
                            toggleBetSlip={() => alert("NOT DONE YET")}
                        />

                        {this.state.showMobileMenu && <MobileMenu
                            isAdmin={true}
                            gamblerMoney={0}
                            closeMenu={this.toggleMobileMenu}
                        />}

                        <Route exact path="/login" component={this.LoginPage} redirectTo="/" />
                        <Route exact path="/" component={this.HomePage} />
                        <Route path="/games" component={this.GamesPage} />
                        <Route path="/standings" component={this.StandingsPage} />
                        <Route path="/bets" component={this.BetsPage} />
                        <Route path="/league/settings" component={this.LeagueManagePage} />
                    </div>
                </Router>
            </Provider>
        );
    }

    HomePage = () => {
        console.log("HOME");
        return (
            <div>
                <h2>Home</h2>
            </div>
        )
    };

    LoginPage = () => {
        console.log("LOGIN");
        return (
            <ImagePage headline={"PUT YOUR FAKE MONEY WHERE YOUR MOUTH IS."}>
                <Login/>
            </ImagePage>
        )
    };

    GamesPage = () => {
        console.log("GAMES");
        return (
            <div>
                <h2>Games</h2>
            </div>
        )
    };

    StandingsPage = () => {
        console.log("STANDINGS");
        return (
            <div>
                <h2>Standings</h2>
            </div>
        )
    };

    BetsPage = () => {
        console.log("BETS");
        return (
            <div>
                <h2>Bets</h2>
            </div>
        )
    };

    LeagueManagePage = () => {
        console.log("MANAGE");
        return (
            <div>
                <h2>Manage</h2>
            </div>
        )
    };
}

export default App;
