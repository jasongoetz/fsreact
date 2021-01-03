import {Col, Container, Row} from "reactstrap";
import React from "react";
import {Colors} from "../theme/theme";

const headlineStyle = {
    marginTop: "100px",
    marginBottom: "20px",
    color: Colors.black,
};

export function LoadingContainer() {
    return <Container>
        <Row style={headlineStyle}>
            <Col
                sm={{offset: 1, size: 10}}
                md={{offset: 2, size: 8}}
            >
                <h1 style={{textAlign: "center"}}>Loading...</h1>
            </Col>
        </Row>
    </Container>;
}
