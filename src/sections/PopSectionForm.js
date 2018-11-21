import React from 'react';
import {ModalPopup} from "../pages/BasePage";
import FormSection from "../FormSection";
import {stringTypeField} from "../validation/validateString";
import FormConnect from "../FormConnect";
import Radios from "../components/Radios";
import Select from "../components/Select";

function PopSectionForm (props) {

    const { page, renderField } = props;

    function finito () {
        page.fadeOutPopup(
            () => alert('You clicked continue!')
        );
    }

    return (
        <ModalPopup page={page} title="Popup loaded by code splitting" continueAction={finito}>
            <form>
                {renderField(stringTypeField('AgeOfEldestChild',{ component: Select, rangeFrom: 0, rangeTo: 21 }))}
                {renderField(stringTypeField('AgreeYouMust',{ component: Radios, showLabel: false, className: 'horizontal', label: 'You must comply', options: 'yesno' }))}
                {renderField(stringTypeField('CostOfLastHols'))}
            </form>
        </ModalPopup>
    );
}

PopSectionForm.defaultProps = { name: 'MiniPopForm' };

export default FormConnect(FormSection(PopSectionForm));
