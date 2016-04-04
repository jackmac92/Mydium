import React from 'react'
import Search from './search'
import ApiUtil from '../util/api_util'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import Link from 'react-toolbox/lib/link'
import Input from 'react-toolbox/lib/input'

var Header = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	render: function() {
		var userNotifications, userAction;
		if (this.props.currentUser) {
      userNotifications = <Link href="#/me/notifications" className="success badge" label="1" />;
			userAction = <Link href="#/me" icon="account_circle" label={this.props.currentUser.email} />
		} else {
			userAction = <Link href="#/login" label="Sign up/ Log in" />
		}
		return (
	    <AppBar className="header group">
	      <div id="logo" />
	      <nav className="header-nav group">        
	        <Navigation type="horizontal" className="header-nav-left">
	          <Link href="#" active label="Home" />
	          <Link href="#/top_articles" label="Top Articles" />
	          <Link href="#/me/bookmarks" label="Bookmarks" />
	        </Navigation>
	        <Navigation type="horizontal" className="header-nav-right">

	          <Link href="/#/editor" label="Write Something"/>
	          {userNotifications}
	          {userAction}
	        </Navigation>
	      </nav>
	    </AppBar>
		);
	}

});

module.exports = Header;