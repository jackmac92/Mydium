React = require 'react'

ArticleIndexItem = React.createClass

  render: ->
    <li className="article-index-item">
    	<img src={@props.article.author.avatar} />
    	<p>{@props.article.author.email}</p>
      <h2>{@props.article.title}</h2>
      <p>{@props.article.body}</p>
    </li>

module.exports = ArticleIndexItem
