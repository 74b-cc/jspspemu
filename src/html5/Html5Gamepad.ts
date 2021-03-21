//import { Emulator } from '../emulator';
import {PspControllerContributor, PspCtrlButtons, SceCtrlData} from '../core/controller';
import {Component} from "../core/component";
import {BitUtils, MathUtils} from "../global/math";

const navigator = (typeof window != 'undefined') ? window.navigator : null;
const getGamepads: (() => Gamepad[]|null)|null = (navigator && navigator.getGamepads) ? navigator.getGamepads.bind(navigator) : null;

const gamepadButtonMapping = [
    PspCtrlButtons.cross, // 0
    PspCtrlButtons.circle, // 1
    PspCtrlButtons.square, // 2
    PspCtrlButtons.triangle, // 3
    PspCtrlButtons.leftTrigger, // 4
    PspCtrlButtons.rightTrigger, // 5
    PspCtrlButtons.volumeUp, // 6
    PspCtrlButtons.volumeDown, // 7
    PspCtrlButtons.select, // 8
    PspCtrlButtons.start, // 9
    PspCtrlButtons.home, // 10 - L3
    PspCtrlButtons.note, // 11 - L3
    PspCtrlButtons.up, // 12
    PspCtrlButtons.down, // 13
    PspCtrlButtons.left, // 14
    PspCtrlButtons.right, // 15
];

export class Html5Gamepad extends PspControllerContributor {
    private checkButton(button: any): boolean {
        if (typeof button == 'number') {
            return button != 0;
        } else {
            return button ? button.pressed : false;
        }
    }

    computeFrame() {
        if (!getGamepads) return undefined
        const gamepads = getGamepads()!
        const firstGamePad = gamepads[0]
        if (!firstGamePad) return undefined
        const buttons = firstGamePad.buttons
        const axes = firstGamePad.axes
        this.data.x = axes[0]
        this.data.y = axes[1]
        this.data.buttons = PspCtrlButtons.none
        for (let n = 0; n < 16; n++) {
            this.data.buttons = BitUtils.withMask(this.data.buttons, gamepadButtonMapping[n], this.checkButton(buttons[n]))
        }
    }

    register() {
    }

    unregister() {
    }
}
