var React = require('react');
import Autocomplete from 'react-toolbox/lib/autocomplete';




var Search = React.createClass({
	getInitialState: function() {
		return {
			value: "",
			source: {
			  'ES-es': 'Spain', 
			  'TH-th': 'Thailand', 
			  'EN-gb': 'England', 
			  'EN-en': 'USA'
			}
		};
	},
	handleChange: function (value) {
		return this.setState({value: value});
  },
	render: function() {
		if (!this.state.value) {
			this.state.value = ""
		}
		return (
			 <Autocomplete
			  className="header-searchbar"
        direction="down"
        label="Choose countries"
        onChange={this.handleChange}
        source={this.state.source}
        value={this.state.value.toString()}
      />
		);
	}

});


module.exports = Search