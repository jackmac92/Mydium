ReactDOM = require 'react-dom'
React = require 'react'

App = React.createClass
  render: ->
    <div>
      <h1>Podium</h1>
    </div>

window.onload = ->
  ReactDOM.render <App />, $('#root')[0]
