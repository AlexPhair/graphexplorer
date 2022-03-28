import React from "react";
import { Table } from "reactstrap";

import NewGraphEntityModal from "./NewGraphEntityModal";
import GraphEntityRemovalModal from "./GraphEntityRemovalModal";

class GraphEntityList extends React.Component {
    render() {
        const graphentities = this.props.graphentities;

        return (
            <Table dark>
              <thead>
                <tr>
                  <th>Wikidata Id</th>
                  <th>Label</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!graphentities || graphentities.length <= 0 ? (
                  <tr>
                    <td colSpan="6" align="center">
                      <b>There are currently no known Graph Entities. Why not add one now?</b>
                    </td>
                  </tr>
                ) : (
                    graphentities.map(graphentity => (
                    <tr key={graphentity.wikidataId}>
                      <td>{graphentity.wikidataId}</td>
                      <td>{graphentity.label}</td>
                      <td>{graphentity.wikidataId.startsWith("P") ? "Property" : "Entity"}</td>
                      <td align="center">
                        <NewGraphEntityModal
                          create={false}
                          graphentity={graphentity}
                          resetState={this.props.resetState}
                        />
                        &nbsp;&nbsp;
                        <GraphEntityRemovalModal
                          graphentity={graphentity}
                          resetState={this.props.resetState}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          );
    }
}

export default GraphEntityList;