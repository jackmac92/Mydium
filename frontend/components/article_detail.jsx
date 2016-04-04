var React = require('react');
import ArticleStore from '../stores/articles'
import ApiUtil from '../util/api_util'
import Tag from './tag'
import Comments from './comment_section'

var ArticleDetail = React.createClass({
  stateFromStore: function () {
    return {article: ArticleStore.getDetail()};
  },
  __onChange: function () {
    this.setState(this.stateFromStore());
  },
  getInitialState: function () {
    return this.stateFromStore();
  },
  componentWillReceiveProps: function (nextProps) {
    ApiUtil.fetchArticle(parseInt(nextProps.params.id));
  },
  componentDidMount: function () {
    this.articleStoreToken = ArticleStore.addListener(this.__onChange);
    ApiUtil.fetchArticle(parseInt(this.props.params.id));
  },
  componentWillUnmount: function () {
    this.articleStoreToken.remove();
  },
  render: function() {
    var tags = [], other_articles, recent_posts_tmp, recent_posts;
    if (!this.state.article) {
      return (<h2>Loading...</h2>);
    }
    if (this.state.article.tags) {
      tags = this.state.article.tags.map( t => <Tag key={t.id} tag={t} /> )
    }
    if (this.state.article.authors_recent_articles) {
      recent_posts_tmp = this.state.article.authors_recent_articles.map(article => <li key={article.id}>{article.title}</li>)
      recent_posts = <section><h3>Recent Posts</h3><ul>{recent_posts_tmp}</ul></section>
    }
    return (
      <content>
        <article>
          <img className="author-thumb" src={this.state.article.author.avatar} />
          <p className="author-email">{this.state.article.author.email}</p>
          <ul>
            {tags}
          </ul>
          <h1>{this.state.article.title}</h1>
          <p>{this.state.article.body}</p>
        </article>
        <hr />
        {recent_posts}
        <hr />
        <Comments article_id={this.state.article.id} comments={this.state.article.comments} />
      </content>
    );
  }

});

module.exports = ArticleDetail;