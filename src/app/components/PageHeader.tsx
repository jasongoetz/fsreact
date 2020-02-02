import React from "react";

const pageHeaderStyle = {
    marginTop: "20px",
    fontSize: "1.25rem"
};

export const PageHeader = props => <div style={pageHeaderStyle}>{props.children}</div>;
