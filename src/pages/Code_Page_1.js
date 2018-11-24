import React from 'react';
import {NavLinks} from "../sections/NavLinks";
import {useBasePage, ModalPopup} from "./BasePage";
import FormConnect from "../FormConnect";
import FormSection from "../FormSection";
import Button from "../components/Button";
import Loader from "../components/Loader";
import LazyPopup from '../components/LazyPopup';


function importPopSectionForm () {
    return import ('../sections/PopSectionForm' /* webpackChunkName: "POP_1" */);
}

class Code_Page_1 extends React.Component {

    openPop = () => {
        LazyPopup({
            loader: () => import ('../sections/PopSectionForm' /* webpackChunkName: "POP_1" */),
            page: this.props.page,
            owner: this
        });
    };

    render () {
        const { page } = this.props;
        return (
            <>
                <header className="App-header">
                    <NavLinks/>
                    <h1 className="App-title">
                        Code split page 1
                    </h1>
                </header>

                <form>

                <h2>
                    Web Site Terms and Conditions of Use
                </h2>

                <h3>
                    1. Terms
                </h3>

                <p>
                    By accessing this web site, you are agreeing to be bound by these
                    web site Terms and Conditions of Use, all applicable laws and regulations,
                    and agree that you are responsible for compliance with any applicable local
                    laws. If you do not agree with any of these terms, you are prohibited from
                    using or accessing this site. The materials contained in this web site are
                    protected by applicable copyright and trade mark law.
                </p>

                <h3>
                    2. Use License
                </h3>

                <ol type="a">
                    <li>
                        Permission is granted to temporarily download one copy of the materials
                        (information or software) on Zlobod VK's web site for personal,
                        non-commercial transitory viewing only. This is the grant of a license,
                        not a transfer of title, and under this license you may not:

                        <ol type="i">
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>attempt to decompile or reverse engineer any software contained on Zlobod VK's web site;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ol>
                    </li>
                    <li>
                        This license shall automatically terminate if you violate any of these restrictions and may be terminated by Zlobod VK at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                    </li>
                </ol>

                <h3>
                    3. Disclaimer
                </h3>

                <ol type="a">
                    <li>
                        The materials on Zlobod VK's web site are provided "as is". Zlobod VK makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Zlobod VK does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.
                    </li>
                </ol>

                <h3>
                    4. Limitations
                </h3>

                <p>
                    In no event shall Zlobod VK or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on Zlobod VK's Internet site, even if Zlobod VK or a Zlobod VK authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </p>

                <h3>
                    5. Revisions and Errata
                </h3>

                <p>
                    The materials appearing on Zlobod VK's web site could include technical, typographical, or photographic errors. Zlobod VK does not warrant that any of the materials on its web site are accurate, complete, or current. Zlobod VK may make changes to the materials contained on its web site at any time without notice. Zlobod VK does not, however, make any commitment to update the materials.
                </p>

                <h3>
                    6. Links
                </h3>

                <p>
                    Zlobod VK has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Zlobod VK of the site. Use of any such linked web site is at the user's own risk.
                </p>

                <h3>
                    7. Site Terms of Use Modifications
                </h3>

                <p>
                    Zlobod VK may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
                </p>

                <h3>
                    8. Governing Law
                </h3>

                <p>
                    Any claim relating to Zlobod VK's web site shall be governed by the laws of the State of United Kingron without regard to its conflict of law provisions.
                </p>

                <p>
                    General Terms and Conditions applicable to Use of a Web Site.
                </p>



                <h2>
                    Privacy Policy
                </h2>

                <p>
                    Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
                </p>

                <ul>
                    <li>
                        Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.
                    </li>
                    <li>
                        We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.
                    </li>
                    <li>
                        We will only retain personal information as long as necessary for the fulfillment of those purposes.
                    </li>
                    <li>
                        We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.
                    </li>
                    <li>
                        Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.
                    </li>
                    <li>
                        We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
                    </li>
                    <li>
                        We will make readily available to customers information about our policies and practices relating to the management of personal information.
                    </li>
                </ul>

                <p>
                    We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.
                </p>

                </form>

                <p>Want to see this in another language?</p>
                <Button onClick={() => openPop(page,this)} cnm="secondary">Yes I do!</Button>
                <Button onClick={this.openPop} cnm="primary">Show popup</Button>
                <p>&nbsp;</p>
            </>
        );
    }
}

export default useBasePage( FormConnect( FormSection(Code_Page_1) ) );

// text from
// https://www.bennadel.com/coldfusion/privacy-policy-generator.htm

let PopContent;

function openPop (page,owner,popupProps) {

    //if (PopContent) {
    //    page.setPopupComp(PopContent,owner);
    //    return;
    //}

    let wasClosed;

    setTimeout( () => {
        importPopSectionForm()
            .then( (module) => {
                PopContent = module.default;
                if (!wasClosed)
                    page.setPopupComp(PopContent,owner,popupProps);
            })
            .catch( (e) => {
                console.log(e,JSON.stringify(e));
                page.setPopupComp(() => {
                    return (
                        <ModalPopup page={page} title="Popup loading error">
                            <p>There was an error loading the popup</p>
                        </ModalPopup>
                    );
                });
            });
    }, 2000 );

    page.setPopupComp(() => {
        return (
            <ModalPopup page={page} title="Dynamic popup" onClose={() => wasClosed = true}>
                <Loader block text={'Loading popup content'}/>
            </ModalPopup>
        );
    });

}
