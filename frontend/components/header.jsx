import React from 'react'
import Search from './search'
import ApiUtil from '../util/api_util'
import SessionStore from '../stores/session'
import Headroom from 'react-headroom'
import LoginForm from './login_form'
import SignupForm from './signup_form'
import Modal from 'react-modal'

import Popover from 'material-ui/lib/popover/popover';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import AutoComplete from 'material-ui/lib/auto-complete';
import TextField from 'material-ui/lib/TextField'
import ActionAccountCircle from 'material-ui/lib/svg-icons/action/account-circle'
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';


var Header = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			open: false,
			modalIsOpen: false,
			formForSignIn: true
		};
	},

  handleTouchTap: function (event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
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
		if (SessionStore.isLoggedIn()) {
			userActionButton = (
				<div>
					<div className="user-action-button-header">
		        <IconButton onClick={this.handleTouchTap} className="header-right-nav">
		          <ActionAccountCircle id="header-user-icon" />}
		         </IconButton>
		        <Popover
		          open={this.state.open}
		          anchorEl={this.state.anchorEl}
		          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		          targetOrigin={{horizontal: 'left', vertical: 'top'}}
		          onRequestClose={this.handleRequestClose}
		        >
		            <FlatButton onClick={this.goTo.bind(this,"/editor")} label="New Article"/>
		            <FlatButton onClick={this.goTo.bind(this,"me/bookmarks")} label="Bookmarks"/>
		            <FlatButton onClick={this.goTo.bind(this,"/search")} label="Search"/>
		            <FlatButton onClick={this.logOut} label="Sign Out"/>
		        </Popover>
					</div>
				</div>
			)
		} else {
			userActionButton = (
				<div>
					<Modal isOpen={this.state.modalIsOpen}
								 onRequestClose={this.modalClose}
								 style={{
								 		content:{
								 			top:'90px'
								 		}
								 	}}
								 >
						<FlatButton style={{float:"right"}} onClick={this.modalClose} label="close" />
						{authForm}
					</Modal>
					<FlatButton onClick={this.modalOpen} className="user-action-button-header" label="Log In/ Sign Up" />
				</div>

			)
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
	            // <FlatButton onClick={() => router.push("/me/drafts")} label="Drafts"/>
	            // <FlatButton onClick={() => router.push("/me/published")} label="Publications"/>