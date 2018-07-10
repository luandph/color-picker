import React from 'react'
import {applyColor, breakColor, toHex, applyAlpha} from "../common/color";
import {ColorModelPicker} from "./color-model-picker";
import {TemperatureBrightnessPicker} from "./temperature-brightness-picker";
import {SquarePickedColor} from "./square-picked-color";

import "./color-picker.scss";
import {AlphaPicker} from "./alpha-picker";

export class ColorPicker extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            zm: 0.5,
        };
    }

    render() {
        const {color, onChange} = this.props;
        const {zm} = this.state;

        const {temperature, brightness, colorModel} = breakColor(color, zm);

        if (colorModel !== zm) {
            setTimeout(() => this.setState({zm: colorModel}));
        }

        return (
            <div className="color-picker">

                <SquarePickedColor
                    color={color}
                    onChange={(typedColor) => {
                        return onChange(typedColor);
                    }}
                />

                <TemperatureBrightnessPicker
                    value={{
                        temperature,
                        brightness,
                    }}
                    colorModel={colorModel}
                    onChange={({temperature, brightness,}) => {
                        return onChange(applyColor({temperature, brightness, colorModel}));
                    }}
                />

                <ColorModelPicker
                    colorModel={colorModel}
                    onChange={(newValue) => {
                        this.setState({zm: newValue});
                        return onChange(applyColor({temperature, brightness, colorModel: newValue}));
                    }}
                />

                <AlphaPicker
                    color={color}
                    onChange={(alpha) => {
                        return onChange(applyAlpha(color, alpha));
                    }}
                />
            </div>
        );
    }
}
