import * as React from 'react';
import './ProfileStats.scss';
import { RootState, useAppSelector } from 'Utils/Store'

export function ProfileStats(props: any) {
    const data = useAppSelector((state: RootState) => state.userLogin.userData);
    const stats = [
        { name: "Your incoming events", num: data?.attends },
        { name: "Incoming events organised by You", num: data?.organises },
    ]
    return (
        <>
            <div className='statsContainer'>
                {stats.map(stat => <div key={stat.name}>
                    <label>{stat.name}</label>
                    <h1>{stat.num}</h1>
                </div>)}
            </div>
        </>
    );
}
