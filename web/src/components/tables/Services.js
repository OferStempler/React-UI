import React, {Component} from 'react';
import {grey200} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Add from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import {asStringDate} from '../../utils/DateUtil';
import {renderSortableColumn} from '../../utils/TableSortUtil';
import {Link,} from 'react-router-dom'


export default class Services extends Component {

    constructor(props) {
        super(props);
        this.renderRows.bind(this);
        this.selectRow.bind(this);
        this.renderAdd.bind(this);
        this.state = {
            value: '',
        };
    }

    componentWillMount() {

        this.props.getServices();
    }


    componentWillUpdate(nextProps, nextState){
        if(nextProps.loadServices){
            this.props.getServices();
        }
    }


    filterService1(service, filter) {
        filter = filter.toLowerCase();
        if (('' + service.serviceName).toLowerCase().indexOf(filter) > -1 ||
            ('' + service.destinationType).toLowerCase().indexOf(filter) > -1 ||
            ('' + service.contentType).toLowerCase().indexOf(filter) > -1 ||
            ('' + service.serviceId).indexOf(filter) > -1) {
            return true;
        }
        return false;
    }

    renderRows() {
        return (
            this.props.services.filter(row => this.filterService1(row, this.state.value)).map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                    <TableRowColumn style={{width: 40}}>{row.serviceId}</TableRowColumn>
                    <TableRowColumn style={{width: 250}}>{row.serviceName}</TableRowColumn>
                    <TableRowColumn>{row.destinationType}</TableRowColumn>
                    <TableRowColumn>{row.contentType}</TableRowColumn>
                    <TableRowColumn>{row.enabled ? 'True' : 'False'}</TableRowColumn>
                    <TableRowColumn style={{width: 130}}>{asStringDate(row.updated)}</TableRowColumn>
                    <TableRowColumn>{row.updatedBy}</TableRowColumn>
                </TableRow>
            ))
        );
    }


    selectRow(key) {
        if (key.length > 0) {
            this.props.history.push('/service/' + this.props.services.filter(row => this.filterService1(row, this.state.value))[key[0]].id);
        }
    }

    filterServices(e, value) {
        //this.props.filterService(value);
        this.setState({
            value: value
        });
    }

    renderAdd() {
        if (!this.props.production) {
            return (
                <FloatingActionButton mini={true} className={"FloatingActionButton"}
                                      containerElement={<Link to={'/service'}/>}>
                    <Add/>
                </FloatingActionButton>
            )
        }
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
                               floatingLabelText="Services"
                               floatingLabelFixed={true}
                               value={this.state.value}
                               onChange={this.filterServices.bind(this)}
                    />
                </div>
                {this.renderAdd()}
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
                            <TableHeaderColumn style={{width: 40}}>
                                {renderSortableColumn('ID', 'serviceId', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{width: 250}}>
                                {renderSortableColumn('Name', 'serviceName', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {renderSortableColumn('Dest Type', 'destinationType', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {renderSortableColumn('Service Type', 'contentType', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {renderSortableColumn('Enabled', 'enabled', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{width: 130}}>
                                {renderSortableColumn('Updated', 'updated', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {renderSortableColumn('Updated By', 'updatedBy', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
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