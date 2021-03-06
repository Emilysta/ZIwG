import MainEventBox from 'Components/EventPage/MainEventBox';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import { MenuButton } from 'Components/Input/MenuButton';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import ToggleButtonWithText from 'Components/Input/ToggleButtonWithText';
import * as React from 'react';
import { useReducer } from 'react';
import { XLg, PlusLg } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { eventApi } from 'Utils/EventAPISlice';
import { userApi } from 'Utils/UserApiSlice';
import './UserAddEventPage.scss';

const reducer = (state, action) => {
    if (action.type === "set") {
        return action.data;
    }
    const result = { ...state };
    result[action.type] = action.value;
    return result;
};

export default function UserAddEventPage() {
    const navigate = useNavigate();

    const [values, dispatch] = useReducer(reducer, {
        name: 'Event name',
        description: '',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        tags: [],
        isPublicEvent: true,
        isTicketLimit: false,
        ticketLimit: 0,
        place: '',
        mainImage: undefined,
    });

    const [addEventRequest] = eventApi.useAddEventMutation();
    const [addEventMainImageRequest] = eventApi.useAddEventMainImageMutation();
    const [getUserData] = userApi.useLazyGetUserDataQuery();

    async function addEvent(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        console.log("added event");

        try {
            let response = await addEventRequest(values).unwrap();
            console.log(response);
            let formData = new FormData();
            formData.append('files', values.mainImage);
            let mainImageResponse = await addEventMainImageRequest({
                eventId: response,
                image: formData,
            });
            await getUserData();
            navigate('/user/userEvents', { replace: true });
        }
        catch (error) {
            console.log('rejected', error);
            alert('error while sending');
        }
    }

    function valueChange(id: string, value: any) {
        dispatch({ type: id, value })
    }

    function checkInput(value: string, regex: RegExp, errorToShow: string, isValidChar: boolean = false): string {
        let error: string = '';

        if (!isValidChar && regex.test(value)) {
            error = errorToShow;
        }
        if (isValidChar)
            if (!regex.test(value)) {
                error = errorToShow;
            }
        return error;
    }

    return (
        <form onSubmit={addEvent}>
            <div className='userAddEventPage'>

                <MainEventBox className="mainBox" values={values} onValuesChange={valueChange} isReadOnly={false} />
                <div className='sideBox'>
                    <div className='togglesBox'>
                        <ToggleButtonWithText fieldDesc='Public event' startIsToggled={values.isPublicEvent} id='isPublicEvent' onValueChange={valueChange} />

                        <ToggleButtonWithText fieldDesc='Limit tickets' startIsToggled={values.isTicketLimit} id='isTicketLimit' onValueChange={valueChange} />
                        {values.isTicketLimit && <SimpleEditableInput id="ticketLimit"
                            onChangeAction={valueChange} validationAction={(value: string) => checkInput(value, /\D/, 'Only Integer')} isNumber required={values?.isTicketLimit} />}
                    </div>

                    <div className="finishAddingButtonBox">
                        <ButtonWithIcon text="Cancel" isActive={true} icon={<XLg fill='white' />} style={ButtonStyle.Border} link='/user/userEvents' replaceLink={true} />
                        <MenuButton type='submit' value='+ Create event' />
                    </div>
                </div>
            </div>
        </form>
    )
}
