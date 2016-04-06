import React from 'react'
import Search from './search'
import ApiUtil from '../util/api_util'
import Navigation from 'react-toolbox/lib/navigation'
import Link from 'react-toolbox/lib/link'
import Button from 'react-toolbox/lib/button'
import {IconMenu, MenuItem, MenuDivider} from 'react-toolbox/lib/menu'
import Input from 'react-toolbox/lib/input'
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';

var Header = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	render: function() {
		var userNotifications, userAction;
		if (this.props.currentUser) {
      userNotifications = <Button icon="notifications_none" />;
			userAction = (
				<IconMenu icon="account_circle" position="top-right" menuRipple >
					<MenuItem caption={this.props.currentUser.email} />
					<MenuItem caption="New Story"/>
					<MenuItem caption="Import Story"/>
					<MenuItem caption="Drafts and Stories"/>
					<MenuItem caption="Stats"/>
					<MenuItem caption="Publications"/>
					<MenuDivider />
					<MenuItem caption="Profile"/>
					<MenuItem caption="Settings"/>
					<MenuItem onClick={() => ApiUtil.logOutUser()} caption="Sign Out"/>
				</IconMenu>
				)

		} else {
			userAction = <Link href="#/login" icon="account_circle" label="Sign up/ Log in" />
		}
		return (
	    <div className="header group">
	    	<AppBar
	    		style={{background:"transparent"}}
	    		title={<div id="logo" />}
	    		iconElementRight={<IconButton><FontIcon className="material-icons">{"account_circle"}</FontIcon></IconButton>}

	    	/>
	      <Navigation className="header-nav group">        
	        <Navigation type="horizontal" className="header-nav-left">
	          <Link href="#" active label="Home" />
	          <Link href="#/popular" label="Top Articles" />
	          <Link href="#/me/bookmarks" label="Bookmarks" />
	        </Navigation>
	        <Navigation type="horizontal" className="header-nav-right">
	          <Link href="/#/editor" label="Write Something"/>
	          {userNotifications}
	          {userAction}
	        </Navigation>
	      </Navigation>
	    </div>
		);
	}

});

module.exports = Header;