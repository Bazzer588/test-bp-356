// random data

// the initial seed

let seed = 6;

export function setRandomSeed (s) {
    seed = Number(s);
}

// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed

function seededRandom (max, min) {
    max = max || 1;
    min = min || 0;

    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;

    return min + rnd * (max - min);
}

function random () {
    return seededRandom(1, 0);
    // return Math.random();
}

const forenames = ['Bob', 'Joe', 'Vincent', 'Harold', 'Lewis', 'Rab', 'Cheng', 'Ding', 'Varp', 'Frenpuilda', 'Tommy',
    'Dave', 'Alberto', 'Valerian', 'Hubert', 'Jaques', 'Bart', 'William', 'Lewis', 'Fredo',
    'Anna', 'Barbara', 'Cloe', 'Dolores', 'Edwina', 'Fran', 'Georgia', 'Harriet', 'India', 'Jane'];

const surnames = ['Vega', 'Corleone', 'Harris', 'Swinson', 'Leach', 'Crosby', 'Flarbin', 'Boostrasser',
    'Jones', 'Bartlett', 'Rogoleta', 'Jasparnian', 'Grwgianon', 'Hrennoksok'];

function get (a) {
    return a[Math.floor(random() * a.length)];
}

export function mockName () {
    return get(forenames) + ' ' + get(surnames);
}

export function mockNumber (max) {
    return Math.round(random() * max);
}

const s1 = ['Pinstone', 'Napier', 'Balmoral', 'Chatsworth', 'Uppergate', 'Frampton'];
const s2 = ['Square', 'Close', 'Street', 'Drive', 'Crescent'];

export function mockStreet () {
    return get(s1) + ' ' + get(s2);
}

// the entry point

export function getDataSet (seed) {
    setRandomSeed(seed);
    const cc = mockNumber(4);
    const children = [];
    for (let n = 0; n < cc; n++) {
        children.push({
            type: 'Dependent Child',
            fullName: mockName(), // 'Mickey Vega'
        });
    }
    return {
        application: {
            address: (1 + mockNumber(82)) + ' ' + mockStreet() + ', Sheffield, S1 2DR'
        },
        involvedParties: [
            {
                type: 'Main Applicant',
                fullName: mockName(), // 'Vincent Vega',
                dob: '1982-08-17'
            },
            {
                type: 'Secondary Applicant',
                fullName: mockName(), // 'Carlina Corleone',
                dob: '1986-02-21'
            },
            ...children
        ]
    };
}
