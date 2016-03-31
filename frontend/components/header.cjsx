React = require 'react'
Search = require './search'
Header = React.createClass

	render: ->
    <header>
      <div id="logo" />
      <nav className="header-nav group">        
        <div className="header-nav-left">
          <a href="#">Home</a>
          <a href="#/top_articles">Top Articles</a>
          <a href="#/me/bookmarks">Bookmarks</a>
        </div>
        <div className="header-nav-right">
          <Search />
          <a href="/#/editor">Write Something</a>
          <a href="#/me/notifications">Notification Badge</a>
          <a href="#/me">User info</a>
        </div>
      </nav>
    </header>


module.exports = Header