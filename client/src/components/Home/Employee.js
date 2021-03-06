import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


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
        <TableCell>
        {props.employee.avatar===null||props.employee.avatar===""
          ?
          null
          :
          <img 
            className="avatar-small" 
            src={props.employee.avatar} 
            alt="avatar"
          />
        }
        </TableCell>
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
          {date}
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
        >
          {props.employee.managerName === null 
          ? 
          null 
          : 
          <button 
            className="btn btn-link" 
            onClick={props.employeeManager} 
            style={{ cursor: "pointer" }}
          >
            {props.employee.managerName}
          </button>
          }
        </TableCell>
        <TableCell>
          {props.employee.directReports.length === 0 
          ? 
          0
          : 
          <button 
            className="btn btn-link" 
            onClick={props.employeeReporters} 
            style={{cursor: "pointer"}}
          >
            {props.employee.directReports.length}
          </button>
          }
        </TableCell>

        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              aria-label="Edit"
              color="primary"
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
  );
};

export default Employee;
