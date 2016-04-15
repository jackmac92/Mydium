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
      drafts: SessionStore.userDrafts()
    }
      // published: SessionStore.userPublished(),
      // favorites: SessionStore.userFavorites(),
      // bookmarks: SessionStore.userBookmarks(),
      // activity: SessionStore.userActivity()
  },
	handleChange: function (value) {
		this.setState({value: value})
	},
  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.__onChange)
    ApiUtil.fetchDrafts()
  },

  __onChange: function () {
    this.setState(this.stateFromStore())
  },

	render: function() {
    var drafts, draftsection;
    if (this.state.drafts) {
        drafts = this.state.drafts.map( d =>
          <ListItem onClick={() => this.context.router.push("/editor/"+d.id)} key={d.id} primaryText={d.title}/>
        );
        draftsection = (
            <List>
              {drafts}
            </List>            
          )

    }
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab onClick={this.handleChange.bind(this,"a")} label="Favorites" value="a" >
        </Tab>
        <Tab onClick={this.handleChange.bind(this,"b")} label="Bookmarks" value="b">
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
