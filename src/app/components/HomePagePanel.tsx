import {Component} from "react";
import React from "react";
import HomePagePanelContent from "./MiniStandings";
import {Link} from "react-router-dom";
import {FSButton} from "./FSComponents";

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

class HomePagePanel extends Component<Props, State> {
    render() {
        return <div style={innerHomePagePanelStyle}>
            <h3 style={homePagePanelHeading}>{this.props.title}</h3>
            <div style={homePagePanelContentStyle}>
                <div style={homePagePanelContentInnerStyle}>
                    {this.props.children}
                </div>
            </div>
            <div style={panelActionRowStyle}>
                <Link to={this.props.linkUrl}>
                    <FSButton color="primary" size="lg">{this.props.action}</FSButton>
                </Link>
            </div>
        </div>;
    }
}

export default HomePagePanel;