import React from 'react';

export const AnnounceContext = React.createContext({});

export default class Announcer extends React.Component {

    state = { content: '', woggle: true };

    announceText = (content) => {
        if (this.last !== content) {
            this.last = content;
            this.setState({ content, woggle: !this.state.woggle });
            clearTimeout(this.RESET);
            this.RESET = setTimeout(() => {
                this.setState({ content: '' });
            }, 4000);
        }
    };

    render () {
        const { content, woggle } = this.state;
        console.log('Announce[', content, ']');
        return (
            <AnnounceContext.Provider value={this}>
                {this.props.children}
                <div>
                    <span
                        aria-live="assertive"
                    >
                        {woggle ? content : '[  ]'}
                    </span>
                    <span
                        aria-live="assertive"
                    >
                    {!woggle ? content : '[  ]'}
                </span>
                </div>
            </AnnounceContext.Provider>
        );
    }
}
