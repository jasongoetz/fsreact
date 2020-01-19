import React from 'react';

const internalServerErrorStyle = {
    fontWeight: 'bold' as 'bold',
    fontSize: 28,
    textAlign: 'center' as 'center',
    color: '#c72d2d'
};

const InternalServerError = ({message}) => <p style={internalServerErrorStyle}>{"500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!"}{message}</p>;

export default InternalServerError;
