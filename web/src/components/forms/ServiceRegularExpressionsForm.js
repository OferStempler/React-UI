import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import MenuItem from 'material-ui/MenuItem';
import {SelectField, TextField, Toggle} from 'redux-form-material-ui'

import {TableSortLabel} from 'material-ui/Table';

import {grey200, grey400, lightGreen200, lightGreen600} from 'material-ui/styles/colors';


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
        // maxWidth: 250,
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
    labelStyle: {},
};


class ServiceRegularExpressionsForm extends Component {

    constructor(props) {
        super(props);
        this.renderDelete.bind(this);
        this.renderRegExs.bind(this);
        this.state = {
            deleteOpen: false,
        };
    }


    onSubmit(data) {
        if (data.id) {
               this.props.putServiceRegex(data);
        } else {
            this.props.postServiceRegex(data);
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


    deleteService() {
        this.props.deleteServiceRegex(this.props.initialValues.id);
        //this.props.history.push('/services');
    }

    renderDeleteDialog() {
        const actions = [
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.deleteService.bind(this)}
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
                Delete Regular Expression?
            </Dialog>
        );
    }

    /**
     String id;
     Integer serviceId;
     String element;
     Integer regexId;
     String enabled;
     */

    cancelForm() {
        this.props.selectServiceRegEx(null)
    }

    renderRegExs() {

        return (
            this.props.regExes.map(
                value => (
                    <MenuItem key={value.name} value={value.regexId} primaryText={value.name} />
                )
            )
        )
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
                                    name="messageType"
                                    component={SelectField}
                                    hintText="Message Type"
                                    floatingLabelText="Message Type"
                                    validate={required}
                                >
                                    <MenuItem value="Request" primaryText="Request"/>
                                    <MenuItem value="Response" primaryText="Response"/>
                                </Field>
                                <Field name="regexId"
                                     //  openOnFocus
                                    //filter={AutoCompleteMU.fuzzyFilter}
                                       style={{marginRight: 12, marginLeft: 12}}

                                    // dataSource={this.props.regExes}
                                    //dataSourceConfig={{text: 'name', value: 'regexId'}}

                                    //component={AutoComplete}
                                       hintText={'Regex'}
                                       component={SelectField}
                                       validate={required}
                                       floatingLabelText={'Regex'}
                                       maxHeight={300}
                                >
                                    {this.renderRegExs()}
                                </Field>
                                <Field
                                    style={{marginRight: 12, marginLeft: 12, marginTop: 24, width: 120, flex: 1}}
                                    thumbStyle={styles.thumbOff}
                                    trackStyle={styles.trackOff}
                                    thumbSwitchedStyle={styles.thumbSwitched}
                                    trackSwitchedStyle={styles.trackSwitched}
                                    labelStyle={styles.labelStyle}
                                    name="enabled"
                                    component={Toggle}
                                    label="Enabled"
                                    labelPosition="right"
                                    format={(value) => 'true' === '' + value ? true : false}
                                />
                            </div>


                            <Field style={{marginRight: 12, marginLeft: 12, width: '100%'}}
                                   name="element"
                                   label="Element"
                                   component={TextField}
                                   floatingLabelText="Element"
                                   hintText="Element"
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

ServiceRegularExpressionsForm = reduxForm({
    form: 'ServiceRegularExpressionsForm',

})(ServiceRegularExpressionsForm)
ServiceRegularExpressionsForm = withRouter(connect(
    state => ({
        initialValues: state.service.selectedServiceRegex,
    })
    ,
    {})(ServiceRegularExpressionsForm));


export default ServiceRegularExpressionsForm;