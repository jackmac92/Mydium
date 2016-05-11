var React = require('react');
import {Tab, Tabs} from 'material-ui/Tabs';
import SessionStore from '../stores/session'
import UserStore from '../stores/user'
import {List,ListItem} from 'material-ui/List';
import UserUtil from '../util/user'
import TagSelector from './tag_selector'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'


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
    UserUtil.fetchDrafts()
    UserUtil.fetchPublished()
    UserUtil.fetchBookmarkedArticles()
    UserUtil.fetchFavoritedArticles()
    UserUtil.fetchUserInfo(SessionStore.currentUser().id)
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
            onTouchTap={() => this.context.router.push("/editor/"+d.id)}
            primaryText={d.title}
            rightIconButton={<IconButton tooltip="delete" onClick={() => UserUtil.destroyArticle(d.id)} iconClassName="fa fa-trash-o" />}
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

        var link = "#";
        switch (a.recipient_type) {
          case "Article":
            link = "/article/" + a.recipient_id; break;
          case "User":
            link = "/users/" + a.recipient_id; break;
          case "Tag":
            link = "/tags/" + a.recipient_name; break;
        }
        var model = a.key.split(".")[0]
        var action = a.key.split(".")[1]
        var label = that.state.profile.name;
        switch (model) {
          case "article_view":
            label += " viewed "; break;
          case "article_read":
            label += " read "; break;
          case "comment":
            label += " " + action + "ed a comment on "; break;
          case "bookmark":
            label += (action == "destroy") ? " unbookmarked " : " bookmarked "; break;
          case "follow":
            label +=  (action == "follow") ? " unfollowed " : " started following "; break;
          case "like":
            label += (action == "like") ? " unfavorited " : " favorited "; break;
          case "mention":
            label += " mentioned "; break;
        }
        label += a.recipient_name
        return <ListItem onClick={() => that.context.router.push(link)} primaryText={label} key={a.id} />
      })
      var activitiessection = (
        <List>
          {activities}
        </List>
      )
      var userProfile = (
        <form>
          <TextField floatingLabelText="Email" value={this.state.profile.email}/>
          <div/>
          <TextField floatingLabelText="Username" value={this.state.profile.username} />
          <div/>
          <TextField floatingLabelText="Name" value={this.state.profile.name} />
          <div />
          <img src={this.state.profile.avatar} />
        </form>
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
        <Tab onClick={this.handleChange.bind(this,"e")} label="Activity" value="e">
          {activitiessection}
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"f")} label="Profile" value="f" >
          {userProfile}
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"d")} label="Published" value="d">
          {published}
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"c")} label="Drafts" value="c">
          {draftsection}
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"a")} label="Favorites" value="a" >
          {favoritesection}
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"b")} label="Bookmarks" value="b">
          {bookmarksection}
        </Tab>
      </Tabs>
    );
  }

});

module.exports = SelfShow;
