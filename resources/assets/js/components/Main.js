import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Eatery from './Eatery';
import AddEatery from './AddEatery';

/* Main Component */
class Main extends Component {
  constructor() {
    super();
    //Initialize the state in the constructor
    this.state = {
      eateries: [],
      currentEatery: null
    }
    this.handleAddEatery = this.handleAddEatery.bind(this);
    this.handleDeleteEatery = this.handleDeleteEatery.bind(this);
    this.handleUpdateEatery = this.handleUpdateEatery.bind(this);
  }
  /*componentDidMount() is a lifecycle method
   * that gets called after the component is rendered
   */
  componentDidMount() {
    /* fetch API in action */
    fetch('/api/eateries')
      .then(response => {
        return response.json();
      })
      .then(eateries => {
        //Fetched eatery is stored in the state
        this.setState({ eateries });
      });
  }

  renderEateries() {
    return this.state.eateries.map(eatery => {
      return (
        /* When using list you need to specify a key
         * attribute that is unique for each list item
        */
        /*<li key={eatery.id} >
          { eatery.name }
        </li>*/
        <li onClick={() => this.handleClick(eatery)} key={eatery.id} >
          { eatery.name }
        </li>
      );
    })
  }

  handleClick(eatery) {
    this.setState({currentEatery:eatery});
  }

  handleAddEatery(eatery) {
    eatery.name = String(eatery.name);
    fetch( 'api/eateries/', {
      method:'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eatery)
    })
      .then(response => {
        return response.json();
      })
      .then( data => {
        this.setState((prevState)=> ({
          eateries: prevState.eateries.concat(data),
          currentEatery : data
        }))
      })
  }

  handleUpdateEatery(eatery) {
    const currentEatery = this.state.currentEatery;
    eatery.id = currentEatery.id;
    fetch('api/eateries/' + currentEatery.id, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eatery)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        /* Updating the state */
        var array = this.state.eateries.filter(function (item) {
          return item !== currentEatery
        })
        this.setState((prevState) => ({
          eateries: array.concat(eatery),
          currentEatery: eatery
        }))
      })
  }

  handleDeleteEatery() {
    const currentEatery = this.state.currentEatery;
    fetch( 'api/eateries/' + currentEatery.id,
      { method: 'delete' })
      .then(response => {
        /* Duplicate the array and filter out the item to be deleted */
        var array = this.state.eateries.filter(function(item) {
          return item !== currentEatery
        });
        this.setState({ eateries: array, currentEatery: null});
      });
  }

  render() {
    /* Some css code has been removed for brevity */
    return (
      <div>
        <div>
        <h3>All Eateries</h3>
          <ul>
            { this.renderEateries() }
          </ul>
        </div>
        <Eatery
          eatery={this.state.currentEatery}
          handleDeleteEatery={this.handleDeleteEatery}
          handleUpdateEatery={this.handleUpdateEatery}
        />
        <AddEatery onAdd={this.handleAddEatery} />
      </div>

    );
  }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/
if (document.getElementById('root')) {
  ReactDOM.render(<Main />, document.getElementById('root'));
}

