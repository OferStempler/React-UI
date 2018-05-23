import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import {TextField} from 'redux-form-material-ui'
import {updateUserPassword} from '../../actions';

import {required} from './ValidationUtil';

const styles = {
    btn: {
        margin: 12
    },
};
const validate = (value, allValues, props) => {
    const errors = {}
    if(value.verify && value.newPassword){
        if(value.verify !== value.newPassword){
            errors['verify'] = 'Unmatched'
        }
    }
    return errors;
    // now you have access to the props inside the validation function
}

class PasswordChangeForm extends Component {

    onSubmit(data) {
        return updateUserPassword(data).then((response) => { // simulate server latency
            //  window.alert(`You submitted:\n\n${JSON.stringify(data, null, 2)}`);
            let res = response.data.toLowerCase();
            if (res !== 'ok') {
                throw new SubmissionError({
                    newPassword: res.startsWith('new') ? response.data : '',
                    currentPassword: res.startsWith('current') ? response.data : '',
                    _error: response.data,
                });
            }

            // if (!['john', 'paul', 'george', 'ringo'].includes(data.username)) {
            //     throw new SubmissionError({
            //         username: 'User does not exist',
            //         _error: 'Login failed!',
            //     });
            // } else if (values.password !== 'redux-form') {
            //     throw new SubmissionError({
            //         password: 'Wrong password',
            //         _error: 'Login failed!',
            //     });
            // } else {
            //     window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
            // }
        });
    }


    render() {
        const {handleSubmit, pristine, reset, error, submitting, submitFailed} = this.props;

        let styleText = {marginRight: 12, marginLeft: 12, flex: 2, width: 400};
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div style={{display: 'flex', width: 600}}>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'column', }}>
                            <Field style={styleText}
                                   name="currentPassword"
                                   label="Current Password"
                                   component={TextField}
                                   floatingLabelText="Current Password"
                                   hintText="Current Password"
                                   type="password"
                                   validate={required}
                            >
                            </Field>
                            <Field style={styleText}
                                   name="newPassword"
                                   label="New Password"
                                   component={TextField}
                                   floatingLabelText="New Password"
                                   hintText="New Password"
                                   type="password"
                                   validate={required}
                            >
                            </Field>
                            <Field style={styleText}
                                   name="verify"
                                   label="Verify Password"
                                   component={TextField}
                                   floatingLabelText="Verify Password"
                                   hintText="Verify Password"
                                   type="password"
                                   validate={required}
                            >
                            </Field>
                        </div>
                        <div style={{display: 'flex', marginTop: 30}}>

                            <RaisedButton label="Submit" type="submit" primary={true} style={styles.btn}
                                          disabled={pristine || submitting}/>
                            <RaisedButton label="Cancel" type="button" secondary={true} style={styles.btn}
                                          onClick={reset} containerElement={<Link to={'/'}/>}/>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

PasswordChangeForm = reduxForm({
    form: 'PasswordChangeForm',
    validate,
    onSubmitSuccess: (result, dispatch, props) => {
        props.history.push('/')
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log('onSubmitFail', errors, props);
        //props.reset(props.navigation.key) // <---------
        // props.history.push(getActivityTableUrl(100));
    }
})(PasswordChangeForm)
PasswordChangeForm = withRouter(connect(
    state => ({})
    ,
    {})(PasswordChangeForm));


export default PasswordChangeForm;