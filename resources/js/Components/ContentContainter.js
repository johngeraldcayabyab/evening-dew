import AppContainer from "./AppContainer";
import React from "react";
import {Content} from "antd/es/layout/layout";
import CustomMenu from './CustomMenu';

const ContentContainer = (props) => {
    return (
        <AppContainer>
            <CustomMenu/>
            <Content style={{marginTop: '50px', borderTop: 'none'}}>
                {props.children}
            </Content>
        </AppContainer>
    )
};

export default ContentContainer;
