var React = require('react');
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

var UserShow = React.createClass({

	getInitialState: function() {
		return {value: "a"};
	},
	handleChange: function (value) {
		this.setState({value: value})
	},
  componentDidMount: function() {
    
  },
	render: function() {
		return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab onClick={this.handleChange.bind(this,"a")} label="Favorites" value="a" >
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"b")} label="Bookmarks" value="b">
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"c")} label="Drafts" value="c">
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"d")} label="Published" value="d">
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"e")} label="Activity" value="e">
        </Tab>
      </Tabs>
		);
	}

});

module.exports = UserShow;
