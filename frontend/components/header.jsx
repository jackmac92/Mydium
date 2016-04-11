import React from 'react'
import Search from './search'
import ApiUtil from '../util/api_util'
import SessionStore from '../stores/session'
import Popover from 'material-ui/lib/popover/popover';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import Headroom from 'react-headroom'
import Link from 'react-toolbox/lib/link'
import AutoComplete from 'material-ui/lib/auto-complete';

var Header = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {open: false};
	},

  handleTouchTap: function (event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  },

  handleRequestClose: function () {
  	this.setState({open:false})
  },
	            // <FlatButton onClick={() => router.push("/me/drafts")} label="Drafts"/>
	            // <FlatButton onClick={() => router.push("/me/published")} label="Publications"/>

	render: function() {
		var userActionButton;
		var router = this.context.router
		if (SessionStore.isLoggedIn()) {
			userActionButton = (
				<div className="user-action-button-header">
	        <FlatButton className="header-right-nav"
	          onClick={this.handleTouchTap}
	          label={
	          	<FontIcon className="material-icons">
	          		{"account_circle"}
	          	</FontIcon>
	          }
	        />
	        <Popover
	          open={this.state.open}
	          anchorEl={this.state.anchorEl}
	          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
	          targetOrigin={{horizontal: 'left', vertical: 'top'}}
	          onRequestClose={this.handleRequestClose}
	        >
	            <FlatButton onClick={() => router.push("/editor")} label="New Article"/>
	            <FlatButton onClick={() => router.push("me/bookmarks")} label="Bookmarks"/>
	            <FlatButton onClick={() => router.push("/search")} label="Search"/>
	            <FlatButton onClick={ApiUtil.logOutUser} label="Sign Out"/>
	        </Popover>				
				</div>
			)
		} else {
			userActionButton = <Link className="user-action-button-header" href="/#/login" label="Log In" />
		}
		return (
			<Headroom>
    		<Paper className="header-wrap" zDepth={1}>
		    	<header className="header">
		    		<div onClick={() => router.push("/")} id="logo" />
		    		{userActionButton}
		    	</header>
    		</Paper>
			</Headroom>
		);
	}

});

module.exports = Header;