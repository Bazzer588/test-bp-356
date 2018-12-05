import React from 'react';
import FormSection from '../FormSection';
import {selectTypeField} from '../components/Select';
import {makeContactSection} from "./ContactSection";
import Button from "../components/Button";
import {validateTree} from "../validation";
import {makeRepeatable} from "../FormListSection";

const RoomsRequired = selectTypeField( 'roomsRequired', { required: true, rangeFrom: 1, rangeTo: 6, inputClass: 'narrow' });

function validateRoomCount (v,value = {}) {
    v(RoomsRequired);
    v(ListOfRooms,{ listLength: value.roomsRequired });
    return true;
}

function RoomCountSection (props) {

    function doReset () {
        props.setShowErrors(false);
        props.parent.onChangeField(props.name,{});
        props.parent.onBlurField(props.name,{});
    }

    const vlid = () => {
        console.log(props.value);
        const output = {};
        const errors = [];
        validateTree({ validateSection: validateRoomCount },props.value,output,errors,'paymentPage-checkOutForm');
        console.log('OUTPUT',output);
        console.log('ERRORS',errors);
        props.setShowErrors(true);
    };

    const { value = {} } = props;
    const { roomsRequired } = value;
    const Field = props.renderField;

    return (
        <div>
            {Field( RoomsRequired )}
            {Field( ListOfRooms, { listLength: roomsRequired } )}
            <br/>
            <Button cnm="primary" onClick={vlid}>Validate</Button>
            <Button onClick={() => props.setShowErrors(false)}>Clear</Button>
            <Button onClick={doReset}>Reset</Button>
        </div>
    );

}

export default FormSection(RoomCountSection);

// in use

//const RoomNumber = stringTypeField('roomNumber',{ required: true });
const RoomNumber = makeContactSection();

// const ListOfRooms = { name: 'roomList', component: ListOfThings, validateSection: () => {}, repeatThing: RoomNumber };
const ListOfRooms = makeRepeatable('roomList', RoomNumber );
