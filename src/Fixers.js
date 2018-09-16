
// IE 11 rubbish

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(search, this_len) {    // eslint-disable-line
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
    };
}

