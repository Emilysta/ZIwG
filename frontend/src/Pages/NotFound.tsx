import * as React from "react";
import { Link } from "react-router-dom";
import './NotFound.scss'

export function NotFound() {
    return (
        <div className='wholePageLayout'>
            <div className="messageBox">
                <h1>Page not found</h1>
                Keep calm and <Link to="/">back to home page</Link>
            </div>
        </div>
    )
}
