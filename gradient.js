const chalk = require('chalk');
const gradient = require('gradient-color').default;

/**
 * 
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @returns {string}
 */
function rgbtotext(r , g , b) {
    return `rgb(${r}, ${g}, ${b})`
}
/**
 * @param {string} str
 * @returns {number}
 */
function findcols(str) {
    const rows = str.split('\n');
    var maxcols;
    maxcols = 1
    for (var i = 0; i < rows.length; i++) {
        const cr = rows[i].split('');
        if (cr.length > maxcols) maxcols = cr.length;
    }
    return maxcols
}
/**
 * 
 * @param {string} text 
 * @returns {number[]}
 */
function rgbfromtext(text) {
    var rgb = text.replace('rgb(','').replace(')','').split(', ')// ${r}, ${g}, ${b}
    var arr = [];
    for (var i = 0 ; i < rgb.length; i++) {
        arr.push(rgb[i]*1);
    }
    return arr;
}
/**
 * 
 * @param {string} text 
 * @param {number[]} c1 
 * @param {number[]} c2 
 * @returns {string}
 */

module.exports.lefttoright = function(text , c1 , c2) {
    var rows = text.split('\n');
    var cols = findcols(text);//columns
    var colors = gradient([rgbtotext(...c1) , rgbtotext(...c2)],cols);
    var clrs = [];
    for (var i = 0; i < colors.length; i++) {
        clrs.push(rgbfromtext(colors[i]))
    }
    for (var i = 0; i < rows.length; i++) {

        for (var a = 0; a < rows[i].split('').length; a++) {
            process.stdout.write(chalk.rgb(...clrs[i]).inverse(rows[i].split('')[a]))
        }
        process.stdout.write('\n')
    }
}
/**
 * 
 * @param {string} text 
 * @param {number[]} c1 
 * @param {number[]} c2 
 * @returns {string}
 */

module.exports.uptodown = function(text , c1 , c2) {
    const lines = text.split('\n').length;
    var colors = gradient([rgbtotext(...c1) , rgbtotext(...c2)], lines);
    console.log(colors)
    var clrs = [];
    for (var i = 0; i < colors.length; i++) {
        clrs.push(rgbfromtext(colors[i]))
    }
    console.log(clrs)
    for (var i = 0; i < clrs.length; i++) {
        console.log(chalk.rgb(...clrs[i]).bold(text.split('\n')[i]))
        
    }
}
module.exports.rgbfromtext = rgbfromtext;
module.exports.rgbtotext = rgbtotext;