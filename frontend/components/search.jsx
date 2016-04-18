var React = require('react');
var SearchStore = require('../stores/search')
var ApiUtil = require('../util/api_util');
import AutoComplete from 'material-ui/lib/auto-complete';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Popover from 'material-ui/lib/popover/popover';

var Search = React.createClass({
  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return { 
      query: "",
      results: [],
      open:false,
      meta: {}
    };
  },
  
  componentDidMount: function () {
    this.storeListener = SearchStore.addListener(
      this._onChange
    );
  },
  
  componentWillUnmount: function () {
    this.storeListener.remove();
  },
  
  _onChange: function () {
    this.setState({
      results: SearchStore.all(),
      meta: SearchStore.meta()
    });
  },
  
  handleInputChange: function (t) {
    var query = t.currentTarget ? t.currentTarget.value : t
    this.setState({ query: query }, function () {      
      if (query.length > 2) {
        this.search();
      }
    }.bind(this));
  },
  
  search: function (e) {
    ApiUtil.search(this.state.query, 1);
  },
  
  nextPage: function () {
    var meta = SearchStore.meta();
    ApiUtil.search(meta.query, meta.page + 1);
  },

  resultItems: function () {

    return this.state.results.map(function (result) {
      if (result._type === "User") {
        return (
          <ListItem 
              key={ result.id }
              primaryText={ result.name || result.email }
              secondaryText="User"/>
        );          
      } else if (result._type == "Article"){
        return (
          <ListItem
              onClick={() => this.context.router.push("/article/"+result.id)} 
              key={ result.id }
              primaryText={ result.title }
              secondaryText="Article"/>
        );  

      }
    }.bind(this));
  },
  startSearch: function (e) {
    this.setState({
      open: true,
      anchorEl:e.currentTarget
    })
  },
  handleRequestClose: function () {
    this.setState({open: false})
  },
  render: function () { 
    return (
      <div>
        <TextField onFocus={this.startSearch} onBlur={this.handleRequestClose} onChange={this.handleInputChange} floatingLabelText="Search" />
        <Popover
          style={
            {
              maxWidth:"444px"
            }
          }
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{"horizontal":"middle","vertical":"bottom"}}
          targetOrigin={{"horizontal":"middle","vertical":"top"}}
          onRequestClose={this.handleRequestClose}
        >
          <List>
            {this.resultItems()}
          </List>
        </Popover>
      </div>
    );
  }
  
});

module.exports = Search;