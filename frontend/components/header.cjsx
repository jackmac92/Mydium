React = require 'react'
Search = require './search'
Header = React.createClass

	render: ->
    <header>
      <nav className="header-nav group">
        <Img id="logo" src="/assets/logo.png" />
        <Search />
      </nav>
    </header>


module.exports = Header