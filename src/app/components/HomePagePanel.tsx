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
    border: `2px solid ${Colors.gray}`,
    padding: "20px 20px 10px 20px"
};

const homePagePanelHeading = {
    color: Colors.lighterDarkBlue
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
        <h4 style={homePagePanelHeading}>{title}</h4>
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
