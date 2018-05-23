import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue700, grey600, grey800, lightGreen500} from 'material-ui/styles/colors';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LdpUIApp from './containers/LdpUIApp'
import './App.css';

const muiTheme = getMuiTheme({

    palette: {
        primary1Color: blue700,
        primary2Color: grey800,
        primary3Color: lightGreen500,
        accent1Color: grey600,
    },
    appBar: {
        height: 40,
    },
    button: { textTransform: 'capitalize' },
});


class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme} style={{ height: '100%'}}>
                <Router style={{ height: '100%'}}>
                    <LdpUIApp style={{ height: '100%'}} />
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
