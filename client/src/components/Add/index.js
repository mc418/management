import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions";
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      startDate: "",
      sex: "M",
      cellPhone: "",
      email: "",
      managerOption: "null",
      manager: null,
      managerName: null
    };
  }

  componentDidMount() {
    this.props.getAllManagers();
  }

  nameChange = e => {
    this.setState({ name: e.target.value });
  };

  titleChange = e => {
    this.setState({ title: e.target.value });
  };

 startDateChange = e => {
    this.setState({ startDate: e.target.value });
  };

  sexChange = e => {
    this.setState({ sex: e.target.value });
  };

  cellPhoneChange = e => {
    this.setState({ cellPhone: e.target.value });
  };

  emailChange = e => {
    this.setState({ email: e.target.value });
  };

  managerChange = e => {
    if (e.target.value === "null") {
      this.setState({
        manager: null,
        managerName: null,
        managerOption: "null"
      });
    } else {
      let managerInfo = e.target.value.split("-");
      let id = managerInfo[0];
      let name = managerInfo[1];
      this.setState({
        manager: id,
        managerName: name,
        managerOption: e.target.value
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    let employee = {
      avatar:this.state.avatar,
      name: this.state.name,
      title: this.state.title,
      startDate: this.state.startDate,
      sex: this.state.sex,
      officePhone: this.state.officePhone,
      cellPhone: this.state.cellPhone,
      SMS: this.state.SMS,
      email: this.state.email,
      manager: this.state.manager,
      managerName: this.state.managerName
    };
    this.props.onSave(employee);
  };
  
  render() {
      return (
        <div className="create-employee">
          <form className="myForm" onSubmit={this.onSubmit}>
            <div className="header">
              <h2 className="head">New Employee</h2>
            </div>
            <div className="form-content">
              <div>
                <div className="form-group row">
                  <label htmlFor="name">Name <span className="require-star">*</span>:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={this.nameChange}
                    value={this.state.name}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    onChange={this.titleChange}
                    value={this.state.title}
                    placeholder="Title"

                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="date">Start Date <span className="require-star">*</span>:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    onChange={this.startDateChange}
                    value={this.state.startDate}
                    required
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="sex">Sex <span className="require-star">*</span>:</label>
                  <select
                    className="form-control"
                    id="sex"
                    onChange={this.sexChange}
                    value={this.state.sex}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="form-group row">
                  <label htmlFor="cellPhone">Cell Phone:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="cellPhone"
                    placeholder="Cell Phone"
                    onChange={this.cellPhoneChange}
                    value={this.state.cellPhone}
                    maxLength="10"
                    
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={this.emailChange}
                    value={this.state.email}
                    
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="manager">Manager:</label>
                  <select
                    className="form-control"
                    id="manager"
                    onChange={this.managerChange}
                    value={this.state.managerOption}
                  >
                    <option value="null"> </option>
                    { this.props.validManagers.map(manager => {
                          return (
                            <option key={manager._id} value={manager._id+"-"+manager.name}>
                              {manager.name}
                            </option>
                          );
                        })
                      }
                  </select>
                </div>
              <Link to="/">
                <button type="submit" className="btn btn-secondary back-btn">
                  Back
                </button>
              </Link>
              <button type="submit" className="btn btn-primary create-btn">
                Create
              </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    validManagers: state.validManagers
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSave: (employee) => {
      dispatch(actions.addEmployee(employee, ownProps));
    },
    getAllManagers: () => {
      dispatch(actions.getAllManagers());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
