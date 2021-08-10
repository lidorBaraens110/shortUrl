import React,{FC} from 'react';
import { Link } from 'react-router-dom';

const Page404:FC=()=> {

    return (
        <div>
            <h1>404 - Not Found!</h1>
            <Link to="/admin">
                Go Home
            </Link>
        </div>
    );
}

export default Page404;