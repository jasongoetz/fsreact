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
        background-color: ${Colors.brandGreen};
        border-color: ${Colors.brandGreen};
        border-radius: 2px;
    }
`;

export const FSWideButton = styled(FSButton)({
    width: '100%',
    textTransform: 'uppercase' as 'uppercase',
});

export const AuthButton = styled(Button)({
    marginTop: '20px',
    width: '100%',
    textAlign: 'left',
    textTransform: 'uppercase' as 'uppercase',
    color: Colors.mostDarkestGray,
    backgroundColor: Colors.white,
    borderRadius: 3,
});
