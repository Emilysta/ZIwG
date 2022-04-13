import * as React from 'react'
import { useParams } from 'react-router-dom';

export default function UserEventPage() {
    let { id } = useParams();

    return (
        <div>UserEventPage {id}</div>
    )
}
