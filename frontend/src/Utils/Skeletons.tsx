import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as React from 'react';
import './Skeletons.scss';

export type ZiwgSkeletonProps = {
    count?: number,
    className?: string,
    containerClassName?: string,
    containerTestId?,
    circle?: boolean,
    width?: number,
    height?: number,
}


export default function ZiwgSkeleton(props: ZiwgSkeletonProps) {

    return (
        <SkeletonTheme baseColor='grey' highlightColor='#444'>
            <Skeleton containerClassName={`mySkeleton${props.containerClassName ? ' ' + props.containerClassName : ''}`} count={props.count} circle={props.circle} containerTestId={props.containerTestId} width={props.width} height={props.height} />
        </SkeletonTheme>
    )
}