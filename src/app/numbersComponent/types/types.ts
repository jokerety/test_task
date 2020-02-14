interface MaskNumberInterface {
    type: string;
    value: string;
}

interface CustomElement extends HTMLInputElement {
    error: () => void;
    success: () => void;
}

export { MaskNumberInterface, CustomElement };
