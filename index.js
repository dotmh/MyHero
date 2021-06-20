export class BaseElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.me = this.shadowRoot;

        this.#initialiseTemplate();
        this.#initialiseAttributes();
    }

    template() {
        throw new Error('You must define a custom template');
    }

    attr(name , defaultValue) {
        if (this.hasAttribute(name)) {
            return this.#getAttr(name);
        } else {
            return defaultValue;
        }
    }

    #setAttr(name, value) {
        this.setAttribute(name, value);
    }

    #getAttr(name) {
        const attr = this.getAttribute(name);
        if (attr === 'true' || attr === 'false') {
            return attr === 'true';
        } else if (Number.isNaN(+attr) === false) {
            return +attr;
        } else {
            return attr;
        }
    }

    #initialiseTemplate() {
        const template = document.createElement('template');
        template.innerHTML = this.template();

        this.me.appendChild(template.content.cloneNode(true));
    }

    #initialiseAttributes() {
        [...this.getAttributeNames()].forEach((attribute) => {
            const _this = this;

            const prop = {};
            prop[attribute] = {};
            prop[attribute].set = (value) => _this.#setAttr(attribute, value);
            prop[attribute].get = () => _this.#getAttr(attribute);

            Object.defineProperties(this, prop);
        });
    }
}

export function makeComponent (name, component) {
    window.customElements.define(name, component);
}