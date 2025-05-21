import BunnyElement from "./BunnyElement";

export default class BunnyContainer<T extends HTMLElement> extends BunnyElement<T> {

    constructor(tagName: string) {
        super(tagName);
        this.attr({ _key: this._generateKey(20) });
    }

    public _generateKey(length: number) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < length; i++) {
            key += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return key;
    }

    public getAllChildrens() {
        return Array.from(this.element.children);
    }
}