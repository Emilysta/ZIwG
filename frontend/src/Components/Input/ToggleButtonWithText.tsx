import * as React from 'react';
import { Square, CheckSquareFill } from 'react-bootstrap-icons';
import Skeleton from 'react-loading-skeleton';
import './ToggleButtonWithText.scss';

type ToggleButtonWithTextProps = {
    startIsToggled: boolean,
    fieldDesc: string,
    isReadOnly?: boolean,
    id?: string,
    onValueChange?: (id: string, value: boolean) => void,
    loading?: boolean,
}


export default function ToggleButtonWithText(props: ToggleButtonWithTextProps) {
    const [isToggled, setIsToggled] = React.useState(props.startIsToggled);

    const toggleStateChanged = () => {
        if (!props.isReadOnly) {
            setIsToggled(!isToggled);
            if (props.onValueChange)
                props.onValueChange(props.id, !isToggled);
        }
    }

    return (
        <div className='toggleWrap'>
            <div className='icon toggleElement' onClick={toggleStateChanged}>
                {props.loading && <Skeleton containerClassName='my' width={25} />}
                {!props.loading && isToggled && <CheckSquareFill className="" />}
                {!props.loading && !isToggled && <Square />}
            </div>
            {props.loading && <Skeleton containerClassName='my toggleElement' width={100} height={20} />}
            {!props.loading && <p className='toggleElement'>{props.fieldDesc}</p>}
        </div>
    )
}
