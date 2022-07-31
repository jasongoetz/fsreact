import React, {FC} from "react";
import {Container} from "reactstrap";
import {getRandomImageUrl} from "../theme/imageRotate";
import {useScreenSize} from "../hooks/useScreenSize";

const backgroundImageStyle = {
    width: "100%",
    position: 'absolute' as 'absolute',
    background: getRandomImageUrl(),
    backgroundSize: "cover",
    backgroundPosition: "center center",
    opacity: 0.6,
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

const ImagePage: FC = ({ children}) => {
    const { isMobile } = useScreenSize();
    return (<Container style={{marginTop: isMobile ? 0 : 50}}>
        {children}
        <div style={backgroundImageStyle}/>
        <div style={backgroundImageOverlay}/>
    </Container>);
};

export default ImagePage;














