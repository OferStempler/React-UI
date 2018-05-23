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


class ServiceDependencyForm extends Component {

    constructor(props) {
        super(props);
        this.renderDelete.bind(this);
        this.renderDependencies.bind(this);
        this.state = {
            deleteOpen: false,
        };
    }


    onSubmit(data) {
        if (data.id) {
            this.props.putServiceDependency(data);
        } else {
            this.props.postServiceDependency(data);
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


    deleteDependency() {
        this.props.deleteServiceDependency(this.props.initialValues.id);
    }

    renderDeleteDialog() {
        const actions = [
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.deleteDependency.bind(this)}
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
                Delete Service Dependency?
            </Dialog>
        );
    }


    cancelForm() {
        this.props.selectServiceDependency(null)
    }

    renderDependencies() {
        return (
            this.props.dependencies.map(
                value => (
                    <MenuItem key={value.dependencyId} value={value.dependencyId} primaryText={value.name}/>
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
                                <Field name="dependencyId"
                                       style={{marginRight: 12, marginLeft: 12}}
                                       hintText={'Dependency'}
                                       component={SelectField}
                                       validate={required}
                                       floatingLabelText={'Dependency'}
                                       maxHeight={300}
                                >
                                    {this.renderDependencies()}
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
                                   name="dependencyValue"
                                   label="Value"
                                   component={TextField}
                                   floatingLabelText="Value"
                                   hintText="Value"
                            >
                            </Field>
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

ServiceDependencyForm = reduxForm({
    form: 'ServiceDependencyForm',

})(ServiceDependencyForm)
ServiceDependencyForm = withRouter(connect(
    state => ({
        initialValues: state.service.selectedServiceDependency,
    })
    ,
    {})(ServiceDependencyForm));


export default ServiceDependencyForm;