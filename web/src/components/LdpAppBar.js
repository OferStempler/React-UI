import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {getBackendURL} from '../config';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey600, white} from 'material-ui/styles/colors';
import {  Link } from 'react-router-dom';




export default class LdpAppBAr extends Component {

    constructor(props) {
        super(props);
        this.renderItems.bind(this);
    }

    render() {
        return (
            <AppBar style={{backgroundColor: white}}
                    titleStyle={{color: grey600}}  docked="false"
                    iconElementRight={this.renderItems()}
                    iconElementLeft={<div><img src={`${getBackendURL()}/images/logo.png`} height="70%" width="70%" /></div>}

            />
        )
    }

    renderItems(){
        if(this.props.userName) {
            return (
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <FlatButton
                        label={'' + this.props.userName}
                        labelStyle={{textTransform: 'none'}}
                        secondary={true}
                        style={{fontSize: 14, marginTop: 8}}
                        containerElement={<Link to={'/passwordChange'}/>
                        }
                    />


                    <IconMenu

                        iconButtonElement={
                            <IconButton><MoreVertIcon/></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        {/*<MenuItem primaryText="Refresh" />*/}
                        {/*<MenuItem primaryText="Help" />*/}
                        <MenuItem primaryText="Sign out" onClick={this.props.signOut}
                                  containerElement={<Link to={'/'}/>}/>
                        <MenuItem primaryText="Import" containerElement={<Link to={'/import'}/>}/>
                        <MenuItem primaryText="Export" containerElement={<Link to={'/export'}/>}/>
                    </IconMenu>
                </div>
            )
        }
    }
}

