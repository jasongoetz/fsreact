import 'mobx-react-lite/batchingForReactDom';
import React, {FC, useState} from 'react';
import './App.css';
import NavHeader from "./components/NavHeader";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import {Fonts} from "./theme/theme";
import ImagePage from "./components/ImagePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateLeagueRoute from "./components/routing/PrivateLeagueRoute";
import UnauthenticatedRoute from "./components/routing/UnauthenticatedRoute";
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
import UserContext from "./components/UserContext";
import Registration from "./components/Registration";
import PrivateUnaffiliatedRoute from "./components/routing/PrivateUnaffiliatedRoute";
import CreateLeagueForm from "./components/CreateLeagueForm";
import {useGlobalStores} from "./context/global_context";

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

    const RegistrationPage = (navProps) => {
        return (
            <ImagePage headline={"WELCOME TO FAKE STACKS."}>
                <Registration {...navProps}/>
            </ImagePage>
        )
    };

    const NewLeaguePage = (navProps) => {
        const {authStore} = useGlobalStores();
        if (authStore.userId) {
            return (
                <ImagePage headline={"CREATE YOUR LEAGUE."}>
                    <CreateLeagueForm userId={authStore.userId} {...navProps}/>
                </ImagePage>
            )
        }
    };

    const JoinLeaguePage = (navProps) => {
        return <div>JOIN A LEAGUE TODAY</div>;
    };

    const GamePage = () => {
        return <UserContext>
            <GamesPage/>
        </UserContext>
    };

    const StandingsPage = () => {
        return <UserContext>
            <Standings/>
        </UserContext>
    };

    const BetsPage = () => {
        return <UserContext>
            <LeagueBetList/>
        </UserContext>
    };

    const LeagueManagePage = () => {
        return <UserContext>
            <LeagueManagement/>
        </UserContext>;
    };

    const BetConfirmationPage = () => {
        return <ConfirmationPage/>;
    };

    const UserAccountPage = ({match}) => {
        return <UserContext>
            <AccountPage providedGamblerId={match.params.gamblerId}/>
        </UserContext>;
    };

    const ProfileManagePage = () => {
        const {userStore} = useGlobalStores();
        if (userStore.user) {
            return <ImagePage>
                <ProfilePage user={userStore.user}/>
            </ImagePage>;
        }
    };

    const PasswordManagePage = () => {
        const {authStore} = useGlobalStores();
        if (authStore.userId) {
            return <ImagePage>
                <PasswordPage userId={authStore.userId}/>
            </ImagePage>;
        }
    };

    const Page404 = () => {
        return <ErrorPanel statusCode={404}/>
    };

    return (
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
                    <UnauthenticatedRoute exact path="/login" component={LoginPage} redirectTo="/"/>
                    <UnauthenticatedRoute exact path="/register" component={RegistrationPage} redirectTo="/"/>
                    <PrivateLeagueRoute exact path="/" component={HomePage}/>
                    <PrivateUnaffiliatedRoute exact path="/league/join" component={JoinLeaguePage}/>
                    <PrivateUnaffiliatedRoute exact path="/league/new" component={NewLeaguePage}/>
                    <PrivateLeagueRoute exact path="/games" component={GamePage}/>
                    <PrivateLeagueRoute exact path="/standings" component={StandingsPage}/>
                    <PrivateLeagueRoute exact path="/bets" component={BetsPage}/>
                    <PrivateLeagueRoute exact path="/account" component={UserAccountPage}/>
                    <PrivateLeagueRoute exact path="/transaction/show/:gamblerId" component={UserAccountPage}/>
                    <PrivateLeagueRoute exact path="/league/settings" component={LeagueManagePage}/>
                    <PrivateLeagueRoute exact path="/confirmation" component={BetConfirmationPage}/>
                    <PrivateLeagueRoute exact path="/profile" component={ProfileManagePage}/>
                    <PrivateLeagueRoute exact path="/user/password" component={PasswordManagePage}/>
                    <Route component={Page404}/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
