var ApiUtil = require('../util/api_util');
var SessionStore = require('../stores/session');
var Header = require('../components/header');
import injectTapEventPlugin from 'react-tap-event-plugin';


var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      currentUser: null
    };
  },
  componentDidMount: function() {
    injectTapEventPlugin();
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);
    ApiUtil.fetchCurrentUser();
  },
  componentWillUnmount: function() {
    this.sessionStoreToken.remove();
  },
  handleChange: function () {
    if (SessionStore.isLoggedIn()) {
      this.setState({currentUser: SessionStore.currentUser()});
    } else {
      this.context.router.push("/login");
    }
  },

  render: function () {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <content className="curr-page-content">
          {this.props.children}
        </content>
      </div>
    );
  }
});

module.exports = App;
