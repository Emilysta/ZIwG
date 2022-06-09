import * as React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import MainEventBox from 'Components/EventPage/MainEventBox';
import './UserEventPage.scss';
import { useAddEventMainImageMutation, useGetEventQuery, useModifyEventMutation } from 'Utils/EventAPISlice';
import { RootState, useAppSelector } from 'Utils/Store';
import { MenuButton } from 'Components/Input/MenuButton';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import ToggleButtonWithText from 'Components/Input/ToggleButtonWithText';
import { useReducer } from 'react';

const reducer = (state, action) => {
    if (action.type === "set") {
        return action.data;
    }
    const result = { ...state };
    result[action.type] = action.value;
    return result;
};

export default function EventPage() {
    const [isReadOnly, setReadOnly]: [boolean, any] = React.useState(true)
    const [values, dispatch] = useReducer(reducer, {});
    const { id } = useParams();
    const { data, error, isLoading } = useGetEventQuery(id);
    React.useEffect(() => {
        if (!data) return;
        dispatch({ type: 'set', data })
    }, [data]);

    const userId = useAppSelector((state: RootState) => state.userLogin.userId)
    const [editRequest] = useModifyEventMutation()
    const [pushImageRequest] = useAddEventMainImageMutation()

    const isOrganiser = values && values.organiserId === userId;

    const edit = () => isOrganiser && setReadOnly(false)
    const save = () => {
        editRequest({
            eventId: values.id,
            data: values
        }).unwrap()
            .then((res) => {
                if (values.mainImage != null) {
                    let formData = new FormData();
                    formData.append('files', values.mainImage);
                    pushImageRequest({
                        eventId: values.id,
                        image: formData
                    }).then((_) => setReadOnly(true))
                }
                setReadOnly(true)
            })
            .catch((err) => console.error(err))
    }
    function cancel() {
        setReadOnly(true);
        dispatch({ type: 'set', data });
    }

    const onEdit = (id: string, value: any) => {
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

    if (error)
        return (<Navigate replace to="/home" />);
    else {
        return (
            <>
                <div className='userEventPage'>
                    <MainEventBox className="mainBox" values={values ?? {}} isReadOnly={isReadOnly} isLoading={isLoading} onValuesChange={onEdit} />
                    <div className='sideBox'>
                        <div className='modifyButtonsBox'>
                            {isReadOnly && <MenuButton onClick={edit} value="Modify" className='strech' />}
                            {!isReadOnly && <MenuButton onClick={save} value="Save" className='strech' />}
                            {!isReadOnly && <MenuButton onClick={cancel} value="Cancel" className="cancel strech" />}
                        </div>
                        <div className='togglesBox'>

                            <ToggleButtonWithText fieldDesc='Public event' startIsToggled={values?.isPublicEvent} id='isPublicEvent' onValueChange={onEdit} isReadOnly={isReadOnly} loading={isLoading} />

                            <ToggleButtonWithText fieldDesc='Limit tickets' startIsToggled={values?.isTicketLimit} id='isTicketLimit' onValueChange={onEdit} isReadOnly={isReadOnly} loading={isLoading} />

                            {(values?.isTicketLimit) && <SimpleEditableInput id="ticketLimit" defaultValue={values?.ticketLimit?.toString()} onChangeAction={onEdit} validationAction={(value: string) => checkInput(value, /\D/, 'Only Integer')} isLoading={isLoading} isNumber isReadOnly={isReadOnly} />}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


