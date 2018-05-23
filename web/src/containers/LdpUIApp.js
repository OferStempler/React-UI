import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Snackbar from  'material-ui/Snackbar';
import {blue700, grey600, grey800, lightGreen500, red200} from 'material-ui/styles/colors';

import {Connections,
    Home,
    LdpAppBar,
    LdpMenu,
    Services,
    ServiceForm,
    RegExs,
    RegExForm,
    ServiceView,
    Dependencies,
    DependencyForm,
    ExportLdp,
    ImportLdp,
    PasswordChangeForm,
    Settings,
    Logs} from '../components'
import SigninForm from './SigninForm';


import {setMenu, signOut, init,
    getServices, getService, postService, deleteService, putService,  synchServices,
    getRegExs, getRegEx, postRegEx, deleteRegEx, putRegEx,  synchRegxes, selectServiceRegEx,
    putServiceRegex, postServiceRegex, deleteServiceRegex,
    selectServiceSchema,deleteServiceSchema,putServiceSchema,postServiceSchema,
    postServiceDependency,putServiceDependency,deleteServiceDependency,selectServiceDependency,
    getDependency,getDependencies,postDependency,putDependency,deleteDependency,synchDependencys,
    getSystem,importLDP,
    getUsers, getUserById, putUser, postUser, deleteUser, synchUsers,getReloadLdpEngine, clearMsg,
    clearSystemErrorMsg,sortServiceTable, sortDependencyTable, sortRegexTable
} from '../actions/index';

const PrivateRoute = ({component: Component, authenticated, ...props}) => (
    <Route {...props} render={routeProps => (
        authenticated ? (
            <Component {...routeProps} {...props} />
        ) : (
            <SigninForm {...routeProps} {...props}/>
        )
    )}/>
);

class LdpUIApp extends Component {

    constructor(props) {
        super(props);
        this.renderMenu.bind(this);
    }
//                <LdpDrawerMenu {...this.props}/>


    componentWillMount() {
        this.props.init();
        this.props.getRegExs();
        this.props.getDependencies();
        this.props.getSystem();
    }

    componentWillUpdate(){
        if(this.props.userName === null){
            this.props.getSystem();
        }
    }

    render() {

        return (
            <div className="container" >
                <LdpAppBar  {...this.props} />

                <div style={{display: 'flex',  flexDirection: 'row', height: window.innerHeight - 75}}>
                    {this.props.authenticated && this.renderMenu()}
                    <Paper className="Paper" style={{flex: 14, height: '100%', display: 'flex'}}>
                        <PrivateRoute exact path="/" component={Services}
                                      {...this.props}/>
                        <PrivateRoute exact path="/services" component={Services}
                                     {...this.props}/>
                        <PrivateRoute exact={true} path="/service" component={ServiceView}
                                      {...this.props}/>
                        <PrivateRoute exact={true} path="/service/:id" {...this.props}
                                      component={ServiceView}/>
                        <PrivateRoute exact path="/dependencies" component={Dependencies}
                                      {...this.props}/>
                        <PrivateRoute exact path="/dependency/:id" {...this.props}
                                      component={DependencyForm}/>
                        <PrivateRoute exact path="/dependency" {...this.props}
                                      component={DependencyForm}/>
                        <PrivateRoute exact path="/regExs" component={RegExs}
                                      {...this.props}/>
                        <PrivateRoute exact path="/regEx/:id" {...this.props}
                                      component={RegExForm}/>
                        <PrivateRoute exact path="/regEx" {...this.props}
                                      component={RegExForm}/>
                        <PrivateRoute exact path="/connections" component={Connections}
                                     {...this.props}/>
                        <PrivateRoute exact path="/export" component={ExportLdp}
                                      {...this.props}/>
                        <PrivateRoute exact path="/import" component={ImportLdp}
                                      {...this.props}/>
                        <PrivateRoute exact path="/passwordChange" component={PasswordChangeForm}
                                      {...this.props}/>
                        {this.props.admin && <PrivateRoute path="/settings" component={Settings}
                                      {...this.props}/> }
                        <PrivateRoute path="/logs" component={Logs}
                                      {...this.props}/>


                    </Paper>
                    <Snackbar
                        contentStyle={{color: this.props.msgStatus === 'error' ? red200 : lightGreen500 }}
                        open={this.props.msg.length > 0}
                        message={this.props.msg}
                        //action="undo"
                        autoHideDuration={10000}
                        //onActionClick={this.handleActionClick}
                        onRequestClose={this.props.clearMsg}
                    />
                </div>
            </div>
        )
    }

    renderMenu() {

            return (
                <div style={{flex: 1}}>
                        <LdpMenu {...this.props} />
                </div>
            )
    }

}


LdpUIApp = withRouter(connect(
    state => ({
        open: state.menu.open,
        authenticated: state.auth.authenticated,
        authError: state.auth.error,
        services: state.service.services,
        service: state.service.service,
        loadServices: state.service.loadServices,
        regEx: state.regEx.regEx,
        loadReExes: state.regEx.loadReExes,
        regExes: state.regEx.regExes,
        serviceSchemas: state.service.serviceSchemas,
        serviceRegularExpressions: state.service.serviceRegularExpressions,
        selectedServiceRegex: state.service.selectedServiceRegex,
        serviceDeletable: state.service.serviceDeletable,
        loadService: state.service.loadService,
        selectedSchema: state.service.selectedSchema,
        serviceDependencies : state.service.serviceDependencies,
        selectedServiceDependency: state.service.selectedServiceDependency,
        serviceSortColumn: state.service.serviceSortColumn,
        serviceSortDir: state.service.serviceSortDir,
        dependency: state.dependency.dependency,
        dependencies: state.dependency.dependencies,
        loadDependencies: state.dependency.loadDependencies,
        userName: state.systemData.user,
        production: state.systemData.production,
        admin: state.systemData.admin,
        selectedUser: state.user.selectedUser,
        users: state.user.users,
        loadUsers: state.user.loadUsers,
        msg: state.message.msg,
        msgStatus: state.message.msgStatus,
        systemErrorMessage: state.systemData.errorMessage,
        regexSortColumn: state.regEx.regexSortColumn,
        regexSortDir: state.regEx.regexSortDir,
        dependencySortColumn: state.dependency.dependencySortColumn,
        dependencySortDir: state.dependency.dependencySortDir,
    })
    ,
    {
        setMenu,
        signOut,
        getServices,
        getService,
        postService,
        deleteService,
        putService,
        init,
        synchServices,
        getRegExs, getRegEx, postRegEx, deleteRegEx, putRegEx,  synchRegxes,
        selectServiceRegEx, putServiceRegex, postServiceRegex, deleteServiceRegex,
        selectServiceSchema,deleteServiceSchema,putServiceSchema,postServiceSchema,
        postServiceDependency,putServiceDependency,deleteServiceDependency,selectServiceDependency,
        getDependency,getDependencies,postDependency,putDependency,deleteDependency,synchDependencys,
        getSystem,importLDP,
        getUsers, getUserById, putUser, postUser, deleteUser, synchUsers,getReloadLdpEngine, clearMsg,
        clearSystemErrorMsg,sortServiceTable, sortDependencyTable, sortRegexTable
    }
)(LdpUIApp));
export default LdpUIApp