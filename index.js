export class BaseElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.me = this.shadowRoot;

        this._initialiseTemplate();
        this._initialiseAttributes();
    }

    template() {
        throw new Error('You must define a custom template');
    }

    attr(name , defaultValue) {
        if (this.hasAttribute(name)) {
            return this._getAttr(name);
        } else {
            return defaultValue;
        }
    }

/** @private */
    _setAttr(name, value) {
//  #setAttr(name, value) {
        this.setAttribute(name, value);
    }

/** @private */
    _getAttr(name) {
//  #getAttr(name) {
        const attr = this.getAttribute(name);
        if (attr === 'true' || attr === 'false') {
            return attr === 'true';
        } else if (Number.isNaN(+attr) === false) {
            return +attr;
        } else {
            return attr;
        }
    }

/** @private */
    _initialiseTemplate() {
//  #initialiseTemplate() {
        const template = document.createElement('template');
        template.innerHTML = this.template();

        this.me.appendChild(template.content.cloneNode(true));
    }

/** @private */
    _initialiseAttributes() {
//  #initialiseAttributes() {
        [...this.getAttributeNames()].forEach((attribute) => {
            const _this = this;

            const prop = {};
            prop[attribute] = {};
            prop[attribute].set = (value) => _this._setAttr(attribute, value);
            prop[attribute].get = () => _this._getAttr(attribute);

            Object.defineProperties(this, prop);
        });
    }
}

export function makeComponent (name, component) {
    window.customElements.define(name, component);
}