import * as React from 'react';
import './ProfileStats.scss'

export function ProfileStats(props: any) {
    const stats = [
        { name: "voluptatem", num: 15 },
        { name: "molestiae", num: 1 },
        { name: "magnam", num: 4 }
    ]
    return (
        <>
            <div className='statsContainer'>
                {stats.map(stat => <div key={stat.name}>
                    <label>{stat.name}</label>
                    <a>{stat.num}</a>
                </div>)}
            </div>
        </>
    );
}
