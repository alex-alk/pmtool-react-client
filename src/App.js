import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecureRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decode_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decode_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decode_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            {
              // public routes
            }
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />

            {
              // private routes
            }

            <Route
              exact
              path="/dashboard"
              element={
                <SecureRoute>
                  <Dashboard />
                </SecureRoute>
              }
            />

            <Route
              exact
              path="/addProject"
              element={
                <SecureRoute>
                  <AddProject />
                </SecureRoute>
              }
            />
            <Route
              exact
              path="/updateProject/:id"
              element={
                <SecureRoute>
                  <UpdateProject />
                </SecureRoute>
              }
            />
            <Route
              exact
              path="/projectBoard/:id"
              element={
                <SecureRoute>
                  <ProjectBoard />
                </SecureRoute>
              }
            />
            <Route
              exact
              path="/addProjectTask/:id"
              element={
                <SecureRoute>
                  <AddProjectTask />
                </SecureRoute>
              }
            />
            <Route
              exact
              path="/updateProjectTask/:backlog_id/:pt_id"
              element={
                <SecureRoute>
                  <UpdateProjectTask />
                </SecureRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
