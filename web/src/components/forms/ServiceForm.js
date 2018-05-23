import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import MenuItem from 'material-ui/MenuItem';
import {SelectField, TextField, Toggle} from 'redux-form-material-ui'

import {grey200, grey400, lightGreen200, lightGreen600} from 'material-ui/styles/colors';


import {required} from './ValidationUtil';


const validate = values => {
    const errors = {}

    return errors
}

const styles = {
    btn: {
        margin: 6,
        marginRight: 12,
        marginLeft: 12,
    },
    std: {
        marginRight: 12,
        marginLeft: 12
    },
    toggle: {
        marginBottom: 6,
    },
    paper: {
        margin: 6,
        // textAlign: 'center',
        display: 'inline-block',
        flex: 1,
        width: '98%'
    },

    block: {
        maxWidth: 250,
    },
    toggle: {
        marginBottom: 6,
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


class ServiceForm extends Component {

    constructor(props) {
        super(props);
        this.renderOptions.bind(this);
        this.renderDelete.bind(this);
        this.renderComposite.bind(this);
        this.renderCompositeSelectionElement.bind(this);
        this.state = {
            deleteOpen: false,
        };
    }


    onSubmit(data) {
        if (data.id) {
            this.props.putService(data);
        } else {
            if (!this.props.production) {
                this.props.postService(data);
            }
        }
        // this.props.synchServices(true);
    }


    renderDelete() {
        if (this.props.serviceDeletable && this.props.initialValues && this.props.initialValues.id) {
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
        this.props.deleteService(this.props.initialValues.id);
        this.props.history.push('/services');
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
                Delete service?
            </Dialog>
        );
    }


    renderOptions() {
        if ('MQ' === this.props.destinationType) {
            return this.renderMQOptions();
        } else if ('WS' === this.props.destinationType || 'REST' === this.props.destinationType) {
            return this.renderWSRESTOptions();
        }
    }

    renderArrow(dir) {
        let deg = 'left' === dir ? '0' : '180';
        if (this.props.serviceConversions && this.props.serviceConversions.enabled) {
            return (
                <div id="arrowAnim" style={{marginTop: 30, transform: `rotate(${deg}deg)`}}>
                    <div>
                        <div className="arrowSliding">
                            <div className="arrow"></div>
                        </div>

                        <div className="arrowSliding delay1">
                            <div className="arrow"></div>
                        </div>
                        <div className="arrowSliding delay2">
                            <div className="arrow"></div>
                        </div>
                        <div className="arrowSliding delay3">
                            <div className="arrow"></div>
                        </div>
                    </div>
                </div>
            )
        }
        let marginTop = 'left' === dir ? 35 : 25;
        return (
            <div id="arrowAnim" style={{marginTop: marginTop, transform: `rotate(${deg}deg)`}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="arrow"></div>
                    <div className="arrow"></div>
                    <div className="arrow"></div>
                    <div className="arrow"></div>
                </div>
            </div>
        )
    }

    renderCompositeSelectionElement(name, text) {
        return (
            <Field
                style={{marginRight: 12, marginLeft: 12, flex: 1}}
                name={`serviceConversions[${name}]`}
                component={SelectField}
                hintText={text}
                floatingLabelText={text}
                validate={required}
            >
                <MenuItem value="JSON" primaryText="JSON"/>
                <MenuItem value="XMLNOSOAP" primaryText="XMLNoSoap"/>
            </Field>
        )
    }

    renderComposite() {
        if ('COMPOSITE' === this.props.contentType) {
            return (
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div>
                                {this.renderCompositeSelectionElement('sourceRequestInputType', 'Source Request Input Type')}
                            </div>
                            {this.renderArrow('right')}
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div>
                                {this.renderCompositeSelectionElement('sourceResponseInputType', 'Source Response Input Type')}
                            </div>
                            {this.renderArrow('left')}

                        </div>
                    </div>
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: this.props.serviceConversions && this.props.serviceConversions.enabled ? lightGreen600 : grey400,
                            padding: 30,
                            color: 'white',
                            marginTop: 40,
                            borderRadius: 15
                        }}>
                            LDP
                        </div>
                    </div>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                {this.renderArrow('right')}
                                <div>
                                    {this.renderCompositeSelectionElement('destinationRequestInputType', 'Destination Request Input Type')}
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>

                                {this.renderArrow('left')}

                                <div>
                                    {this.renderCompositeSelectionElement('destinationResponseInputType', 'Destination Response Input Type')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Field
                        style={{marginRight: 5, marginLeft: 5, marginTop: 24, width: 100}}
                        thumbStyle={styles.thumbOff}
                        trackStyle={styles.trackOff}
                        thumbSwitchedStyle={styles.thumbSwitched}
                        trackSwitchedStyle={styles.trackSwitched}
                        labelStyle={styles.labelStyle}
                        name={`serviceConversions[enabled]`}
                        component={Toggle}
                        label="Enabled"
                        labelPosition="right"
                        format={(value) => 'true' === '' + value ? true : false}

                    />
                </div>
            );
        }
    }

    renderMQOptions() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Field
                        style={{marginRight: 12, marginLeft: 12, flex: 1}}
                        name="serviceType"
                        component={SelectField}
                        hintText="Service Type"
                        floatingLabelText="Service Type"
                        validate={required}
                    >
                        <MenuItem value="RequestReply" primaryText="RequestReply"/>
                        <MenuItem value="Datagram" primaryText="Datagram"/>
                    </Field>
                    <Field
                        name="expiry"
                        type="number"
                        inputStyle={{textAlign: 'center'}}
                        style={{marginRight: 12, marginLeft: 12, flex: 1}}
                        label={"Expiry"}
                        component={TextField}
                        hintText={"Expiry"}
                        validate={required}
                        floatingLabelText={"Expiry"}
                        //format={(value) => value === undefined ? -1 : value}
                    />
                    <Field
                        name="timeOut"
                        type="number"
                        inputStyle={{textAlign: 'center'}}
                        style={{marginRight: 12, marginLeft: 12, flex: 1}}
                        label={"Timeout"}
                        component={TextField}
                        hintText={"Timeout"}
                        validate={required}
                        floatingLabelText={"Timeout"}
                    />
                    <Field
                        style={{marginRight: 12, marginLeft: 12, marginTop: 24, flex: 1}}
                        thumbStyle={styles.thumbOff}
                        trackStyle={styles.trackOff}
                        thumbSwitchedStyle={styles.thumbSwitched}
                        trackSwitchedStyle={styles.trackSwitched}
                        labelStyle={styles.labelStyle}
                        name="persistence"
                        component={Toggle}
                        label="Persistence"
                        labelPosition="right"
                        format={(value) => 'true' === '' + value ? true : false}

                    />
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Field style={{marginRight: 12, marginLeft: 12, flex: 1}} name="requestQueue"
                           label="Request Queue"
                           component={TextField}
                           floatingLabelText="Request Queue"
                           hintText="Request Queue"
                           validate={required}
                    >
                    </Field>
                    <Field style={{marginRight: 12, marginLeft: 12, flex: 1}} name="replyQueue"
                           label="Reply Queue"
                           component={TextField}
                           floatingLabelText="Reply Queue"
                           hintText="Reply Queue"
                           validate={required}
                    >
                    </Field>
                </div>
            </div>
        );
    }

    renderWSRESTOptions() {
        return (
            <div style={{display: 'flex'}}>
                <Field style={{marginRight: 12, marginLeft: 12, flex: 1}} name="destination"
                       label="Destination"
                       component={TextField}
                       floatingLabelText="Destination"
                       hintText="Destination"
                       validate={required}
                >
                </Field>
            </div>
        );
    }


    render() {
        const {handleSubmit, pristine, reset, error, submitting, submitFailed} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div style={{display: 'flex'}}>
                    <div style={styles.paper}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Field style={{marginRight: 12, marginLeft: 12, flex: 2}}
                                   name="serviceName"
                                   label="Attribute Name"
                                   component={TextField}
                                   floatingLabelText="Service Name"
                                   hintText="Service Name"
                                   validate={required}
                            >
                            </Field>
                            <Field style={{marginRight: 12, marginLeft: 12, flex: 4}} name="uri"
                                   label="URI"
                                   component={TextField}
                                   floatingLabelText="URI"
                                   hintText="URI"
                                   validate={required}
                            >
                            </Field>

                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
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
                            <Field
                                style={{marginRight: 12, marginLeft: 12, marginTop: 24, width: 170, flex: 1}}
                                thumbStyle={styles.thumbOff}
                                trackStyle={styles.trackOff}
                                thumbSwitchedStyle={styles.thumbSwitched}
                                trackSwitchedStyle={styles.trackSwitched}
                                labelStyle={styles.labelStyle}
                                name="forwardClientIp"
                                component={Toggle}
                                label="Forward Client Ip"
                                labelPosition="right"
                                format={(value) => 'true' === '' + value ? true : false}

                            />
                            <Field
                                style={{marginRight: 12, marginLeft: 12, flex: 1}}
                                name="contentType"
                                component={SelectField}
                                hintText="Content-Type"
                                floatingLabelText="Content-Type"
                                validate={required}
                            >
                                <MenuItem value="SOAP" primaryText="SOAP"/>
                                <MenuItem value="XMLNOSOAP" primaryText="XMLNoSoap"/>
                                <MenuItem value="JSON" primaryText="JSON"/>
                                <MenuItem value="COMPOSITE" primaryText="COMPOSITE"/>

                            </Field>
                            <Field
                                style={{marginRight: 12, marginLeft: 12, flex: 1}}
                                name="destinationType"
                                component={SelectField}
                                hintText="Destination Type"
                                floatingLabelText="Destination Type"
                                validate={required}
                            >
                                <MenuItem value="MQ" primaryText="MQ"/>
                                <MenuItem value="REST" primaryText="REST"/>
                                <MenuItem value="WS" primaryText="SOAP"/>
                            </Field>
                        </div>
                        {this.renderOptions()}
                        {this.renderComposite()}

                        <div style={{display: 'flex'}}>

                            <RaisedButton label="Submit" type="submit" primary={true} style={styles.btn}
                                          disabled={pristine || submitting}/>
                            <RaisedButton label="Cancel" type="button" secondary={true} style={styles.btn}
                                          onClick={reset} containerElement={<Link to={'/services'}/>}/>
                            {this.renderDelete()}
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

const selector = formValueSelector('ServiceForm')


ServiceForm = reduxForm({
    form: 'ServiceForm',
    onSubmitSuccess: (result, dispatch, props) => {
        props.history.push('/services')
    }

})(ServiceForm)
ServiceForm = withRouter(connect(
    state => ({
        initialValues: state.service.service === null ?  {timeOut: 1500000, expiry: -1} : state.service.service,
        // serviceSchemas: state.service.serviceSchemas,
        // serviceRegularExpressions: state.service.serviceRegularExpressions,
        destinationType: selector(state, 'destinationType'),
        contentType: selector(state, 'contentType'),
        serviceConversions: selector(state, 'serviceConversions')
    })
    ,
    {})(ServiceForm));


export default ServiceForm;