import * as React from 'react';
import { Square, CheckSquareFill } from 'react-bootstrap-icons';
import './ToggleButtonWithText.scss';

type ToggleButtonWithTextProps = {
    startIsToggled: boolean,
    fieldDesc: string,
    isReadOnly?: boolean,
}


export default function ToggleButtonWithText(props: ToggleButtonWithTextProps) {
    const [isToggled, setIsToggled] = React.useState(props.startIsToggled);

    const toggleStateChanged = () => {
        if (!props.isReadOnly)
            setIsToggled(!isToggled);
    }

    return (
        <div className='toggleWrap'>
            <div className='icon toggleElement' onClick={toggleStateChanged}>
                {isToggled && <CheckSquareFill className="" />}
                {!isToggled && <Square />}
            </div>
            <p className='toggleElement'>{props.fieldDesc}</p>
        </div>
    )
}
