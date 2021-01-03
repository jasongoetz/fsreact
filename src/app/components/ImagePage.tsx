import React, {FC} from "react";
import {Col, Container, Row} from "reactstrap";
import {getRandomImageUrl} from "../theme/imageRotate";
import {Colors} from "../theme/theme";

const backgroundImageStyle = {
    width: "100%",
    position: 'absolute' as 'absolute',
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
    position: 'absolute' as 'absolute',
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

interface Props {
    headline?: string;
}

const ImagePage: FC<Props> = ({headline, children}) => (
    <Container>
        {!!headline &&
            <Row style={headlineStyle}>
                <Col
                    sm={{offset: 1, size: 10}}
                    md={{offset: 2, size: 8}}
                >
                    <h1 style={{textAlign: 'center'}}>{headline}</h1>
                </Col>
            </Row>
        }
        {children}
        <div style={backgroundImageStyle}/>
        <div style={backgroundImageOverlay}/>
    </Container>
);

export default ImagePage;














