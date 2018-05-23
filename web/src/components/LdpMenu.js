import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Services from 'material-ui/svg-icons/action/dns';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import System from 'material-ui/svg-icons/hardware/developer-board';

import Settings from 'material-ui/svg-icons/action/settings';
import Connection from 'material-ui/svg-icons/action/settings-ethernet';
import Logs from 'material-ui/svg-icons/communication/message';
import {blue700, white, grey600, grey800, lightGreen500} from 'material-ui/styles/colors';

let SelectableList = makeSelectable(List);


function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            defaultValue: PropTypes.number.isRequired,
        };

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange = (event, index) => {
            this.setState({
                selectedIndex: index,
            });
        };

        render() {
            return (
                <ComposedComponent style={{backgroundColor: blue700 , height: '100%'}}
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

const style = {
        item: {fontSize: 10, color: white},
        icon: { color: white, paddingLeft: 0},
        iconContainer: { display: 'flex', justifyContent: 'center' }
}
SelectableList = wrapState(SelectableList);
//            <Subheader>Selectable Contacts</Subheader>
//leftIcon={<Settings/>}
const LdpMenu = (props) => (
    <SelectableList  defaultValue={1}>
        <ListItem value={1} style={style.item} primaryText={<div style={style.iconContainer} >Services</div>} onClick={() => props.history.push("/services")} ><div style={style.iconContainer} > <Services style={style.icon}/></div></ListItem>
        <ListItem value={2} style={style.item} onClick={() => props.history.push("/regExs")} primaryText={<div style={style.iconContainer} >Global RegEx</div>} ><div style={style.iconContainer} ><Connection style={style.icon}/></div></ListItem>
            <ListItem value={3} style={style.item} primaryText={<div style={style.iconContainer} >Dependencies</div>} onClick={() => props.history.push("/dependencies")} ><div style={style.iconContainer} ><ContentLink style={style.icon}/></div></ListItem>
            {/*<ListItem value={4} style={style.item} primaryText="Logs" onClick={() => props.history.push("/logs")}><Logs style={style.icon}/></ListItem>*/}
        {/*{ props.admin && <Divider style={style.item}/> }*/}
        { props.admin &&    <ListItem value={5} style={style.item} primaryText={<div style={style.iconContainer} >Settings</div>} onClick={() => props.history.push("/settings/users")}><div style={style.iconContainer} ><Settings style={style.icon}/></div></ListItem> }
    </SelectableList>
);

export default LdpMenu;
