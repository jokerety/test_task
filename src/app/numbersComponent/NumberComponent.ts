const mask = '+7(985)0II-**-**';
const maskArray = mask.split('');

const numberComponentTemplate = `
    <div class="numberInputContainer">
        ${maskArray
            .map(elem => {
                if (elem === '+' || elem === '(' || elem === ')' || elem === '-') return elem;
                return `<number-box value=${elem}> </number-box>`;
            })
            .join('')}
    </div>
`;

class NumberComponent extends HTMLElement {
    constructor() {
        super();
        // элемент создан
    }

    connectedCallback() {
        this.innerHTML = numberComponentTemplate;
    }

    disconnectedCallback() {}

    static get observedAttributes(): string[] {
        return ['mask'];
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        // вызывается при изменении одного из перечисленных выше атрибутов
    }
}

export default NumberComponent;
