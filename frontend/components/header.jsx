import React from 'react'
import Search from './search'
import ApiUtil from '../util/api_util'
import SessionStore from '../stores/session'
import Headroom from 'react-headroom'
import LoginForm from './login_form'
import SignupForm from './signup_form'

import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionSearch from 'material-ui/svg-icons/action/search';

import Dialog from 'material-ui/Dialog';


var Header = React.createClass({
	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function() {
		return {
			open: false,
			modalIsOpen: false,
			formForSignIn: true,
			currentUser: null
		};
	},

  handleTouchTap: function (event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  },

  updateUser: function () {
  	this.setState({
  		currentUser: SessionStore.currentUser()
  	})
  },

  componentDidMount: function() {
  	this.SessionStoreToken = SessionStore.addListener(this.updateUser)
  },

  componentWillUnmount: function() {
  	this.SessionStoreToken.remove()
  },

  modalOpen: function () {
  	this.setState({
  		modalIsOpen:true
  	})
  },

  modalClose: function () {
  	this.setState({
  		modalIsOpen:false
  	})
  },

  toggleFormState: function () {
  	this.setState({formForSignIn:!this.state.formForSignIn})
  },

  handleRequestClose: function () {
  	this.setState({open:false})
  },

  goTo: function (loc) {
  	this.context.router.push(loc)
  	this.handleRequestClose()
  },

  logOut: function () {
  	ApiUtil.logOutUser()
  	this.handleRequestClose()
  },

	render: function() {
		var userActionButton, authForm;
		var router = this.context.router
		authForm = (this.state.formForSignIn) ? <LoginForm toggleAuth={this.toggleFormState} /> : <SignupForm toggleAuth={this.toggleFormState} /> 
		if (this.state.currentUser) {
			userActionButton = (
					<div className="user-action-button-header">
		        <IconMenu
		        	className="header-right-nav"
		        	iconButtonElement={<IconButton><ActionAccountCircle />}</IconButton>}
		          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		          targetOrigin={{horizontal: 'left', vertical: 'top'}}
		        >
		        	<MenuItem onTouchTap={this.goTo.bind(this,"/editor")} primaryText="New Article"/>
		        	<MenuItem onTouchTap={this.goTo.bind(this,"/me")} primaryText="Account"/>
	            <MenuItem onTouchTap={this.logOut} primaryText="Sign Out"/>
		        </IconMenu>
					</div>
			)
		} else {
			userActionButton = (
				<div>
					<Dialog open={this.state.modalIsOpen}
								 modal={true}
								 onRequestClose={this.modalClose}
								 actions={[<FlatButton onClick={this.modalClose} label="close" />]}
								 contentStyle={{
								 	width: "70%",
								 	height: "60%",
								 	maxHeight:"none",
								 	maxWidth:"none"
								 }}
								 >
						{authForm}
					</Dialog>
					<FlatButton onClick={this.modalOpen} className="user-login-button-header" label="Log In/ Sign Up" />
				</div>

			)
		}
		return (
			<Headroom>
    		<Paper muiTheme={this.context.muiTheme} className="header-wrap" zDepth={1}>
		    	<header className="header">
		    		<div onClick={() => router.push("/")} id="logo" />
		    		<div className="header-right group">
			    		{userActionButton}
		    			<IconButton id="searchbutton" onClick={() => this.context.router.push("/search") }>
		    				<ActionSearch />
		    			</IconButton>
		    		</div>
		    	</header>
    		</Paper>
			</Headroom>
		);
	}

});

module.exports = Header;
	            // <FlatButton onClick={() => router.push("/me/drafts")} label="Drafts"/>
	            // <FlatButton onClick={() => router.push("/me/published")} label="Publications"/>