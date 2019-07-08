import {Component} from "react";
import React from "react";
import {connect} from "react-redux";
import {loadUserContext} from "../user/userActions";
import {getLeague} from "../league/leagueSelector";
import {Col, Container, Row} from "reactstrap";
import MiniStandings from "./MiniStandings";
import Rules from "./Rules";
import MiniBets from "./MiniBets";
import HomePagePanel from "./HomePagePanel";
import {League} from "../types";

export interface Props {
    loadUserContext: () => void;
    league: League;
}

export interface State {
}

const leagueHeaderStyle = {
    top: "40px",
    right: "0px",
    width: "100%",
    backgroundColor: "#003D63",
    height: "75px",
    color: "#FFFFFF"
};

const leagueHeaderLeagueNameStyle = {
    fontSize: "28px",
    marginTop: "25px",
    display: "inline-block",
};

const homePageStyle = {
    marginTop: "75px"
};

const homePagePanelStyle = {
    padding: "10px 15px"
};

class LeaguePage extends Component<Props, State> {

    async componentDidMount() {
        await this.props.loadUserContext();
    }

    render() {
        return <div>

            <div style={leagueHeaderStyle} className="league-header">
                <Container>
                    <div style={leagueHeaderLeagueNameStyle}>
                        { this.props.league.name && this.props.league.name.toUpperCase() }
                    </div>
                </Container>
            </div>

            <Container style={homePageStyle}>
                <Row>
                    <Col style={homePagePanelStyle} xs={{size: 12}} sm={{size: 4}}>
                        <HomePagePanel title="The Rules" linkUrl="/games" action="START BETTING">
                            <Rules/>
                        </HomePagePanel>
                    </Col>

                    <Col style={homePagePanelStyle} xs={{size: 12}} sm={{size: 4}}>
                        <HomePagePanel title="Leaderboard" linkUrl="/standings" action="SEE THE STANDINGS">
                            <MiniStandings/>
                        </HomePagePanel>
                    </Col>

                    <Col style={homePagePanelStyle} xs={{size: 12}} sm={{size: 4}}>
                        <HomePagePanel title="Pending Big Bets" linkUrl="/bets" action="SEE ALL BETS">
                            <MiniBets/>
                        </HomePagePanel>
                    </Col>
                </Row>
            </Container>

        </div>;
    }

}


const mapStateToProps = (state: State) => {
    return {
        league: getLeague(state),
    };
};

const mapDispatchToProps = {
    loadUserContext,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LeaguePage);
