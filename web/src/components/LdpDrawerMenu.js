import React from 'react';
import Drawer from 'material-ui/Drawer';
import LdpAppBAr from './LdpAppBar';
import LdpMenu from './LdpMenu';

const LdpDrawerMenu = (props) => (
    <Drawer open={props.open}>
        <LdpAppBAr {...props} />
        <LdpMenu {...props} />
    </Drawer>
)

export default LdpDrawerMenu;