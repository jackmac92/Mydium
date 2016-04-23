var ApiUtil = require('../util/api_util');
var SessionStore = require('../stores/session');
var Header = require('../components/header');
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


var App = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },
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
    }
  },

  render: function () {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <content className="curr-page-content">
          <ReactCSSTransitionGroup
                transitionName="router"
                transitionEnterTimeout={1500}
                transitionLeaveTimeout={1500}
          >
            {this.props.children}
          </ReactCSSTransitionGroup>
        </content>
      </div>
    );
  }
});

module.exports = App;
