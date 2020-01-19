import React from 'react';

const apiErrorStyle = {
    fontWeight: 'bold' as 'bold',
    fontSize: 50,
    textAlign: 'center' as 'center',
    color: '#c72d2d'
};

const ApiError = (props) => <p style={apiErrorStyle}>{"API ERROR, CONTACT ADMINISTRATOR!!!!"}</p>;

export default ApiError;
