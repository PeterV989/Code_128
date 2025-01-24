"use strict";
const strPat = ['212222',
    '222122',
    '222221',
    '121223',
    '121322',
    '131222',
    '122213',
    '122312',
    '132212',
    '221213',
    '221312',
    '231212',
    '112232',
    '122132',
    '122231',
    '113222',
    '123122',
    '123221',
    '223211',
    '221132',
    '221231',
    '213212',
    '223112',
    '312131',
    '311222',
    '321122',
    '321221',
    '312212',
    '322112',
    '322211',
    '212123',
    '212321',
    '232121',
    '111323',
    '131123',
    '131321',
    '112313',
    '132113',
    '132311',
    '211313',
    '231113',
    '231311',
    '112133',
    '112331',
    '132131',
    '113123',
    '113321',
    '133121',
    '313121',
    '211331',
    '231131',
    '213113',
    '213311',
    '213131',
    '311123',
    '311321',
    '331121',
    '312113',
    '312311',
    '332111',
    '314111',
    '221411',
    '431111',
    '111224',
    '111422',
    '121124',
    '121421',
    '141122',
    '141221',
    '112214',
    '112412',
    '122114',
    '122411',
    '142112',
    '142211',
    '241211',
    '221114',
    '413111',
    '241112',
    '134111',
    '111242',
    '121142',
    '121241',
    '114212',
    '124112',
    '124211',
    '411212',
    '421112',
    '421211',
    '212141',
    '214121',
    '412121',
    '111143',
    '111341',
    '131141',
    '114113',
    '114311',
    '411113',
    '411311',
    '113141',
    '114131',
    '311141',
    '411131',
    '211412',
    '211214',
    '211232',
    '2331112'];
console.log('Loaded js file');
const ABSHIFT = 98;
const ABTOC = 99;
const ACTOB = 100;
const BCTOA = 101;
const STARTA = 103;
const STARTB = 104;
const STARTC = 105;
;
;
;
;
;
;
;
const StateAVar = { kind: 'A', START: STARTA, SHIFT: ABSHIFT, B: ACTOB, C: ABTOC, FNC1: 102, FNC2: 97, FNC3: 96, FNC4: 101 };
const StateBVar = { kind: 'B', START: STARTB, SHIFT: ABSHIFT, 'A': BCTOA, 'C': ABTOC, FNC1: 102, FNC2: 97, FNC3: 96, FNC4: 100 };
const StateCVar = { kind: 'C', START: STARTC, A: BCTOA, B: ACTOB, FNC1: 100 };
const StateABVar = { kind: 'AB' };
const StateAB4Var = { kind: 'AB4' };
const StateB4Var = { kind: 'B4', SHIFT: ABSHIFT, FNC4: 100 };
class StateMachine {
    constructor(InitialState) {
        switch (InitialState) {
            case 'A':
                this.CurrentState = StateAVar;
                break;
            case 'B':
                this.CurrentState = StateBVar;
                break;
            case 'C':
                this.CurrentState = StateCVar;
                break;
            case 'AB':
                this.CurrentState = StateABVar;
                break;
            case 'AB4':
                this.CurrentState = StateAB4Var;
                break;
            case 'B4':
                this.CurrentState = StateB4Var;
                break;
        }
    }
    setKind(newKind) {
        switch (newKind) {
            case 'A':
                this.CurrentState = StateAVar;
                break;
            case 'B':
                this.CurrentState = StateBVar;
                break;
            case 'C':
                this.CurrentState = StateCVar;
                break;
            case 'AB':
                this.CurrentState = StateABVar;
                break;
            case 'AB4':
                this.CurrentState = StateAB4Var;
                break;
            case 'B4':
                this.CurrentState = StateB4Var;
                break;
        }
    }
    getKind() {
        return this.CurrentState.kind;
    }
    getStart() {
        switch (this.CurrentState.kind) {
            case 'A':
            case 'B':
            case 'C':
                return this.CurrentState.START;
            default:
                throw new Error('ERROR! This state does not have a START symbol! Please examine the categorize() or classify() methods.');
        }
    }
    getSwitch(newState) {
        switch (newState) {
            case 'A':
                if ((this.CurrentState.kind === 'B') || (this.CurrentState.kind === 'C'))
                    return this.CurrentState.A;
            case 'B':
                if ((this.CurrentState.kind === 'A') || (this.CurrentState.kind === 'C'))
                    return this.CurrentState.B;
            case 'C':
                if ((this.CurrentState.kind === 'A') || (this.CurrentState.kind === 'B'))
                    return this.CurrentState.C;
        }
        throw new Error('ERROR! This state does not have a SWITCH symbol! Please examine the categorize() or classify() methods.');
    }
    getShift() {
        switch (this.CurrentState.kind) {
            case 'A':
            case 'B':
                return this.CurrentState.SHIFT;
            default:
                throw new Error("ERROR! This state does not have a SHIFT symbol! Please examine the categorize() or classify() methods.");
        }
    }
    getFNC4() {
        switch (this.CurrentState.kind) {
            case 'A':
            case 'B':
                return this.CurrentState.FNC4;
            default:
                throw new Error("ERROR! This state does not have an FNC4 symbol! Please examine the categorize() or classify() methods.");
        }
    }
    // this will switch from A, B, or C to one of the other two states
    getChangeStates(newState) {
        switch (this.CurrentState.kind) {
            case 'A':
                if (newState === 'B')
                    return this.CurrentState.B;
                else if (newState === 'C')
                    return this.CurrentState.C;
                else
                    throw new Error('ERROR! This state does not have a STATECHANGE symbol! Please examine the categorize() or classify() methods.');
            case 'B':
                if (newState === 'A')
                    return this.CurrentState.A;
                else if (newState === 'C')
                    return this.CurrentState.C;
                else
                    throw new Error('ERROR! This state does not have a STATECHANGE symbol! Please examine the categorize() or classify() methods.');
            case 'C':
                if (newState === 'A')
                    return this.CurrentState.A;
                else if (newState === 'B')
                    return this.CurrentState.B;
                else
                    throw new Error('ERROR! This state does not have a STATECHANGE symbol! Please examine the categorize() or classify() methods.');
            default:
                throw new Error('ERROR! This state does not have a STATECHANGE symbol! Please examine the categorize() or classify() methods.');
        }
    }
    // this will shift from A, B to the other state B, A for exactly one symbol
    getShiftState(newState) {
        switch (this.CurrentState.kind) {
            case 'A':
                return this.CurrentState.SHIFT;
            case 'B':
                return this.CurrentState.SHIFT;
            default:
                return undefined;
        }
    }
}
;
// this class will take in the ASCII character code and categorize it by
// the codeset it will represent. Any valid character code for both A and B
// will be marked as being type AB. Digits, which can be represented in
// all three code sets, will be marked as C. However, if the length is
// too short, or if there are an odd number of digits, they will be
// rendered in either set A or set B. Invalid symbols will be represented
// as a '?'.
class BCElement {
    constructor(curChar) {
        if (curChar < 32) { // Control characters? Only in 128A
            this.bcSym = curChar + 64;
            this.state = new StateMachine('A');
        }
        else if ((curChar > 95) && (curChar < 128)) { // lower case letters? Only in 128B
            this.bcSym = curChar - 32;
            this.state = new StateMachine('B');
        }
        else if ((curChar >= 48) && (curChar <= 57)) { // digits? In 128A, 128B, & 128C (with special encoding)
            this.bcSym = curChar - 32;
            this.state = new StateMachine('C');
        }
        else if ((curChar >= 32) && (curChar <= 95)) { // Everything else (except the high order special characters). NB: digits are already a C
            this.bcSym = curChar - 32;
            this.state = new StateMachine('AB');
        }
        else if ((curChar >= 160) && (curChar <= 223)) { // The remainder are the high order special characters. But they have further processing
            this.bcSym = curChar - 128;
            this.state = new StateMachine('AB4');
        }
        else if ((curChar >= 224) && (curChar <= 254) && (curChar !== 247)) {
            this.bcSym = curChar - 128;
            this.state = new StateMachine('B4');
        }
        else { // instead of creating an error, simply encode an invalid character as '?'
            this.bcSym = '?'.charCodeAt(0);
            this.state = new StateMachine('AB');
        }
    }
    ;
    changeKind(newKind) {
        this.state.setKind(newKind);
    }
    getKind() {
        return this.state.getKind();
    }
    getSymbol() {
        return this.bcSym;
    }
    toString() {
        const myOutput = `STATE: ${this.state.getKind()}\tbcSym: ${this.bcSym}`;
        return myOutput;
    }
}
;
class BCSubset {
    constructor(inValue) {
        this.symbol = [];
        this.finalState = new StateMachine(inValue);
    }
    ;
    toString() {
        let returnString = `finalState: ${this.finalState.getKind()}\n`;
        for (const sym of this.symbol)
            returnString += `${sym}\t`;
        return returnString;
    }
    getKind() {
        return this.finalState.getKind();
    }
    setKind(newKind) {
        this.finalState.setKind(newKind);
    }
    getNumberOfSymbols() {
        return this.symbol.length;
    }
    getSymbols() {
        return this.symbol;
    }
    pushNewSymbol(inSym) {
        this.symbol.push(inSym);
    }
    popLastSymbol() {
        if (this.symbol.length > 0)
            return this.symbol.pop();
        else
            return undefined;
    }
    unshiftNewSymbol(...inSym) {
        this.symbol.unshift(...inSym);
    }
    shiftFirstSymbol() {
        if (this.symbol.length > 0)
            return this.symbol.shift();
        else
            return undefined;
    }
    deleteSymArray() {
        this.symbol.length = 0;
    }
    getStart() {
        return this.finalState.getStart();
    }
    getShift() {
        return this.finalState.getShift();
    }
}
;
const escapeLetters = new Map([
    ['t', 9], // tab
    ['r', 13], // carriage return
    ['n', 10], // line feed
    ['f', 12], // form feed
    ['b', 8], // backspace
]);
function parseInput(barcode) {
    const strArray = [];
    let i = 0;
    while (i < barcode.length) {
        const curChar = barcode[i++];
        if (curChar === '\\') {
            if (i >= barcode.length) {
                strArray.push('\\'.charCodeAt(0));
                break;
            }
            if (barcode[i] === '\\') {
                strArray.push(barcode.charCodeAt(i++));
            }
            else {
                const nextChar = barcode[i];
                const escapeVal = escapeLetters.get(nextChar);
                if (escapeVal !== undefined) {
                    strArray.push(escapeVal);
                    i++;
                }
                else {
                    if ((i + 2) > barcode.length) {
                        throw new Error("Invalid escape sequence: incomplete");
                    }
                    const prefix = barcode.slice(i, i + 2);
                    if (prefix === '0x' || prefix === '0X') {
                        i += 2;
                        if ((i + 2) > barcode.length) {
                            throw new Error("Invlid escape sequence: incomplete");
                        }
                        const hexDigits = barcode.slice(i, i + 2);
                        i += 2;
                        if (!/^[0-9a-fA-F]{2}$/.test(hexDigits)) {
                            throw new Error("Invalid hex sequence: invalid digits");
                        }
                        else {
                            let hexValue = parseInt(hexDigits, 16);
                            if ((hexValue === 247) || (hexValue === 255) || ((hexValue >= 128) && (hexValue <= 159))) {
                                displayError("Code 128 cannot encode hex characters 80-9F, F7 or FF. Replacing with a ? character.");
                                hexValue = '?'.charCodeAt(0);
                            }
                            strArray.push(hexValue);
                        }
                    }
                }
            }
        }
        else {
            strArray.push(curChar.charCodeAt(0));
        }
    }
    return strArray;
}
;
function interpretBarcode(strArray) {
    const bc = [];
    for (const char of strArray) {
        bc.push(new BCElement(char));
    }
    return bc;
}
function categorize(strArray) {
    let bcSubsets = [];
    if (strArray.length === 0) {
        return bcSubsets;
    }
    let currCodeset = strArray[0].getKind(); // initialize with first symbol type
    let bcSubset = new BCSubset(currCodeset);
    bcSubsets.push(bcSubset);
    for (const elem of strArray) {
        if (elem.getKind() !== bcSubset.getKind()) {
            bcSubset = new BCSubset(elem.getKind());
            bcSubsets.push(bcSubset);
        }
        bcSubset.pushNewSymbol(elem.getSymbol());
    }
    return bcSubsets;
}
;
// At this point, the BCSubset array contains the entire string divided into subsets based on STATE.
// Now, lets further refine it by eliminating the ambiguity. Each array element is grouped by
// distinct STATEs. Begin by examining for digits. This may change some substrings
// from a 'C' state to an 'AB' state. Digits are represented the same in both 'A' and 'B'.
function convertDigits(strArray) {
    if (strArray.length === 0)
        return;
    // end cases are special. convert the first item if it's digits
    if (strArray[0].getKind() === 'C') {
        // is it too short to start the barcode?
        if (strArray[0].getNumberOfSymbols() < 4) {
            strArray[0].setKind('AB');
        }
        // if this is long enough, but odd, move the last digit to the next substring
        // (if there is one and it is of type 'A', 'B' or 'AB') or insert a new substring (if there's not)
        else if (strArray[0].getNumberOfSymbols() & 1) {
            const lastDigit = strArray[0].popLastSymbol();
            // The symbols are stored as numbers, hence the test is not testing for the symbol to be a digit.
            if (typeof lastDigit === 'number') {
                // there is only this subsctring of digits, make a new substring of type 'B' with the last digit in it
                if (strArray.length === 1) {
                    const bcSubset = new BCSubset('B');
                    bcSubset.pushNewSymbol(lastDigit);
                    strArray.push(bcSubset);
                }
                // here we know there is more than one substring element.
                else {
                    let bcSubset = strArray[1];
                    if ((bcSubset.getKind() === 'A') || (bcSubset.getKind() === 'B') || bcSubset.getKind() === 'AB') {
                        // ok, so it's safe to insert this symbol into the front of this substring
                        bcSubset.unshiftNewSymbol(lastDigit);
                    }
                    // since the following substring is not a symbol primitive (128A or 128B)
                    // create a new substring element and insert it after the current substring.
                    else {
                        bcSubset = new BCSubset('AB');
                        bcSubset.pushNewSymbol(lastDigit);
                        strArray.splice(1, 0, bcSubset);
                    }
                }
            }
            // by now the substring is long enough, and even, so convert the pairs
            // of symbols into their respective 128C representation.
            const oldSymArray = [...strArray[0].getSymbols()];
            strArray[0].deleteSymArray();
            for (let i = 0; i < oldSymArray.length - 1; i += 2) {
                const value = (oldSymArray[i] - 16) * 10 + (oldSymArray[i + 1] - 16);
                strArray[0].pushNewSymbol(value);
            }
        }
    }
    // and convert the last item if it's digits. Note that if there is a single item in the array,
    // there's no need to process the first element all over again. As a matter of fact, it will
    // cause errors because now the item has already been processed and is no longer valid 'A' or 'B'
    // symbols.
    if ((strArray.length > 1) && (strArray[strArray.length - 1].getKind() === 'C')) {
        // is it too short to start the barcode?
        let last = strArray.length - 1;
        if (strArray[last].getNumberOfSymbols() < 4) {
            strArray[last].setKind('AB');
        }
        // if this is long enough, but odd, move the first digit to the previous substring
        // (if there is one and it is of type 'A', 'B' or 'AB') or add a new substring (if there's not)
        else if (strArray[last].getNumberOfSymbols() & 1) {
            const firstDigit = strArray[last].shiftFirstSymbol();
            // The symbols are stored as numbers, hence the test is not testing for the symbol to be a digit.
            if (typeof firstDigit === 'number') {
                let bcSubset = strArray[last - 1];
                if ((bcSubset.getKind() === 'A') || (bcSubset.getKind() === 'B') || bcSubset.getKind() === 'AB') {
                    // ok, so it's safe to insert this symbol into the front of this substring
                    bcSubset.pushNewSymbol(firstDigit);
                }
                // since the following substring is not a symbol primitive (128A or 128B)
                // create a new substring element and insert it after the current substring.
                else {
                    bcSubset = new BCSubset('AB');
                    bcSubset.pushNewSymbol(firstDigit);
                    strArray.splice(last++, 0, bcSubset); // inserting before the last element, adjust the index also
                }
            }
            // by now the substring is long enough, and even, so convert the pairs
            // of symbols into their respective 128C representation.
            const oldSymArray = [...strArray[last].getSymbols()];
            strArray[last].deleteSymArray();
            for (let i = 0; i < oldSymArray.length - 1; i += 2) {
                const value = (oldSymArray[i] - 16) * 10 + (oldSymArray[i + 1] - 16);
                strArray[last].pushNewSymbol(value);
            }
        }
    }
    // finally, convert everything after the first element and before the last element.
    // note that when dealing with an odd length, we must move the last digit to the
    // following subset if that subset is in state A, B, or AB. or insert the new subset
    // after the current array element.
    for (let i = 1; i < strArray.length - 1; i++) {
        if (strArray[i].getKind() === 'C') {
            // is it too short?
            if (strArray[i].getNumberOfSymbols() < 6) {
                strArray[i].setKind('AB');
            }
            // if this is long enough, but odd, move the last digit to the next substring
            // (if there is one and it is of type 'A', 'B' or 'AB') or insert a new substring (if there's not)
            else {
                if (strArray[i].getNumberOfSymbols() & 1) {
                    const lastDigit = strArray[i].popLastSymbol();
                    // The symbols are stored as numbers, hence the test is not testing for the symbol to be a digit.
                    if (typeof lastDigit === 'number') {
                        let bcSubset = strArray[i + 1];
                        if ((bcSubset.getKind() === 'A') || (bcSubset.getKind() === 'B') || (bcSubset.getKind() === 'AB')) {
                            // ok, so it's safe to insert this symbol into the front of this substring
                            bcSubset.unshiftNewSymbol(lastDigit);
                        }
                        // since the following substring is not a symbol primitive (128A or 128B)
                        // create a new substring element and insert it after the current substring.
                        else {
                            bcSubset = new BCSubset('AB');
                            bcSubset.pushNewSymbol(lastDigit);
                            strArray.splice(i + 1, 0, bcSubset);
                        }
                    }
                }
                // by now the substring is long enough, and even, so convert the pairs
                // of symbols into their respective 128C representation.
                const oldSymArray = [...strArray[i].getSymbols()];
                strArray[i].deleteSymArray();
                for (let j = 0; j < oldSymArray.length - 1; j += 2) {
                    const value = (oldSymArray[j] - 16) * 10 + (oldSymArray[j + 1] - 16);
                    strArray[i].pushNewSymbol(value);
                }
            }
        }
    }
}
;
class StateCats {
    constructor(initPos = 0) {
        this.curState = new StateMachine('AB');
        this.pos = initPos;
        this.numShiftA = this.numShiftB = 0;
    }
    ;
    getKind() {
        return this.curState.getKind();
    }
    setKind(kind) {
        this.curState.setKind(kind);
    }
    getShift() {
        return this.curState.getShift();
    }
    getFNC4() {
        return this.curState.getFNC4();
    }
}
;
function classify(strArray, pos, stateCats) {
    // If this is a C substring or the last element, that's a hard stop so end the recursion here.
    if ((pos === strArray.length) || (strArray[pos].getKind() === 'C')) {
        if (stateCats.getKind() == 'AB')
            // only select a symbol set if one has not already been selected.
            stateCats.setKind((stateCats.numShiftB >= stateCats.numShiftA) ? 'B' : 'A');
        // begin to unwind the recursion
        return;
    }
    stateCats.pos = pos; // indicate we got here in the recursion
    if (stateCats.getKind() === 'AB') {
        if (strArray[pos].getNumberOfSymbols() === 1) {
            if ((strArray[pos].getKind() === 'A') || (strArray[pos].getKind() === 'AB4')) {
                stateCats.numShiftA++;
            }
            else if ((strArray[pos].getKind() === 'B') || (strArray[pos].getKind() === 'B4')) {
                stateCats.numShiftB++;
            }
        }
        else {
            stateCats.setKind((strArray[pos].getKind() === 'A') ? 'A' : 'B');
        }
    }
    // there has been a symbol set selected, but this subset does not match the selected state.
    // it is safe to continue if there is a single symbol BUT a SHIFT symbol has to be inserted
    // at the beginning AND then the state of this subset can be flipped. After that, continue to recurse.
    else if ((strArray[pos].getNumberOfSymbols()) === 1 && (strArray[pos].getKind() !== stateCats.getKind())) {
        try {
            switch (strArray[pos].getKind()) {
                case 'A':
                    strArray[pos].setKind('B');
                    strArray[pos].unshiftNewSymbol(strArray[pos].getShift());
                    break;
                case 'B':
                    strArray[pos].setKind('A');
                    strArray[pos].unshiftNewSymbol(strArray[pos].getShift());
                    break;
                case 'AB4':
                    strArray[pos].setKind('AB');
                    strArray[pos].unshiftNewSymbol(stateCats.getFNC4());
                    break;
                case 'B4':
                    if (stateCats.getKind() === 'A') {
                        strArray[pos].setKind('A');
                        strArray[pos].unshiftNewSymbol(stateCats.getShift());
                    }
                    strArray[pos].unshiftNewSymbol(stateCats.getFNC4());
                    break;
            }
        }
        catch (error) {
            if (error instanceof Error)
                displayError(error.message);
        }
    }
    if (pos < strArray.length)
        classify(strArray, pos + 1, stateCats);
    if (((strArray[pos].getKind() === 'B') || (strArray[pos].getKind() === 'B4')) && (stateCats.getKind() === 'A')) {
        strArray[pos].unshiftNewSymbol(stateCats.getShift());
        strArray[pos].setKind('A');
    }
    strArray[pos].setKind(stateCats.getKind());
}
// This is the final step. The input array must include the START code
// and the complete list of barcode symbols. This will not include the
// checksum, nor the STOP symbol. Those two symbols will be appended
// to the array as part of this process.
function addChecksum(strArray) {
    let ckSum = strArray[0];
    for (let pos = 1; pos < strArray.length; pos++)
        ckSum = (ckSum + pos * strArray[pos]) % 103;
    strArray.push(ckSum, 106); // checksum and stop character
}
function getBarcode(inputString) {
    const strArray = parseInput(inputString);
    /*    let strOutput: string = '';
       for (const num of strArray)
           strOutput = `${strOutput}\t${num}`;
       console.log(strOutput);
    */
    const bcElementArray = interpretBarcode(strArray);
    /*     for (const elem of bcElementArray)
            console.log(`${elem}`);
     */
    const bcSubsets = categorize(bcElementArray);
    /*     console.log('Before classify()');
        for (const elem of bcSubsets)
            console.log(`${elem}`);
    */
    convertDigits(bcSubsets);
    console.log('After convertDigits()');
    for (const elem of bcSubsets)
        console.log(`${elem}`);
    let curPos = 0;
    while (curPos < bcSubsets.length) {
        const stateCats = new StateCats(curPos);
        classify(bcSubsets, curPos, stateCats);
        curPos = stateCats.pos + 1;
    }
    /*     console.log('\nAfter classify()');
        for (const elem of bcSubsets)
            console.log(`${elem}`);
     */
    let curState = new StateMachine(bcSubsets[0].getKind());
    const finalArray = [bcSubsets[0].getStart(), ...bcSubsets[0].getSymbols()];
    for (let i = 1; i < bcSubsets.length; i++) {
        const thisState = bcSubsets[i].getKind();
        if ((thisState === 'A') || (thisState === 'B') || (thisState === 'C')) {
            if (curState.getKind() !== thisState) {
                finalArray.push(curState.getSwitch(thisState));
                curState.setKind(thisState);
            }
            finalArray.push(...bcSubsets[i].getSymbols());
        }
    }
    addChecksum(finalArray);
    return finalArray;
}
;
const svgNS = "http://www.w3.org/2000/svg";
const dspUPI = 96; // There are 96 units per inch
const fileUPI = 96;
let lBCWidth = 0; // Rendered Barcode Image Width
let lBCHeight = 0; // Rendered Barcode Image Height
let lImgWidth = 0; // Total Rendered Width
let lImgHeight = 0; // Total Rendered Height
let lTMargin = 0; // Top & Bottom Margins (inches)
let lSMargin = 0; // Side Margins (inches)
let lWidth = 0; // Number of bars/spaces (total)
let lBarWidth = 2; // Width of a narrow bar/space
let barcode = ""; // barcode string
let humanReadable = "none";
let fontHeight = 0;
let fontName = "Arial";
let lineSpace = 3;
function getSelectedRadioButton(form, name) {
    const radioButtons = form.elements.namedItem(name);
    if (!radioButtons || !(radioButtons instanceof RadioNodeList)) {
        displayError(`There is no radio button form element with id "${name}"`);
        return null;
    }
    ;
    for (let i = 0; i < radioButtons.length; i++) {
        const rbElem = radioButtons[i];
        if (rbElem.checked) {
            return rbElem.value;
        }
    }
    return null;
}
;
function createBarcodeCNV() {
    var _a, _b, _c, _d, _e;
    let SVG;
    let inputElement;
    console.log('createBarcodeCNV() called');
    const formCollection = document.getElementById('formBarcode');
    if (!formCollection) {
        displayError('No form collection named "formBarcode" on page');
        return;
    }
    inputElement = formCollection.elements.namedItem('barcode');
    if (inputElement) {
        barcode = inputElement.value;
    }
    else {
        displayError('There is no input element named "barcode"');
        return;
    }
    humanReadable = getSelectedRadioButton(formCollection, 'human') || 'none';
    inputElement = formCollection.elements.namedItem('BCWidth');
    lBCWidth = Number((_a = inputElement === null || inputElement === void 0 ? void 0 : inputElement.value) !== null && _a !== void 0 ? _a : NaN);
    if (isNaN(lBCWidth)) {
        displayError('No input element named "BCWidth" or invalid entry.');
        return;
    }
    inputElement = formCollection.elements.namedItem('BCHeight');
    lBCHeight = Number((_b = inputElement === null || inputElement === void 0 ? void 0 : inputElement.value) !== null && _b !== void 0 ? _b : NaN);
    if (isNaN(lBCHeight)) {
        displayError('No input element named "BCHeight" or invalid entry.');
        return;
    }
    inputElement = formCollection.elements.namedItem('BCTopMargin');
    lTMargin = Number((_c = inputElement === null || inputElement === void 0 ? void 0 : inputElement.value) !== null && _c !== void 0 ? _c : NaN);
    if (isNaN(lTMargin)) {
        displayError('No input element named "BCTopMargin" or invalid entry.');
        return;
    }
    inputElement = formCollection.elements.namedItem('BCSideMargin');
    lSMargin = Number((_d = inputElement === null || inputElement === void 0 ? void 0 : inputElement.value) !== null && _d !== void 0 ? _d : NaN);
    if (isNaN(lSMargin)) {
        displayError('No input element named "BCSideMargin" or invalid entry.');
        return;
    }
    inputElement = formCollection.elements.namedItem('fontSize');
    fontHeight = Number((_e = inputElement === null || inputElement === void 0 ? void 0 : inputElement.value) !== null && _e !== void 0 ? _e : NaN);
    if (isNaN(fontHeight)) {
        displayError('No input element named "fontSize" or invalid entry.');
        return;
    }
    lBCWidth *= fileUPI;
    lBCHeight *= fileUPI;
    lTMargin *= fileUPI;
    lSMargin *= fileUPI;
    let byteArray = [];
    try {
        byteArray = getBarcode(barcode);
    }
    catch (e) {
        if (e instanceof Error) {
            const errMsg = e.message;
            displayError(errMsg);
        }
    }
    ;
    const textArea = document.getElementById('byteArray');
    if (textArea) {
        textArea.innerText = `[${byteArray.join(', ')}]`;
    }
    else {
        displayError('No "byteArray" page element defined');
        return;
    }
    // length of a single symbol is 11 + 2 for the extra bar in the STOP symbol and a quiet area of 10 on each side
    lWidth = byteArray.length * 11 + 2;
    lBarWidth = Math.floor(lBCWidth * 10 / (lWidth + 22)); // Get the width of the narrow bars to fit the barcode width
    lImgHeight = lTMargin * 2 + lBCHeight + ((humanReadable === "none") ? 0 : (fontHeight + lineSpace));
    lImgWidth = lSMargin * 2 + lBCWidth;
    console.log(`lWidth = ${lWidth}`);
    console.log(`BCWidth = ${lBCWidth}px\tlImgWidth = ${lImgWidth}px`);
    console.log(`Rounded width = ${lBarWidth * lWidth / 10}px`);
    console.log(`BCHeight = ${lBCHeight}px\tlImgHeight = ${lImgHeight}px`);
    console.log(`TMargin = ${lTMargin}px`);
    console.log(`SMargin = ${lSMargin}px`);
    console.log(`barcode = "${barcode}" length = ${barcode.length}`);
    console.log(`lBarWidth = ${lBarWidth / 10}`);
    {
        const temp = document.getElementById("svgBarcode");
        if (temp && temp instanceof SVGElement) {
            SVG = temp;
        }
        else {
            displayError('No "svgElement" page element defined');
            return;
        }
    }
    while (SVG.firstChild) {
        SVG.removeChild(SVG.firstChild);
    }
    SVG.style.width = `${lImgWidth}px`;
    SVG.style.height = `${lImgHeight}px`;
    SVG.setAttributeNS(null, "width", `${(lImgWidth * dspUPI) / fileUPI}px`);
    SVG.setAttributeNS(null, "height", `${(lImgHeight * dspUPI) / fileUPI}px`);
    SVG.setAttributeNS(null, "viewbox", `0 0 ${lImgWidth} ${lImgHeight}`);
    {
        const svgRect = document.createElementNS(svgNS, "rect");
        svgRect.setAttributeNS(null, "x", '0px');
        svgRect.setAttributeNS(null, "y", '0px');
        svgRect.setAttributeNS(null, "width", `${lImgWidth}px`);
        svgRect.setAttributeNS(null, "height", `${lImgHeight}px`);
        svgRect.setAttributeNS(null, "fill", "none");
        svgRect.setAttributeNS(null, "stroke", "blue");
        svgRect.setAttributeNS(null, "stroke-width", `2`);
        SVG.append(svgRect);
    }
    switch (humanReadable) {
        case "none":
            break;
        case "bottom": // The text will be below the barcode.
            {
                const svgText = document.createElementNS(svgNS, "text");
                svgText.setAttributeNS(null, "class", "svgText");
                svgText.setAttributeNS(null, "style", `font-size:${fontHeight}px`);
                svgText.setAttributeNS(null, "text-anchor", "middle");
                svgText.setAttributeNS(null, "dominant-baseline", "hanging");
                svgText.setAttributeNS(null, "x", `${lImgWidth / 2}px`);
                svgText.setAttributeNS(null, "y", `${lTMargin + lBCHeight + lineSpace}px`);
                svgText.textContent = barcode;
                SVG.appendChild(svgText);
            }
            break;
        case "top": // The text will be above the barcode.
            {
                const svgText = document.createElementNS(svgNS, "text");
                svgText.setAttributeNS(null, "class", "svgText");
                svgText.setAttributeNS(null, "style", `font-size:${fontHeight}px`);
                svgText.setAttributeNS(null, "text-align", "middle");
                svgText.setAttributeNS(null, "dominant-baseline", "auto");
                svgText.setAttributeNS(null, "x", `${lImgWidth / 2}px`);
                svgText.setAttributeNS(null, "y", `${lTMargin + fontHeight}px`);
                svgText.textContent = barcode;
                SVG.appendChild(svgText);
            }
            lTMargin += fontHeight + lineSpace; // Move the top of the barcode below the text.
            break;
    }
    drawBC(SVG, byteArray);
    // IMG.appendChild(SVG);
    let buttonElem = document.getElementById("downloadJPGBtn");
    if (buttonElem) {
        buttonElem.disabled = false;
    }
    else {
        displayError('No "downloadJPGBtn" page element defined.');
        return;
    }
    buttonElem = document.getElementById("downloadPNGBtn");
    if (buttonElem) {
        buttonElem.disabled = false;
    }
    else {
        displayError('No "downloadPNGBtn" page element defined.');
        return;
    }
    buttonElem = document.getElementById("printBtn");
    if (buttonElem) {
        buttonElem.disabled = false;
    }
    else {
        displayError('No "printBtn" page element defined.');
        return;
    }
    return 0;
}
;
function drawBC(SVG, bcArray) {
    let x = (Math.floor((lBCWidth - lWidth * lBarWidth / 10) / 2) + lSMargin) * 10;
    console.log(`Initial x = ${x}`);
    let yt = lTMargin;
    let yb = lBCHeight + lTMargin;
    for (let ch of bcArray) {
        x = drawSingleBC(SVG, ch, x, yt, yb);
        console.log(`ch = ${ch} x = ${x}`);
    }
}
function drawSingleBC(SVG, strBCChar, x, yt, yb) {
    let lIdx = 0;
    let lMid = 0;
    const debugOutput = [];
    do {
        // Draw the bar
        const svgLine = document.createElementNS(svgNS, "line");
        debugOutput.push(`b[${lIdx}]: ${strPat[strBCChar][lIdx]}`);
        // svgLine.setAttributeNS(null, "class", "line" + strPat[lIdx]);  // this class specifies the width of the bar
        let lBW = lBarWidth * Number(strPat[strBCChar][lIdx++]);
        lMid = x + lBW / 2;
        svgLine.setAttributeNS(null, "x1", `${lMid / 10}px`);
        svgLine.setAttributeNS(null, "y1", `${yt}px`);
        svgLine.setAttributeNS(null, "x2", `${lMid / 10}px`);
        svgLine.setAttributeNS(null, "y2", `${yb}px`);
        svgLine.setAttributeNS(null, "stroke", "black");
        svgLine.setAttributeNS(null, "stroke-width", `${lBW / 10}px`);
        SVG.appendChild(svgLine);
        // advance the distance of the bar, and the space.
        // Leaves the x position on the leading
        // edge of the next bar to be drawn.
        if (lIdx < strPat[strBCChar].length) {
            debugOutput.push(`s[${lIdx}]: ${strPat[strBCChar][lIdx]}`);
            x += lBW + lBarWidth * Number(strPat[strBCChar][lIdx++]);
        }
    } while (lIdx < strPat[strBCChar].length);
    console.log(debugOutput.join(", "));
    return x;
}
function fontDisabled() {
    const fontBtn = document.getElementById('fontSize');
    if (fontBtn) {
        fontBtn.disabled = true;
    }
}
function fontEnabled() {
    const fontBtn = document.getElementById('fontSize');
    if (fontBtn) {
        fontBtn.disabled = false;
    }
}
function domReady(fn) {
    if (document.readyState != 'loading') {
        fn();
    }
    else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
;
domReady(() => {
    /**
     * Just Make sure to return false so that your request will not pass on to the server script
     */
    console.log("onload called");
    const formIds = document.querySelectorAll('[id]');
    const ids = [];
    formIds.forEach(element => {
        if (element.id)
            ids.push(element.id);
    });
    const formBarcode = document.getElementById("formBarcode");
    if (formBarcode) {
        formBarcode.addEventListener("submit", function (e) {
            e.preventDefault();
            console.log("onsubmit called");
            createBarcodeCNV();
            return false;
        });
    }
    else {
        displayError('No "formBarcode" element on page.');
        return;
    }
    const barcode = document.getElementById("barcode");
    const generateBtn = document.getElementById("generateBtn");
    if (barcode && generateBtn) {
        barcode.addEventListener("change", (ev) => {
            const target = ev === null || ev === void 0 ? void 0 : ev.target;
            if (target)
                generateBtn.disabled = (target.value.length == 0);
        });
        barcode.addEventListener('input', (ev) => {
            const textArea = document.getElementById('byteArray');
            if (textArea) {
                const barValue = (ev === null || ev === void 0 ? void 0 : ev.target).value;
                if (barValue && (barValue.length > 0)) {
                    let byteArray;
                    try {
                        byteArray = parseInput(barValue);
                        textArea.innerText = `[${byteArray.join(', ')}]`;
                        clearError();
                    }
                    catch (e) {
                        if (e instanceof Error)
                            displayError(e.message);
                    }
                }
                else {
                    textArea.innerText = '';
                }
            }
            else {
                displayError('No "textArea page element found');
            }
        });
    }
    else {
        displayError('No "barcode" input element on page');
    }
    let buttonElem = document.getElementById("downloadJPGBtn");
    if (buttonElem) {
        buttonElem.addEventListener("click", DownloadJPG);
    }
    buttonElem = document.getElementById("downloadPNGBtn");
    if (buttonElem) {
        buttonElem.addEventListener("click", DownloadPNG);
    }
    buttonElem = document.getElementById('printBtn');
    if (buttonElem) {
        buttonElem.addEventListener("click", printToteLabel);
    }
    let textPosRadio = document.getElementById('none');
    if (textPosRadio) {
        textPosRadio === null || textPosRadio === void 0 ? void 0 : textPosRadio.addEventListener('change', fontDisabled);
    }
    else {
        displayError('No "none" radio button defined.');
    }
    textPosRadio = document.getElementById('top');
    if (textPosRadio) {
        textPosRadio === null || textPosRadio === void 0 ? void 0 : textPosRadio.addEventListener('change', fontEnabled);
    }
    else {
        displayError('No "top" radio button defined.');
    }
    textPosRadio = document.getElementById('bottom');
    if (textPosRadio) {
        textPosRadio === null || textPosRadio === void 0 ? void 0 : textPosRadio.addEventListener('change', fontEnabled);
    }
    else {
        displayError('No "bottom" radio button defined.');
    }
    const errorArea = document.getElementById('errorMessage');
    if (errorArea) {
        document.addEventListener('focusin', () => {
            errorArea.textContent = '';
        });
    }
    else {
        displayError('errorMessage div element not found on page.');
    }
    return false;
});
function DownloadJPG() {
    const barcode = document.getElementById('barcode');
    const name = barcode ? barcode === null || barcode === void 0 ? void 0 : barcode.value : '';
    if (name.length > 0) {
        SVGtoIMG(name, 'jpeg');
    }
}
;
function DownloadPNG() {
    const barcode = document.getElementById('barcode');
    const name = barcode ? barcode === null || barcode === void 0 ? void 0 : barcode.value : '';
    if (name.length > 0) {
        SVGtoIMG(name, 'png');
    }
}
;
function SVGtoIMG(name, imgType) {
    const canvas = document.createElement('canvas');
    const svg = document.getElementById('svgBarcode');
    if (!(canvas && svg)) {
        displayError('Could not create a canvas for find the SVG element on the page.');
        return;
    }
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        displayError('No context available.');
        return;
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/' + imgType, 0.9);
        link.download = name + ((imgType === 'jpeg') ? '.jpg' : '.png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    img.onerror = () => {
        displayError('Error loading SVG image.');
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
}
;
function printToteLabel() {
    const barcode = document.getElementById('barcode');
    const name = barcode === null || barcode === void 0 ? void 0 : barcode.value;
    const svg = document.getElementById("svgBarcode");
    if (!name || !svg)
        return;
    let mywindow = window.open('about:blank', 'PRINT', 'height=400,width=600');
    if (mywindow) {
        mywindow.document.write(`<html><head><title>${document.title}</title>`);
        mywindow.document.write('<style>');
        mywindow.document.write(`svg { display:block;margin-left:auto;margin-right:auto;width:${svg.width};}\n`);
        /**
          mywindow.document.write('@media print {');
          mywindow.document.write('header, footer {display:none;}');
          mywindow.document.write('}\n');
        */
        mywindow.document.write('</style>');
        mywindow.document.write('</head><body>');
        //mywindow.document.write('<svg id="svgTopBarcode" name="svgTopBarcode" xmlns="http://www.w3.org/2000/svg" style="padding-bottom:24px;" />');
        //mywindow.document.write('<br />')
        //mywindow.document.write('<svg id="svgBottomBarcode" name="svgBottomBarcode" xmlns="http://www.w3.org/2000/svg" />');
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10
        // let src = document.getElementById("svgBarcode");
        // let top = mywindow.document.getElementById("svgTopBarcode");
        // let bot = mywindow.document.getElementById("svgBottomBarcode");
        const svgTop = svg.cloneNode(true);
        svgTop.id = "topSVG";
        mywindow.document.body.appendChild(svgTop);
        let br = mywindow.document.createElement("br");
        mywindow.document.body.appendChild(br);
        const svgBottom = svg.cloneNode(true);
        svgBottom.id = "svgBottom";
        svgBottom.style.paddingTop = "20px";
        mywindow.document.body.appendChild(svgBottom);
        mywindow.print();
        mywindow.close();
    }
    else
        alert("Unable to open a new tab");
    return true;
}
;
function displayError(errMsg) {
    const errorArea = document.getElementById('errorMessage');
    if (errorArea) {
        errorArea.textContent = errMsg;
    }
    else {
        console.error(errMsg);
    }
}
function clearError() {
    const errorArea = document.getElementById('errorMessage');
    if (errorArea) {
        errorArea.textContent = '';
    }
}
;
//# sourceMappingURL=Code128.js.map