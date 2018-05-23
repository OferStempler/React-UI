import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Add from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class ServiceRegularExpressions extends Component {

    constructor(props) {
        super(props);
        this.renderRows.bind(this);
        this.selectRow.bind(this);

        this.state = {
            value: '',
        };
    }


    filterService1(service, filter) {
        // filter = filter.toLowerCase();
        // if(service.serviceName.toLowerCase().indexOf(filter) > -1 ||
        //     service.destinationType.toLowerCase().indexOf(filter) > -1 ||
        //     service.contentType.toLowerCase().indexOf(filter) > -1 ||
        //     (''+service.serviceId).indexOf(filter) > -1) {
        //     return true;
        // }
        return true;
    }

    // private String messageType;
    // private String element;
    // private Integer regexId;
    // private String enabled;
    renderRows() {
        return (
            this.props.serviceRegularExpressions.filter(row => this.filterService1(row, this.state.value)).map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                    <TableRowColumn style={{width: 70}}>{row.messageType}</TableRowColumn>
                    {/*<TableRowColumn>{row.element}</TableRowColumn>*/}
                    <TableRowColumn>{row.regexId}</TableRowColumn>
                    <TableRowColumn style={{width: 130}}>{row.name}</TableRowColumn>
                    <TableRowColumn>{row.enabled ? 'True' : 'False'}</TableRowColumn>
                    <TableRowColumn>{row.element}</TableRowColumn>
                </TableRow>
            ))
        );
    }


    selectRow(key) {
        if (key.length > 0) {
            this.props.selectServiceRegEx(this.props.serviceRegularExpressions[key[0]])
        }
    }

    filterServices(e, value) {
        //this.props.filterService(value);
        this.setState({
            value: value
        });
    }


    newServiceRegEx() {
        this.props.selectServiceRegEx({
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
                <FloatingActionButton mini={true} style={{right: '25%'}} className={"FloatingActionButton"}
                                      onClick={this.newServiceRegEx.bind(this)}>
                    <Add/>
                </FloatingActionButton>
                <Table
                    style={tableStyle}
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
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn style={{width: 130}}>Regex</TableHeaderColumn>
                            <TableHeaderColumn>Enabled</TableHeaderColumn>
                            <TableHeaderColumn>Element</TableHeaderColumn>
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