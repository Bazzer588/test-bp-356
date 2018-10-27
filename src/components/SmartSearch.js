import React from "react";
import {onLinkKey} from "./PhoneInput";
import {getOptionList, getOptionDescriptions} from './AppConfig';

export const searchTypeField = (name,props) => { return { name, component: SmartSearch, validator: () => {}, ...props } };

export class SmartSearch extends React.Component {

    constructor (props) {
        super(props);
        this.state = { search: '' };
    }

    docClick = () => {
        console.log('DOC CLICK');
        if (this.ignoreClick) {
            this.ignoreClick = false;
            return;
        }
        this.setState({ pop: false });
        document.removeEventListener('click',this.docClick);
    };

    onClick = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        this.ignoreClick = true;
    };

    onChange = (ev) => {
        this.setState({ search: ev.target.value });
        doSearch(this,ev.target.value);
    };

    onFocus = () => {
        this.setState({ pop: true });
        document.addEventListener('click',this.docClick);
    };

    onKeyDown = (ev) => {
        if (ev.key==='ArrowDown' || ev.key==='ArrowUp') {
            ev.preventDefault();
            ev.stopPropagation();
            console.log('TRAP '+ev.key);
        }
    };

    choose = (code, text) => {
        this.setState({ chosen: text });
    };

    renderResults (results,search) {
        const out = [];
        const map = getOptionDescriptions('country');
        results.forEach( code => {
            const text = map[code];
            out.push(
                <button className="list-item" key={code} onClick={() => this.choose(code,text)} onKeyDown={onLinkKey} type="button">
                    {code} {text}
                </button>
            );
        });
        if (!out.length) {
            out.push(<button className="list-item" key="N/A" disabled>No match for '{search}'</button>);
        }
        return out;
    }

    render () {
        const {id} = this.props;
        const { chosen, search, pop, results = [] } = this.state;
        const text = (pop ? search : chosen) || search;
        return (
            <div className="phone-input">
                <input
                    id={id}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    onFocus={this.onFocus}
                    onKeyDown={this.onKeyDown}
                    value={text}
                />
                {pop &&
                <div className="telpopup" onClick={() => this.setState({ pop: false })}>
                    {this.renderResults(results,search)}
                </div>
                }
            </div>
        );
    };

}

function doSearch (thing, t) {
    if (!t) {
        thing.setState({ results: getOptionList('countryDefaults') });
        return;
    }
    t = t.toLowerCase();
    const list = getOptionList('country');
    const map = getOptionDescriptions('country');
    const out = [];
    for (let n=0; n<list.length; n++) {
        const code = list[n];
        const text = map[code].toLowerCase();
        if (text.startsWith(t)) {
            out.push(code);
            if (out.length>=10) break;
        }
    }
    // try codes
    if (out.length<10) {
        for (let n=0; n<list.length; n++) {
            const code = list[n];
            if (out.indexOf(code)<0 && code.toLowerCase().startsWith(t)) {
                out.push(code);
                if (out.length>=10) break;
            }
        }
    }
    // try sub words
    if (out.length<10) {
        for (let n=0; n<list.length; n++) {
            const code = list[n];
            const text = map[code].toLowerCase();
            if (out.indexOf(code)<0 && text.indexOf(t)>0) {
                out.push(code);
                if (out.length>=10) break;
            }
        }
    }
    // done
    thing.setState({ results: out });
}
