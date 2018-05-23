import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Add from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { grey200} from 'material-ui/styles/colors';
import {renderSortableColumn} from '../../utils/TableSortUtil';

import {
    Link,
} from 'react-router-dom'

export default class RegExs extends Component {

    constructor(props) {
        super(props);
        this.renderRows.bind(this);
        this.selectRow.bind(this);

        this.state = {
            value: '',
        };
    }
    componentWillMount() {
        this.props.getRegExs();
    }

    componentWillUpdate(nextProps, nextState){
        if(nextProps.loadReExes){
            this.props.getRegExs();
        }
    }

     filterTable(regex, filter){
        filter = filter.toLowerCase();
        if(!regex.regexId){
            regex.regexId = '';
        }
        if(regex.name.toLowerCase().indexOf(filter) > -1 ||
            regex.value.toLowerCase().indexOf(filter) > -1 ||
            (''+regex.regexId).toLowerCase().indexOf(filter) > -1 ) {
            return true;
        }
        return false;
     }

    renderRows() {
        return (
            this.props.regExes.filter(row => this.filterTable(row,this.state.value)).map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                    <TableRowColumn style={{width: 40}}>{row.regexId}</TableRowColumn>
                    <TableRowColumn style={{width: 40}}>{row.name}</TableRowColumn>
                    <TableRowColumn style={{width: 250}}>{row.value}</TableRowColumn>
                </TableRow>
            ))
        );
    }


    selectRow(key, d, f) {
        if (key.length > 0) {
            this.props.history.push('/regEx/' + this.props.regExes.filter(row => this.filterTable(row,this.state.value))[key[0]].id);
        }
    }

    filterData(e, value){
        this.setState({
            value: value
        });
    }
    render() {
        let tableStyle = {
            width: '100%',
        }
        return (
            <div>
                <div style={{backgroundColor: grey200}}>
                    <TextField style={{marginLeft: 16}}
                        id="text-field-controlled"
                        hintText="type something to search..."
                        floatingLabelText="Regular Expressions"
                        floatingLabelFixed={true}
                        value={this.state.value}
                        onChange={this.filterData.bind(this)}
                    />
                </div>
                <FloatingActionButton mini={true} className={"FloatingActionButton"} containerElement={<Link to={'/regEx'} />}>
                    <Add />
                </FloatingActionButton>
                <Table style={tableStyle}
                       height={''+(window.innerHeight - 220) + 'px'}
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
                            <TableHeaderColumn style={{width: 40}}>
                                {renderSortableColumn('RegEx ID', 'regexId', this.props.sortRegexTable, this.props.regexSortColumn, this.props.regexSortDir)}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{width: 40}}>
                                {renderSortableColumn('Name', 'name', this.props.sortRegexTable, this.props.regexSortColumn, this.props.regexSortDir)}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{width: 250}}>
                                {renderSortableColumn('Value', 'value', this.props.sortRegexTable, this.props.regexSortColumn, this.props.regexSortDir)}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody style={{cursor: "pointer",}}
                               stripedRows={false}
                               displayRowCheckbox={false}>
                        {this.renderRows()}
                    </TableBody>
                </Table>
            </div>

        )
    }
}