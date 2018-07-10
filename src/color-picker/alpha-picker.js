import React from 'react';
import ReactDOM from 'react-dom';
import {toHex} from '../common/color';
import {observeMouseDrag} from "../common/observeMouseDrag";

export class AlphaPicker extends React.Component {

    componentDidMount() {

        const limit = (v, min, max) =>
            Math.max(min, Math.min(max, v))
        ;

        let dom = ReactDOM.findDOMNode(this);
        observeMouseDrag(dom, {
            onChange: (newPos) => {
                let rect = dom.getBoundingClientRect();
                let newValue = limit((1 - newPos.y / rect.height), 0, 1);
                this.props.onChange(newValue);
            },
        });
    }

    render() {
        const {color} = this.props;

        return (
            <div className="alpha-picker">
                <div
                    className="alpha-picker-color"
                    style={{
                        background: `linear-gradient(to bottom,
                            rgba(${color.red}, ${color.green}, ${color.blue}, 1),
                            rgba(${color.red}, ${color.green}, ${color.blue}, 0))`
                    }}
                />
                <div className="alpha-picker-background"/>
                <div
                    className="alpha-picker-toggle"
                    style={{
                        top: `calc(${(1 - color.alpha)*100}% - 7px)`
                    }}
                />
            </div>
        );
    }
}