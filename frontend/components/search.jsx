var React = require('react');
var SearchStore = require('../stores/search')
var ApiUtil = require('../util/api_util');
import Paper from 'material-ui/lib/paper'
var Search = React.createClass({
  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return { query: "" };
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
    this.setState({results: SearchStore.all()});
  },
  
  handleInputChange: function (e) {
    var query = e.currentTarget.value;
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
  
  resultLis: function () {

    return SearchStore.all().map(function (result) {
      if (result._type === "User") {
        return (
          <Paper>
            <li key={ result.id }>
              User #{ result.id }: { result.name || result.email }
            </li>
          </Paper>
        );          
      } else if (result._type == "Article"){
        return (
          <Paper onClick={() => this.context.router.push("/article/"+result.id)}>
            <li key={ result.id }>
              Article #{ result.id }: { result.title }
            </li>
          </Paper>
        );  

      }
    });
  },
  
  render: function () { 
    var meta = SearchStore.meta();
    return (
      <article>
        <input type="text" onChange={ this.handleInputChange } />
        
        <nav>
          Results
        </nav>
      
        <ul>
          { this.resultLis() }
        </ul>
      </article>
    );
  }
  
});

module.exports = Search;