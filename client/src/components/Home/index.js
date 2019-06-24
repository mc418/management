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
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

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

const button_style = {
  borderRadius: 3,
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: '0 10px',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "null",
      input: "",
      pageStart: 0,
      page: 1
    };
  }

  handleInput = e => {
    this.setState({ 
      input: e.target.value,
      pageStart: this.state.pageStart === 0 ? -1 : 0,
      page: 1
    },
    () => {
      this.props.onToReset();
      this.props.getEmployees(1, this.state.order, this.state.orderBy, this.state.input);
      }
    );
    
  };
  
  handleReset = () => {
    this.setState({
      pageStart: this.state.pageStart === 0 ? -1 : 0,
      page: 1,
      input: "",
      order: "asc",
      orderBy: "null"
    }, () => {
      this.props.onToReset();
      this.props.getEmployees(1, this.state.order, this.state.orderBy, this.state.input);
    });
    // set reset to true
    
  }

  handleRequestSort = (sortBy) => {
    const {order} = this.state;
      this.setState(
        {
          order: order === "asc" ? "desc" : "asc",
          orderBy: sortBy,
          pageStart: this.state.pageStart === 0 ? -1 : 0,
          page: 1
        },
        () => {
          this.props.onToReset();
          this.props.getEmployees(1, this.state.order, this.state.orderBy, this.state.input);
        }
      );
  };


  handleDelete = id => {
    const func1 = () => {
      return new Promise(resolve => {
        resolve(this.props.deleteEmployee(id));
      })
    }

    const func2 = () => {
      return new Promise(resolve => {
        resolve(this.setState({
          pageStart: this.state.pageStart === 0 ? -1 : 0,
          page: 0
        }))
      })
    }

    async function SerialFlow() {
      await func1();
      await func2();
      return;
    }
    SerialFlow();    
  };

  loadItems = () => {
    let newPage = this.state.page + 1;
    this.setState({
      page: newPage
      }, 
      () => {
        if (!this.props.isLoading) {
          this.props.getEmployees(this.state.page, this.state.order, this.state.orderBy, this.state.input)
        }
      }
    )
    console.log(1);
  }

  componentDidMount() {
    this.props.getEmployees(1, this.state.order, this.state.orderBy, this.state.input)
    console.log(2);
  }

  
  render() {
    const { 
      employees, 
      employeesStatus, 
      getReporters, 
      getManager,
      hasMore
    } = this.props;
    
    const { pageStart, order, orderBy } = this.state;

    return (
      <div>
        <h2>Employee Management System</h2>
        <div className="search">
          <div style={{position: "relative", width: "80%", backgroundColor: "#ffffff"}}>
            <SearchIcon style={{position: "absolute", display: "flex", alignItems: "center"}}/>
            <InputBase
              placeholder="Search…"
              value={this.state.input}
              onChange={this.handleInput}
              style={{width: "100%", margin: "0 20px 0 40px"}}
            />
          </div>
          <Button variant="contained" onClick={this.handleReset} style={button_style}>
            Reset Filter
          </Button>
          <Link to="/add" style={{textDecoration: "none", color: "white"}}>
            <Button variant="contained" style={button_style}>
            Add New Employee
            </Button>
          </Link>
        </div>
       
        <EnhancedInfiniteScroll
          className="listWrap"
          pageStart={pageStart}
          initialLoad={false}
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
          {
            employeesStatus === "start" 
            && 
            <div className="alert"> Loading... </div>
          }

          {
            !hasMore && employeesStatus !== "fail" 
            &&
            <div className="alert">Reached Bottom</div>
          }
          {
            employeesStatus === "fail" 
            && 
            <div className="alert">Opps! There was an error loading the employees.</div>
          }
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
    isLoading: state.isLoading
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
