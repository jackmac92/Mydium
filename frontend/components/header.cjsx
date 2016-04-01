React = require 'react'
Search = require './search'
ActionSheet = require '../react-foundation-apps/lib/action-sheet'
ApiUtil = require '../util/api_util'

Header = React.createClass
  contextTypes: 
    router: React.PropTypes.object.isRequired
  render: ->
    if @props.currentUser
      userActionSheet = (
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

    <header>
      <div id="logo" />
      <nav className="header-nav group">        
        <div className="header-nav-left">
          <span><a href="#">Home</a></span>
          <span><a href="#/top_articles">Top Articles</a></span>
          <span><a href="#/me/bookmarks">Bookmarks</a></span>
        </div>
        <div className="header-nav-right">
          <span><Search /></span>
          <span><a href="/#/editor">Write Something</a></span>
          <span><a href="#/me/notifications"><span className="success badge">1</span></a></span>
          <span>{userActionSheet}</span>
        </div>
      </nav>
    </header>

  logOutUser: ->
    ApiUtil.logOutUser()
    @context.router.push '/login'

module.exports = Header