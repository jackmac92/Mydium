React = require 'react'
Search = require './search'
Header = React.createClass

	render: ->
    <header>
      <nav className="header-nav group">
				
        <img id="logo" src="/assets/logo.png" />
        <a href="/">Home</a>
        <a href="/#/top_articles">Top Articles</a>
        <a href="/#/me/bookmarks">Bookmarks</a>
        <Search />
        <a href="/#/editor">Write Something</a>
        <div>Notification Badge</div>
        <div>User info</div>
      </nav>
    </header>


module.exports = Header