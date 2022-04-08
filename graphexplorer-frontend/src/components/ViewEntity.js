import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Row } from "reactstrap";
import { GRAPH_ENTITY_API_URL, GRAPH_FACT_API_URL } from "../constants";
import Utilities from "../helpers/Utilities";
import NewGraphEntityModal from "./graphentity/NewGraphEntityModal";
import GraphFactList from "./graphfact/GraphFactList"
import NewGraphFactModal from "./graphfact/NewGraphFactModal";

const ViewEntity = () => {
    let { wikidataId } = useParams();

    let [ entity, setEntity ] = useState({});
    let [ entityFacts, setEntityFacts ] = useState([]);

    const updateEntityData = () => {
        Utilities.getAuthenticatedAxiosRequest()
            .get(GRAPH_ENTITY_API_URL + wikidataId)
            .then(res => setEntity(res.data));

        Utilities.getAuthenticatedAxiosRequest()
            .get(GRAPH_FACT_API_URL + wikidataId)
            .then(res => setEntityFacts(res.data));
    }

    useEffect(() => {
        updateEntityData();
    }, [wikidataId]);

    const resetState = () => {
        updateEntityData();
    };

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <h1>{ entity.wikidataId }: { entity.label }</h1>
                    <NewGraphEntityModal
                        create={false}
                        graphentity={entity}
                        resetState={resetState}
                        />
                </Col>
            </Row>

            <h2 className="mt-4">Facts:</h2>
        
            <Row>
                <Col xs="12">
                    <GraphFactList graphfacts={entityFacts} resetState={resetState}/>
                </Col>
                <Col>
                    <NewGraphFactModal create={true} resetState={resetState} />
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ViewEntity;