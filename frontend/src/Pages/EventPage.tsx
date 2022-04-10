import * as React from 'react'
import { useParams } from 'react-router-dom'

export default function EventPage() {
    const { params } = useParams();

    return (
        <div>EventPage {params}</div>
    )
}
