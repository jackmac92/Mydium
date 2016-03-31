React = require 'react'

ArticleIndexItem = React.createClass

  render: ->
    <li className="article-index-item">
    	<img className="author-thumb" src={@props.article.author.avatar} />
    	<p className="author-email">{@props.article.author.email}</p>
      <h2>{@props.article.title}</h2>
      <p className="article-index-item-body">{@props.article.body}</p>
    </li>

module.exports = ArticleIndexItem
