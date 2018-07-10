import React from 'react';
import ReactDOM from "react-dom";
import './color-picker.scss';
import {toHex, applyColorModel} from "../common/color";
import {observeMouseDrag} from "../common/observeMouseDrag";

class ColorModelPicker extends React.Component {

    componentDidMount() {

        let dom = ReactDOM.findDOMNode(this);
        observeMouseDrag(dom, {
            onChange: (newPos) => {
                let rect = dom.getBoundingClientRect();
                let newValue = Math.max(Math.min(newPos.x, rect.width-1) / rect.width, 0);

                this.props.onChange(newValue);
            },
        });
    }

    render() {
        const colorModel = this.props.colorModel;

        return (
            <div className="color-model-picker" >
                <div
                    className="circle"
                    style={{
                        left: `calc(${colorModel*100}% - 12px)`,
                        background: toHex(applyColorModel(colorModel))
                    }}
                />
            </div>
        );
    }
}

export {ColorModelPicker}