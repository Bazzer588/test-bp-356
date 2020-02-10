import React from 'react';
import { AnnounceContext } from './Announcer';
import Button from './Button';

const COUNT = 23;

export default class AnnouncerCountdown extends React.Component {

    state = {};

    getAlert (seconds) {
        if (seconds <= 5) {
            return String(seconds)
        } else if (seconds <= 15) {
            seconds = Math.min(Math.ceil(seconds / 5) * 5, COUNT);
        } else if (seconds <= 0) {
            return 'Complete'
        } else {
            seconds = Math.min(Math.ceil(seconds / 10) * 10, COUNT);
        }
        return seconds + ' seconds remaining';
    }

    setCountdown (ms) {
        const seconds = Math.round(ms / 1000);
        const { announceText } = this.context;
        if (announceText) {
            announceText(this.getAlert(seconds));
        }
        this.setState({ seconds });
        if (seconds <= 0) this.stopCountdown();
    }

    startCountdown = () => {
        const start = Date.now();
        this.setCountdown(COUNT * 1000);
        clearInterval(this.countdown);
        this.countdown = setInterval(() => {
            this.setCountdown(start + (COUNT * 1000) - Date.now());
        }, 1000);
    };

    stopCountdown = () => {
        clearInterval(this.countdown);
    };

    render () {
        const { seconds } = this.state;
        return (
            <>
                <p>{seconds} seconds to go</p>
                <Button onClick={this.startCountdown}>Start</Button>
                <Button onClick={this.stopCountdown}>Stop</Button>
            </>
        );
    }
}

AnnouncerCountdown.contextType = AnnounceContext;
