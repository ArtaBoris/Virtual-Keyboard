import Translate from './translate.js';

const DEFAULT_LANG = 'en';
let language = localStorage.getItem('language') || DEFAULT_LANG;

let isCapsLocked = false;

let cursorPosition = 0;
let textareaText = '';

const body = document.querySelector('body');

function showContent() {
  const content = `<div class="wrapper">
                        <textarea name="textarea" class="textarea" autofocus></textarea>
                        <div class="keyboard">
                            <div class="first-row">
                                <div class="key letter symbol" data-pad="backquote" id='Backquote'>\`</div>
                                <div class="key digit" id="Digit1">1</div>
                                <div class="key digit" id="Digit2">2</div>
                                <div class="key digit" id="Digit3">3</div>
                                <div class="key digit" id="Digit4">4</div>
                                <div class="key digit" id="Digit5">5</div>
                                <div class="key digit" id="Digit6">6</div>
                                <div class="key digit" id="Digit7">7</div>
                                <div class="key digit" id="Digit8">8</div>
                                <div class="key digit" id="Digit9">9</div>
                                <div class="key digit" id="Digit0">0</div>
                                <div class="key symbol" id="Minus">-</div>
                                <div class="key symbol" id="Equal">=</div>
                                <div class="key control-key middle backspace" id="Backspace">backspace</div>
                            </div>
                            <div class="second-row">
                                <div class="key control-key tab" id="Tab">tab</div>
                                <div class="key letter" data-pad="q" id="KeyQ">q</div>
                                <div class="key letter" data-pad="w" id="KeyW">w</div>
                                <div class="key letter" data-pad="e" id="KeyE">e</div>
                                <div class="key letter" data-pad="r" id="KeyR">r</div>
                                <div class="key letter" data-pad="t" id="KeyT">t</div>
                                <div class="key letter" data-pad="y" id="KeyY">y</div>
                                <div class="key letter" data-pad="u" id="KeyU">u</div>
                                <div class="key letter" data-pad="i" id="KeyI">i</div>
                                <div class="key letter" data-pad="o" id="KeyO">o</div>
                                <div class="key letter" data-pad="p" id="KeyP">p</div>
                                <div class="key letter symbol" data-pad="[" id="BracketLeft">[</div>
                                <div class="key letter symbol" data-pad="]" id="BracketRight">]</div>
                                <div class="key symbol" id="Backslash">\\</div>
                                <div class="key control-key del" id="Delete">del</div>
                            </div>
                            <div class="third-row">
                                <div class="key control-key middle capslock" id="CapsLock">caps lock</div>
                                <div class="key letter" data-pad="a" id="KeyA">a</div>
                                <div class="key letter" data-pad="s" id="KeyS">s</div>
                                <div class="key letter" data-pad="d" id="KeyD">d</div>
                                <div class="key letter" data-pad="f" id="KeyF">f</div>
                                <div class="key letter" data-pad="g" id="KeyG">g</div>
                                <div class="key letter" data-pad="h" id="KeyH">h</div>
                                <div class="key letter" data-pad="j" id="KeyJ">j</div>
                                <div class="key letter" data-pad="k" id="KeyK">k</div>
                                <div class="key letter" data-pad="l" id="KeyL">l</div>
                                <div class="key letter symbol" data-pad=";" id="Semicolon">;</div>
                                <div class="key letter symbol" data-pad="quotes" id="Quote">'</div>
                                <div class="key control-key middle enter" id="Enter">enter</div>
                            </div>
                            <div class="fourth-row">
                                <div class="key control-key middle shift" id="ShiftLeft">shift</div>
                                <div class="key letter" data-pad="z" id="KeyZ">z</div>
                                <div class="key letter" data-pad="x" id="KeyX">x</div>
                                <div class="key letter" data-pad="c" id="KeyC">c</div>
                                <div class="key letter" data-pad="v" id="KeyV">v</div>
                                <div class="key letter" data-pad="b" id="KeyB">b</div>
                                <div class="key letter" data-pad="n" id="KeyN">n</div>
                                <div class="key letter" data-pad="m" id="KeyM">m</div>
                                <div class="key letter symbol" data-pad="comma" id="Comma">,</div>
                                <div class="key letter symbol" data-pad="period" id="Period">.</div>
                                <div class="key symbol" data-pad="slash" id="Slash">/</div>
                                <div class="key control-key arrow-up arrow" id="ArrowUp">▲</div>
                                <div class="key control-key middle shift" id="ShiftRight">shift</div>
                            </div>
                            <div class="fifth-row">
                                <div class="key control-key" id="ControlLeft">ctrl</div>
                                <div class="key control-key" id="MetaLeft">win</div>
                                <div class="key control-key" id="AltLeft">alt</div>
                                <div class="key big" id="Space"> </div>
                                <div class="key control-key" id="AltRight">alt</div>
                                <div class="key control-key arrow" id="ArrowLeft">◄</div>
                                <div class="key control-key arrow" id="ArrowDown">▼</div>
                                <div class="key control-key arrow" id="ArrowRight">►</div>
                                <div class="key control-key" id="ControlRight">ctrl</div>
                            </div>
                        </div>
                        <p class="switch">switch keyboard layout left ctrl + left alt</p>
                    </div>`;

  body.insertAdjacentHTML('afterbegin', content);
}
showContent();

const data = document.querySelectorAll('[data-pad]');
const letters = document.querySelectorAll('.letter');
const digits = document.querySelectorAll('.digit');
const symbols = document.querySelectorAll('.symbol');
const shifts = document.querySelectorAll('.shift');

const controlLeft = document.querySelector('#ControlLeft');
const altLeft = document.querySelector('#AltLeft');


const textarea = document.querySelector('.textarea');
const keyboard = document.querySelector('.keyboard');

function saveToLocalStorage() {
  localStorage.setItem('language', language);
}

function getTranslate() {
  data.forEach((el) => {
    const elem = el;
    elem.textContent = Translate[language][elem.dataset.pad];
  });
}

function shiftSymbols() {
  const [one, two, three, four, five, six, seven, eight, nine, zero] = digits;
  const [
    backquote,
    minus,
    equal,
    bracketleft,
    bracketright,
    backslash,
    semicolon,
    quote,
    comma,
    period,
    slash,
  ] = symbols;
  if (language === 'en') {
    one.textContent = '!';
    two.textContent = '@';
    three.textContent = '#';
    four.textContent = '$';
    five.textContent = '%';
    six.textContent = '^';
    seven.textContent = '&';
    eight.textContent = '*';
    nine.textContent = '(';
    zero.textContent = ')';
    backquote.textContent = '~';
    minus.textContent = '_';
    equal.textContent = '+';
    bracketleft.textContent = '{';
    bracketright.textContent = '}';
    backslash.textContent = '|';
    semicolon.textContent = ':';
    quote.textContent = '"';
    comma.textContent = '<';
    period.textContent = '>';
    slash.textContent = '?';
  } else if (language === 'ru') {
    one.textContent = '!';
    two.textContent = '"';
    three.textContent = '№';
    four.textContent = ';';
    five.textContent = '%';
    six.textContent = ':';
    seven.textContent = '?';
    eight.textContent = '*';
    nine.textContent = '(';
    zero.textContent = ')';
    minus.textContent = '_';
    equal.textContent = '+';
    backslash.textContent = '/';
    slash.textContent = ',';
  }
}

function unshiftSymbols() {
  const [one, two, three, four, five, six, seven, eight, nine, zero] = digits;
  const [
    backquote,
    minus,
    equal,
    bracketleft,
    bracketright,
    backslash,
    semicolon,
    quote,
    comma,
    period,
    slash,
  ] = symbols;
  one.textContent = '1';
  two.textContent = '2';
  three.textContent = '3';
  four.textContent = '4';
  five.textContent = '5';
  six.textContent = '6';
  seven.textContent = '7';
  eight.textContent = '8';
  nine.textContent = '9';
  zero.textContent = '0';
  minus.textContent = '-';
  equal.textContent = '=';
  if (language === 'en') {
    backquote.textContent = '`';
    bracketleft.textContent = '[';
    bracketright.textContent = ']';
    backslash.textContent = '\\';
    semicolon.textContent = ';';
    quote.textContent = "'";
    comma.textContent = ',';
    period.textContent = '.';
    slash.textContent = '/';
  } else if (language === 'ru') {
    backslash.textContent = '\\';
    slash.textContent = '.';
  }
}

function changeLetters() {
  if (isCapsLocked) {
    letters.forEach((l) => {
      const letter = l;
      letter.textContent = letter.textContent.toLowerCase();
    });
  } else if (!isCapsLocked) {
    letters.forEach((l) => {
      const letter = l;
      letter.textContent = letter.textContent.toUpperCase();
    });
  }
}

function deleteFromTextarea() {
  if (cursorPosition > 0) {
    textareaText = textareaText.substring(0, textarea.selectionStart - 1)
      + textareaText.substring(textarea.selectionEnd);
    cursorPosition -= 1;
  }
}

function deleteFromTextareaByDel() {
  textareaText = textareaText.substring(0, textarea.selectionStart)
    + textareaText.substring(textarea.selectionEnd + 1);
}

textarea.addEventListener('click', () => {
  cursorPosition = textarea.selectionStart;
});

function enterText(text) {
  textareaText = textareaText.substring(0, cursorPosition)
    + text
    + textareaText.substring(cursorPosition);
  cursorPosition += text.length;
}

function updateTextarea() {
  textarea.textContent = textareaText;
  textarea.selectionStart = cursorPosition;
  textarea.focus();
}

function toUpperAndLowerCase(caps) {
  if (isCapsLocked) {
    caps.classList.remove('active');
    caps.classList.remove('active-background');
    letters.forEach((l) => {
      const letter = l;
      letter.textContent = letter.textContent.toLowerCase();
    });
    isCapsLocked = false;
  } else if (!isCapsLocked) {
    letters.forEach((l) => {
      const letter = l;
      letter.textContent = letter.textContent.toUpperCase();
    });
    caps.classList.add('active');
    caps.classList.add('active-background');
    isCapsLocked = true;
  }
}

function changeLanguage() {
  if (language === 'ru') {
    language = 'en';
  } else if (language === 'en') {
    language = 'ru';
  }
  saveToLocalStorage();
  if (isCapsLocked) {
    data.forEach((el) => {
      const elem = el;
      elem.textContent = Translate[language][elem.dataset.pad].toUpperCase();
    });
  } else if (!isCapsLocked) {
    data.forEach((el) => {
      const elem = el;
      elem.textContent = Translate[language][elem.dataset.pad].toLowerCase();
    });
  }
}

function determinePressedKey(key) {
  if (key.classList.contains('key') && !key.classList.contains('control-key')) {
    enterText(key.textContent);
  }
  if (key.classList.contains('arrow')) {
    enterText(key.textContent);
  }
  if (key.classList.contains('capslock')) {
    toUpperAndLowerCase(key);
  }
  if (key.classList.contains('enter')) {
    enterText('\n');
  }
  if (key.classList.contains('tab')) {
    enterText('\t');
  }
  if (key.classList.contains('backspace')) {
    deleteFromTextarea();
  }
  if (key.classList.contains('del')) {
    deleteFromTextareaByDel();
  }
  updateTextarea();
}

function pressKey(Event) {
  const key = document.querySelector(`#${Event.code}`);
  if (key) {
    if (key.classList.contains('key')) {
      Event.preventDefault();
    }
    if (key.classList.contains('control-key')) {
      key.classList.add('active-background');
    }
    key.classList.add('active');
    if (key.classList.contains('shift')) {
      shiftSymbols();
      changeLetters();
    }
    determinePressedKey(key);
  }
  if (
    controlLeft.classList.contains('active')
    && altLeft.classList.contains('active')
  ) {
    changeLanguage();
  }
}

function determineUpKey(key) {
  if (key.classList.contains('shift')) {
    if (!isCapsLocked) {
      letters.forEach((l) => {
        const letter = l;
        letter.textContent = letter.textContent.toLowerCase();
      });
    } else if (isCapsLocked) {
      letters.forEach((l) => {
        const letter = l;
        letter.textContent = letter.textContent.toUpperCase();
      });
    }
    unshiftSymbols();
  }
}

function releaseKey(e) {
  const key = document.querySelector(`#${e.code}`);
  if (key) {
    if (
      key.classList.contains('control-key')
      && !key.classList.contains('capslock')
    ) {
      key.classList.remove('active-background');
    }
    if (!key.classList.contains('capslock')) {
      key.classList.remove('active');
    }
    determineUpKey(key);
  }
}

document.addEventListener('keydown', pressKey);
document.addEventListener('keyup', releaseKey);


function identifyKey(e) {
  const key = e.target;
  determinePressedKey(key);
}

keyboard.addEventListener('click', identifyKey);

getTranslate();