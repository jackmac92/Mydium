var React = require('react');
import Autocomplete from 'react-toolbox/lib/autocomplete'


var Search = React.createClass({

	getInitialState: function() {
		return {
	    countries: ['EN-es', 'TH-th'],
	    source:{'ES-es': 'Spain', 'TH-th': 'Thailand', 'EN-gb': 'England', 'EN-en': 'USA'}
		}
	},

  handleChange: function(value) {
    return this.setState({countries: value});
  },
  render: function () {	
    return(
	      <Autocomplete
	      direction="down"
	      label="Choose countries"
	      onChange={this.handleChange}
	      source={this.state.source}
	      value={this.state.value}
	    />
  	)  
  }

});

module.exports = Search;