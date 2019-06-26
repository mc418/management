import axios from "axios";

// GET EMPLOYEES
function getEmployeesStart() {
  return {
    type: "FETCH_EMPLOYEES_START",
  };
}

function getEmployeesSuccess(page, response) {
  return {
    type: "FETCH_EMPLOYEES_SUCCESS",
    employees: response,
    hasMore: response.length > 0,
    page: page
  };
}

function getEmployeesFail(err) {
  return {
    type: "FETCH_EMPLOYEES_FAIL",
    error: err
  };
}

export function getEmployees(page, order, orderBy, search) {
  return (dispatch) => {
    dispatch(getEmployeesStart());
    axios({
      method: 'get', 
      url: "http://localhost:8080/api/employees?"+
            "order=" + order + "&&" +
            "orderBy=" + orderBy + "&&" +
            "page=" + page + "&&" + 
            "search=" + search
    })
      .then(response => {
        dispatch(getEmployeesSuccess(page, response.data.employee.docs));
        console.log(response);
      })
      .catch(err => {
        dispatch(getEmployeesFail(err));
      });
  };
}

// ADD EMPLOYEE
function addEmployeeStart() {
  return {
    type: "ADD_EMPLOYEE_START"
  };
}

function addEmployeeSuccess(response) {
  return {
    type: "ADD_EMPLOYEE_SUCCESS"
  }
}

function addEmployeeFail(err) {
  return {
    type: "ADD_EMPLOYEE_FAIL",
    error: err
  };
}

export function addEmployee(employee, ownProps) {
  return (dispatch) => {
    dispatch(addEmployeeStart());
    axios
      .post("http://localhost:8080/api/employee", employee)
      .then(response => {
        dispatch(addEmployeeSuccess(response));
        ownProps.history.push('/');
      })
      .catch(err => {
        dispatch(addEmployeeFail(err));
      });
  };
}

// EDIT EMPLOYEE
function editEmployeeStart() {
  return {
    type: "EDIT_EMPLOYEE_START"
  };
}

function editEmployeeSuccess() {
  return {
    type: "EDIT_EMPLOYEE_SUCCESS"
  };
}

function editEmployeeFail(err) {
  return {
    type: "EDIT_EMPLOYEE_FAIL",
    error: err
  };
}

export function editEmployee(id, employee, ownProps) {
  return (dispatch) => {
    dispatch(editEmployeeStart());
    axios
      .put(`http://localhost:8080/api/employee/${id}`, employee)
      .then(response => {
        dispatch(editEmployeeSuccess(response))
        ownProps.history.push('/');
      })
      .catch(err => {
        dispatch(editEmployeeFail(err));
      });
  };
}

// DELETE EMPLOYEE
function deleteEmployeeStart() {
  return {
    type: "DELETE_EMPLOYEE_START"
  };
}

function deleteEmployeeSuccess() {
  return {
    type: "DELETE_EMPLOYEE_SUCCESS"
  };
}

function deleteEmployeeFail(err) {
  return {
    type: "DELETE_EMPLOYEE_FAIL",
    error: err
  };
}

export function deleteEmployee(id) {
  return (dispatch) => {
    dispatch(deleteEmployeeStart());
    axios
      .delete(`http://localhost:8080/api/employee/${id}`)
      .then(response => {
        dispatch(deleteEmployeeSuccess(response));
      })
      .catch(err => {
        dispatch(deleteEmployeeFail(err))
      });
  };
}

// GET REPORTERS
function getReportersStart() {
  return {
    type: "GET_REPORTERS_START"
  };
}

function getReportersSuccess(response) {
  return {
    type: "GET_REPORTERS_SUCCESS",
    employees: response,
    hasMore: response.length > 0
  };
}

function getReportersFail(err) {
  return {
    type: "GET_REPORTERS_FAIL",
    error: err
  };
}

export function getReporters(id) {
  return (dispatch) => {
    dispatch(getReportersStart());
    axios
      .get(`http://localhost:8080/api/employee/reporters/${id}`)
      .then(response => {
        dispatch(getReportersSuccess(response.data.reporters))
      })
      .catch(err => {
        dispatch(getReportersFail(err));
      });
  };
}

// GET MANAGER
function getManagerStart() {
  return {
    type: "GET_MANAGER_START"
  };
}

function getManagerSuccess(response) {
  return {
    type: "GET_MANAGER_SUCCESS",
    employees: response,
    hasMore: response.length > 0
  };
}

function getManagerFail(err) {
  return {
    type: "GET_MANAGER_FAIL",
    error: err
  };
}

export function getManager(id) {
  return (dispatch) => {
    dispatch(getManagerStart());
    axios
      .get(`http://localhost:8080/api/employee/manager/${id}`)
      .then(response => {
        dispatch(getManagerSuccess(response.data.manager))
      })
      .catch(err => {
        dispatch(getManagerFail(err));
      });
  };
}

// GET VALID MANAGERS
function getValidManagersStart() {
  return {
    type: "FETCH_VALID_MANAGERS_START"
  };
}

function getValidManagersSuccess(response) {
  return {
    type: "FETCH_VALID_MANAGERS_SUCCESS",
    validManagers: response
  };
}

function getValidManagersFail(err) {
  return {
    type: "FETCH_VALID_MANAGERS_FAIL",
    error: err
  };
}

export function getValidManagers(id) {
  return (dispatch) => {
    dispatch(getValidManagersStart());
    axios
      .get(`http://localhost:8080/api/employee/validManagers/${id}`)
      .then(response => {
        dispatch(getValidManagersSuccess(response.data.validManagers));
      })
      .catch(err => {
        dispatch(getValidManagersFail(err));
      });
  }
}

// GET ALL MANAGERS
function getAllManagersStart() {
  return {
    type: "FETCH_ALL_MANAGERS_START"
  };
}

function getAllManagersSuccess(response) {
  return {
    type: "FETCH_ALL_MANAGERS_SUCCESS",
    allManagers: response
  };
}

function getAllManagersFail(err) {
  return {
    type: "FETCH_ALL_MANAGERS_FAIL",
    error: err
  };
}

export function getAllManagers() {
  return (dispatch) => {
    dispatch(getAllManagersStart());
    axios
      .get(`http://localhost:8080/api/employee/allManagers`)
      .then(response => {
        dispatch(getAllManagersSuccess(response.data.validManagers));
      })
      .catch(err => {
        dispatch(getAllManagersFail(err))
      });
  }
}

// CLEAR EMPLOYEES IN STORE
export function reset() {
  return {
    type: "RESET",
  };
}



