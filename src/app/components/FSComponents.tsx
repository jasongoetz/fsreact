import styled from "@emotion/styled";
import {Button} from "reactstrap";

export const FSButton = styled(Button)`
    && {
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
        color: #fff;
        background-color: #428bca;
        border-color: #357ebd;
        border-radius: 2px;
    }
`;

export const FSWideButton = styled(FSButton)({
    width: '100%',
    textTransform: 'uppercase' as 'uppercase',
});

export const GoogleButton = styled(Button)({
    width: '100%',
    textTransform: 'uppercase' as 'uppercase',
    color: '#444',
    backgroundColor: '#fff',
    borderRadius: 3,
});
