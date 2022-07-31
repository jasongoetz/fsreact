import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {UpdatePasswordForm} from "./UpdatePasswordForm";
import {resetUserPassword} from "../api/api";
import {useQueryParam} from "../hooks/useQueryParam";

const PasswordReset: React.FC<RouteComponentProps> = ({history}) => {

    const token = useQueryParam('token');

    const updatePassword = async (values) => {
        await resetUserPassword(token, values.password);
        history.push('/');
    }

    return <UpdatePasswordForm onSubmit={updatePassword} instructions={"Enter a new password for your account."}/>;

};


export default withRouter(PasswordReset);
