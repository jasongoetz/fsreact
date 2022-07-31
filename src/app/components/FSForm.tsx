import React from "react";
import {Button, Col, Form, FormFeedback, Input, Row} from "reactstrap";
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

const FSForm = styled(Form)({
    zIndex: 1030,
    margin: "20px auto",
    padding: "25px 35px",
    backgroundColor: Colors.brandGreen,
});

const FSFormHeadline = styled.h4({
    textAlign: 'center',
    textTransform: 'uppercase',
});

const FSFormHeadlineRow = styled(Row)({
    marginTop: "10px",
    marginBottom: "20px",
    color: Colors.white,
});

export const FSFormSubmitButton: React.FC<{text: string, disabled?: boolean}> = ({ text, disabled = false }) => {
    return <div className={'text-center'} style={{marginTop: 25}}>
        <FSFormButton outline type="submit" size="lg" data-cy="submit" disabled={disabled}>{text}</FSFormButton>
    </div>
}

const FSFormButton = styled(Button)({
    width: '60%',
    textTransform: 'uppercase' as 'uppercase',

    //color: Colors.brandBlack,
    backgroundColor: Colors.white,
    borderColor: Colors.darkerGray,
    borderRadius: '2px',
});

interface FormProps {
    id?: string;
    headline?: string;
    onSubmit?: (e?: React.FormEvent<any> | undefined) => void;
}

export const FakeStacksForm: React.FC<FormProps> = ({ id, headline, onSubmit, children }) => {
    return (
        <FSForm id={id} onSubmit={onSubmit}>
            <FSFormHeadlineRow>
                <FSFormHeadline>{headline}</FSFormHeadline>
            </FSFormHeadlineRow>
            {children}
        </FSForm>
    );
};

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

















