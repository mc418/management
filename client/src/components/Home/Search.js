import { Link } from "react-router-dom";
import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  handleInput = e => {
    this.setState({ input: e.target.value });
    this.props.onSearch(e.target.value);
  };

  submit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.input);
    this.setState({ input: "" });
  };
  
  handleReset = () => {
      this.props.onToReset(true);// set reset to true
      this.props.setResultField("getEmployees");//set back resultField
      this.props.getEmployees(1);
  }
  
  render() {
    return (
      <div className="search">
        <div className="field">
          <form className="form-inline" onSubmit={this.submit}>
            <div className="form-group row">
              <input
                className="form-control mr-sm-2"
                type="search"
                id="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.input}
                onChange={this.handleInput}
              />
            </div>
          </form>
        </div>
        <div className="field">
            <button type="button" className="btn" onClick={this.handleReset}>Reset Filter</button>
          </div>
          <div className="field">
            <Link to="/add">
                <button type="button" className="btn">
                    Add New Employee
                </button>
            </Link>
          </div>
      </div>
    );
  }
}

export default Search;
