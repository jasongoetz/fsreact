import React, {Component} from 'react';
import './App.css';
import NavHeader from "./components/NavHeader";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import {Fonts} from "./theme/theme";
import ImagePage from "./components/ImagePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider, useDispatch} from "react-redux";
import store from "./store";
import PrivateRoute from "./components/PrivateRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import LeaguePage from "./components/LeaguePage";
import GamesPage from "./components/GamesPage";
import Standings from "./components/Standings";
import AccountPage from './components/AccountPage';
import LeagueBetList from "./components/LeagueBetList";
import ConfirmationPage from "./components/ConfirmationPage";
import LeagueManagement from "./components/LeagueManagement";
import ErrorPanel from "./components/error/ErrorPanel";
import ProfilePage from "./components/ProfilePage";
import PasswordPage from "./components/PasswordPage";
import {getUserId} from "./auth/authSelectors";
import {AuthConsumer, AuthProvider} from "./auth/authContext";
import {getUser} from "./user/userSelector";
import {UserConsumer, UserProvider} from './user/userContext';
import {GamblerConsumer, GamblerProvider} from "./gambler/gamblerContext";
import {LeagueConsumer, LeagueProvider} from "./league/leagueContext";
import {getLeague} from "./league/leagueSelector";
import UserContext from "./components/UserContext";
import {loadGames} from "./bettables/bettableActions";
import {getGambler} from "./gambler/gamblerSelector";

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
                <AuthProvider>
                <UserProvider>
                <GamblerProvider>
                <LeagueProvider>
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

                            <Switch>
                                <UnauthenticatedRoute exact path="/login" component={this.LoginPage} redirectTo="/" />
                                <PrivateRoute exact path="/" component={this.HomePage} />
                                <PrivateRoute exact path="/games" component={this.GamesPage} />
                                <PrivateRoute exact path="/standings" component={this.StandingsPage} />
                                <PrivateRoute exact path="/bets" component={this.BetsPage} />
                                <PrivateRoute exact path="/account" component={this.UserAccountPage}/>
                                <PrivateRoute exact path="/transaction/show/:gamblerId" component={this.UserAccountPage}/>
                                <PrivateRoute exact path="/league/settings" component={this.LeagueManagePage} />
                                <PrivateRoute exact path="/confirmation" component={this.BetConfirmationPage} />
                                <PrivateRoute exact path="/profile" component={this.ProfileManagePage} />
                                <PrivateRoute exact path="/user/password" component={this.PasswordManagePage} />
                                <Route component={this.Page404} />
                            </Switch>
                        </div>
                    </Router>
                </LeagueProvider>
                </GamblerProvider>
                </UserProvider>
                </AuthProvider>
            </Provider>
        );
    }

    HomePage = (navProps) => {
        return <UserContext>
            <LeaguePage {...navProps}/>
        </UserContext>;
    };

    LoginPage = (navProps) => {
        return (
            <ImagePage headline={"PUT YOUR FAKE MONEY WHERE YOUR MOUTH IS."}>
                <Login {...navProps}/>
            </ImagePage>
        )
    };

    GamesPage = () => {
        const dispatch = useDispatch();
        return <UserContext>
            <LeagueConsumer select={[getLeague]}>
                {league => {
                    dispatch(loadGames(league.sport));
                    return <GamesPage />
                }}
            </LeagueConsumer>
        </UserContext>
    };

    StandingsPage = () => {
        return <UserContext>
            <Standings />
        </UserContext>
    };

    BetsPage = () => {
        return <UserContext>
            <LeagueConsumer select={[getLeague]}>
                {league => <LeagueBetList leagueId={league.id}/>}
            </LeagueConsumer>
        </UserContext>
    };

    LeagueManagePage = () => {
        return <UserContext>
            <LeagueManagement />}
        </UserContext>;
    };

    BetConfirmationPage = () => {
        return <ConfirmationPage />;
    };

    UserAccountPage = ({match}) => {
        return <UserContext>
            <GamblerConsumer select={[getGambler]}>
                {gambler => {
                    const gamblerId = match.params.gamblerId || gambler.id;
                    return <LeagueConsumer
                        select={[(context => context.league.gamblers.find(gambler => gambler.id == gamblerId))]}>
                        {gamblerInfo =>
                            !!gamblerInfo ? <AccountPage gambler={gamblerInfo}/> : <div></div>
                        }
                    </LeagueConsumer>
                }}
            </GamblerConsumer>
        </UserContext>;
    };

    ProfileManagePage = () => {
        return <ImagePage>
            <UserConsumer select={[getUser]}>
                {user => <ProfilePage user={user} />}
            </UserConsumer>;
        </ImagePage>;
    };

    PasswordManagePage = () => {
        return <ImagePage>
            <AuthConsumer select={[getUserId]}>
                {userId => <PasswordPage userId={userId} />}
            </AuthConsumer>
        </ImagePage>;
    };

    Page404 = () => {
        return <ErrorPanel statusCode={404}/>
    }
}

export default App;
