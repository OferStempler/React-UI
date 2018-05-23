import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import MenuItem from 'material-ui/MenuItem';
import {SelectField, TextField, Toggle} from 'redux-form-material-ui'
import { TableSortLabel } from 'material-ui/Table';

import {grey200, grey400, lightGreen600, lightGreen200} from 'material-ui/styles/colors';


import {required} from './ValidationUtil';


const validate = values => {
    const errors = {}

    return errors
}

const styles = {
    btn: {
        margin: 12
    },
    std: {
        marginRight: 12,
        marginLeft: 12
    },
    toggle: {
        marginBottom: 16,
    },
    paper: {
        margin: 10,
        // textAlign: 'center',
        display: 'inline-block',
        flex: 1,
        width: '98%'
    },

    block: {
        maxWidth: 250,
    },
    toggle: {
        marginBottom: 16,
    },
    thumbOff: {
        backgroundColor: grey400,
    },
    trackOff: {
        backgroundColor: grey200,
    },
    thumbSwitched: {
        backgroundColor: lightGreen600,
    },
    trackSwitched: {
        backgroundColor: lightGreen200,
    },
    labelStyle: {

    },
};


class ServiceSchemasForm extends Component {

    constructor(props) {
        super(props);
        this.renderDelete.bind(this);

        this.state = {
            deleteOpen: false,
        };
    }

    onSubmit(data) {
        if (data.id) {
            this.props.putServiceSchema(data);
        } else {
            this.props.postServiceSchema(data);
        }
    }


    renderDelete() {
        if (this.props.initialValues && this.props.initialValues.id) {
            return (

                <div>
                    <RaisedButton style={styles.btn} label="Delete" type="button" secondary={true}
                                  className="RaisedButton"
                                  onClick={() => this.setState({deleteOpen: true})}/>
                    {this.renderDeleteDialog()}
                </div>
            )
        }
    }

    deleteSchema() {
        this.props.deleteServiceSchema(this.props.initialValues.id);
    }

    renderDeleteDialog() {
        const actions = [
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.deleteSchema.bind(this)}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.setState({deleteOpen: false})}
            />,
        ];

        return (
            <Dialog
                style={{dir: this.props.dir, direction: this.props.dir}}
                actionsContainerStyle={{textAlign: 'right'}}
                actions={actions}
                modal={true}
                open={this.state.deleteOpen}
                onRequestClose={() => this.setState({deleteOpen: false})}
            >
                Delete Schema?
            </Dialog>
        );
    }

    cancelForm() {
        this.props.selectServiceSchema(null)
    }

    render() {
        const {handleSubmit, pristine, reset, error, submitting, submitFailed} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div style={{display: 'flex'}}>
                    <div style={styles.paper}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <Field
                                    style={{marginRight: 12, marginLeft: 12}}
                                    name="schemaType"
                                    component={SelectField}
                                    hintText="Schema Type"
                                    floatingLabelText="Schema Type"
                                    validate={required}
                                >
                                    <MenuItem value="GENERAL"         primaryText="General"/>
                                    <MenuItem value="GENERIC_DATA"   primaryText="Generic Data"/>
                                    <MenuItem value="REQUEST_HEADER"  primaryText="Request Header"/>
                                    <MenuItem value="RESPONSE_HEADER" primaryText="Response Header"/>

                                    <MenuItem value="XSD1"           primaryText="Xsd1 (Optional)"/>
                                    <MenuItem value="XSD2"           primaryText="Xsd2 (Optional)"/>
                                    <MenuItem value="XSD3"           primaryText="Xsd3 (Optional)"/>
                                    	
                                    <MenuItem value="SERVICE"         primaryText="Service"/>
                                </Field>
                            </div>


                            <Field style={{marginRight: 12, marginLeft: 12, width: '100%' }}
                                   name="schema"
                                   label="Schema"
                                   component={TextField}
                                   floatingLabelText="Schema"
                                   hintText="Schema"
                                   multiLine={true}
                                   rows={12}
                                   rowsMax={12}
                                   validate={required}
                            >
                            </Field>
                            {/*<Field style={{marginRight: 12, marginLeft: 12}} name="regexId"*/}
                            {/*label="regexId"*/}
                            {/*component={TextField}*/}
                            {/*floatingLabelText="regexId"*/}
                            {/*hintText="regexId"*/}
                            {/*validate={required}*/}
                            {/*>*/}
                            {/*</Field>*/}


                        </div>
                        <div style={{display: 'flex'}}>

                            <RaisedButton label="Submit" type="submit" primary={true} style={styles.btn}
                                          disabled={pristine || submitting}/>
                            <RaisedButton label="Cancel" type="button" secondary={true} style={styles.btn}
                                          onClick={reset && this.cancelForm.bind(this)}/>
                            {this.renderDelete()}
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}

//const selector = formValueSelector('ServiceSchemasForm')


ServiceSchemasForm = reduxForm({
    form: 'ServiceSchemasForm',

})(ServiceSchemasForm)
ServiceSchemasForm = withRouter(connect(
    state => ({
        initialValues: state.service.selectedSchema,
    })
    ,
    {})(ServiceSchemasForm));


export default ServiceSchemasForm;