export const $ = (selector) => new DOM(selector);
export class DOM {
    static createNewElement = (tag, ...classes) => {
        const el = document.createElement(tag);
        if(classes.length) {
            el.classList.add(...classes)
        }
        return $(el);
    }
    constructor(selector) {
        if (typeof selector === "string") {
            this.$el = document.querySelector(selector)
        } else {
            this.$el = selector;
        }
    }

    addEvent(type, cb) {
        this.$el.addEventListener(type, cb);
    }

    removeEvent(type, cb) {
        this.$el.removeEventListener(type, cb);
    }

    innerHTML(position, html) {
        this.$el.insertAdjacentHTML(position, html);
    }
    insertElement(position, element) {
        if(element instanceof DOM) {
            element = element.$el;
        }
        this.$el.insertAdjacentElement(position, element);
    }
    clear() {
        this.$el.innerHTML = "";
    }

    find(selector) {
        if (selector) {
            return $(this.$el.querySelector(selector))
        }
    }

    addContent(textContent) {
        if(typeof textContent === "string" || typeof textContent === "number") {
            this.$el.textContent = textContent;
        }
        return this.$el.textContent;
    }

    append(element) {
        if(element instanceof DOM) {
            element = element.$el;
        }
        this.$el.append(element)
    }

    remove() {
        this.$el.remove();
    }
}

