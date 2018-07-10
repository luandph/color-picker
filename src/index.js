import React from 'react';
import ReactDOM from 'react-dom';
import './color-picker/color-picker.scss';
import {ColorPicker} from "./color-picker/colorPicker";
import {Square} from "./color-picker/square"
import {toHex} from "./common/color"
import {AlphaPicker} from "./color-picker/alpha-picker";

class Test extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            colors: [
                {
                    red: 0,
                    green: 255,
                    blue: 255,
                    alpha: 1,
                },
                {
                    red: 200,
                    green: 55,
                    blue: 25,
                    alpha: 1,
                },
            ],
            selecting: 0,
        };
    }

    render() {
        const {colors, selecting} = this.state;

        return (
            <div>
                <div className="gradient">
                    <div
                        className="gradient-background"
                    />

                    <div
                        className="gradient-color"
                        style={{
                            background: `linear-gradient(to right,
                                rgba(${colors[0].red}, ${colors[0].green}, ${colors[0].blue}, ${colors[0].alpha}),
                                rgba(${colors[1].red}, ${colors[1].green}, ${colors[1].blue}, ${colors[1].alpha})`
                        }}
                    />
                </div>

                <div>
                    {colors.map((color, i) => (
                        <Square
                            key={i}
                            className="square"
                            color={color}
                            clicked={selecting === i}
                            onClick={() => this.setState({selecting: i})}
                        />
                    ))}
                </div>

                <ColorPicker
                    color={colors[selecting]}
                    onChange={(newColor) => this.setState({colors: colors.map((c, i) => i !== selecting ? c : newColor)})}
                />

            </div>
        )
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById('root')
);
