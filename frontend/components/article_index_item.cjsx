React = require 'react'

ArticleIndexItem = React.createClass

  render: ->
    <li>
      <h2>{@props.article.title}</h2>
      <p>{@props.article.body}</p>
    </li>

module.exports = ArticleIndexItem
