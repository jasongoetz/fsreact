import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavHeader from "./components/NavHeader";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import {Fonts} from "./theme/theme";
import ImagePage from "./components/ImagePage";

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

              <ImagePage headline={"PUT YOUR FAKE MONEY WHERE YOUR MOUTH IS."}>
                  <Login/>
              </ImagePage>
          </div>
        );
    }
}

export default App;
