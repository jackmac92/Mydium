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
	        </Navigation>
	      </Navigation>
	    </div>
		);
	}

});

module.exports = Header;