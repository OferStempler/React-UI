import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Route, Link, withRouter} from 'react-router-dom'
import { Users, UserForm } from ".";

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        margin: 16,
        fontWeight: 400,
    },
};

function handleActive(tab) {
    //alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

const Settings = (props) => {
    return(
        <Tabs>
            <Tab label="Users" style={{backgroundColor: 'gray'}} containerElement={<Link to={'/settings/users'}/>}>
                <Route exact path="/settings/users"
                       render={routeProps => (<Users {...routeProps} {...props} />)} />
                <Route exact path="/settings/user"
                       render={routeProps => (<UserForm {...routeProps} {...props} />)} />
                <Route exact path="/settings/user/:id"
                       render={routeProps => (<UserForm {...routeProps} {...props} />)} />
            </Tab>
            <Tab label="Item Two" style={{ backgroundColor: 'gray'}}>
                <div>
                    <h2 style={styles.headline}>Future...</h2>
                    <h4 style={{margin: 16}}>Eli Cohen - king of LDP</h4>
                </div>
            </Tab>
        </Tabs>
    );
}
export default withRouter(Settings);
