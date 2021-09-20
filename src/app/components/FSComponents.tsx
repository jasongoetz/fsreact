import styled from "@emotion/styled";
import {Button, Container} from "reactstrap";
import {Colors} from "../theme/theme";

export const FSPageContainer = styled(Container)({
   marginTop: 15
});

export const FSButton = styled(Button)`
    && {
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
        color: ${Colors.white};
        background-color: ${Colors.fsBlue};
        border-color: ${Colors.slightlyDarkerFSBlue};
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
    color: Colors.mostDarkestGray,
    backgroundColor: Colors.white,
    borderRadius: 3,
});
