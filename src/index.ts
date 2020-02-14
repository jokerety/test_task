import NumberInput from './app/numbersComponent/NumberComponent';
import NumberBoxComponent from './app/numberBoxComponent/NumberBoxComponent';

customElements.define('number-box', NumberBoxComponent);
customElements.define('number-input', NumberInput);

export { NumberBoxComponent, NumberInput };
