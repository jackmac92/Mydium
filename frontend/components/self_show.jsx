var React = require('react');
import {Tab, Tabs} from 'material-ui/Tabs';
import SessionStore from '../stores/session'
import UserStore from '../stores/user'
import {List,ListItem} from 'material-ui/List';
import ApiUtil from '../util/api_util'
import TagSelector from './tag_selector'
import FlatButton from 'material-ui/FlatButton'

var SelfShow = React.createClass({
  contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function() {
    var init = this.stateFromStore()
    init.value = "c"
    return init
	},
  stateFromStore: function () {
    return {
      bookmarks: SessionStore.userBookmarks(),
      favorites: SessionStore.userFavorites(),
      drafts: SessionStore.userDrafts(),
      published: SessionStore.userPublished(),
      profile: UserStore.detail()
    }
  },
	handleChange: function (value) {
		this.setState({value: value})
	},
  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.__onChange)
    this.userStoreToken = UserStore.addListener(this.__onChange)
    ApiUtil.fetchDrafts()
    ApiUtil.fetchPublished()
    ApiUtil.fetchBookmarkedArticles()
    ApiUtil.fetchFavoritedArticles()
    ApiUtil.fetchUserInfo(SessionStore.currentUser().id)
  },
  componentWillUnmount: function() {
    this.sessionStoreToken.remove()
    this.userStoreToken.remove()
  },

  __onChange: function () {
    this.setState(this.stateFromStore())
  },

	render: function() {
    var drafts, draftsection, bookmarksection, bookmarks, favoritesection, favorites, profile, profilesection, published, publishedection;
    if (this.state.drafts.length > 0) {
        drafts = this.state.drafts.map( d =>
          <ListItem 
            onClick={() => this.context.router.push("/editor/"+d.id)} 
            primaryText={d.title}
            rightIconButton={<FlatButton onClick={() => ApiUtil.destroyArticle(d.id)} label="delete" />}
            key={d.id} />
        );
        draftsection = (
            <List>
              {drafts}
            </List>            
          )

    }
    if (this.state.published.length > 0) {
        published = this.state.published.map( a =>
          <ListItem onClick={() => this.context.router.push("/article/"+a.id)} key={a.id} primaryText={a.title}/>
        );
        publishedection = (
            <List>
              {published}
            </List>            
          )

    }
    if (this.state.favorites.length > 0) {
        favorites = this.state.favorites.map( a =>
          <ListItem onClick={() => this.context.router.push("/article/"+a.id)} key={a.id} primaryText={a.title}/>
        );
        favoritesection = (
            <List>
              {favorites}
            </List>            
          )

    }

    if (this.state.profile) {
      var that = this
      var activities = this.state.profile.activities.map( function (a) {

        var label;
        var link = "#";
        switch (a.recipient_type) {
          case "Article":
            link = "/article/" + a.recipient_id
            break;
          case "User":
            link = "/users/" + a.recipient_id
            break;
          case "Tag":
            link = "/tags/" + a.recipient_name
        }
        var model = a.key.split(".")[0]
        var action = a.key.split(".")[1]
        console.log(a.key)
        switch (model) {
          case "article_view":
            label = that.state.profile.name + " viewed " + a.recipient_name
            break;
          case "article_read":
            label = that.state.profile.name + " read " + a.recipient_name
            break;
          case "comment":
            label = that.state.profile.name + " " + action + "ed" + " a comment on " +  a.recipient_name
            break;
          case "bookmark":
            var bmaction = (action == "destroy") ? " unbookmarked " : " bookmarked "
            label = that.state.profile.name + " " + bmaction +  a.recipient_name
            break;
          case "follow":
            var faction = (action == "destroy") ? " unfollowed " : " started following "
            label = that.state.profile.name + faction +  a.recipient_name
            break;
          case "like":
            var laction = (action == "destroy") ? " unliked " : " liked "
            label = that.state.profile.name + laction +  a.recipient_name
            break;
          case "mention":
            label = that.state.profile.name + " mentioned " +  a.recipient_name
            console.log(label)
            break;
        }
        return <ListItem onClick={() => that.context.router.push(link)} primaryText={label} key={a.id} />
      })
      var activitiessection = (
        <List>
          {activities}
        </List>
      )
    };
    if (this.state.bookmarks.length > 0) {
        bookmarks = this.state.bookmarks.map( a =>
          <ListItem onClick={() => this.context.router.push("/article/"+a.id)} key={a.id} primaryText={a.title}/>
        );
        bookmarksection = (
            <List>
              {bookmarks}
            </List>            
          )

    }

    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab onClick={this.handleChange.bind(this,"a")} label="Favorites" value="a" >
          {favoritesection}
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"f")} label="Profile" value="f" >
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"b")} label="Bookmarks" value="b">
          {bookmarksection}
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"c")} label="Drafts" value="c">
          {draftsection}
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"d")} label="Published" value="d">
          {published}
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"e")} label="Activity" value="e">
          {activitiessection}
        </Tab>
      </Tabs>
    );
  }

});

module.exports = SelfShow;
