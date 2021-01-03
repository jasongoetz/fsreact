import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {updateUserPassword} from "../user/user.actions";
import {UpdatePasswordForm} from "./UpdatePasswordForm";

interface Props extends RouteComponentProps {
    userId: number;
}

const PasswordPage: React.FC<Props> = ({history, userId}) => {

    const updatePassword = async (values) => {
        await updateUserPassword(userId, values.password);
        history.push('/');
    }

    return <UpdatePasswordForm onSubmit={updatePassword}/>;

};


export default withRouter(PasswordPage);
