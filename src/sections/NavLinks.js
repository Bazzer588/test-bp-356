import React from "react";
import PageRouter from "../components/PageRouter";
import {ModalPopup} from "../pages/BasePage";
import Select from "../components/Select";
import {justConnect} from "../FormConnect";
import Loader from "../components/Loader";
import {changeLang} from "../languages";
import IconLang from "../pages/IconLang";
import {translate} from "../components/AppConfig";

class NavLinks extends React.PureComponent {

    docClick = () => {
        console.log('DOC CLICK');
        this.setState({ pop: false });
        document.removeEventListener('click',this.docClick);
    };

    link = (path) => {
        this.setState({ pop: false });
        document.removeEventListener('click',this.docClick);
        setTimeout( () => {
            PageRouter.changePage(path);
        }, 25 );
    };

    btn = () => {
        const state = this.state || {};
        this.setState({ pop: !state.pop });
        if (!state.pop) {
            document.addEventListener('click',this.docClick);
        }
    };

    getPage () {
        if (this.props.page)
            return this.props.page;
        if (this.props.owner && this.props.owner.getBasePage)
            return this.props.owner.getBasePage();
    }

    setLang (lang) {
        const page = this.getPage();
        page.fadeOutPopup();
        // console.log('SET LANG', lang, this.props.updateRedux, this.props.coreData );
        page.setLoader( () => <Loader text="Loading the selected language..." /> );
        changeLang(lang,page, () => this.props.updateRedux({type: 'CORE', data: { lang } }) );
    }

    pickLang = () => {
        this.docClick();
        const page = this.getPage();
        if (page) {
            const lang = this.props.coreData.lang;
            page.setPopupComp(LangPop,this,{ lang });
        }
    };

    render () {
        const pop = this.state && this.state.pop;
        return (
            <div className="phone-input" style={{ position: 'absolute', right: '12px', top: '20px' }}>
                <button onClick={this.pickLang} className="btn btn-secondary btn-mini" type="button" style={{ padding: '3px 4px' }}>
                    <IconLang width={20} height={20} fill="#ccc" />
                </button>
                <button onClick={this.btn} className="btn btn-secondary btn-mini" type="button" style={{ padding: '0 6px' }}>&#9776;</button>
                {pop &&
                    <div className="telpopup" style={{ right: '0px', top: '30px', maxHeight: '990px', borderColor: '#777' }}>
                        <button className="list-item" onClick={() => this.link('/tax-app/home')}>{translate('Home Page')}</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/search')}>{translate('Search')}</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/checkout')}>{translate('Checkout')}</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/application')}>{translate('Application Demo')}</button>
                        <hr role="presentation"/>
                        <button className="list-item" onClick={this.pickLang}>{translate('Change Language')}</button>
                        <hr role="presentation"/>
                        <button className="list-item" onClick={() => this.link('/tax-app/payment/837463')}>Order 1</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/payment/716226')}>Order 2</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/repeat')}>Repeat</button>
                        <hr role="presentation"/>
                        <button className="list-item" onClick={() => this.link('/tax-app/deals')}>Deals</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/another')}>Another Page</button>
                        <hr role="presentation"/>
                        <button className="list-item" onClick={() => this.link('/tax-app/code-split')}>Code Split 1</button>
                        <button className="list-item" onClick={() => this.link('/tax-app/code-split2')}>Code Split 2</button>
                    </div>
                }
            </div>
        );
    }
}

export default justConnect(NavLinks);

/** a popup */

function LangPop ({ page, owner, lang }) {

    let mod = lang;

    const chg = (ev) => {
        mod = ev.target.value;
    };

    return (
        <ModalPopup
            continueAction={() => owner.setLang(mod)}
            title={translate("Change Language")}
            page={page}
        >
            <p>{translate('Select your language')}</p>
            <Select options="languages" onChange={chg} defaultValue={lang} required />
        </ModalPopup>
    );
}
