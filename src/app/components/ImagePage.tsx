import {Component} from "react";
import React from "react";
import {Col, Container, Row} from "reactstrap";
import {getRandomImageUrl} from "../theme/imageRotate";
import {Colors} from "../theme/theme";

const backgroundImageStyle = {
    width: "100%",
    background: getRandomImageUrl(),
    backgroundSize: "cover",
    backgroundPosition: "center center",
    zIndex: -5,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

const backgroundImageOverlay = {
    width: "100%",
    backgroundColor: "black",
    opacity: 0.6,
    zIndex: -3,
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
};

const headlineStyle = {
    marginTop: "50px",
    marginBottom: "20px",
    color: Colors.white,
};

export interface Props {
    headline?: string;
}

class ImagePage extends Component<Props> {

    render() {
        return (
            <Container>
                {!!this.props.headline &&
                    <Row style={headlineStyle}>
                        <Col
                            sm={{offset: 1, size: 10}}
                            md={{offset: 2, size: 8}}
                            lg={{offset: 3, size: 6}}
                        >
                            <h1>{this.props.headline}</h1>
                        </Col>
                    </Row>
                }
                {this.props.children}
                <div className="signin-page" style={backgroundImageStyle}>
                </div>
                <div className="signin-page-overlay" style={backgroundImageOverlay}>
                </div>
            </Container>
        );
    }

}

export default ImagePage;













