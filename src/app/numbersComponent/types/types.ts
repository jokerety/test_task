interface MaskNumberInterface {
    /**
     * Маска инпута имеет значения:
     * "I" - одиночный инпут для ввода одной цифры (соответсвует типу input)
     * "X" - серый блок с символом "X" (соответсвует типу inputMock)
     * "*" - серый блок с символом "●" (соответсвует типу inputMock)
     * <цифра> - серый блок с введенной цифрой (соответсвует типу inputMock)
     * <не цифра> - символ отображается "как есть" (соответсвует типу separator)
     * При парсинге маски для каждого одиночного символа выставляем тип:
     * type - "input | inputMock | separator "
     * value - значение символа
     */
    type: string;
    value: string;
}

interface CustomElement extends HTMLInputElement {
    /**
     * Расширение типа HTMLInputElement c методами error и success
     * error(): добавляет стиль ошибки элемента
     * success(): убирает стиль ошибки элемента
     */
    error: () => void;
    success: () => void;
}

export { MaskNumberInterface, CustomElement };
