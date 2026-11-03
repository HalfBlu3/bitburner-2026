/** @param {NS} ns */
const color = {
  black: "[30m",
  red: "[31m",
  green: "[32m",
  yellow: "[33m",
  blue: "[34m",
  magenta: "[35m",
  cyan: "[36m",
  white: "[37m",
  brightBlack: "[30;1m",
  brightRed: "[31;1m",
  brightGreen: "[32;1m",
  brightYellow: "[33;1m",
  brightBlue: "[34;1m",
  brightMagenta: "[35;1m",
  brightCyan: "[36;1m",
  brightWhite: "[37;1m",
  reset: "[0m"
}

export function black() {return `${color["black"]}`;}
export function red() {return `${color["red"]}`;}
export function green() {return `${color["green"]}`;}
export function yellow() {return `${color["yellow"]}`;}
export function blue() {return `${color["blue"]}`;}
export function magenta() {return `${color["magenta"]}`;}
export function cyan() {return `${color["cyan"]}`;}
export function white() {return `${color["white"]}`;}
export function brightBlack() {return `${color["brightBlack"]}`;}
export function brightRed() {return `${color["brightRed"]}`;}
export function brightGreen() {return `${color["brightGreen"]}`;}
export function brightYellow() {return `${color["brightYellow"]}`;}
export function brightBlue() {return `${color["brightBlue"]}`;}
export function brightMagenta() {return `${color["brightMagenta"]}`;}
export function brightCyan() {return `${color["brightCyan"]}`;}
export function brightWhite() {return `${color["brightWhite"]}`;}
export function reset() {return `${color["reset"]}`;}
export function getColors(){return color;}
export function getColorList() {return ["black","red","green","yellow","blue","magenta","cyan","white","brightBlack","brightRed","brightGreen","brightYellow","brightBlue","brightMagenta","brightCyan","brightWhite","reset"];}