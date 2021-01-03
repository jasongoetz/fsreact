import React from 'react';
import {RouteComponentProps, useLocation, withRouter} from 'react-router-dom';
import {UpdatePasswordForm} from "../app/components/UpdatePasswordForm";
import {resetUserPassword} from "../app/api/api";

const PasswordReset: React.FC<RouteComponentProps> = ({history}) => {

    const location = useLocation();
    const useQuery = () => {
        return new URLSearchParams(location.search);
    }
    const query = useQuery();
    const token = query.get("token");

    const updatePassword = async (values) => {
        await resetUserPassword(token, values.password);
        history.push('/');
    }

    return <UpdatePasswordForm onSubmit={updatePassword} instructions={"Enter a new password for your account."}/>;

};


export default withRouter(PasswordReset);
