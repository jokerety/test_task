const numberComponentTemplate = `
    <style>
        .numberInputContainer {
            display: flex;
            align-items: center;
         }
         .separator {
            height: fit-content;
            color: #111212;
         }
         .errorActive {
            display: block;
            color: red;
         }
         .noError {
            display: none;
         }
    </style>
    <div class="numberInputContainer">
    </div>
    <div class="noError">
        Неверный номер, попробуйте еще раз
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
    private isError: boolean;

    constructor() {
        super();
        // элемент создан
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = numberComponentTemplate;
        this.mask = '';
        this.inputMasks = [];
        this._initElements();
        this.isError = false;
    }

    get value(): string {
        const { inputs } = this._elements;
        return inputs.reduce((acc: string, elem) => {
            acc += elem.value || '_';
            return acc;
        }, '');
    }

    _initElements() {
        const root = this.shadowRoot.querySelector('.numberInputContainer');
        const error = this.shadowRoot.querySelector('.noError');
        this._elements = {
            root: root,
            inputs: [],
            error: error,
        };
    }

    static get observedAttributes(): string[] {
        return ['mask'];
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        // вызывается при изменении одного из перечисленных выше атрибутов
        switch (name) {
            case 'mask':
                this.mask = newValue;
                this.inputMasks = this.mask.split('').map(elem => {
                    if (elem === 'I') {
                        return { type: 'input', value: elem };
                    } else if (elem === 'X' || elem === '*' || !isNaN(Number.parseInt(elem))) {
                        return { type: 'greyBox', value: elem };
                    } else {
                        return { type: 'separator', value: elem };
                    }
                });
                this.render();
        }
    }

    error(): void {
        this.isError = true;
        this.render();
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
                    // tag.setAttribute('error', String(this.isError));
                    inputs.push(tag);
                    break;
                case 'greyBox':
                    tag = document.createElement('number-box');
                    tag.setAttribute('value', elem.value);
                    break;
            }
            root.appendChild(tag);
            this._elements.inputs = inputs;
        });
        if (this.isError) {
            const { error } = this._elements;
            error.classList.remove('noError');
            error.className = 'errorActive';
        }
    }
}

export default NumberComponent;
