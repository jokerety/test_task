const numberBoxTemplate = `
    <style>
        .numberInputBox {
          margin: 0 2px;
          border-radius: 2px;
          background-color: #F0F0F0;;
          width: 25px;
          height: 32px;
          padding: 7px 8px 8px 8px;
          font-size: 15px;
          line-height: 18px;
          box-sizing: border-box;
          outline: 0;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background-repeat: no-repeat;
          background-size: contain;
          background-image: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 1000 1000' enable-background='new 0 0 1000 1000' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M10,452.1h980v95.7H10V452.1z'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        .numberInputBox:hover {
            border: 1px solid rgba(0, 0, 0, 0.24);
        }

        .numberInputBox:focus {
            border: 1px solid rgba(0 ,0, 0, 0.48);
        }

        .numberInputBox::-webkit-inner-spin-button, 
        .numberInputBox::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }
    </style>
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

    _initElements() {
        const input = this.shadowRoot.querySelector('input');
        this._elements = {
            input,
        };
    }

    _addHandlers() {
        this._elements.input.addEventListener('input', this._onInput);
    }

    _onInput = (event: any) => {
        event.preventDefault();
        this._elements.input.value = event.target.value[1] || event.target.value[0] || '';
    };

    get value(): string {
        const { input } = this._elements;
        return input.value;
    }

    static get observedAttributes(): string[] {
        return ['value'];
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        const { input } = this._elements;
        switch (name) {
            case 'value':
                if (newValue === 'I') {
                    input.value = '';
                    input.type = 'number';
                    input.name = 'inputNumber';
                } else {
                    input.value = newValue;
                }
                break;
            default:
                break;
        }
    }

    adoptedCallback() {
        // вызывается, когда элемент перемещается в новый документ
        // (происходит в document.adoptNode, используется очень редко)
    }

    // у элемента могут быть ещё другие методы и свойства
}

export default NumberBoxComponent;
