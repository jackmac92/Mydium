import React from 'react';
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import ApiUtil from '../util/api_util'
import Tag from './tag'
import Comments from './comment_section'
import Checkbox from 'material-ui/Checkbox';
import {List,ListItem} from 'material-ui/List';

import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import * as Colors from 'material-ui/styles/colors';


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
    currState.remainingTime = 0
    this.setState(currState);
    clearTimeout(this.readTimer)
    clearInterval(this.readTimerProgress)
    var that = this;
    this.readTimer = setTimeout(() => that.setState({readTimeElapsed: true}), 20000 * parseInt(currState.article.read_time))
    this.readTimerProgress = setInterval(
      () => {
        that.setState({remainingTime: that.state.remainingTime + 1});
      },
      600 * parseInt(currState.article.read_time)
    )
  },
  getInitialState: function () {
    var currState = this.stateFromStore();
    currState.position = 0
    currState.remainingTime = 0
    currState.userSignedIn = SessionStore.isLoggedIn()
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
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    ApiUtil.fetchArticle(parseInt(nextProps.params.id));
  },
  __updateUser: function () {
    this.setState({userSignedIn: SessionStore.isLoggedIn()})
  },
  componentDidMount: function () {
    this.articleStoreToken = ArticleStore.addListener(this.__onChange);
    this.SessionStoreToken = SessionStore.addListener(this.__updateUser);
    ApiUtil.fetchArticle(parseInt(this.props.params.id));
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount: function () {
    this.tryMarkArticleRead()
    this.articleStoreToken.remove();
    window.removeEventListener('scroll', this.handleScroll)
  },

  handleFollowAuthor: function () {
    if (this.state.article.user.follows_author) {
      ApiUtil.unMarkFollow("User",this.state.article.author.id)
    } else {
      ApiUtil.markFollow("User",this.state.article.author.id)
    }
    // ApiUtil.toggleFollow(this.state.article.author.id)
  },

  handleUnpublish: function () {
    ApiUtil.ArticleUnpublish(this.state.article.id, () => this.context.router.push('/editor/'+this.state.article.id))
  },

  rawBody: function () {
    return { __html: this.state.article.body }
  },

  handleScroll: function (e) {
    var scrollPercent = 100 * $(window).scrollTop() / ($("article").height() - $(window).height());
    this.setState({position: scrollPercent})
    if (scrollPercent >= 98 && !this.state.markedRead && this.state.userSignedIn) {
      this.setState({scrolledToEnd: true})
      this.tryMarkArticleRead()
    }
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
        var delStyle = {
          float:"right",
          margin:"-10px 20px 10px 0px"
        }
        delete_button = <RaisedButton className="unpublish-button" style={delStyle} label="Unpublish" onClick={this.handleUnpublish}/>
      } else {
        follow_button = <Checkbox checked={this.state.article.user.follows_author} onCheck={this.handleFollowAuthor} label={"Follow " + this.state.article.author.name} />
      }
    }

    if (this.state.article.authors_recent_articles.length > 0) {
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
          <LinearProgress color={Colors.green600} mode="determinate" value={this.state.position}/>
        </div>
        <article className="article-detail">
          <img className="author-thumb" src={this.state.article.author.avatar} />
          <p className="author-email">{this.state.article.author.name}</p>
            {tags}

          <div>
            {delete_button}
            <h1>{this.state.article.title}</h1>
          </div>
          <img className="article-detail-image" src={this.state.article.picture} />
          <div
            dangerouslySetInnerHTML={this.rawBody()}
          />
        </article>
        {recent_posts_view}
        {follow_button}
        <hr />
        <Comments commentTimer={this.state.remainingTime} disabled={!this.state.markedRead} article_id={this.state.article.id} comments={this.state.article.comments} />
      </main>
    );
  }

});

module.exports = ArticleDetail;