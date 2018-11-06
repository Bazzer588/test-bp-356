import React from "react";
import {onLinkKey} from "./PhoneInput";
import {getOptionList, getOptionDescriptions} from './AppConfig';
import validateString from "../validation/validateString";

export const searchTypeField = (name,props) => { return { name, component: SmartSearch, validator: validateString, ...props } };

export class SmartSearch extends React.Component {

    constructor (props) {
        super(props);
        this.state = { search: '', pick: -1 };
    }

    docClick = () => {
        console.log('DOC CLICK',this.ignoreClick);
        if (this.ignoreClick) {
            this.ignoreClick = false;
            return;
        }
        this.setState({ pop: false });
        document.removeEventListener('click',this.docClick);
    };

    onBlur = () => {  // hide popup when input blurs
        setTimeout( this.docClick, 250 );
    };

    onClick = (ev) => {
        if (this.state.pop) {
            this.ignoreClick = true;
        }
        this.openPop();
        ev.stopPropagation();
        ev.preventDefault();
    };

    onChange = (ev) => {
        this.openPop();
        this.setState({ search: ev.target.value });
        doSearch(this,ev.target.value);
    };

    openPop = () => {
        if (!this.state.pop) {
            this.setState({pop: true});
            document.addEventListener('click', this.docClick);
        }
    };

    onKeyDown = (ev) => {
        console.log('TRAP '+ev.key,this.state.pick);
        let d = 0;
        if (ev.key==='ArrowDown') d = 1;
        else if (ev.key==='ArrowUp') d = -1;
        if (d) {
            ev.preventDefault();
            ev.stopPropagation();
            if (this.state.results) {
                const last = this.state.results.length-1;
                let pick = this.state.pick + d;
                if (pick<0) pick = 0;
                if (pick>last) pick = last;
                this.setState({ pick });
                setTimeout(()=>{
                    const it = document.getElementById('woot888');
                    if (it) {
                        const pp = it.parentNode.scrollTop;
                        console.log(it.getBoundingClientRect(), pp);
                        if (d === -1)
                            it.parentNode.scrollTop = (pick * 40);
                    }
                },25);
            }
        }
        if (ev.key==='Enter') {
            const { pick, results, pop } = this.state;
            if (!pop) {
                this.openPop();
            } else if (pick>=0) {
                const code = results[pick];
                const map = getOptionDescriptions('country');
                this.choose(code,map[code]);
                this.docClick(); // hide pop
            }
        }
        if (ev.key==='Escape') {
            this.docClick(); // hide pop
        }
    };

    choose = (code, text) => {
        console.log('CHOSEN',code,text);
        this.props.onChange({ target: { value: code } });
        this.setState({ chosen: text });
        document.getElementById(this.props.id).focus();
    };

    renderItem (out, code, index, pick, map) {
        const text = map[code];
        out.push(
            <button
                className={pick===index ? 'list-item checked' : 'list-item'}
                id={pick===index ? 'woot888' : undefined}
                key={code}
                onClick={() => this.choose(code,text)}
                onKeyDown={onLinkKey}
                tabIndex="-1"
                type="button"
            >
                {code} {text}
            </button>
        );
    }

    renderResults (value,results,search) {
        if (!results || !results.length)
            results = getOptionList('countryDefaults');
        const out = [];
        const map = getOptionDescriptions('country');
        const { pick } = this.state;
        if (value && results.indexOf(value)<0) {
            this.renderItem(out,value,-1,-1,map);
        }
        results.forEach( (code,index) => {
            this.renderItem(out,code,index,pick,map);
        });
        if (!out.length) {
            out.push(<button className="list-item" key="N/A" disabled>No match for '{search}'</button>);
        }
        return out;
    }

    render () {
        const { id, value } = this.props;
        const { chosen, search, pop, results = [] } = this.state;
        let theText = chosen;
        if (value) {
            const map = getOptionDescriptions('country');
            theText = map[value];
        }
        const text = (pop ? search : theText) || search;
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
                    {this.renderResults(value,results,search)}
                </div>
                }
            </div>
        );
    };

}

function doSearch (thing, t) {
    if (!t) {
        thing.setState({ results: getOptionList('countryDefaults'), pick: -1 });
        return;
    }
    t = t.toLowerCase();
    const list = getOptionList('country');
    const map = getOptionDescriptions('country');
    const out = [];
    for (let n=0; n<list.length; n++) {
        const code = list[n];
        const text = norm(map[code]);
        if (text.startsWith(t)) {
            out.push(code);
            if (out.length>=MAX) break;
        }
    }
    // try codes
    if (out.length<MAX) {
        for (let n=0; n<list.length; n++) {
            const code = list[n];
            if (out.indexOf(code)<0 && code.toLowerCase().startsWith(t)) {
                out.push(code);
                if (out.length>=MAX) break;
            }
        }
        // try sub words
        if (out.length<MAX) {
            for (let n=0; n<list.length; n++) {
                const code = list[n];
                const text = norm(map[code]);
                if (out.indexOf(code)<0 && text.indexOf(t)>0) {
                    out.push(code);
                    if (out.length>=MAX) break;
                }
            }
        }
    }
    // done
    thing.setState({ results: out, pick: -1 });
}

function norm (t) {
    t = t.toLowerCase();
    t = t.replace('ö','o');
    t = t.replace('ü','u');
    t = t.replace('ä','a');
    return t;
}

const MAX = 16;
