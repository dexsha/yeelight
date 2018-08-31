import { IDevice } from "./models/device";
import { ColorMode, DeviceStatus } from "./models/enums";
/**
 * Parse the raw socket message to the device information
 * @param {string} message raw HTTP message read from socket when discover the light
 * @returns {IDevice} device info 
 */
export function parseDeviceInfo(message: string): IDevice {

    // Not found the device
    if (message.indexOf("HTTP/1.1 200 OK") < 0) {
        return null;
    }
    const getString = (key: string, defaultValue: string = "") => {
        const regex = new RegExp(`${key}: ([^\r\n]*)`);
        const m = message.match(regex);
        if (m && m.length > 0) {
            return m[1];
        }
        return defaultValue;
    };
    const device: Partial<IDevice> = {};
    device.location = getString("Location");
    device.id = getString("id");
    device.model = getString("model");
    device.version = getString("fw_ver");
    device.capabilities = getString("support").split(" ");
    device.status = getString("power") as DeviceStatus;
    device.bright = parseInt(getString("bright", "0"), 10);
    device.hue = parseInt(getString("hue", "0"), 10);
    device.rgb = parseInt(getString("rgb", "0"), 10);
    device.sat = parseInt(getString("sat", "0"), 10);
    device.hue = parseInt(getString("hue", "0"), 10);
    device.mode = parseInt(getString("color_mode", "0"), 10) as ColorMode;

    const host = device.location.substr(11);
    device.port = parseInt(host.split(":")[1], 10);
    device.host = host.split(":")[0];
    return device as IDevice;
}
export function hexToNumber(hex: string) {
    const hexString = hex.toUpperCase();
    let result = 0;
    for (let i = 1; i <= hexString.length; i++) {
        let valueNumber = hexString.charCodeAt(i - 1);
        valueNumber -= (valueNumber >= 65) ? 55 : 48;
        result += valueNumber * Math.pow(16, hex.length - i);
    }
    return result;
}

export const Utils = {
    hexToNumber,
    parseDeviceInfo,
};