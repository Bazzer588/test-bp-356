
// IE 11 rubbish

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(search, this_len) {    // eslint-disable-line
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(search, pos) {   // eslint-disable-line
        return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    };
}

if (!Array.prototype.find) {
    Array.prototype.find = function( fn ) {  // eslint-disable-line
        const len = this.length;
        for (let n=0;n<len;n++) {
            if (fn(this[n])) {
                return this[n];
            }
        }
    }
}

// fix scrollintoview
// https://github.com/iamdustan/smoothscroll
