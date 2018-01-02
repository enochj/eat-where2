import React, { Component } from 'react';

class AddEatery extends Component {
  constructor(props) {
    super(props);
    /* Initialize the state. */
    this.state = {
      newEatery: {
        name: '',
      }
    }

    //Boilerplate code for binding methods with `this`
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This method dynamically accepts inputs and stores it in the state */
  handleInput(key, e) {

    /*Duplicating and updating the state */
    var state = Object.assign({}, this.state.newEatery);
    state[key] = e.target.value;
    this.setState({newEatery: state });
  }

  /* This method is invoked when submit button is pressed */
  handleSubmit(e) {
    //preventDefault prevents page reload
    e.preventDefault();
    /*A call back to the onAdd props. The current
     *state is passed as a param
     */
    this.props.onAdd(this.state.newEatery);
  }

  render() {
    const divStyle = {
      /*Code omitted for brevity */ }

    return(
      <div>
        <h2> Add new eatery </h2>
        <div style={divStyle}>
          <form onSubmit={this.handleSubmit}>
            <label> Name:
              { /*On every keystroke, the handeInput method is invoked */ }
              <input type="text" onChange={(e)=>this.handleInput('name',e)} />
            </label>
            { /* Input fields for Price and availability omitted for brevity */}

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>)
  }
}

export default AddEatery;
