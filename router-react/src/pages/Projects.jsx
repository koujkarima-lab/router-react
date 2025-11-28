import React from 'react';

const Projects = () => (
  <>
    <h2>Projects</h2>
    <div className="row">
      <div className="col-md-6 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Project One</h5>
            <p className="card-text">A neat project description.</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Project Two</h5>
            <p className="card-text">Another neat project description.</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Projects;