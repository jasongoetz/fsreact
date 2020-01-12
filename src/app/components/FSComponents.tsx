import styled from "@emotion/styled";
import {Button, Input} from "reactstrap";

export const FSButton = styled(Button)`
    && {
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
        color: #fff;
        background-color: #428bca;
        border-color: #357ebd;
        border-radius: 0;
    }
`;

export const FSInput = styled(Input)`
    && {
        border-radius: 0;
    }
`;

export const FSWideButton = styled(FSButton)`
    && {
        width: 100%;
    }
`;