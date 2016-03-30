React = require 'react'
Search = require './search'
Header = React.createClass

	render: ->
    <header>
      <nav className="header-nav group">
        <h1 id="logo">
          Podium
        </h1>
        <Search />
      </nav>
    </header>


module.exports = Header