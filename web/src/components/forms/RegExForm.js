import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { TextField } from 'redux-form-material-ui'

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


class RegExForm extends Component {

    constructor(props) {
        super(props);
        this.renderDelete.bind(this);

        this.state = {
            deleteOpen: false,
        };
    }


    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.getRegEx(this.props.match.params.id);
        }
    }

    onSubmit(data) {
        if (data.id) {
            this.props.putRegEx(data);
        } else {
            this.props.postRegEx(data);
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


    deleteRegExs() {
        this.props.deleteRegEx(this.props.initialValues.id);
        this.props.history.push('/regExs');
    }

    renderDeleteDialog() {
        const actions = [
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.deleteRegExs.bind(this)}
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

    render() {
        const {handleSubmit, pristine, reset, error, submitting, submitFailed} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div style={{display: 'flex'}}>
                    <div style={styles.paper}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Field style={{marginRight: 12, marginLeft: 12, flex: 3}}
                                   name="name"
                                   label="Regular Expression Name"
                                   component={TextField}
                                   floatingLabelText="Regular Expression Name"
                                   hintText="Regular Expression Name"
                                   validate={required}
                            >
                            </Field>
                            <Field style={{marginRight: 12, marginLeft: 12, flex: 4}}
                                   name="value"
                                   label="Regular Expression Value"
                                   component={TextField}
                                   floatingLabelText="Regular Expression Value"
                                   hintText="Regular Expression Value"
                                   validate={required}
                            >
                            </Field>
                        </div>
                        <div style={{display: 'flex'}}>

                            <RaisedButton label="Submit" type="submit" primary={true} style={styles.btn}
                                          disabled={pristine || submitting}/>
                            <RaisedButton label="Cancel" type="button" secondary={true} style={styles.btn}
                                          onClick={reset} containerElement={<Link to={'/regExs'}/>}/>
                            {this.renderDelete()}
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}



RegExForm = reduxForm({
    form: 'RegExForm',
    onSubmitSuccess: (result, dispatch, props) => {
        props.history.push('/regExs')
    }
})(RegExForm)
RegExForm = withRouter(connect(
    state => ({
        initialValues: state.regEx.regEx,
    })
    ,
    {})(RegExForm));


export default RegExForm;