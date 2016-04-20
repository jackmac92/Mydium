var React = require('react');
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SessionStore from '../stores/session'
import UserStore from '../stores/user'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ApiUtil from '../util/api_util'

var OtherShow = React.createClass({
  contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function() {
    var init = this.stateFromStore()
    init.value = "c"
    return init
	},
  stateFromStore: function () {
    return {
      profile: UserStore.detail()
    }
  },
	handleChange: function (value) {
		this.setState({value: value})
	},
  componentDidMount: function() {
    this.userStoreToken = UserStore.addListener(this.__onChange)
    ApiUtil.fetchUserInfo(this.props.params.id)
  },
  componentWillUnmount: function() {
    this.userStoreToken.remove()
  },

  __onChange: function () {
    this.setState(this.stateFromStore())
  },

	render: function() {
    var activities;
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
        console.log(a)
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
          default:
            label = "Unhandled "+ a
            break;
        }

        return <ListItem onClick={() => that.context.router.push(link)} primaryText={label} key={a.id} />
      })
    };

    return (
        <List>
          {activities}
        </List>
    );
  }

});

module.exports = OtherShow;
