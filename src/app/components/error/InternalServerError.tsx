import React from 'react';
import {Colors} from "../../theme/theme";

const internalServerErrorStyle = {
    fontWeight: 'bold' as 'bold',
    fontSize: 28,
    textAlign: 'center' as 'center',
    color: Colors.red
};

const InternalServerError = ({message}) => <p style={internalServerErrorStyle}>{"500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!"}{message}</p>;

export default InternalServerError;
