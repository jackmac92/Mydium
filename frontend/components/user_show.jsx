var React = require('react');
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SessionStore from '../stores/session'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

var UserShow = React.createClass({
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
      drafts: SessionStore.userDrafts()
    }
      // published: SessionStore.userPublished(),
      // activity: SessionStore.userActivity()
  },
	handleChange: function (value) {
		this.setState({value: value})
	},
  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.__onChange)
    ApiUtil.fetchDrafts()
    ApiUtil.fetchBookmarkedArticles()
    ApiUtil.fetchFavoritedArticles()
  },

  __onChange: function () {
    this.setState(this.stateFromStore())
  },

	render: function() {
    var drafts, draftsection, bookmarksection, bookmarks, favoritesection, favorites;
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
        <Tab onClick={this.handleChange.bind(this,"a")} label="Profile" value="f" >
          {favoritesection}
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
        </Tab>
      </Tabs>
    );
  }

});

module.exports = UserShow;
