/**
 * Used to create a new component and register it auto-magically
 *
 * @param {string} name The name of the component it should be formed of two words Camel Cased.
 * @param {BaseElement} component The class to construct the element with it must extend BaseElement
 */
export function makeComponent(name: string, component: BaseElement): void;
/**
 * A class to act as the fountation of an element
 */
export class BaseElement extends HTMLElement {
    me: ShadowRoot;
    /**
     * The template to form the component from
     * Must be overriden by your class
     *
     * @returns {string} Returns the current template html
     */
    template(): string;
    /**
     *
     * @param {string} name The name of the attribute to access
     * @param {*} defaultValue The default value to use if the attribute is not set
     *
     * @returns {*} return the current value of the attribute or defaultValue if it is not set
     */
    attr(name: string, defaultValue: any): any;
    /**
     * Sets a HTML Attribute
     *
     * @param {string} name The attrobutes name to set
     * @param {*} value The Attributes value
     *
     * @private
     */
    private _setAttr;
    /**
     * Gets a HTML Attribute
     *
     * @param {string} name The attribute name to get the data for
     * @returns {*} The value of the attribute cast to the correct type
     *
     * @private
     */
    private _getAttr;
    /**
     * Intialises the template by calling template and assigning it to the innerHTML of a new template tag
     *
     * @private
     */
    private _initialiseTemplate;
    /**
     * Initialises the attribute handling code by creating local getters and setters for all declared attributes
     *
     * @private
     */
    private _initialiseAttributes;
}
