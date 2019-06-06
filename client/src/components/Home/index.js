import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

import Search from "./Search.js";
import EmployeesList from "./EmployeeList";

class Home extends Component {
  render() {
    const { employees, employeesStatus, getSearch, getEmployees, deleteEmployee, onToReset, getReporters, getManager,hasMore,page,field, setResultField, sort, setSort } = this.props;
    return (
      <div className="main">
        <h2>Employees Management</h2>
        
        <Search 
         onSearch={getSearch} 
        getEmployees={getEmployees} 
        onToReset={onToReset} 
        setResultField={setResultField}/>
        
        <EmployeesList
          employees={employees}
          employeesStatus={employeesStatus}
          onLoad={getEmployees}
          onDelete={deleteEmployee}
          onReporters={getReporters}
          onManager={getManager}
          hasMore={hasMore}
          page={page}
          resultField={field}
          sort={sort}
          setSort={setSort}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees,
    employeesStatus: state.employeesStatus,
    reset: state.reset,
    hasMore: state.hasMore,
    page:state.page,
    field: state.resultField,
    sort: state.sort
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployees: (page) => {
      dispatch(actions.getEmployees(page));
    },
    getSearch: key => {
      dispatch(actions.getSearch(key));
    },
    deleteEmployee: id => {
      dispatch(actions.deleteEmployee(id));
    },
    onToReset: value => {
      dispatch(actions.reset(value));
    },
    getReporters: id => {
      dispatch(actions.getReporters(id))
    },
    getManager: id => {
      dispatch(actions.getManager(id))
    },
    setResultField: value => {
        dispatch(actions.setResultField(value));
    },
    setSort: sort => {
      dispatch(actions.setSort(sort));
  }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
