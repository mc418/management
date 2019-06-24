const InitState = {
    employees: [],
    employeesStatus: "",
    hasMore: true,
    validManagers:[],
    error: null,
    isLoading: false
  };
  
  const reducer = (state = InitState, action) => {
    switch (action.type) {
      case "FETCH_EMPLOYEES_FAIL":
        return { 
          ...state, 
          employeesStatus: 'fail', 
          error: action.error,
          isLoading: false
        };
      case "FETCH_EMPLOYEES_START":
        return { 
          ...state, 
          employeesStatus: 'start', 
          page: action.page, 
          isLoading: true
        };
      case "FETCH_EMPLOYEES_SUCCESS":
        if(action.page === 1) {
          return {
            ...state,
            employeesStatus: 'success',
            employees: action.employees,
            hasMore: action.hasMore,
            isLoading: false
          }
        } else {
          return { 
            ...state, 
            employeesStatus: 'success', 
            employees: [...state.employees,...action.employees], 
            hasMore:action.hasMore,
            isLoading: false
          };
        }
      case "EDIT_EMPLOYEE_START":
        return {
          ...state,
        }
      case "EDIT_EMPLOYEE_SUCCESS":
        return {
          ...state,
          employees: [],
          hasMore: true
        }
      case "EDIT_EMPLOYEE_FAIL":
        return {
          ...state,
          error: action.error
        }
      case "ADD_EMPLOYEE_START":
        return {
          ...state
        }
      case "ADD_EMPLOYEE_SUCCESS":
        return {
          ...state,
          employees: [],
          hasMore: true
        }
      case "ADD_EMPLOYEE_FAIL":
        return {
          ...state,
          error: action.error
      }
      case "DELETE_EMPLOYEE_START":
        return {
          ...state,
        }
      case "DELETE_EMPLOYEE_SUCCESS":
        return {
          ...state,
          employees: [],
          hasMore: true
        }
      case "DELETE_EMPLOYEE_FAIL":
        return {
          ...state,
          error: action.error
        }
      case "GET_REPORTERS_START":
        return {
          ...state
        }
      case "GET_REPORTERS_SUCCESS":
        return {
          ...state,
          employees: action.employees,
          hasMore: true
        }
      case "GET_REPORTERS_FAIL":
        return {
          ...state,
          error: action.error
      }
      case "GET_MANAGER_START":
        return {
          ...state
        }
      case "GET_MANAGER_SUCCESS":
        return {
          ...state,
          employees: action.employees,
          hasMore: true
        }
      case "GET_MANAGER_FAIL":
        return {
          ...state,
          error: action.error
      }
      case "RESET":
        return { 
          ...state, 
          employees: [], 
          hasMore:true,
          isLoading: false
        }
      case "FETCH_VALID_MANAGERS_START":
        return {
          ...state
        }
      case "FETCH_VALID_MANAGERS_SUCCESS":
         return { 
           ...state, 
           validManagers: action.validManagers
          };
      case "FETCH_VALID_MANAGERS_FAIL":
          return {
            ...state,
            error: action.error
      }
      case "FETCH_ALL_MANAGERS_START":
        return {
          ...state
        }
      case "FETCH_ALL_MANAGERS_SUCCESS":
         return { 
           ...state, 
           validManagers: action.allManagers
          };
      case "FETCH_ALL_MANAGERS_FAIL":
          return {
            ...state,
            error: action.error
      }
      default:
        return state;
    }
  };
  
  export default reducer;