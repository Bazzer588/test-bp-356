import React from 'react';
import {NavLinks} from "../sections/NavLinks";
import {useBasePage} from "./BasePage";
import FormConnect from "../FormConnect";
import FormSection from "../FormSection";

class Code_Page_2 extends React.Component {

    render () {
        return (
            <>
                <header className="App-header">
                    <NavLinks/>
                    <h1 className="App-title">
                        条款和条件
                    </h1>
                </header>

                <form>
                    <h2>网站使用条款和条件</h2><h3>1.条款</h3><p>访问本网站，即表示您同意遵守这些网站使用条款和条件，所有适用法律和法规，并同意您有责任遵守任何适用的当地法律。如果您不同意这些条款，则禁止您使用或访问本网站。本网站包含的材料受适用的版权和商标法保护。</p><h3>2.使用许可证</h3><ol type="a"><li>允许在Zlobod VK的网站上临时下载一份材料（信息或软件），仅用于个人非商业短暂观看。这是授予许可，而不是转让所有权，根据本许可，您不得：<ol type="i"><li>修改或复制材料;</li><li>将这些材料用于任何商业目的，或用于任何公共展示（商业或非商业）;</li><li>尝试对Zlobod VK网站上包含的任何软件进行反编译或反向工程;</li><li>从材料中删除任何版权或其他专有注释; 要么</li><li>将材料转移给另一个人或“镜像”任何其他服务器上的材料。</li></ol></li><li>如果您违反任何这些限制，本许可将自动终止，并可能随时被Zlobod VK终止。在终止您查看这些材料或终止本许可后，您必须销毁您拥有的任何下载材料，无论是电子格式还是印刷格式。</li></ol><h3>3.免责声明</h3><ol type="a"><li>Zlobod VK网站上的资料“按原样”提供。Zlobod VK不做任何明示或暗示的保证，特此声明并否认所有其他保证，包括但不限于适销性，适用于特定用途或不侵犯知识产权或其他侵权行为的暗示保证或条件。此外，Zlobod VK不保证或就其在互联网网站上使用这些材料的准确性，可能的结果或可靠性或与此类材料或与本网站链接的任何网站有关的任何陈述。</li></ol><h3>4.限制</h3><p>在任何情况下，Zlobod VK或其供应商均不对因使用或无法在Zlobod VK的互联网上使用这些材料而导致的任何损害（包括但不限于因数据或利润损失或由于业务中断造成的损害）承担责任。即使Zlobod VK或Zlobod VK授权代表已经口头或书面通知可能存在此类损害，也请立即通知。由于某些司法管辖区不允许对隐含担保或对间接或附带损害的责任限制进行限制，因此这些限制可能对您不适用。</p><h3>5.修订和勘误表</h3><p>Zlobod VK网站上出现的资料可能包括技术，印刷或照片错误。Zlobod VK不保证其网站上的任何材料准确，完整或最新。Zlobod VK可能随时更改其网站上的材料，恕不另行通知。但是，Zlobod VK不承诺更新材料。</p><h3>6.链接</h3><p>Zlobod VK没有审查与其互联网网站链接的所有网站，也不对任何此类链接网站的内容负责。包含任何链接并不意味着Zlobod VK对该网站的认可。使用任何此类链接的网站的风险由用户自行承担。</p><h3>7.网站使用条款修改</h3><p>Zlobod VK可随时修改其网站的使用条款，恕不另行通知。使用本网站即表示您同意遵守当前版本的本使用条款和条件。</p><h3>8.适用法律</h3><p>与Zlobod VK网站有关的任何索赔均受美国联合王国法律的管辖，不考虑其法律冲突规定。</p><p>适用于网站的一般条款和条件。</p><h2>隐私政策</h2><p>您的隐私对我们非常重要。因此，我们制定了本政策，以便您了解我们如何收集，使用，交流，披露和利用个人信息。下面简单介绍一下我们的隐私政策。</p><ul><li>在收集个人信息之前或之时，我们将确定收集信息的目的。</li><li>我们将仅为了达到我们指定的目的和其他兼容目的而收集和使用个人信息，除非我们获得相关个人的同意或法律要求。</li><li>只要有必要，我们将保留个人信息以实现这些目的。</li><li>我们将通过合法和公平的方式收集个人信息，并在适当情况下，在相关个人的知情或同意下收集。</li><li>个人数据应与其使用目的相关，并且在必要的范围内，应准确，完整和最新。</li><li>我们将通过合理的安全保护来保护个人信息，防止丢失或被盗，以及未经授权的访问，披露，复制，使用或修改。</li><li>我们将随时向客户提供有关我们有关个人信息管理的政策和做法的信息。</li></ul><p>我们致力于按照这些原则开展业务，以确保个人信息的机密性得到保护和维护。</p>
                </form>

                <p>...</p>
            </>
        );
    }
}

export default useBasePage( FormConnect( FormSection(Code_Page_2) ) );