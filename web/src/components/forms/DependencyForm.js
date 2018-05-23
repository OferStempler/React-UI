import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { TextField } from 'redux-form-material-ui'

import {required} from './ValidationUtil';

const styles = {
    btn: {
        margin: 12
    },
};


class DependencyForm extends Component {

    constructor(props) {
        super(props);
        this.renderDelete.bind(this);

        this.state = {
            deleteOpen: false,
        };
    }


    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.getDependency(this.props.match.params.id);
        }
    }

    onSubmit(data) {
        if (data.id) {
            this.props.putDependency(data);
        } else {
            this.props.postDependency(data);
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
        this.props.deleteDependency(this.props.initialValues.id);
        this.props.history.push('/dependencies');
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
                Delete Dependency?
            </Dialog>
        );
    }

    render() {
        const {handleSubmit, pristine, reset, error, submitting, submitFailed} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div style={{display: 'flex'}}>
                    <div >
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Field style={{marginRight: 12, marginLeft: 12, flex: 2}}
                                   name="name"
                                   label="Dependency Name"
                                   component={TextField}
                                   floatingLabelText="Dependency Name"
                                   hintText="Dependency Name"
                                   validate={required}
                            >
                            </Field>
                        </div>
                        <div style={{display: 'flex'}}>

                            <RaisedButton label="Submit" type="submit" primary={true} style={styles.btn}
                                          disabled={pristine || submitting}/>
                            <RaisedButton label="Cancel" type="button" secondary={true} style={styles.btn}
                                          onClick={reset} containerElement={<Link to={'/dependencies'}/>}/>
                            {this.renderDelete()}
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

DependencyForm = reduxForm({
    form: 'DependencyForm',
    onSubmitSuccess: (result, dispatch, props) => {
        props.history.push('/dependencies')
    }
})(DependencyForm)
DependencyForm = withRouter(connect(
    state => ({
        initialValues: state.dependency.dependency,
    })
    ,
    {})(DependencyForm));


export default DependencyForm;