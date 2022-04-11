import * as React from 'react'
import { useParams } from 'react-router-dom'

export default function EventPage() {
    const { id } = useParams();

    return (
        <div>EventPage {id}</div>
    )
}
