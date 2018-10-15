import React from 'react';
import FormSection from '../FormSection';
import Select from '../components/Select';
import {stringTypeField} from "../validation/validateString";
import {makeContactSection} from "./ContactSection";
import Button from "../components/Button";
import {validateTree} from "../validation";

const RoomsRequired = stringTypeField( 'roomsRequired', {component: Select, required: true, rangeFrom: 1, rangeTo: 6, inputClass: 'narrow' });

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

// experimental from here...

class FormList extends React.PureComponent {

    render () {
        const { listLength, renderField, repeatThing, fixedList, value = [] } = this.props;
        const cc = fixedList ? value.length : parseInt(listLength);
        if (!cc)
            return null;

        const arr = [];
        for(let n=0;n<cc;n++) {
            arr.push( renderField({ ...repeatThing, name: String(n) }) );
        }

        return (
            <div>
                {arr}
            </div>
        );
    }
}

const ListOfThings = FormSection(FormList,true);

function validateList (v, value, sectionProps) { // v, values, sectionProps, output, errors, path
    const { listLength, fixedList, repeatThing } = sectionProps;
    const cc = fixedList ? value.length : parseInt(listLength);
    for(let n=0;n<cc;n++) {
        v( repeatThing, { name: String(n) } );
    }
    return true;
}

function makeRepeatable (name, repeatThing) {
    return { name, component: ListOfThings, validateSection: validateList, repeatThing, isArray: true };
}

// in use

//const RoomNumber = stringTypeField('roomNumber',{ required: true });
const RoomNumber = makeContactSection();

// const ListOfRooms = { name: 'roomList', component: ListOfThings, validateSection: () => {}, repeatThing: RoomNumber };
const ListOfRooms = makeRepeatable('roomList', RoomNumber );

