import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Add from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { grey200} from 'material-ui/styles/colors';

import {
    Link,
} from 'react-router-dom'

export default class ServiceSchemas extends Component {

    constructor(props) {
        super(props);
        this.renderRows.bind(this);
        this.selectRow.bind(this);

        this.state = {
            value: '',
        };
    }
    // componentWillMount() {
    //
    //     //this.props.getServices();
    // }
    //
    // componentWillReceiveProps() {
    //
    //     if(this.props.loadServices){
    //
    //         this.props.getServices();
    //     }
    // }

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
    // private String schemaType;
    // private String schema;
    renderRows() {
        return (
            this.props.serviceSchemas.filter(row => this.filterService1(row,this.state.value)).map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                    <TableRowColumn style={{width: 40}}>{row.schemaType}</TableRowColumn>
                    {/*<TableRowColumn >{row.schema}</TableRowColumn>*/}
                </TableRow>
            ))
        );
    }


    selectRow(key) {
        if (key.length > 0) {
            this.props.selectServiceSchema(this.props.serviceSchemas[key[0]])        }
    }

    newServiceSchema(){
        this.props.selectServiceSchema({
            serviceId: this.props.service.serviceId,
        });
    }

    filterServices(e, value){
        //this.props.filterService(value);
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
            <div >
                <FloatingActionButton mini={true} style={{  right: '2%'}} className={"FloatingActionButton"} onClick={this.newServiceSchema.bind(this)}>
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
                            <TableHeaderColumn style={{width: 40}}>Schema Type</TableHeaderColumn>
                            {/*<TableHeaderColumn >schema</TableHeaderColumn>*/}
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