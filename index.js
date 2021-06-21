/**
 * A class to act as the fountation of an element
 */
export class BaseElement extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.me = this.shadowRoot;

        this._initialiseTemplate();
        this._initialiseAttributes();
    }

    /**
     * The template to form the component from 
     * Must be overriden by your class
     * 
     * @returns {string} Returns the current template html
     */
    template() {
        throw new Error('You must define a custom template');
    }

    /**
     * 
     * @param {string} name The name of the attribute to access
     * @param {*} defaultValue The default value to use if the attribute is not set
     * 
     * @returns {*} return the current value of the attribute or defaultValue if it is not set
     */
    attr(name , defaultValue) {
        if (this.hasAttribute(name)) {
            return this._getAttr(name);
        } else {
            return defaultValue;
        }
    }

/**
 * Sets a HTML Attribute
 * 
 * @param {string} name The attrobutes name to set
 * @param {*} value The Attributes value 
 * 
 * @private
 */
    _setAttr(name, value) {
//  #setAttr(name, value) {
        this.setAttribute(name, value);
    }

/**
 * Gets a HTML Attribute 
 * 
 * @param {string} name The attribute name to get the data for
 * @returns {*} The value of the attribute cast to the correct type
 * 
 * @private
 */
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

/**
 * Intialises the template by calling template and assigning it to the innerHTML of a new template tag
 * 
 * @private
 */
    _initialiseTemplate() {
//  #initialiseTemplate() {
        const template = document.createElement('template');
        template.innerHTML = this.template();

        this.me.appendChild(template.content.cloneNode(true));
    }

/** 
 * Initialises the attribute handling code by creating local getters and setters for all declared attributes
 * 
 * @private 
 */
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

/**
 * Used to create a new component and register it auto-magically
 * 
 * @param {string} name The name of the component it should be formed of two words Camel Cased.  
 * @param {BaseElement} component The class to construct the element with it must extend BaseElement
 */
export function makeComponent (name, component) {
    window.customElements.define(name, component);
}