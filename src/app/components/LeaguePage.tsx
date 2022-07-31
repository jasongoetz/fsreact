import React from "react";
import {Col, Container, Row} from "reactstrap";
import {MiniStandings} from "./MiniStandings";
import {Rules} from "./Rules";
import MiniBets from "./MiniBets";
import HomePagePanel from "./HomePagePanel";
import {useGlobalStores} from "../context/global_context";
import {observer} from "mobx-react";
import {LoadingContainer} from "./LoadingContainer";

const homePageStyle = {
    marginTop: "20px"
};

const homePagePanelStyle = {
    padding: "10px 15px"
};

const LeaguePage: React.FC = observer(() => {
    const { leagueStore } = useGlobalStores();
    const league = leagueStore.league;

    if (!league) {
        return <LoadingContainer/>;
    }

    return (
        <div>
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
                        <HomePagePanel title="Pending Big Bets" linkUrl="/scores" action="SEE ALL BETS">
                            <MiniBets/>
                        </HomePagePanel>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default LeaguePage;
