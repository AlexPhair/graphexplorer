import React from "react";
import { useLocation } from "react-router";

const PageNotFound = () => {

    const location = useLocation();

    return (
        <React.Fragment>
            <h1>Page Not Found!</h1>
            <p className="lead">"<i>{location.pathname}</i>" is not a valid page.</p>            
        </React.Fragment>
    );
}

export default PageNotFound;
