import React from 'react';
import ReactDOM from 'react-dom';
import './color-picker.scss';
import {applyColor, applyBrightness, applyTemperature, toHex, applyColorModel} from "../common/color";
import {observeMouseDrag} from "../common/observeMouseDrag";


class TemperatureBrightnessPicker extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            zbt: 1,
        };
    }

    componentDidMount() {

        const limit = (v, min, max) =>
            Math.max(min, Math.min(max, v))
        ;

        observeMouseDrag(ReactDOM.findDOMNode(this), {
            onChange: (newValue) => {
                const temperature = limit(newValue.x / 500   , 0, 1);
                const brightness = limit(1 - newValue.y / 256, 0, 1);

                if (temperature !== this.state.zbt) {
                    this.setState({zbt: temperature});
                }

                this.props.onChange({temperature, brightness});
            },
        });

        this.redraw();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.colorModel !== this.props.colorModel) {
            this.redraw();
        }
    }

    redraw() {
        const canvas = ReactDOM.findDOMNode(this).firstChild;
        const ctx = canvas.getContext("2d", {alpha: false});

        const imageData = ctx.getImageData(0, 0, 500, 256);
        const data = imageData.data;

        const mColor = applyColorModel(this.props.colorModel);

        for (let y = 0; y < 256; y++) {
            const brightness = 1 - y / 256;

            for (let x = 500 - 1; x > -1; x--) {

                const temperature = x / 500;

                let color = applyBrightness(applyTemperature(mColor, temperature), brightness);

                let index = (y * 500 + x) * 4;
                data[index] = color.red;
                data[++index] = color.green;
                data[++index] = color.blue;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    render() {
        let {value: {temperature, brightness}, colorModel} = this.props;

        if (brightness === 0) {
            temperature = this.state.zbt;
        }

        return(
            <div className="temperature-brightness-picker">

                <canvas
                    className="canvas"
                    width={500} height={256}
                />

                <div
                    className="circle"
                    style={{
                        background: toHex(
                            applyColor({temperature, brightness, colorModel})
                        ),
                        top: (1 - brightness) * 256 - 12,
                        left: temperature * 500 - 12,
                    }}
                />

            </div>
        )
    }
}

export {TemperatureBrightnessPicker}