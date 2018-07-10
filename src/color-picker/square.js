import React from 'react';
import {toHex} from "../common/color";

export class Square extends React.Component {

    render() {
        const {clicked, color, onClick} = this.props;

        return (
            <div
                className="square"
                onClick={onClick}
            >
                <div
                    className="square-background"
                />

                <div
                    className="square-color"
                    style={{
                        border: clicked ? "2px solid black" : "",
                        background: `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`
                    }}
                />

            </div>
        );
    }
}