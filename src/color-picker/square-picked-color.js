import React from 'react';
import {toHex} from "../common/color";

class SquarePickedColor extends React.Component {


    typedColorRGB(value) {
        let rgb = value.split(" ");
        let red = rgb[0] ? parseInt(rgb[0]) : 0;
        let green = rgb[1] ? parseInt(rgb[1]) : 0;
        let blue = rgb[2] ? parseInt(rgb[2]) : 0;
        return {red, green, blue};
    }


    render() {
        const {color, onChange} = this.props;

        return (
            <div className="square-picked-color"
                 style={{
                     background: toHex(color),
                 }}
            >
                <input
                    className="color-info1"
                    type="text"
                    value={toHex(color)}
                    style={{
                        color: "white",
                    }}
                />
                <input
                    className="color-info2"
                    type="text"
                    value={`${Math.round(this.props.color.red)} ${Math.round(this.props.color.green)} ${Math.round(this.props.color.blue)}`}
                    style={{
                        color: "white",
                    }}
                    onChange={(e) => {
                        return onChange(this.typedColorRGB(e.target.value));
                    }}
                />
            </div>
        );
    }
}

export {SquarePickedColor}