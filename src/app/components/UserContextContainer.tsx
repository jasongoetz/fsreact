import {useLoadContext} from "../context/use_load_context";
import React, {FC} from "react";
import {useGlobalStores} from "../context/global_context";
import {Col, Container, Row} from "reactstrap";
import {Colors} from "../theme/theme";

interface Props {
    userId: number;
}

const headlineStyle = {
    marginTop: "100px",
    marginBottom: "20px",
    color: Colors.black,
};

const UserContextContainer: FC<React.PropsWithChildren<Props>> = (props) => {
    const { userStore } = useGlobalStores();
    useLoadContext(props.userId);

    if (userStore.loading) {
        return <Container>
            <Row style={headlineStyle}>
                <Col
                    sm={{offset: 1, size: 10}}
                    md={{offset: 2, size: 8}}
                >
                    <h1 style={{textAlign: 'center'}}>Loading...</h1>
                </Col>
            </Row>
        </Container>
    }
    else {
        return <>{props.children}</>;
    }
};

export default UserContextContainer;
