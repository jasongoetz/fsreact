import React from "react";
import {Link} from "react-router-dom";
import {FSWideButton} from "./FSComponents";

export interface State {
}

export interface Props {
    title: string;
    linkUrl: string;
    action: string;
}

const innerHomePagePanelStyle = {
    border: "2px solid #c0c0c0",
    padding: "10px 20px"
};

const homePagePanelHeading = {
    color: "#003D63"
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
        <h3 style={homePagePanelHeading}>{title}</h3>
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
