import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { TableHead, TableSortLabel } from "@material-ui/core";
import EnhancedInfiniteScroll from "./EnhancedInfiniteScroll";
import Employee from "./Employee";

const StyledTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
    backgroundColor: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "null",
      input: "",
      pageStart: 0,
      initialLoad: true,
      page: 0
    };
  }

  handleInput = e => {
    this.setState({ 
      input: e.target.value,
      pageStart: this.state.pageStart === 0 ? -1 : 0,
      initialLoad: true,
      page: 0
    });
    this.props.onToReset();

  };
  
  handleReset = () => {
    this.setState({
      pageStart: this.state.pageStart === 0 ? -1 : 0,
      initialLoad: true,
      page: 0,
      input: "",
      order: "asc",
      orderBy: "null"
    })
    this.props.onToReset();// set reset to true
  }

  handleRequestSort = (sortBy) => {
    const {order} = this.state;
      this.setState(
        {
          order: order === "asc" ? "desc" : "asc",
          orderBy: sortBy,
          pageStart: this.state.pageStart === 0 ? -1 : 0,
          initialLoad: true,
          page: 0
        },
        () => {
          console.log("handle sort: ", this.state.order, this.state.orderBy);
          this.props.onToReset();
        }
      );
  };

  handleDelete = id => {
     const job1 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.props.deleteEmployee(id));
        }, 1000);
      });
    }

    const job2 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.setState({ 
            pageStart: this.state.pageStart === 0 ? -1 : 0,
            initialLoad: true,
            page: 0
            }));
        }, 1000);
      });
    }

    const job3 = () =>  {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.props.onToReset());
        }, 1000);
      });
    }

    job1().then(() => {
      console.log(2);
      return job2();
    }).then(() => {
      console.log(3);
      return job3();
    });
  };

  loadItems = () => {
    let newPage = this.state.page + 1;
    this.setState({
      initialLoad: false,
      page: newPage
     }, 
     () => {
       this.props.getEmployees(this.state.page, this.state.order, this.state.orderBy, this.state.input)
      })
  }

  
  render() {
    const { employees, 
      employeesStatus, 
      getReporters, 
      getManager,
      hasMore
    } = this.props;
    
    const { pageStart, initialLoad, order, orderBy } = this.state;
    return (
      <div>
        <h2>Employee Management System</h2>
        <div className="search">
          <div className="field">
            <form className="form-inline">
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
              <button type="button" className="homeBtn" onClick={this.handleReset}>Reset Filter</button>
            </div>
            <div className="field">
              <Link to="/add">
                  <button type="button" className="homeBtn">
                      Add New Employee
                  </button>
              </Link>
            </div>
        </div>
       
        <EnhancedInfiniteScroll
          className="listWrap"
          pageStart={pageStart}
          initialLoad={initialLoad}
          loadMore={this.loadItems}
          hasMore={hasMore}
          threshold={200}
        >
            <Table aria-labelledby="tableTitle">
                <TableHead>
                  <StyledTableRow>
                      <StyledTableCell
                        style={{fontSize: "14px"}}
                      >
                        Avatar
                      </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                          <Tooltip
                            title={"Sort"}
                            placement={"bottom-end"}
                            enterDelay={300}
                          >
                          <TableSortLabel
                            active={orderBy === "name"}
                            direction={order === "asc" ? "asc" : "desc"}
                            onClick={() => this.handleRequestSort("name")}
                          >
                            Name
                          </TableSortLabel>
                          </Tooltip>
                          
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                          <Tooltip
                            title={"Sort"}
                            placement={"bottom-end"}
                            enterDelay={300}
                          >
                          <TableSortLabel
                            active={orderBy === "title"}
                            direction={order === "asc" ? "asc" : "desc"}
                            onClick={() => this.handleRequestSort("title")}
                          >
                            Title
                          </TableSortLabel>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                          <Tooltip
                            title={"Sort"}
                            placement={"bottom-end"}
                            enterDelay={300}
                          >
                          <TableSortLabel
                            active={orderBy === "sex"}
                            direction={order === "asc" ? "asc" : "desc"}
                            onClick={() => this.handleRequestSort("sex")}
                          >
                            Sex
                          </TableSortLabel>
                          </Tooltip>
                          
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                            <Tooltip
                            title={"Sort"}
                            placement={"bottom-end"}
                            enterDelay={300}
                          >
                            <TableSortLabel
                              active={orderBy === "startDate"}
                              direction={order === "asc" ? "asc" : "desc"}
                              onClick={() => this.handleRequestSort("startDate")}
                            >
                              Start Date
                            </TableSortLabel>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                          Phone Number
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                            Email
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                         <Tooltip
                            title={"Sort"}
                            placement={"bottom-end"}
                            enterDelay={300}
                          >
                            <TableSortLabel
                              active={orderBy === "managerName"}
                              direction={order === "asc" ? "asc" : "desc"}
                              onClick={() => this.handleRequestSort("managerName")}
                            >
                              Manager
                            </TableSortLabel>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                            # of Direct Reports
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                          Edit
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                          Delete
                        </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {employees.map(employee => (
                    <Employee
                      key={employee._id}
                      id={employee._id}
                      employee={employee}
                      employeeDelete={() => this.handleDelete(employee._id)}
                      employeeReporters={() => getReporters(employee._id)}
                      employeeManager={() => getManager(employee._id)}
                    />
                  ))}
                </TableBody>
            </Table>
        </EnhancedInfiniteScroll>
        <div>
          {employeesStatus === "start" && <div className="alert"> Loading... </div>}

          {!hasMore && employeesStatus !== "fail" &&
            <div className="alert">Reached Bottom</div>
          }
          {employeesStatus === "fail" && <div className="alert">Opps! There was an error loading the employees.</div>}
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees,
    employeesStatus: state.employeesStatus,
    hasMore: state.hasMore,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployees: (page, orderBy, order, search) => {
      dispatch(actions.getEmployees(page, orderBy, order, search));
    },
    deleteEmployee: id => {
      dispatch(actions.deleteEmployee(id));
    },
    onToReset: () => {
      dispatch(actions.reset());
    },
    getReporters: id => {
      dispatch(actions.getReporters(id))
    },
    getManager: id => {
      dispatch(actions.getManager(id))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
