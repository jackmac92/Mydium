import Header from '../components/header';
import injectTapEventPlugin from 'react-tap-event-plugin';


var App = React.createClass({

  componentDidMount: function() {
    injectTapEventPlugin();
  },

  render: function () {
    return (
      <div>
        <Header />
        <content className="curr-page-content">
          {this.props.children}
        </content>
      </div>
    );
  }
});

module.exports = App;
