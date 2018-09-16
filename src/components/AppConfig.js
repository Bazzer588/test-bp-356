
let translate = (t) => {
    return t;
};

let getOptionList = () => {
    return [];
};

let getOptionDescriptions = () => {
    return {};
};

// setters

export function setTranslator (fn) {
    translate = fn;
}

export function setGetOptionList (fn) {
    getOptionList = fn;
}

export function setGetOptionDescriptions (fn) {
    getOptionDescriptions = fn;
}

// export

export { translate, getOptionList, getOptionDescriptions };
