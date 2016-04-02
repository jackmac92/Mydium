React = require 'react'
Search = require './search'
ActionSheet = require '../react-foundation-apps/lib/action-sheet'
ApiUtil = require '../util/api_util'

Header = React.createClass
  contextTypes: 
    router: React.PropTypes.object.isRequired
  render: ->
    if @props.currentUser
      userNotifications = <a href="#/me/notifications" className="success badge">1</a>
      userAction = (
          <ActionSheet>
            <ActionSheet.Button title="Me" />
            <ActionSheet.Content>
              <p>{"Hi "+@props.currentUser.email}</p>
              <ul>
                <li><button>New Story</button></li>
                <li><button>Profile</button></li>
                <li><button onClick={@logOutUser}>Logout</button></li>
              </ul>
            </ActionSheet.Content>
          </ActionSheet>
        )
    else
      # userAction = <button class="create-session">Sign in/ Sign up</button>
        userAction = <a href="/#/login">Sign in/ Sign up</a>

    <header className="header">
      <div id="logo" />
      <nav className="header-nav group">        
        <ul className="header-nav-left">
          <li><a href="#">Home</a></li>
          <li><a href="#/top_articles">Top Articles</a></li>
          <li><a href="#/me/bookmarks">Bookmarks</a></li>
        </ul>
        <ul className="header-nav-right">
          <li><Search /></li>
          <li><a href="/#/editor">Write Something</a></li>
          <li>{userNotifications}</li>
          <li>{userAction}</li>
        </ul>
      </nav>
    </header>

  logOutUser: ->
    ApiUtil.logOutUser()
    @context.router.push '/login'

module.exports = Header