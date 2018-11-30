
const cache = [];

export function fetchAirports (code) {
    // alert('fetch '+code);

    if (!code) return Promise.resolve('What');

    const old = cache[code];
    if (old) return Promise.resolve(old);

    // const url = code==='zzz' ? 'https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.xml' : '/debug?city='+code;
    let url = code==='zzz' ? 'https://www.foaas.com/' : '/debug?city='+code;

    if (window.location.host==='bazzer588.github.io')
        url = 'https://jarnell.org/debug?city='+code;

    return fetch(url)
        .then( response => {
            debugHeaders(response.headers);
            console.log('GOT',response.status,response);
            if (response.status!==200) {
                return 'Error '+response.status;
            }
            if (code==='xxx') throw new Error('Test Fail');
            return response.json();
        })
        .then( json => {
            // console.log('GOT',json);
            cache[code] = json;
            return json;
        })
        .catch( err => {
            console.log('WAS AN ERROR',err);
            return err;
        });
}

function debugHeaders (h) {
    h.forEach( (val,name) => {
        console.log(name,':',val);
    });
}
