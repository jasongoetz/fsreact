import React from "react";
import {Link} from "react-router-dom";
import {FSWideButton} from "./FSComponents";
import {Colors} from "../theme/theme";

interface Props {
    title: string;
    linkUrl: string;
    action: string;
}

const innerHomePagePanelStyle = {
    backgroundColor: Colors.lightestGray,
    padding: "30px 20px 10px 20px"
};

const homePagePanelContentStyle = {
    height: "400px"
};

const homePagePanelContentInnerStyle = {
    paddingTop: "10px"
};

const panelActionRowStyle = {
    marginBottom: "10px"
};

const HomePagePanel: React.FC<Props> = ({children, title, linkUrl, action}) =>
    <div style={innerHomePagePanelStyle}>
        <h5>{title}</h5>
        <div style={homePagePanelContentStyle}>
            <div style={homePagePanelContentInnerStyle}>
                {children}
            </div>
        </div>
        <div style={panelActionRowStyle}>
            <Link to={linkUrl}>
                <FSWideButton color="primary" size="lg">{action}</FSWideButton>
            </Link>
        </div>
    </div>;

export default HomePagePanel;
