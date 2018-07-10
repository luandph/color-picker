function hex(x) {
    const colorHex = x.toString(16);
    return (colorHex.length === 1) ? '0' + colorHex : colorHex;
}

function mix(color2, color1, ratio) {
    let red   = color1.red   * ratio + color2.red   * (1-ratio);
    let green = color1.green * ratio + color2.green * (1-ratio);
    let blue  = color1.blue  * ratio + color2.blue  * (1-ratio);
    return {red, green, blue, alpha: 1};
}

function toHex(color) {
    return `#${hex(safeFloor(color.red))}${hex(safeFloor(color.green))}${hex(safeFloor(color.blue))}`
}

function applyColor({temperature, brightness, colorModel}) {
    const mColor = applyColorModel(colorModel);
    const tColor = applyTemperature(mColor, temperature);
    const bColor = applyBrightness(tColor, brightness);
    return bColor;
}

function applyTemperature(color, temperature) {
    const temp = (v) => v + ( 255 - v  ) * ( 1 - temperature);
    return {
        red  : temp(color.red),
        green: temp(color.green),
        blue : temp(color.blue),
        alpha: color.alpha,
    };
}

function applyBrightness(color, brightness) {

    return {
        red  : color.red   * brightness,
        green: color.green * brightness,
        blue : color.blue  * brightness,
        alpha: color.alpha,
    };
}

function applyAlpha(color, alpha) {
    return {
        red  : color.red,
        green: color.green,
        blue : color.blue,
        alpha: alpha,
    };
}

function applyColorModel(colorModel) {
    if (colorModel < 1 / 6) {
        let ratio = colorModel*6;
        return mix({red: 255, green: 0, blue: 0}, {red: 255, green: 255, blue: 0}, ratio);
    } else if (colorModel < 2/6) {
        let ratio = (colorModel - 1/6)*6;
        return mix({red: 255, green: 255, blue: 0}, {red: 0, green: 255, blue: 0}, ratio);
    } else if (colorModel < 3/6) {
        let ratio = (colorModel - 2/6)*6;
        return mix({red: 0, green: 255, blue: 0}, {red: 0, green: 255, blue: 255}, ratio);
    } else if (colorModel < 4/6) {
        let ratio = (colorModel - 3/6)*6;
        return mix({red: 0, green: 255, blue: 255}, {red: 0, green: 0, blue: 255}, ratio);
    } else if (colorModel < 5/6) {
        let ratio = (colorModel - 4/6)*6;
        return mix({red: 0, green: 0, blue: 255}, {red: 255, green: 0, blue: 255}, ratio);
    } else if (colorModel < 1) {
        let ratio = (colorModel - 5/6)*6;
        return mix({red: 255, green: 0, blue: 255}, {red: 255, green: 0, blue: 0}, ratio);
    }
}

function breakColor(color, zm) {
    const {brightness, debrightenedColor} = breakBrightness(color);

    const {detemperaturizedColor, temperature} = breakTemperature(debrightenedColor);

    const colorModel = breakColorModel(detemperaturizedColor, zm);
    return {
        brightness, temperature,
        colorModel,
    };
}
function safeFloor(v) {

    const ceil = Math.ceil(v);
    if ((ceil - v) < 0.0000000001) {
        return ceil;
    }
    return Math.floor(v);
}

function breakBrightness(color) {
    let max = Math.max(color.red, color.green, color.blue);
    let brightness = max / 255;

    let debrightenedColor = {};

    // debugger;
    for (let prop in color) {
        if (prop !== "alpha") {
            debrightenedColor[prop] = brightness === 0 ? 0 : color[prop] / brightness;
        } else {
            debrightenedColor[prop] = color[prop];
        }
    }

    return {brightness, debrightenedColor};
}

function breakTemperature(color) {
    let min = Math.min(color.red, color.green, color.blue);
    let temperature = 1 - min / 255;


    if (temperature === 0) {
        return {detemperaturizedColor: color, temperature};
    }

    let detemperaturizedColor = {};

    for (let prop in color) {
        if (prop !== "alpha") {
            detemperaturizedColor[prop] = (color[prop] - 255 * (1 - temperature)) / temperature;
        } else {
            detemperaturizedColor[prop] = color[prop];
        }
    }

    return {detemperaturizedColor, temperature};
}

function closeTo(v1, v2) {
    return Math.abs(v1 - v2) < 0.00000001;
}
function breakColorModel(color, zm) {
    if (
        (color.red === 0 && color.green === 0 && color.blue === 0) ||
        (color.red === 255 && color.green === 255 && color.blue === 255)
    ) {
        return zm;
    }
    if (closeTo(color.red, 255) && closeTo(color.blue, 0)) {
        return ((color.green / 255) / 6);
    } else if (closeTo(color.green, 255) && closeTo(color.blue, 0)) {
        return ((1 - color.red / 255) / 6 + 1/6);
    } else if (closeTo(color.red, 0) && closeTo(color.green, 255)) {
        return ((color.blue / 255) / 6 + 2/6);
    } else if (closeTo(color.red, 0) && closeTo(color.blue, 255)) {
        return ((1 - color.green / 255) / 6 + 3/6);
    } else if (closeTo(color.green, 0) && closeTo(color.blue, 255)) {
        return ((color.red / 255) / 6 + 4/6);
    } else if (closeTo(color.red, 255) && closeTo(color.green, 0)) {
        return ((1 - color.blue / 255) / 6 + 5/6);
    }
}

module.exports = {
    applyColorModel,
    breakColorModel,
    toHex, applyTemperature, applyBrightness,
    breakColor,
    applyColor,
    applyAlpha,
};
