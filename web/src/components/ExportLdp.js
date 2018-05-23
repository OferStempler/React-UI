import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {exportLDP} from '../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import {asStringDate} from '../utils/DateUtil';
import {clearUrlParams} from '../utils/RouterUtil'
import {grey200} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import {parse, stringify} from 'query-string';
import {renderSortableColumn} from '../utils/TableSortUtil';

const styles = {
    btn: {
        margin: 12
    },
};


class ExportLdp extends Component {
    constructor() {
        super()
        this.renderSelectServices.bind(this);
        this.renderServiceRows.bind(this);
        this.filterService1.bind(this);
        this.addServiceToSelection.bind(this);
        this.renderSelectedServices.bind(this);
        this.renderSelectedServiceRows.bind(this);
        this.state = {value: 'all', filter: '', selectedServices: []}
    }

    handleChange = (event, value) => {
        if (value == 'select') {
            this.props.getServices();
        }
        this.setState({
            value: value,
        });
    };

    filterService1(service) {
        let filter = this.state.filter;
        if (service.serviceName.toLowerCase().indexOf(filter) > -1 ||
            ('' + service.serviceId).indexOf(filter) > -1) {
            return true;
        }
        return false;
    }

    executeExport() {
        if (this.state.value === 'select') {
            let arr = this.state.selectedServices.map(e => e.serviceId);
            let search = parse(this.props.location.search);
            delete search['s'];

            if (arr.length > 0) {
                search['s'] = arr;
            }
            this.props.history.push({
                pathname: this.props.location.pathname,
                search: stringify(search)
            });
        }
        exportLDP();
        clearUrlParams(this.props);
    }

    render() {
        return (
            <div style={{margin: 16, display: 'flex'}}>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <h2 style={styles.btn}>Export</h2>
                    <RadioButtonGroup name="export" defaultSelected='all' style={{flex: 1}}
                                      onChange={this.handleChange.bind(this)}
                    >
                        <RadioButton
                            value="all"
                            label="All"
                            style={styles.btn}
                        />
                        <RadioButton
                            value="select"
                            label="Select services to export"
                            style={styles.btn}
                        />
                    </RadioButtonGroup>
                    <div>
                        <RaisedButton style={{margin: 12}} label="Export" type="button" primary={true}
                                      className="RaisedButton"
                                      onClick={this.executeExport.bind(this)}/>
                    </div>
                    {this.renderSelectedServices()}
                </div>
                {this.renderSelectServices()}

            </div>
        )
    }

    renderServiceRows() {
        return (
            this.props.services.filter(row => this.filterService1(row)).map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                    <TableRowColumn style={{width: 40}}>{row.serviceId}</TableRowColumn>
                    <TableRowColumn style={{width: 250}}>{row.serviceName}</TableRowColumn>
                    <TableRowColumn>{asStringDate(row.updated)}</TableRowColumn>
                </TableRow>
            ))
        );
    }

    renderSelectedServiceRows() {
        return (
            this.state.selectedServices.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                    <TableRowColumn style={{width: 250}}>{row.serviceName}</TableRowColumn>
                </TableRow>
            ))
        );
    }

    addServiceToSelection(service) {
        if (service && this.state.selectedServices.filter(s => s.serviceId === service.serviceId).length === 0) {
            this.state.selectedServices.unshift(service);
            this.setState({
                selectedServices: this.state.selectedServices
            })
            return;
        }


    }

    filterServices(e, value) {
        //this.props.filterService(value);
        this.setState({
            filter: value
        });
    }

    removeElement(index) {
        this.state.selectedServices.splice(index, 1);
        this.setState({selectedServices: this.state.selectedServices})
    }

    renderSelectedServices() {
        let tableStyle = {
            width: '100%',
            cursor: "pointer",
        }

        return (
            <Paper style={{margin: 12, flex: 4}}>
                <Table style={tableStyle}
                       height={'' + (window.innerHeight - 360) + 'px'}
                       fixedHeader={true}
                       fixedFooter={true}
                       selectable={true}
                       multiSelectable={false}
                       onRowSelection={this.removeElement.bind(this)}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>Services to import (click to remove):</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        stripedRows={false}
                        displayRowCheckbox={false}>
                        {this.renderSelectedServiceRows()}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    renderSelectServices() {
        let tableStyle = {
            width: '100%',
        }

        return (
            <Paper style={{flex: 2, margin: 12}}>
                <div style={{backgroundColor: grey200}}>
                    <TextField style={{marginLeft: 16}}
                               id="text-field-controlled"
                               hintText="type service name to export..."
                               floatingLabelText="Select service"
                               floatingLabelFixed={true}
                               value={this.state.filter}
                               onChange={this.filterServices.bind(this)}
                    />
                </div>
                <div>
                    <Table style={tableStyle}
                           height={'' + (window.innerHeight - 240) + 'px'}
                           fixedHeader={true}
                           fixedFooter={true}
                           selectable={true}
                           multiSelectable={false}
                           onRowSelection={(key) => (
                               this.addServiceToSelection(
                                   this.props.services.filter(
                                       row => this.filterService1(row, this.state.value))[key[0]])
                           )}
                    >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn style={{width: 40}}>
                                    {renderSortableColumn('Service ID', 'serviceId', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
                                </TableHeaderColumn>
                                <TableHeaderColumn style={{width: 250}}>
                                    {renderSortableColumn('Service Name', 'serviceName', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    {renderSortableColumn('Updated', 'updated', this.props.sortServiceTable, this.props.serviceSortColumn, this.props.serviceSortDir)}
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody style={{cursor: "pointer",}}
                            stripedRows={false}
                            displayRowCheckbox={false}>
                            {this.renderServiceRows()}
                        </TableBody>
                    </Table>

                </div>
            </Paper>
        );
    }
}

export default withRouter(ExportLdp);
