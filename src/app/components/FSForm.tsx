import React from "react";
import {Col, Form, FormFeedback, Input} from "reactstrap";
import styled from "@emotion/styled";
import {Colors} from "../theme/theme";

export const FSLabelColumn = styled(Col)`
    && {
        padding-top: 7px;
        margin-bottom: 0;
        text-align: right;
        font-weight: bold;
    }
`;

export const FSInput = styled(Input)`
    && {
        border-radius: 0;
    }
`;

export const FSForm = styled(Form)({
    zIndex: 1030,
    padding: "25px 15px",
    margin: "20px auto",
    backgroundColor: Colors.lightGray,
});

export const AlertIcon = () => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="react-icon"
            height="1em" width="1em"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z">
            </path>
        </svg>
    );
};

const StyledFormFeedback = styled(FormFeedback)({
    color: 'rgb(168, 2, 0)',
    left: '0px',
    fontSize: '1.0rem',
    lineHeight: 1.5,
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0.1rem',
    whiteSpace: 'nowrap',
    width: '100%',
    overflow: 'hidden',
});

export const FSFormFeedback = (props) => {
    if (!props.children) {
        return <></>;
    }
    return (
        <StyledFormFeedback {...props}>
            <AlertIcon/>&nbsp;
            {props.children}
        </StyledFormFeedback>
    );
};

















