import React from "react";
import { Link } from "react-router-dom";
//import {Image} from 'cloudinary-react';
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
// import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { unstable_Box as Box } from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
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


const Employee = props => {
  let date = props.employee.startDate.substr(0,10);
  return (
    <StyledTableRow hover tabIndex={-1} key={props.employee._id}>
        {/* <TableCell className={classes.tableCell}>
          <Avatar
            src={employee.avatar}
            style={{ borderRadius: 0 }}
          />
        </TableCell> */}
        <TableCell>
          {props.employee.name}
        </TableCell>
        <TableCell>
          {props.employee.title}
        </TableCell>
        <TableCell>
          {props.employee.sex}
        </TableCell>
        <TableCell>
          {props.employee.startDate}
        </TableCell>
        <TableCell>
          <a href={"tel:" + props.employee.cellPhone}>
            {props.employee.cellPhone}
          </a>
        </TableCell>
        <TableCell>
          <a href={"mailto:" + props.employee.email}>
            {props.employee.email}
          </a>
        </TableCell>
        <TableCell
        
          // onClick={
          //   props.employee.managerName === null ? null :
          //     () => this.handleFindManager(employee.managerId)
          // }
          style={{ cursor: "pointer" }}
        >
          {props.employee.managerName === null ? null : (
          <button className="btn btn-link" onClick={props.employeeManager}>{props.employee.managerName}</button>
        )}
        </TableCell>
        <TableCell
        
          // onClick={
          //   employee.noOfDR !== "0"
          //     ? () => this.handleFindDetail(employee._id)
          //     : null
          // }
          style={{ cursor: "pointer" }}
        >
          {/* <Link>{employee.noOfDR}</Link> */}
          {props.employee.directReports.length === 0 ? (
            0
          ) : (
            <button className="btn btn-link" onClick={props.employeeReporters}>
              {props.employee.directReports.length}
            </button>
          )}
        </TableCell>

        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="Edit"
              color="primary"
              // onClick={() =>
              //   this.handleEditEmployee(props.employee._id)
              // }
            >
            <Link to={{ pathname: `/edit/${props.employee._id}` }}>
              <EditIcon />
            </Link>
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              color="primary"
              onClick={() =>
                props.employeeDelete(props.employee._id)
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </StyledTableRow>
    // <li>
    //   <span>{props.employee.avatar===null||props.employee.avatar===""?null:<img className="avatar-small" src={props.employee.avatar} alt="avatar"/>}</span>
    //   <span>{props.employee.name}</span>
    //   <span>{props.employee.title}</span>
    //   <span>{props.employee.sex}</span>
    //   <span>{date}</span>
    //   <span>{props.employee.officePhone===null||props.employee.officePhone===""?null:(<a href={"skype:"+props.employee.officePhone+"?call"}>{props.employee.officePhone}</a>)}</span>
    //   <span>{props.employee.cellPhone}</span>
    //   <span>{props.employee.SMS}</span>
    //   <span>{props.employee.email===null||props.employee.email===""?null:(<a href={"mailto:"+props.employee.email}>{props.employee.email}</a>)}</span>
    //   <span>
    //     {props.employee.managerName === null ? null : (
    //       <button className="btn btn-link" onClick={props.employeeManager}>{props.employee.managerName}</button>
    //     )}
    //   </span>
    //   <span>
    //     {props.employee.directReports.length === 0 ? (
    //       0
    //     ) : (
    //       <button className="btn btn-link" onClick={props.employeeReporters}>
    //         {props.employee.directReports.length}
    //       </button>
    //     )}
    //   </span>
    //   <span>
    //     <Link to={{ pathname: `/edit/${props.employee._id}` }}>
    //       <button type="button" className="btn btn-light">
    //         <img className="icon" src="./icon/edit.png" alt="icon" />
    //       </button>
    //     </Link>
    //   </span>
    //   <span>
    //     <button
    //       type="button"
    //       className="btn btn-light"
    //       id={props.employee._id}
    //       onClick={props.employeeDelete}
    //     >
    //       <img className="icon" src="./icon/delete.png" alt="icon" />
    //     </button>
    //   </span>
    // </li>
  );
};

export default Employee;
