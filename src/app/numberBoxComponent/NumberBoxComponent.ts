import './scss/style.scss';

const numberBoxTemplate = `
    <link rel="stylesheet" href="./css/app.css">
    <input class="numberInputBox">
`;

class NumberBoxComponent extends HTMLElement {
    private _elements: {
        input: HTMLInputElement;
    };

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = numberBoxTemplate;
        this._initElements();
        this._addHandlers();
    }

    _initElements(): void {
        const input = this.shadowRoot.querySelector('input');
        this._elements = {
            input,
        };
    }

    _addHandlers(): void {
        this._elements.input.addEventListener('input', this._onInput);
    }

    _onInput = (event: Event): void => {
        event.preventDefault();
        const { input } = this._elements;
        input.value = (event.target as HTMLInputElement).value[1] || (event.target as HTMLInputElement).value[0] || '';
        if (input.value === '') {
            input.classList.add('numberInputBoxUnderScope');
        } else {
            input.classList.remove('numberInputBoxUnderScope');
        }
    };

    get value(): string {
        const { input } = this._elements;
        return input.value;
    }

    error(): void {
        const { input } = this._elements;
        input.classList.add('numberInputBoxInvalid');
    }

    success(): void {
        const { input } = this._elements;
        input.classList.remove('numberInputBoxInvalid');
    }

    static get observedAttributes(): string[] {
        return ['value'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        const { input } = this._elements;
        if (name === 'value') {
            switch (newValue) {
                case 'I':
                    input.value = '';
                    input.type = 'number';
                    input.classList.add('numberInputBoxUnderScope', 'numberInputBoxWithHover');
                    break;
                case 'X':
                    input.disabled = true;
                    input.classList.add('numberInputBoxCross', 'numberInputBoxMock');
                    break;
                case '*':
                    input.disabled = true;
                    input.classList.add('numberInputBoxPoint', 'numberInputBoxMock');
                    break;
                default:
                    input.value = newValue;
                    input.disabled = true;
                    input.classList.add('numberInputBoxMock');
            }
        }
    }
}

export default NumberBoxComponent;
