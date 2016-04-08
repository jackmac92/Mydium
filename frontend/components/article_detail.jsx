import React from 'react';
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import ApiUtil from '../util/api_util'
import Tag from './tag'
import Comments from './comment_section'
import Checkbox from 'material-ui/lib/checkbox'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import RaisedButton from 'material-ui/lib/raised-button'

var ArticleDetail = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

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
    if (SessionStore.isLoggedIn()) {
      this.setState({followsAuthor: this.state.article.user.follows_author})
    }
  },
  componentWillUnmount: function () {
    this.articleStoreToken.remove();
  },

  handleFollowAuthor: function () {
    ApiUtil.toggleFollow(this.state.article.author.id, () => this.setState({followsAuthor: !this.state.followsAuthor}) )
  },

  handleUnpublish: function () {
    ApiUtil.ArticleUnpublish(this.state.article.id, () => this.context.router.push('/me/drafts'))
  },

  rawBody: function () {
    return { __html: this.state.article.body}
  },

  render: function() {
    var tags = [], recent_posts_view, delete_button, follow_button;
    if (!this.state.article) {
      return (<h2>Loading...</h2>);
    }
    if (this.state.article.tags) {
      tags = this.state.article.tags.map( t => <Tag key={t.id} tag={t} /> )
    }
    if (SessionStore.isLoggedIn()) {
      if (this.state.article.author.id == SessionStore.currentUser().id) {
        delete_button = <RaisedButton label="Unpublish" onClick={this.handleUnpublish}/>
      } else {
        console.log(this.state.followsAuthor)
        follow_button = <Checkbox value={this.state.followsAuthor} onCheck={this.handleFollowAuthor} label={"Follow " + this.state.article.author.name} />
      }
    }
    if (this.state.article.authors_recent_articles) {
      var article_items = this.state.article.authors_recent_articles.map( recent_article => (<ListItem onClick={() => this.context.router.push("/article/"+recent_article.id)} key={recent_article.id} primaryText={recent_article.title} />) );
      recent_posts_view = (
        <List>
          {article_items}
        </List>
      )
    }
    return (
      <main>
        <article className="article-detail">
          <img className="author-thumb" src={this.state.article.author.avatar} />
          <p className="author-email">{this.state.article.author.name}</p>
          {delete_button}
            {tags}

          <h1>{this.state.article.title}</h1>
          <img className="article-detail-image" src={this.state.article.picture} />
          <div
            dangerouslySetInnerHTML={this.rawBody()}
          />
        </article>
        <hr />
        {recent_posts_view}
        {follow_button}
        <hr />
        <Comments article_id={this.state.article.id} comments={this.state.article.comments} />
      </main>
    );
  }

});

module.exports = ArticleDetail;