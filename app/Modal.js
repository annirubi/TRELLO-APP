import { root } from "./elements.js";
import { DOM } from "./DOM.js";
import { getDate } from "./utils/date.js";

export class Modal {
    static #errorLayout;
    static #warningModal;
    static #newTodoLayout;

    static addErrorLayout(message) {
        const errorElement = DOM.createNewElement('div', 'modal', 'error', 'modal--toggle');
        errorElement.innerHTML("afterbegin", `<p data-error-message>${message}</p>`);
        Modal.#errorLayout = errorElement;
        root.insertElement("afterend", errorElement);
        errorElement.addEvent("click", (e) => {
            if ("errorMessage" in e.target.dataset) {
                return;
            }
            Modal.#errorLayout.remove();
        })
    }

    static addWarning(cb) {
        const warningElement = DOM.createNewElement("div", "modal", "modal--toggle");
        warningElement.innerHTML("afterbegin", `
        <div class="modal__warning">
        <h3>Are you sure?</h3>
        <div>
        <button class="warning-buttons__cancel" data-btn-cancel>Cancel</button>
        <button class="warning-buttons__confirm" data-btn-confirm>Confirm</button>
        </div>
        </div>
        `);
        Modal.#warningModal = warningElement;
        warningElement.addEvent("click", (e) => {
            const $el = e.target;
            if ("btnCancel" in $el.dataset) {
                this.removeWarningLayout();
                return;
            }
            if ("btnConfirm" in $el.dataset) {
                cb();
                this.removeWarningLayout();
            }
        })
        root.insertElement("afterend", warningElement);
    }

    static removeWarningLayout() {
        if(Modal.#warningModal) {
            Modal.#warningModal.remove();
        }
    }

    static addWarningLimitLayout(limit = "") {
        const warningElement = DOM.createNewElement("div", "modal", "modal--toggle");
        warningElement.innerHTML("afterbegin", `
        <div class="modal__warning">
        <h3>You can add maximum ${limit} todos to Progress Desk</h3>
        <button class="warning-buttons__confirm" data-btn-confirm>Confirm</button>
        </div>
        `);
        Modal.#warningModal = warningElement;
        warningElement.addEvent("click", (e) => {
            const $el = e.target;
            if ("btnConfirm" in $el.dataset) {
                this.removeWarningLayout();
            }
        })
        root.insertElement("afterend", warningElement)
    }

    static addNewTodoLayout(cb) {
        const newTodoElement = DOM.createNewElement("div", "modal", "modal--toggle");
        const formNewTodo = DOM.createNewElement("form", "modal__new-todo");
        formNewTodo.innerHTML("afterbegin", `
        <h3 class="new-todo__header">New Todo</h3>
        <input class="new-todo__title" type="text" placeholder="enter todo title" required>
        <textarea minlength="3" maxlength="50" placeholder="enter todo description" required class="new-todo__description"></textarea>
        <div class="new-todo__buttons">
        <button type="button" class="new-todo__cancel" data-btn-cancel>Cancel</button>
        <button class="new-todo__add" data-btn-add>Add</button>
        </div>
        `)

        formNewTodo.addEvent("click", (e) => {
            if ("btnCancel" in e.target.dataset) {
                this.removeNewTodoLayout();
            }
        })

        formNewTodo.addEvent("submit", (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const title = form.elements[0].value;
            const desc = form.elements[1].value;
            const date = getDate();

            cb({ id: Date.now(), title, desc, date });
            this.removeNewTodoLayout();
        })
        newTodoElement.append(formNewTodo);
        Modal.#newTodoLayout = newTodoElement;
        root.insertElement("afterend", newTodoElement)
    }

    static removeNewTodoLayout() {
        if(Modal.#newTodoLayout) {
            Modal.#newTodoLayout.remove();
        }
    }

    static addEditTodoLayout(el, cb) {
        const editTodoElement = DOM.createNewElement("div", "modal", "modal--toggle");
        const formEditTodo = DOM.createNewElement("form", "modal__new-todo");
        formEditTodo.innerHTML("afterbegin", `
        <h3 class="new-todo__header">Edit</h3>
        <input class="new-todo__title" type="text" placeholder="enter todo title" value="${el.title}" required>
        <textarea minlength="3" maxlength="50" placeholder="enter todo description" required class="new-todo__description">${el.desc}</textarea>
        <div class="new-todo__buttons">
        <button type="button" class="new-todo__cancel" data-btn-cancel>Cancel</button>
        <button class="new-todo__add" data-btn-edit>Edit</button>
        </div>
        `)
        formEditTodo.addEvent("click", (e) => {
            if ("btnCancel" in e.target.dataset) {
                this.removeNewTodoLayout();
            }
        })
        
        formEditTodo.addEvent("submit", (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const title = form.elements[0].value;
            const desc = form.elements[1].value;
            const date = getDate();
            
            cb({ id: el.id, title, desc, date });
            this.removeNewTodoLayout();
        })
        editTodoElement.append(formEditTodo);
        Modal.#newTodoLayout = editTodoElement;
        root.insertElement("afterend", editTodoElement)
    }
}