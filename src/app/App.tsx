import React, {FC, useState} from 'react';
import './App.css';
import NavHeader from "./components/NavHeader";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import {Fonts} from "./theme/theme";
import ImagePage from "./components/ImagePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
import {getGambler} from "./gambler/gamblerSelector";
import {BetProvider} from './bets/betContext';
import {BettableProvider} from './bettables/bettableContext';
import {CartProvider} from "./cart/cartContext";
import {TransactionsProvider} from "./transactions/transactionsContext";

const appStyle = {
    fontFamily: Fonts.mainSite
};

const App: FC = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const HomePage = (navProps) => {
        return <UserContext>
            <LeaguePage {...navProps}/>
        </UserContext>;
    };

    const LoginPage = (navProps) => {
        return (
            <ImagePage headline={"PUT YOUR FAKE MONEY WHERE YOUR MOUTH IS."}>
                <Login {...navProps}/>
            </ImagePage>
        )
    };

    const GamePage = () => {
        return <UserContext>
            <LeagueConsumer select={[getLeague]}>
                {league => {
                    return <GamesPage sport={league.sport}/>
                }}
            </LeagueConsumer>
        </UserContext>
    };

    const StandingsPage = () => {
        return <UserContext>
            <Standings/>
        </UserContext>
    };

    const BetsPage = () => {
        return <UserContext>
            <LeagueConsumer select={[getLeague]}>
                {league => <LeagueBetList leagueId={league.id}/>}
            </LeagueConsumer>
        </UserContext>
    };

    const LeagueManagePage = () => {
        return <UserContext>
            <LeagueManagement/>}
        </UserContext>;
    };

    const BetConfirmationPage = () => {
        return <ConfirmationPage/>;
    };

    const UserAccountPage = ({match}) => {
        return <UserContext>
            <GamblerConsumer select={[getGambler]}>
                {gambler => {
                    const gamblerId = parseInt(match.params.gamblerId) || gambler.id;
                    return <LeagueConsumer
                        select={[(context => context.league.gamblers.find(gambler => gambler.id === gamblerId))]}>
                        {gamblerInfo =>
                            !!gamblerInfo ? <AccountPage gambler={gamblerInfo}/> : <div></div>
                        }
                    </LeagueConsumer>
                }}
            </GamblerConsumer>
        </UserContext>;
    };

    const ProfileManagePage = () => {
        return <ImagePage>
            <UserConsumer select={[getUser]}>
                {user => <ProfilePage user={user}/>}
            </UserConsumer>;
        </ImagePage>;
    };

    const PasswordManagePage = () => {
        return <ImagePage>
            <AuthConsumer select={[getUserId]}>
                {userId => <PasswordPage userId={userId}/>}
            </AuthConsumer>
        </ImagePage>;
    };

    const Page404 = () => {
        return <ErrorPanel statusCode={404}/>
    };

    return (
        <TransactionsProvider>
            <AuthProvider>
                <UserProvider>
                    <GamblerProvider>
                        <LeagueProvider>
                            <BetProvider>
                                <BettableProvider>
                                    <CartProvider>
                                        <Router>
                                            <div style={appStyle} className="App">
                                                <NavHeader
                                                    toggleMobileMenu={toggleMobileMenu}
                                                />

                                                {showMobileMenu && <MobileMenu
                                                    isAdmin={true}
                                                    gamblerMoney={0}
                                                    closeMenu={toggleMobileMenu}
                                                />}

                                                <Switch>
                                                    <UnauthenticatedRoute exact path="/login" component={LoginPage}
                                                                          redirectTo="/"/>
                                                    <PrivateRoute exact path="/" component={HomePage}/>
                                                    <PrivateRoute exact path="/games" component={GamePage}/>
                                                    <PrivateRoute exact path="/standings" component={StandingsPage}/>
                                                    <PrivateRoute exact path="/bets" component={BetsPage}/>
                                                    <PrivateRoute exact path="/account" component={UserAccountPage}/>
                                                    <PrivateRoute exact path="/transaction/show/:gamblerId"
                                                                  component={UserAccountPage}/>
                                                    <PrivateRoute exact path="/league/settings"
                                                                  component={LeagueManagePage}/>
                                                    <PrivateRoute exact path="/confirmation"
                                                                  component={BetConfirmationPage}/>
                                                    <PrivateRoute exact path="/profile" component={ProfileManagePage}/>
                                                    <PrivateRoute exact path="/user/password"
                                                                  component={PasswordManagePage}/>
                                                    <Route component={Page404}/>
                                                </Switch>
                                            </div>
                                        </Router>
                                    </CartProvider>
                                </BettableProvider>
                            </BetProvider>
                        </LeagueProvider>
                    </GamblerProvider>
                </UserProvider>
            </AuthProvider>
        </TransactionsProvider>
    );
};

export default App;
