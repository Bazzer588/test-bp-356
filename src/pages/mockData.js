// random data

function random () {
    return Math.random();
}

const forenames = ['Bob', 'Joe', 'Vincent', 'Harold', 'Lewis', 'Rab', 'Cheng', 'Ding', 'Varp', 'Frenpuilda', 'Tommy',
    'Dave', 'Alberto', 'Valerian', 'Hubert', 'Jaques','Bart','William','Lewis','Fredo'];

const surnames = ['Vega', 'Corleone', 'Harris', 'Swinson', 'Leach', 'Crosby', 'Flarbin', 'Boostrasser',
    'Jones', 'Bartlett', 'Rogoleta', 'Jasparnian', 'Grwgianon', 'Hrennoksok'];

function get(a) {
    return a[Math.floor(random() * a.length)];
}

export function mockName() {
    return get(forenames) + ' ' + get(surnames);
}

export function mockNumber(max) {
    return Math.round(random() * max);
}

const s1 = ['Pinstone', 'Napier', 'Balmoral', 'Chatsworth', 'Uppergate', 'Frampton'];
const s2 = ['Square', 'Close', 'Street', 'Drive', 'Crescent'];

export function mockStreet() {
    return get(s1) + ' ' + get(s2);
}