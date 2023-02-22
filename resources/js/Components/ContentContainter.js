import React from "react";
import {Content} from "antd/es/layout/layout";
import CustomMenu from './CustomMenu';
import {Layout} from "antd"

const ContentContainer = (props) => {
    return (
        <Layout style={{height: '100%', background: '#f6f7fa'}}>
            <CustomMenu/>
            <Content style={{marginTop: '50px', borderTop: 'none'}}>
                {props.children}
            </Content>
        </Layout>
    )
};

export default ContentContainer;
