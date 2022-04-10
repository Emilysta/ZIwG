import * as React from 'react'
import { useParams } from 'react-router-dom';

export default function UserEventPage() {
    const { params } = useParams();

    return (
        <div>UserEventPage {params}</div>
    )
}
