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
		var fileInputButton = <div>File Input</div>
		var router = this.context.router
		return (
	    	<AppBar
	    		style={{background:"transparent"}}
	    		title={<div onClick={() => router.push("/")} id="logo" />}
	    		iconElementRight={
	    			<IconMenu 
	    				iconButtonElement={
	    					<IconButton>
			    				<FontIcon className="material-icons">{"account_circle"}</FontIcon>
	    					</IconButton>
	    				}
			        targetOrigin={{horizontal: 'right', vertical: 'top'}}
			        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	    				>
		    			<MenuItem onClick={() => router.push("/editor")} caption="New Story" />
		    			<MenuItem onClick={() => router.push("#")} caption="Import Story" />
		    			<MenuItem onClick={() => router.push("/me/drafts")} caption="Drafts and Stories" />
		    			<MenuItem onClick={() => router.push("/me/published")} caption="Publications" />
		    			<MenuItem onClick={() => router.push("/me")} caption="Profile" />
		    			<MenuItem onClick={ApiUtil.logOutUser} caption="Sign Out" />
		    		</IconMenu>
	    		}
	    	/>
		);
	}

});

module.exports = Header;