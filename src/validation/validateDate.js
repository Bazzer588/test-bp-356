
export default function validateDate (value, props, path) {
    const { name, required, touched } = props;
    if (!touched) {
        // check for non numeric
        // if not all fields filled in return
        return;
    }

    // simple numeric range checks
    const d = parseInt(value.day);
    if (isNaN(d) || d<1 || d>31) {
        return { name, path, required, error: 'invalidDay' };
    }
    const m = parseInt(value.month);
    if (isNaN(m) || m<1 || m>12) {
        return { name, path, required, error: 'invalidMonth' };
    }
    const y = parseInt(value.year);
    if (isNaN(y) || y<1900) {
        return { name, path, required, error: 'invalidYear' };
    }

    // is day valid for month and year
    const date = new Date(y,m-1,d);
    console.log('VALID DATE',date.getMonth()+1, String(date.toISOString()));
    if (date.getMonth()!==m-1) {
        return { name, path, required, error: 'invalidDayOfMonth' };
    }

    // restrictions relative to current date
    const {notToday, notPast, notFuture} = props;
    if (notToday || notPast || notFuture) {
        const tod = new Date().toISOString().substring(0,10);
        // console.log('TD',tod);
        const chk = date.toISOString().substring(0,10);
        if (notToday && chk===tod) {
            return { name, path, required, error: 'dateNotToday' };
        }
        if (notPast && chk<tod) {
            return { name, path, required, error: 'dateNotInPast' };
        }
        if (notFuture && chk>tod) {
            return { name, path, required, error: 'dateNotInFuture' };
        }
    }

    // custom validations, ie date must be before a prop and less than another prop
}
