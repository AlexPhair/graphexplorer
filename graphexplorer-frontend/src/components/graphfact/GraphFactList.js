import React from "react";
import { Table } from "reactstrap";

import NewGraphFactModal from "./NewGraphFactModal";
import GraphFactRemovalModal from "./GraphFactRemovalModal";

class GraphFactList extends React.Component {
    render() {
        const graphfacts = this.props.graphfacts;

        if (this.props.graphfacts.length <= 0) {
          return <p className="lead">There are currently no facts for this entity.</p>
        }
        
        // TODO: Display labels instead of Ids
        return (
            <Table dark>
              <thead>
                <tr>
                  <th>Left Entity</th>
                  <th>Property</th>
                  <th>Right Entity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!graphfacts || graphfacts.length <= 0 ? (
                  <tr>
                    <td colSpan="6" align="center">
                      <b>There are currently no known Graph Facts. Why not add one now?</b>
                    </td>
                  </tr>
                ) : (
                  graphfacts.map(graphfact => (
                    <tr key={graphfact.id}>
                      <td>{graphfact.leftEntity}</td>
                      <td>{graphfact.property}</td>
                      <td>{graphfact.rightEntity}</td>
                      <td align="center">
                        <NewGraphFactModal
                          create={false}
                          graphfact={graphfact}
                          resetState={this.props.resetState}
                        />
                        &nbsp;&nbsp;
                        <GraphFactRemovalModal
                          graphfact={graphfact}
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

export default GraphFactList;