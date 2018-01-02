import React, { Component } from 'react';

class Eatery extends Component {
  constructor(props) {
    super(props);
    /* Initialize the state. */
    this.state = {
      updateEatery: {
        id: '',
        name: '',
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* This method dynamically accepts inputs and stores it in the state */
  handleInput(key, e) {
    /*Duplicating and updating the state */
    var state = Object.assign({}, this.props.currentEatery);
    state[key] = e.target.value;
    this.setState({updateEatery: state });
  }

  /* This method is invoked when submit button is pressed */
  handleSubmit(e) {
    //preventDefault prevents page reload
    e.preventDefault();
    /*A call back to the onAdd props. The current
     *state is passed as a param
     */
    this.props.handleUpdateEatery(this.state.updateEatery);
  }

  render() {
    //if the props product is null, return Product doesn't exist
    if (!this.props.eatery) {
      return (<div> Eatery Doesnt exist </div>);
    }

    //Else, display the product data
    return (
      <div key={this.props.eatery.name}>
        <form onSubmit={this.handleSubmit}>
          <label> Name:
            { /*On every keystroke, the handeInput method is invoked */ }
            <input
              defaultValue={this.props.eatery.name}
              type="text"
              onChange={(e)=>this.handleInput('name',e)} />
          </label>
          { /* Input fields for Price and availability omitted for brevity */}

          <input type="submit" value="Submit" />
        </form>
        <button onClick={() => this.props.handleDeleteEatery()}>Delete</button>
      </div>
    )
  }
}
export default Eatery;
