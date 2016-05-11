import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';
import * as Colors from 'material-ui/styles/colors';

import App from './app';



var muiTheme = {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  baseTheme: {
    fontFamily: 'Roboto, sans-serif'
  },
  
  palette: {
    primary1Color: Colors.blue500,
    primary2Color: Colors.blue700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.yellowA500,
    accent2Color: Colors.yellowA100,
    accent3Color: Colors.yellowA900,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
  }
};


var React = require('react');

var MaterialApp = React.createClass({

	render: function() {
		return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      	<App>
          {this.props.children}
      	</App>
      </MuiThemeProvider>
		);
	}

});

module.exports = MaterialApp;



