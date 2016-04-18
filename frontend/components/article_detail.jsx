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
import LinearProgress from 'material-ui/lib/linear-progress';


var ArticleDetail = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  stateFromStore: function () {
    return {article: ArticleStore.getDetail()};
  },
  __onChange: function () {
    var currState = this.stateFromStore()
    currState.readTimeElapsed = false
    currState.scrolledToEnd = false
    currState.markedRead = false
    this.setState(currState);
    clearTimeout(this.readTimer)
    var that = this;
    this.readTimer = setTimeout(() => that.setState({readTimeElapsed: true}), 60000 * parseInt(currState.article.read_time))
  },
  getInitialState: function () {
    var currState = this.stateFromStore();
    currState.position = 0
    return currState
  },
  tryMarkArticleRead: function () {
    if (this.state.readTimeElapsed && this.state.scrolledToEnd) {
      ApiUtil.markArticleRead(this.state.article.id)
      this.setState({markedRead: true})
    };
  },
  componentWillReceiveProps: function (nextProps) {
    this.tryMarkArticleRead()
    ApiUtil.fetchArticle(parseInt(nextProps.params.id));
  },
  componentDidMount: function () {
    this.articleStoreToken = ArticleStore.addListener(this.__onChange);
    ApiUtil.fetchArticle(parseInt(this.props.params.id));
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount: function () {
    this.tryMarkArticleRead()
    this.articleStoreToken.remove();
    window.removeEventListener('scroll', this.handleScroll)
  },

  handleFollowAuthor: function () {
    ApiUtil.toggleFollow(this.state.article.author.id)
  },

  handleUnpublish: function () {
    ApiUtil.ArticleUnpublish(this.state.article.id, () => this.context.router.push('/editor/'+this.state.article.id))
  },

  rawBody: function () {
    return { __html: this.state.article.body }
  },

  handleScroll: function (e) {
    var scrollPercent = 100 * $(window).scrollTop() / ($("article").height() - $(window).height());
    if (scrollPercent >= 98 && !this.state.markedRead) {
      this.setState({scrolledToEnd: true})
      this.tryMarkArticleRead()
    }
    this.setState({position: scrollPercent})
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
        follow_button = <Checkbox checked={this.state.article.user.follows_author} onCheck={this.handleFollowAuthor} label={"Follow " + this.state.article.author.name} />
      }
    }

    if (this.state.article.authors_recent_articles) {
      var article_items = this.state.article.authors_recent_articles.map( recent_article => (<ListItem onClick={() => this.context.router.push("/article/"+recent_article.id)} key={recent_article.id} primaryText={recent_article.title} />) );
      recent_posts_view = (
        <div>
          <hr />
          <List>
            <h4>{"Other Articles authored by " + this.state.article.author.name}</h4>
            {article_items}
          </List>
        </div>
      )
    }

    return (
      <main>
        <div className="article-progress">
          <LinearProgress mode="determinate" value={this.state.position}/>
        </div>
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
        {recent_posts_view}
        {follow_button}
        <hr />
        <Comments article_id={this.state.article.id} comments={this.state.article.comments} />
      </main>
    );
  }

});

module.exports = ArticleDetail;