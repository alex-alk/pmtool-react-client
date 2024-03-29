import React, { Component } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
  //constructor to handle errors
  constructor() {
    super();
    this.state = {
      errors: {},
      project_tasks: [{}],
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.getBacklog(id).then(() => {
      this.setState({ project_tasks: this.props.backlog.project_tasks });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  render() {
    const { id } = this.props.params;

    const { errors } = this.state;
    const { project_tasks } = this.state;

    let BoardContent;
    const boardAlgorithm = (errors, project_tasks) => {
      if (project_tasks.length < 1) {
        if (errors.projectNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectNotFound}
            </div>
          );
        } else if (errors.projectIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectIdentifier}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Project Tasks on the board
            </div>
          );
        }
      } else {
        return <Backlog project_tasks_prop={project_tasks} />;
      }
    };

    BoardContent = boardAlgorithm(errors, project_tasks);

    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"></i> Create Project Task
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

function withRouter() {
  return function (props) {
    const params = useParams();
    const navigate = useNavigate();
    return <ProjectBoard {...props} params={params} navigate={navigate} />;
  };
}

export default connect(mapStateToProps, { getBacklog })(
  withRouter(ProjectBoard)
);
