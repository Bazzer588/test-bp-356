import { translate, setLangMap, stripNum, stdCache, reqCache } from "./engine";

const std = {
    pleaseSelect: 'Please make a selection',
    gender: 'Gender',
    dob: 'Date of birth',
    spouse: {
        $: 'Spouse name',
        $$: 'Spouse name (optional)',
        gender: 'Spouse Gender'
    },
    country: {
        $: 'Country',
        $$: 'Country (optional)',
        pleaseSelect: 'Choose a country'
    },
    overseas: {
        country: {
            $: 'Overseas address country',
            $$: 'Overseas address country (optional)'
        }
    },
    lastName: 'Surname',
    otherContact: {
        $: 'Other contact',
        lastName: 'Family name'
    },
    dateOfBirth: {
        $: 'Date of birth',
        required: 'Date of birth must be completed',
        errorNoFuture: 'Date of birth cannot be a future date'
    },
    zipCode: 'Postal code',
    contractDate: 'Date of contract',

    // ----- sub fields ------
    month: {
        ariaLabel: 'Month for {f}',
        pleaseSelect: 'MM'
    },
    year: {
        ariaLabel: 'Year for {f}',
        placeholder: 'YYYY',
        invalid: 'Please enter a valid year for {f}'
    },
    amount: {
        ariaLabel: 'Amount for {f}'
    },

    // ------ errors ---------
    required: '{f} is required',
    errorNoFuture: '{f} can not be a future date',
    errorNoPast: '{f} must be a date in the future',
    errorMinLength: '{f} must be at least {minLength} characters',
    errorMoreThan: '{f} must be more than {minValue}',
};

setLangMap(std);

describe('translator lookup',() => {

    function test (t,x,required) {
        const m = t.error ? 'error '+t.error+' '+t.name : 'matches '+ t;
        it(m, () => {
            expect(translate(t,required)).toEqual(x);
        });
    }

    function stst(t,x) {
        const q = stripNum(t.split('-'));
        it('splits '+t, () => {
            expect(q).toEqual(x);
        });
    }

    const REQ = { required: true };

    test('gender','Gender');
    test('country','Country',REQ);
    test('some-thing-gender','Gender');
    test('some-spouse-gender','Spouse Gender');
    test('some-spouse-dob','Date of birth');
    test('some-dob','Date of birth');
    test('some-spouse','Spouse name (optional)');
    test('some-spouse','Spouse name',REQ);

    test('addr-country','Country',REQ);
    test('addr-country','Country (optional)');
    test('addr-overseas-country','Overseas address country (optional)');
    test('addr-overseas-country','Overseas address country',REQ);
    test('addr-country-pleaseSelect','Choose a country');
    test('addr-overseas-country-pleaseSelect','Choose a country');
    test('spouse-country-pleaseSelect','Choose a country');
    test('spouse-pleaseSelect','Please make a selection');
    test('country-xxx-pleaseSelect','Please make a selection');

    test('some-thing-2-gender','Gender');
    test('some-spouse-21-gender','Spouse Gender');
    test('addr-overseas-92-country','Overseas address country',REQ);

    test('pd-lastName','Surname');
    test('otherContact-pd-lastName','Surname');
    test('foo-otherContact-lastName','Family name');
    test('foo-2-otherContact-7-lastName','Family name');
    test('foo-2-otherContact','Other contact');
    test('list-otherContact-0','Other contact');
    test('list-otherContact-1','Other contact');

    test('foo-dob-zoot','foo-dob-zoot');
    test('foo-bar','foo-bar');
    test('otherContact-bob','otherContact-bob');

    test('form2-contractDate-dateField-year-ariaLabel','Year for Date of contract', { id: 'form2-contractDate' }); // TODO WTF is {f} here ???
    test('form2-purchasePrice-amount-ariaLabel','Amount for purchasePrice',{ id: 'purchasePrice' });

    test({ error: 'errorMinLength', path: 'aaa-bbb-xxx', name: 'zipCode', values: { minLength: 4 } },'Postal code must be at least 4 characters');
    test({ error: 'errorNoFuture', path: 'pdForm-person-1', name: 'dateOfBirth' },'Date of birth cannot be a future date');
    test({ error: 'errorNoFuture', path: 'pdForm-person-1', name: 'purchaseDate' },'purchaseDate can not be a future date');
    test({ error: 'required', path: 'pdForm-person-2-personalDetails', name: 'dob' },'Date of birth is required');
    test({ error: 'required', path: 'personalDetails', name: 'dateOfBirth' },'Date of birth must be completed');

    stst('ok-it',['ok','it']);
    stst('21-ok-it',['ok','it']);
    stst('ok-5-it',['ok','it']);
    stst('ok-it-33',['ok','it']);
    stst('33-33-2',[]);
    stst('33-woo-33-2',['woo']);

    it ('cached',() => {
        console.log('STANDARD CACHE',JSON.stringify(stdCache,null,' '));
        console.log('REQUIRED CACHE',JSON.stringify(reqCache,null,' '));
    });
});
