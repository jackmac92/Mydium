var React = require('react');
import {Tab, Tabs} from 'material-ui/Tabs';
import SessionStore from '../stores/session'
import UserStore from '../stores/user'
import { List, ListItem } from 'material-ui/List';
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
    };

    return (
        <List>
          {activities}
        </List>
    );
  }

});

module.exports = OtherShow;

