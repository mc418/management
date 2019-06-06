import axios from "axios";

export function getEmployees(page=1) {
  return (dispatch, getState) => {
    //set redirect to false everytime we return to home page
    dispatch(redirect(false));
    dispatch(getEmployeesStart(page));
    axios
      .get("http://localhost:8080/api/employees/"+page)
      .then(response => {
        dispatch(getEmployeesSuccess(response.data.employee.docs));
      })
      .catch(err => {
        dispatch(getEmployeesFail(err));
      });
  };
}

export function addEmployee(employee) {
  return (dispatch, getState) => {
    dispatch(redirect(false));
    dispatch(reset(true));//empty the past data in employees store
    axios
      .post("http://localhost:8080/api/employee", employee)
      .then(response => {
        dispatch(redirect(true));
        dispatch(setResultField("getEmployees"));
      })
      .catch(err => {
        dispatch(redirect(false));
      });
  };
}

export function editEmployee(id, employee) {
  return (dispatch, getState) => {
    dispatch(redirect(false));
    dispatch(reset(true));//empty the past data in employees store
    axios
      .put(`http://localhost:8080/api/employee/${id}`, employee)
      .then(response => {
        dispatch(redirect(true));
        dispatch(setResultField("getEmployees"));
      })
      .catch(err => {
        dispatch(redirect(false));
      });
  };
}

export function deleteEmployee(id) {
  return (dispatch, getState) => {
    dispatch(getEmployeesStart());
    dispatch(setResultField("getEmployees"));
    dispatch(reset(true));//empty the past data in employees store
    axios
      .delete(`http://localhost:8080/api/employee/${id}`)
      .then(response => {
        //dispatch(getEmployeesSuccess(response.data.employee));
        dispatch(getEmployees(1));
      })
      .catch(err => {
        console.log(err);
        dispatch(getEmployeesFail());
      });
  };
}

export function getSearch(key) {
  if(key===""||key===null){
        return dispatch =>{
            dispatch(setResultField("getEmployees"));//change back show all employees
            dispatch(reset(true));//empty the past data in employees store
        }
  }
  const url = "http://localhost:8080/api/search/" + key;
  return dispatch => {
    dispatch(getEmployeesStart());
    dispatch(setResultField("search"));//change to fetch search result
    dispatch(reset(true));//empty the past data in employees store
    axios
      .get(url)
      .then(response => {
        //console.log(response.data);
        dispatch(getEmployeesSuccess(response.data));
        dispatch(reset(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(getEmployeesFail());
      });
  };
}

export function getReporters(id) {
  return (dispatch, getState) => {
    dispatch(getEmployeesStart());
    dispatch(setResultField("getReporters"));
    dispatch(reset(true));//empty the past data in employees store
    axios
      .get(`http://localhost:8080/api/employee/reporters/${id}`)
      .then(response => {
        dispatch(getEmployeesSuccess(response.data.reporters));
      })
      .catch(err => {
        dispatch(getEmployeesFail());
      });
  };
}

export function getManager(id) {
  return (dispatch, getState) => {
    dispatch(getEmployeesStart());
    dispatch(setResultField("getManager"));
    dispatch(reset(true));//empty the past data in employees store
    axios
      .get(`http://localhost:8080/api/employee/manager/${id}`)
      .then(response => {
        dispatch(getEmployeesSuccess(response.data.manager));
      })
      .catch(err => {
        dispatch(getEmployeesFail());
      });
  };
}

//for edit manager list
export function getValidManagers(id) {
  return (dispatch, getState) => {
    axios
      .get(`http://localhost:8080/api/employee/validManagers/${id}`)
      .then(response => {
        console.log()
        dispatch(getValidManagersSuccess(response.data.validManagers));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

//for add manager list
export function getAllManagers() {
  return (dispatch, getState) => {
    axios
        .get(`http://localhost:8080/api/employee/validManagers/`)
    //   .get(`http://localhost:8080/api/employee/allManagers`)
      .then(response => {
        console.log()
        dispatch(getValidManagersSuccess(response.data.validManagers));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export function reset(value) {
  return {
    type: "RESET",
    value: value
  };
}

export function setResultField(field) {
  return {
    type: "CHANGE_FIELD",
    field: field
  };
}

export function setSort(sort) {
  return {
    type: "CHANGE_SORT",
    sort: sort
  };
}

//for redirect after add and edit
function redirect(value) {
  return {
    type: "REDIRECT",
    value: value
  };
}

function getEmployeesStart(page) {
  return {
    type: "FETCH_EMPLOYEES_START",
    page: page+1
  };
}

function getEmployeesFail() {
  return {
    type: "FETCH_EMPLOYEES_FAIL"
  };
}

function getEmployeesSuccess(response) {
  return {
    type: "FETCH_EMPLOYEES_SUCCESS",
    employees: response,
    hasMore: response.length>0
  };
}

function getValidManagersSuccess(response) {
  return {
    type: "FETCH_VALID_MANAGERS_SUCCESS",
    validManagers: response
  };
}