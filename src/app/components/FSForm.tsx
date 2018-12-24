import {Component} from "react";
import React from "react";
import {FormGroup, Button, Input, Form, Container, Row, Col, FormProps} from "reactstrap";
import styled from "styled-components";
import {Colors} from "../theme/theme";

export interface FSFormProps {
    onSubmit: () => void;
    className?: string;
}

export const FSButton = styled(Button)`
    && {
        border-radius: 0;
    }
`;

export const FSInput = styled(Input)`
    && {
        border-radius: 0;
    }
`;

const fsFormStyle = {
    zIndex: 1030,
    padding: "25px 15px",
    margin: "20px auto",
    backgroundColor: Colors.lightGray,
};

export class FSForm extends React.Component<FSFormProps> {

    render() {
        return (
            <Form onSubmit={this.props.onSubmit} style={fsFormStyle} className={this.props.className}>
                {this.props.children}
            </Form>
        );
    }

}
















