import { Link } from "react-router-dom"

export default function NotFoundPage () {
    return (
        <div>
            <h1>This page does not exist.</h1>
            <Link to="/">Back to home page</Link>
        </div>
    )
}