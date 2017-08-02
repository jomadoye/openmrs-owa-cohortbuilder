import React from 'react';

const SavedResultsTable = ({
  results, tableName, downloadJobs, deleteJobs,
  onDelete, onView, onDownload, isSearching
}) => {
  let serialNumber = 0;
  return isSearching ? 
    (<div>
      <h4 className="text-center">{tableName}</h4>
      <p>Loading... </p>
    </div>) : 
    (<div className="table-responsive">     
      <h4 className="text-center">{tableName}</h4>
      {results.length <= 0 && !isSearching ?
      null :
      <div className="saved-results-view col-sm-10 col-sm-offset-1">
        {results.length <= 0 ?
        <p> No Results</p> : 
        <table className="table table-hover">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Description</th>
              <th>Number of Patients</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              results.map((result) => {
                if (result.name != 'appointmentschedulingui.appointmentDataSetDefinition.dailyAppointments') {
                  const { uuid, description } = result;
                  serialNumber++;
                  return (
                  <tr key={uuid}>
                    <td>{serialNumber}</td>
                    <td>{result.name}</td>
                    <td>
                      {result.description}
                    </td>
                    <td>
                      {result.totalResults !== undefined ? 
                        <a
                          onClick={onView(uuid, description)}
                          className="link"
                          title="View Patients"
                        >
                          {result.totalResults} Patients
                        </a> : 
                        <a
                          onClick={onView(uuid, description)}
                          className="link"
                          title="View Patients"
                        >
                          View
                        </a>
                      }
                    </td>
                    <td>
                      <a
                        onClick={onDownload(uuid, result.name)}
                        className="link"
                        title="Dowload Patients"
                      >
                        {downloadJobs.includes(uuid) ?
                          'Downloading...': 'Download'}
                      </a>
                      <a
                        onClick={onDelete(uuid, result.name)}
                        className="link"
                        title={`Delete ${result.name}`}
                      >
                        {deleteJobs.includes(uuid) ?
                        'Deleting...' : 'Delete'}
                      </a>
                    </td>
                  </tr>
                  );
                }
              })
            }
          </tbody>
        </table>}
      </div>}
    </div>
  );
};

SavedResultsTable.propTypes = {
  results: React.PropTypes.array.isRequired,
  tableName: React.PropTypes.string.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onDownload: React.PropTypes.func.isRequired,
  onView: React.PropTypes.func.isRequired,
  deleteJobs: React.PropTypes.array.isRequired,
  downloadJobs: React.PropTypes.array.isRequired,
  isSearching: React.PropTypes.bool.isRequired
};

export default SavedResultsTable;
