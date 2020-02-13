import './scss/style.scss';

const numberComponentTemplate = `
    <link rel="stylesheet" href="./css/app.css">
    <div class="numberInput">
        <div class="numberInputContainer"></div>
        <div class="error hide">
            Неверный номер, попробуйте еще раз
        </div>    
    </div>

`;

interface MaskNumberInterface {
    type: string;
    value: string;
}

class NumberComponent extends HTMLElement {
    private mask: string;
    private _elements: {
        root: Element;
        inputs: Element[];
        error: Element;
    };
    private inputMasks: MaskNumberInterface[];

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = numberComponentTemplate;
        this.mask = '';
        this.inputMasks = [];
        this._initElements();
    }

    _initElements(): void {
        const root = this.shadowRoot.querySelector('.numberInputContainer');
        const error = this.shadowRoot.querySelector('.error');
        this._elements = {
            root: root,
            inputs: [],
            error: error,
        };
    }

    get value(): string {
        const { inputs } = this._elements;
        return inputs.reduce((acc: string, elem) => {
            acc += (elem as any).value || '_';
            return acc;
        }, '');
    }

    static get observedAttributes(): string[] {
        return ['mask'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'mask') {
            this.mask = newValue;
            this.inputMasks = this.mask.split('').map(elem => {
                if (elem === 'I') {
                    return { type: 'input', value: elem };
                } else if (elem === 'X' || elem === '*' || !isNaN(Number.parseInt(elem))) {
                    return { type: 'inputMock', value: elem };
                } else {
                    return { type: 'separator', value: elem };
                }
            });
            this.render();
        }
    }

    error(): void {
        const { inputs, error } = this._elements;
        inputs.forEach(elem => (elem as any).error());
        error.classList.remove('hide');
    }

    success(): void {
        const { inputs, error } = this._elements;
        inputs.forEach(elem => (elem as any).success());
        error.classList.add('hide');
    }

    render(): void {
        const { root } = this._elements;
        const inputs: Element[] = [];

        root.innerHTML = '';
        this.inputMasks.forEach(elem => {
            let tag = null;
            switch (elem.type) {
                case 'separator':
                    tag = document.createElement('div');
                    tag.className = 'separator';
                    tag.innerHTML = elem.value;
                    break;
                case 'input':
                    tag = document.createElement('number-box');
                    tag.setAttribute('value', elem.value);
                    inputs.push(tag);
                    break;
                case 'inputMock':
                    tag = document.createElement('number-box');
                    tag.setAttribute('value', elem.value);
                    break;
            }
            root.appendChild(tag);
            this._elements.inputs = inputs;
        });
    }
}

export default NumberComponent;
