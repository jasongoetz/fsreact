import React from "react";
import styled from "@emotion/styled";

const PageHeading = styled.div<{subheading: boolean}>(
    {
        marginTop: "30px",
        fontSize: "1.25rem"
    },
    ({ subheading }) => {
        return {
            marginBottom: subheading ? "0px" : "20px",
        }
    },
);


const PageSubHeading = styled.div({
    fontSize: "0.75rem",
    marginBottom: "20px",
});

export const PageHeader = props => (
    <>
        <PageHeading subheading={!!props.subheader}>{props.children}</PageHeading>
        {props.subheader &&
            <PageSubHeading>{props.subheader}</PageSubHeading>
        }
    </>
);
