import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';

import {
    ServiceDependencies,
    ServiceForm,
    ServiceRegularExpressions,
    ServiceRegularExpressionsForm,
    ServiceSchemas
} from './index';
import ServiceSchemasForm from "./forms/ServiceSchemasForm";
import ServiceDependencyForm from "./forms/ServiceDependencyForm";




class ServiceView extends Component {

    constructor(props) {
        super(props);
        this.renderServiceRegularExpressionDialog.bind(this);
        this.renderServiceDependencyDialog.bind(this);
        this.renderSchemaDialog.bind(this);
        this.renderChildren.bind(this);
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.getService(this.props.match.params.id);
        }
    }


    componentWillUpdate(){
        if(this.props.dependencies.length === 0){
            this.props.getDependencies();
        }
        if(this.props.regExes.length === 0){
            this.props.getRegExs();
        }
    }

    renderServiceRegularExpressionDialog() {
        let open = this.props.selectedServiceRegex != null ? true : false;
        return (
            <Dialog
                //style={{dir: this.props.dir, direction: this.props.dir}}
                actionsContainerStyle={{textAlign: 'right'}}
                // actions={actions}
                modal={true}
                open={open}
                onRequestClose={() => this.props.selectServiceRegEx(null)}
            >
                <ServiceRegularExpressionsForm {...this.props} />
            </Dialog>
        )

    }

    renderServiceDependencyDialog() {
        let open = this.props.selectedServiceDependency != null ? true : false;
        return (
            <Dialog
                //style={{dir: this.props.dir, direction: this.props.dir}}
                actionsContainerStyle={{textAlign: 'right'}}
                // actions={actions}
                modal={true}
                open={open}
                onRequestClose={() => this.props.selectedServiceDependency(null)}
            >
                <ServiceDependencyForm {...this.props} />
            </Dialog>
        )

    }

    renderSchemaDialog() {
        let open = this.props.selectedSchema != null ? true : false;
        return (
            <Dialog
                //style={{dir: this.props.dir, direction: this.props.dir}}
                actionsContainerStyle={{textAlign: 'right'}}
                // actions={actions}
                modal={true}
                open={open}
                onRequestClose={() => this.props.selectServiceSchema(null)}
            >
                <ServiceSchemasForm {...this.props} />
            </Dialog>
        )

    }

    renderChildren() {
        let paperStyle = {marginLeft: 2};
        let subHeaderStyle = { textAlign: 'center', fontSize: 12, paddingTop: 3, color: 'rgb(158, 158, 158)' }
        if (this.props.service && this.props.service.id != null) {
            return (
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Paper style={{flex: 5}}>
                        <div style={subHeaderStyle}>Dependencies</div>
                        <ServiceDependencies {...this.props} />
                        {this.renderServiceDependencyDialog()}
                    </Paper>
                    <Paper style={{marginLeft: 2, flex: 5}}>
                        <div style={subHeaderStyle}>Regular Expressions</div>
                        <ServiceRegularExpressions {...this.props} />
                        {this.renderServiceRegularExpressionDialog()}
                    </Paper>

                    <Paper style={{marginLeft: 2, flex: 3}}>
                        <div style={subHeaderStyle}>Schemas</div>
                        <ServiceSchemas {...this.props} />
                        {this.renderSchemaDialog()}
                    </Paper>
                </div>
            )
        }
    }

    render() {
        if (this.props.match.params.id && !this.props.service) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <ServiceForm {...this.props} />
                {this.renderChildren()}

            </div>
        )
    }

}


export default withRouter(ServiceView);
