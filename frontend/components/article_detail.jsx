import React from 'react';
import ArticleStore from '../stores/articles'
import SessionStore from '../stores/session'
import ArticleUtil from '../util/article'
import UserUtil from '../util/user'
import AuthUtil from '../util/auth'
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
    clearTimeout(this.readTimer)
    clearInterval(this.readTimerProgress)
    var currState = this.stateFromStore()
    currState.readTimeElapsed = false
    currState.scrolledToEnd = false
    currState.remainingTime = 0
    if (SessionStore.isLoggedIn()) {
      currState.markedRead = currState.article.user.already_read
    }
    this.setState(currState);
    this.fetchImage()
    // if (!currState.markedRead) {
      // var that = this;
      // this.readTimer = setTimeout(() => that.setState({readTimeElapsed: true}), 20000 * parseInt(currState.article.read_time))
      // this.readTimer = setTimeout(() => that.setState({readTimeElapsed: true}), 7000 ) // For demo purposes keep the timer short
      // this.readTimerProgress = setInterval(
        // () => {
          // that.setState({remainingTime: that.state.remainingTime + 1});
        // },
        // 70
        // 600 * parseInt(currState.article.read_time)
      // )      
    // }
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
      UserUtil.markArticleRead(this.state.article.id)
      this.setState({markedRead: true})
    };
  },

  componentWillReceiveProps: function (nextProps) {
    this.tryMarkArticleRead()
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    ArticleUtil.fetchArticle(parseInt(nextProps.params.id));
  },
  __updateUser: function () {
    this.setState({userSignedIn: SessionStore.isLoggedIn()})
  },
  componentDidMount: function () {
    this.articleStoreToken = ArticleStore.addListener(this.__onChange);
    this.SessionStoreToken = SessionStore.addListener(this.__updateUser);
    ArticleUtil.fetchArticle(parseInt(this.props.params.id));
    AuthUtil.fetchCurrentUser();
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
      UserUtil.unMarkFollow("User",this.state.article.author.id)
    } else {
      UserUtil.markFollow("User",this.state.article.author.id)
    }
  },

  handleUnpublish: function () {
    UserUtil.ArticleUnpublish(this.state.article.id, () => this.context.router.push('/editor/'+this.state.article.id))
  },

  rawBody: function () {
    return { __html: this.state.article.body }
  },

  fetchImage: function() {
    var placeholder = document.querySelector('#placeholder-'+this.state.article.id);
    var small = placeholder.querySelector('.img-small')
    var img = new Image();
    img.src = small.src;
    img.onload = () => small.classList.add('loaded')

    var imgLarge = new Image()
    imgLarge.src = placeholder.dataset.large
    imgLarge.onload = () => imgLarge.classList.add('loaded')
    placeholder.appendChild(imgLarge)
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
      <div>
        <div className="article-progress">
          <LinearProgress color={Colors.green600} mode="determinate" value={this.state.position}/>
        </div>
        <div className="image-container article-detail-image placeholder" id={"placeholder-"+this.state.article.id} data-large={this.state.article.picture} >
          <img src={this.state.article.loading_pic} className="img-small"/>
          <div style={{paddingBottom: "50%"}}></div>
        </div>
        <section className="article-detail-view">
          <article className="article-detail">
            <div>
              {delete_button}
              <h1>{this.state.article.title}</h1>
            </div>
            <img className="author-thumb" src={this.state.article.author.avatar} />
            <p className="author-name">{this.state.article.author.name}</p>
            {tags}
            <div
              dangerouslySetInnerHTML={this.rawBody()}
            />
          </article>
          {recent_posts_view}
          {follow_button}
          <hr />
          <Comments commentTimer={this.state.remainingTime} disabled={!this.state.markedRead} article_id={this.state.article.id} comments={this.state.article.comments} />
        </section>
      </div>
    );
  }

});

module.exports = ArticleDetail;