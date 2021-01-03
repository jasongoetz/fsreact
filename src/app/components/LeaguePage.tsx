import React from "react";
import {Col, Container, Row} from "reactstrap";
import {MiniStandings} from "./MiniStandings";
import {Rules} from "./Rules";
import MiniBets from "./MiniBets";
import HomePagePanel from "./HomePagePanel";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";
import {LoadingContainer} from "./LoadingContainer";
import styled from "@emotion/styled";
import {useMediaQuery} from "react-responsive";
import {LeagueSwitcher} from "./LeagueSwitcher";

const leagueHeaderStyle = {
    top: "40px",
    right: "0px",
    position: 'absolute' as 'absolute',
    width: "100%",
    backgroundColor: "#003D63",
    height: "75px",
    color: "#FFFFFF"
};

const LeagueNameHeader = styled.div<{mobile: boolean}>(
    {
        marginTop: "25px",
        display: "inline-block",
        textTransform: 'uppercase',
    },
    ({ mobile }) => {
        return {
            marginTop: mobile ? "30px" : "25px",
            fontSize: mobile ? "20px" : "28px",
        }
    },
);

const homePageStyle = {
    marginTop: "75px"
};

const homePagePanelStyle = {
    padding: "10px 15px"
};

const LeaguePage: React.FC = observer(() => {

    const isMobile = useMediaQuery({ query: '(max-width: 415px)' });

    const { userStore, leagueStore } = useGlobalStores();
    const league = leagueStore.league;

    if (!league) {
        return <LoadingContainer/>;
    }

    return (
        <div>
            <div style={leagueHeaderStyle}>
                <Container>
                    <LeagueNameHeader mobile={isMobile}>{league.name}</LeagueNameHeader>
                    <LeagueSwitcher leagues={userStore.leagues} currentLeagueId={league.id} mobile={isMobile}/>
                </Container>
            </div>

            <Container style={homePageStyle}>
                <Row>
                    <Col style={homePagePanelStyle} xs={{size: 12}} md={{size: 8, offset: 2}}
                         lg={{size: 4, offset: 0}}>
                        <HomePagePanel title="The Rules" linkUrl="/games" action="START BETTING">
                            <Rules/>
                        </HomePagePanel>
                    </Col>

                    <Col style={homePagePanelStyle} xs={{size: 12}} md={{size: 8, offset: 2}}
                         lg={{size: 4, offset: 0}}>
                        <HomePagePanel title="Leaderboard" linkUrl="/standings" action="SEE THE STANDINGS">
                            <MiniStandings/>
                        </HomePagePanel>
                    </Col>

                    <Col style={homePagePanelStyle} xs={{size: 12}} md={{size: 8, offset: 2}}
                         lg={{size: 4, offset: 0}}>
                        <HomePagePanel title="Pending Big Bets" linkUrl="/bets" action="SEE ALL BETS">
                            <MiniBets/>
                        </HomePagePanel>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default LeaguePage;
