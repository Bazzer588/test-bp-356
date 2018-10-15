import React from 'react';
import FormSection from '../FormSection';
import Select from '../components/Select';
import {stringTypeField} from "../validation/validateString";
import {makeContactSection} from "./ContactSection";
import Button from "../components/Button";
import {validateTree} from "../validation";

const RoomsRequired = stringTypeField( 'roomsRequired', {component: Select, required: false, rangeFrom: 1, rangeTo: 6, inputClass: 'narrow' });

function validateRoomCount (v,value) {
    v(RoomsRequired);
    v(ListOfRooms,{ listLength: value.roomsRequired });
    return true;
}

class RoomCount extends React.PureComponent {

    vlid = () => {
        console.log(this.props.value);
        const output = {};
        const errors = [];
        validateTree({ validateSection: validateRoomCount },this.props.value,output,errors,'paymentPage-checkOutForm');
        console.log('OUTPUT',output);
        console.log('ERRORS',errors);
};

    render () {
        const { value = {} } = this.props;
        const { roomsRequired } = value;
        const Field = this.props.renderField;
        /*return ([
            Field( RoomsRequired ),
            Field( ListOfRooms, { listLength: roomsRequired } )
        ]);*/
        return (
            <div>
                {Field( RoomsRequired )}
                {Field( ListOfRooms, { listLength: roomsRequired } )}
                <br/>
                <Button cnm="primary" onClick={this.vlid}>Validate</Button>
            </div>
        );
    }

}

export default FormSection(RoomCount);

// experimental from here...

class FormList extends React.PureComponent {

    render () {
        const { listLength, renderField, repeatThing } = this.props;
        const cc = parseInt(listLength);
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

function validateList (v, values, sectionProps) { // v, values, sectionProps, output, errors, path
    const { listLength, repeatThing } = sectionProps;
    const cc = parseInt(listLength);
    console.log('VL',cc,values,repeatThing);
    for(let n=0;n<cc;n++) {
        v( repeatThing, { name: String(n) } );
    }
    return true;
}

function makeRepeatable (name, repeatThing) {
    return { name, component: ListOfThings, validateSection: validateList, repeatThing, isArray: true };
}

// in use

const RoomNumber = stringTypeField('roomNumber',{ required: true });
// const RoomNumber = makeContactSection();

// const ListOfRooms = { name: 'roomList', component: ListOfThings, validateSection: () => {}, repeatThing: RoomNumber };
const ListOfRooms = makeRepeatable('roomList', RoomNumber );

