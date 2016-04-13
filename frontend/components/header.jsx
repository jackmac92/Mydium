import React from 'react'
import Search from './search'
import ApiUtil from '../util/api_util'
import SessionStore from '../stores/session'
import Popover from 'material-ui/lib/popover/popover';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import Headroom from 'react-headroom'
import AutoComplete from 'material-ui/lib/auto-complete';
import Modal from 'react-modal'
import TextField from 'material-ui/lib/TextField'
import LoginForm from './login_form'
import SignupForm from './signup_form'

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
  	console.log("toggle")
  },
  handleRequestClose: function () {
  	this.setState({open:false})
  },
	            // <FlatButton onClick={() => router.push("/me/drafts")} label="Drafts"/>
	            // <FlatButton onClick={() => router.push("/me/published")} label="Publications"/>

	render: function() {
		var userActionButton, authForm;
		var router = this.context.router
		authForm = (this.state.formForSignIn) ? <LoginForm toggleAuth={this.toggleFormState} /> : <SignupForm toggleAuth={this.toggleFormState} /> 
		if (SessionStore.isLoggedIn()) {
			userActionButton = (
				<div className="user-action-button-header">
	        <FlatButton className="header-right-nav"
	          onClick={this.handleTouchTap}
	          label={<FontIcon id="header-user-icon" className="material-icons">{"account_circle"}</FontIcon>} / >
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