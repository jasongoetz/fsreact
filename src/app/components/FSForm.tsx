import {Component} from "react";
import React from "react";
import {FormGroup, Button, Input, Form, Container, Row, Col, FormProps} from "reactstrap";
import styled from "@emotion/styled";
import {Colors} from "../theme/theme";

export interface FSFormProps {
    onSubmit: (e: any) => void;
    className?: string;
    style?: any;
}

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
            <Form onSubmit={this.props.onSubmit} style={{...fsFormStyle, ...this.props.style}} className={this.props.className}>
                {this.props.children}
            </Form>
        );
    }

}
















