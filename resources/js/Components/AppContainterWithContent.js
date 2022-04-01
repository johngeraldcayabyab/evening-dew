import AppContainer from "./AppContainer";
import React from "react";
import {Content} from "antd/es/layout/layout";

const CustomMenu = React.lazy(() => import('./CustomMenu'));

const AppContainerWithContent = (props) => {
    return (
        <AppContainer>
            <CustomMenu/>
            <Content style={{marginTop: '50px', borderTop: 'none'}}>
                {props.children}
            </Content>
        </AppContainer>
    )
};

export default AppContainerWithContent;
