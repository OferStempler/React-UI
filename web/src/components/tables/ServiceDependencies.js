import React, { Component } from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Add from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class ServiceDependencies extends Component {

    constructor(props) {
        super(props);
        this.renderRows.bind(this);
        this.selectRow.bind(this);

        this.state = {
            value: '',
        };
    }


     filterService1(service, filter){
        // filter = filter.toLowerCase();
        // if(service.serviceName.toLowerCase().indexOf(filter) > -1 ||
        //     service.destinationType.toLowerCase().indexOf(filter) > -1 ||
        //     service.contentType.toLowerCase().indexOf(filter) > -1 ||
        //     (''+service.serviceId).indexOf(filter) > -1) {
        //     return true;
        // }
        return true;
     }

    renderRows() {
        return (
            this.props.serviceDependencies.filter(row => this.filterService1(row,this.state.value)).map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                    <TableRowColumn style={{width: 70}}>{row.messageType}</TableRowColumn>
                    <TableRowColumn>{row.dependencyId}</TableRowColumn>
                    <TableRowColumn style={{width: 150}}>{row.name}</TableRowColumn>
                    <TableRowColumn>{row.enabled ? 'True' : 'False'}</TableRowColumn>
                </TableRow>
            ))
        );
    }


    selectRow(key) {
        if (key.length > 0) {
            this.props.selectServiceDependency(this.props.serviceDependencies[key[0]])
        }
    }

    filterServices(e, value){
        //this.props.filterService(value);
        this.setState({
            value: value
        });
    }


    newServiceDependency(){
        this.props.selectServiceDependency({
            serviceId: this.props.service.serviceId,
            enabled: true,
        });
    }

    render() {
        let tableStyle = {
            cursor: "pointer",
            width: '100%',
        }
        return (
            <div>
                <FloatingActionButton mini={true} style={{  right: '60%'}} className={"FloatingActionButton"} onClick={this.newServiceDependency.bind(this)} >
                    <Add />
                </FloatingActionButton>
                <Table style={tableStyle}
                       height={'' + (window.innerHeight - 525) + 'px'}
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
                            <TableHeaderColumn style={{width: 70}}>Message Type</TableHeaderColumn>
                            <TableHeaderColumn >ID</TableHeaderColumn>
                            <TableHeaderColumn style={{width: 150}}>Dependency</TableHeaderColumn>
                            <TableHeaderColumn>Enabled</TableHeaderColumn>
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