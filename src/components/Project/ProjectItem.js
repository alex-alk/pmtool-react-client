import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";

class ProjectItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };

  render() {
    const { project } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{project.projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{project.projectName}</h3>
              <p>{project.description}</p>
            </div>
            <div className="col-md-4 d-lg-block">
              <ul className="list-group">
                <Link
                  to={`/projectBoard/${project.projectIdentifier}`}
                  className="text-decoration-none"
                >
                  <li className="list-group-item board ">
                    <i className="fa fa-flag-checkered pr-1"></i> Project Board
                  </li>
                </Link>
                <Link
                  to={`/updateProject/${project.projectIdentifier}`}
                  className="text-decoration-none"
                >
                  <li className="list-group-item update text-success">
                    <i className="fa fa-edit pr-1 text-success"></i> Update
                    Project Info
                  </li>
                </Link>

                <li
                  className="list-group-item delete text-danger"
                  onClick={this.onDeleteClick.bind(
                    this,
                    project.projectIdentifier
                  )}
                >
                  <i className="fa fa-minus-circle pr-1"></i> Delete Project
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
