import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import muiTheme from './muiTheme';

import App from './app'





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



