import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Add from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { grey200} from 'material-ui/styles/colors';

import {Route, Link, withRouter} from 'react-router-dom'

 class Users extends Component {

    constructor(props) {
        super(props);
        this.renderRows.bind(this);
        this.selectRow.bind(this);

        this.state = {
            value: '',
        };
    }

    componentWillMount() {
        this.props.getUsers();
    }

    componentWillUpdate() {
        if (this.props.loadUsers) {
            this.props.getUsers();
        }
    }

    filterTable(user, filter) {
        filter = filter.toLowerCase();

        if (user.username.toLowerCase().indexOf(filter) > -1) {
            return true;
        }
        return false;
    }

    renderRows() {
        return (
            this.props.users.filter(row => this.filterTable(row, this.state.value)).map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                    <TableRowColumn>{row.username}</TableRowColumn>
                    <TableRowColumn>{row.admin ? 'True' : 'False'}</TableRowColumn>
                </TableRow>
            ))
        );
    }


    selectRow(key, d, f) {
        if (key.length > 0) {
            this.props.history.push('/settings/user/' + this.props.users.filter(row => this.filterTable(row, this.state.value))[key[0]].id);
        }
    }

    filterData(e, value) {
        this.setState({
            value: value
        });
    }

    render() {
        let tableStyle = {
            cursor: "pointer",
            width: '100%',

        }
        return (
            <div>
                <div style={{backgroundColor: grey200}}>
                    <TextField style={{marginLeft: 16}}
                               id="text-field-controlled"
                               hintText="type something to search..."
                               floatingLabelText="Users"
                               floatingLabelFixed={true}
                               value={this.state.value}
                               onChange={this.filterData.bind(this)}
                    />
                </div>
                <FloatingActionButton mini={true} className={"FloatingActionButton"}
                                      containerElement={<Link to={'/settings/user'}/>}>
                    <Add/>
                </FloatingActionButton>
                <Table style={tableStyle}
                       height={'' + (window.innerHeight - 220) + 'px'}
                       fixedHeader={true}
                       fixedFooter={true}
                       selectable={true}
                       multiSelectable={false}
                       onRowSelection={(key) => (
                           this.selectRow(key))

                       }
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>Username</TableHeaderColumn>
                            <TableHeaderColumn>Admin</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        stripedRows={false}
                        displayRowCheckbox={false}>
                        {this.renderRows()}
                    </TableBody>
                </Table>
            </div>

        )
    }
}

export default Users;

