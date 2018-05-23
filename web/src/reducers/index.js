import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import menuReducer from './MenuReducer';
import authReducer from './AuthReducer';
import serviceReducer from './ServiceReducer';
import regExReducer from './RegExReducer';
import dependencyReducer from './DependencyReducer';
import systemReducer from './SystemReducer';
import userReducer from './UserReducer';
import messageReducer from './MessageReducer';


const rootReducer = combineReducers({
    form: formReducer,
    menu: menuReducer,
    auth: authReducer,
    service: serviceReducer,
    regEx: regExReducer,
    dependency: dependencyReducer,
    systemData: systemReducer,
    user: userReducer,
    message: messageReducer,

});

export default rootReducer;
