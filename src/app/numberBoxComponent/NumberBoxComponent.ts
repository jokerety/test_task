const numberBoxTemplate = `
    <style>
    .numberInputBox {
      margin-right: 4px;
      border-radius: 2px;
      background-color: #F0F0F0;;
      width: 25px;
      height: 32px;
      padding: 7px 8px 8px 8px;
      font-size: 15px;
      line-height: 18px;
      box-sizing: border-box;
      border: 0;
      outline: 0;
    }
    
    .numberInputBox:hover {
      border: 1px solid rgba(0, 0, 0, 0.48);
    }
    .numberInputBox:focus {
        border: 1px solid rgba(255,0,1,0.48);
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

    _onInput = event => {
        event.preventDefault();
        this._elements.input.value = event.target.value;
    }

    connectedCallback() {
        //this.innerHTML = numberBoxTemplate;
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    static get observedAttributes(): string[] {
        return ['value'];
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        switch (name) {
            case 'value':
                const { input } = this._elements;
                /**
                 * Маска инпута. Значения:
                 * "I" - одиночный инпут для ввода одной цифры
                 * "X" - серый блок с символом "X"
                 * "*" - серый блок с символом "●"
                 * <цифра> - серый блок с введенной цифрой
                 * <не цифра> - символ отображается "как есть"
                 */

                if (newValue === 'I') {
                    input.value = '';
                } else {
                    input.disabled = true;
                    input.value = newValue;

                    if (newValue === 'X') {
                    } else if (newValue === '*') {
                    } else if (Number.isInteger(newValue) && Number(newValue) >= 0 && Number(newValue) <= 9) {
                    } else {
                    }
                }
        }
    }

    adoptedCallback() {
        // вызывается, когда элемент перемещается в новый документ
        // (происходит в document.adoptNode, используется очень редко)
    }

    // у элемента могут быть ещё другие методы и свойства
}

export default NumberBoxComponent;
