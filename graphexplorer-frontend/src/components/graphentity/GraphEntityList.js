import React from "react";
import { Table } from "reactstrap";

import NewGraphEntityModal from "./NewGraphEntityModal";
import GraphEntityRemovalModal from "./GraphEntityRemovalModal";
import { Link } from "react-router-dom";

class GraphEntityList extends React.Component {
  render() {
    if (this.props.graphentities.length <= 0) {
      return <React.Fragment></React.Fragment>
    }

    return (
      <Table dark className="mt-4">
        <thead>
          <tr>
            <th>Wikidata Id</th>
            <th>Label</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { this.props.graphentities.map(graphentity => (
            <tr key={graphentity.wikidataId}>
              <td>{graphentity.wikidataId}</td>
              <td>{graphentity.label}</td>
              <td>{graphentity.wikidataId.startsWith("P") ? "Property" : "Entity"}</td>
              <td align="center">
                <Link className="btn btn-primary me-2" to={`/view/${graphentity.wikidataId}`}>View Facts</Link>
                <NewGraphEntityModal
                  create={false}
                  graphentity={graphentity}
                  resetState={this.props.resetState}
                />
                {
                  this.props.isAdmin && (
                    <GraphEntityRemovalModal
                      graphentity={graphentity}
                      resetState={this.props.resetState}
                    />
                  )
                }
              </td>
            </tr>
            ))
          }
        </tbody>
      </Table>
      );
  }
}

export default GraphEntityList;