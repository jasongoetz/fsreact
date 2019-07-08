import React, {Component} from "react";

const pageHeaderStyle = {
    marginTop: "20px",
    fontSize: "1.25rem"
};

export class PageHeader extends Component {
    render() {
        return <div style={pageHeaderStyle}>{this.props.children}</div>;
    }
}