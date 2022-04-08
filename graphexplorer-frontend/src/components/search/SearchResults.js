import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GRAPH_ENTITY_API_URL } from "../../constants";
import Utilities from "../../helpers/Utilities";
import GraphEntityList from "../graphentity/GraphEntityList";
import SearchBar from "./SearchBar";
import  { Navigate } from 'react-router-dom'
import { Col, Row } from "reactstrap";
import NewGraphEntityModal from "../graphentity/NewGraphEntityModal";

const SearchResults = () => {
    const [queryResults, setQueryResults] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchParams] = useSearchParams();

    const is_logged_in = Utilities.isLoggedIn();
    const query = searchParams.get("query");

    const updateQueryResults = () => {
        Utilities.getAuthenticatedAxiosRequest()
            .get(GRAPH_ENTITY_API_URL, { params: { query }})
            .then(res => setQueryResults(res.data));
    }

    useEffect(() => {
        if (!query || query.trim() === '') {
            return;
        }

        Utilities.isAdminPromise().then(is_admin => setIsAdmin(is_admin));
        updateQueryResults();
    }, [query]);

    const resetState = () => {
        updateQueryResults();
    };
        
    return (
        <React.Fragment>
            <SearchBar/>

            <h1 className="display-6">Search Results for "<em>{query}</em>"</h1>
            {
                queryResults.length <= 0 && <p className="lead">Oops! No Search Results found. Try rephrasing your search.</p>
            }

            <Row>
                <Col xs="12">
                    <GraphEntityList graphentities={queryResults} resetState={resetState} isAdmin={isAdmin}/>
                </Col>
                <Col>
                    <NewGraphEntityModal create={true} resetState={resetState} />
                </Col>
            </Row>
            {
                !is_logged_in  && <Navigate to="/"/>
            }
        </React.Fragment> 
    );
}

export default SearchResults
