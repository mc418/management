import React, { Component } from "react";
import Employee from "./Employee";
import ReduxLazyScroll from "redux-lazy-scroll";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import EnhancedTableHead from "./EnhancedTableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { unstable_Box as Box } from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import { TableHead, TableSortLabel } from "@material-ui/core";
// import EnhancedInfiniteScroll from "./EnhancedInfiniteScroll";

const StyledTableCell = withStyles(theme => ({
  // head: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
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

class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAsc: "",
      sexAsc: "",
      drAsc: ""
    };
  }
    
  nameSort = () => {
    let arr = this.props.employees;
    if (this.state.nameAsc) {
      this.props.setSort("nameAsc");
      arr.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else {
      this.props.setSort("nameDesc");
      arr.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    this.setState({ nameAsc: !this.state.nameAsc });
    
  };

  sexSort = () => {
    let arr = this.props.employees;
    if (this.state.sexAsc) {
      this.props.setSort("sexAsc");
      arr.sort((a, b) => {
        return a.sex.localeCompare(b.sex);
      });
    } else {
      this.props.setSort("sexDesc");
      arr.sort((a, b) => {
        return b.sex.localeCompare(a.sex);
      });
    }
    this.setState({ sexAsc: !this.state.sexAsc });
  };

  drSort = () => {
    let arr = this.props.employees;
    if (this.state.drAsc) {
      this.props.setSort("drAsc");
      arr.sort((a, b) => {
        return a.directReports.length - b.directReports.length;
      });
    } else {
      this.props.setSort("drDesc");
      arr.sort((a, b) => {
        return b.directReports.length - a.directReports.length;
      });
    }
    this.setState({ drAsc: !this.state.drAsc });
  };

  handleDelete = id => {
    console.log("handle delete" + id);
    this.props.onDelete(id);
  };

 loadItems = () => {
    console.log("page"+this.props.page)
    if(this.props.resultField==="getEmployees"){
        this.props.onLoad(this.props.page);
    }
 }
 
  render() {
    const { employees, employeesStatus, onReporters, onManager,hasMore,sort } = this.props;
    console.log(JSON.stringify(employees));

    return (
      <div>
        <ReduxLazyScroll
          className="listWrap"
          isFetching={employeesStatus === "start"}
          
          loadMore={this.loadItems}
          hasMore={hasMore}
        >
            <Table aria-labelledby="tableTitle">
                <TableHead>
                  <StyledTableRow>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                          <Tooltip
                            title={"Sort"}
                            placement={"bottom-end"}
                            enterDelay={300}
                          >
                          <TableSortLabel
                            active={sort === "nameDesc" || sort === "nameAsc"}
                            direction={sort === "nameDesc" ? "asc" : "desc"}
                            onClick={this.nameSort}
                          >
                            Name
                          </TableSortLabel>
                          </Tooltip>
                          
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                          Title
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
                            active={sort === "sexDesc" || sort === "sexAsc"}
                            direction={sort === "sexDesc" ? "asc" : "desc"}
                            onClick={this.sexSort}
                          >
                            Sex
                          </TableSortLabel>
                          </Tooltip>
                          
                        </StyledTableCell>
                        <StyledTableCell
                          style={{fontSize: "14px"}}
                        >
                            Start Date
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
                         Manager
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
                            active={sort === "drDesc" || sort === "drAsc"}
                            direction={sort === "drDesc" ? "asc" : "desc"}
                            onClick={this.drSort}
                          >
                            # of Direct Reports
                          </TableSortLabel>
                          </Tooltip>
                          
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
                      employeeReporters={() => onReporters(employee._id)}
                      employeeManager={() => onManager(employee._id)}
                    />
                  ))}
                </TableBody>
            </Table>
        {/* </ul>   */}

        </ReduxLazyScroll>
        <div className="row posts-lazy-scroll__messages">
          {employeesStatus === "start" && <div className="alert alert-info"> Loading... </div>}

          {!hasMore && employeesStatus !== "fail" &&
            <div className="alert alert-success">Reached Bottom</div>
          }
          {employeesStatus === "fail" && <div className="alert alert-danger">Opps! There was an error loading the employees.</div>}
          </div>
        </div>
     

    );
  }
}

export default EmployeesList;
