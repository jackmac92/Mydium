var React = require('react');
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SessionStore from '../stores/session'
import UserStore from '../stores/user'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ApiUtil from '../util/api_util'
import TagSelector from './tag_selector'

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
      profile: UserStore.detail()
    }
      // published: SessionStore.userPublished(),
      // activity: SessionStore.userActivity()
  },
	handleChange: function (value) {
		this.setState({value: value})
	},
  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.__onChange)
    this.userStoreToken = UserStore.addListener(this.__onChange)
    ApiUtil.fetchDrafts()
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
    var drafts, draftsection, bookmarksection, bookmarks, favoritesection, favorites, profile, profilesection;
    if (this.state.drafts.length > 0) {
        drafts = this.state.drafts.map( d =>
          <ListItem onClick={() => this.context.router.push("/editor/"+d.id)} key={d.id} primaryText={d.title}/>
        );
        draftsection = (
            <List>
              {drafts}
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
        switch (a.trackable_type) {
          case "ArticleView":
            label = that.state.profile.name + " viewed " + a.recipient_name
            break;
          case "Comment":
            label = that.state.profile.name + " made a comment on " +  a.recipient_name
            break;
          case "Bookmark":
            label = that.state.profile.name + " bookmarked " +  a.recipient_name
            break;
          case "Socialization::ActiveRecordStores::Follow":
            label = that.state.profile.name + " started following " +  a.recipient_name
            break;
          case "Socialization::ActiveRecordStores::Like":
            label = that.state.profile.name + " liked " +  a.recipient_name
            break;
          case "Socialization::ActiveRecordStores::Mention":
            label = that.state.profile.name + " mentioned " +  a.recipient_name
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
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"e")} label="Activity" value="e">
          {activitiessection}
        </Tab>
      </Tabs>
    );
  }

});

module.exports = SelfShow;
