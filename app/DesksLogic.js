import { API } from "./API.js";
import { $ } from "./DOM.js";
import { createCount, createDesc, createTemplate, progressCount, progressDesc, progressTemplate, doneCount, doneDesc, doneTemplate } from "./elements.js";
import { ERROR_MOVING_MESSAGE, ERROR_REMOVING_MESSAGE, ERROR_CREATING_MESSAGE, ERROR_EDITING_MESSAGE } from "./messages.js";
import { Modal } from "./Modal.js";

export class DesksLogic {
    constructor(user, getAndSaveUser, appendDesks) {
        this.user = user;
        this.desks = user.desks;
        this.id = user.id;
        this.getAndSaveUser = getAndSaveUser;
        this.appendDesks = appendDesks;
    }

    innerLogic(el, layout) {
        const title = layout.find("[data-todo-title]");
        title.addContent(el.title);
        const desc = layout.find("[data-todo-desc-content]");
        desc.addContent(el.desc);
        const userName = layout.find("[data-todo-user]");
        userName.addContent(this.user.name);
        const todoDate = layout.find("[data-todo-date]");
        todoDate.addContent(el.date);
    }

    putUserLogic(desks, message = "") {
        this.getAndSaveUser(() => API.putOneUser(this.id, {desks: desks}), 
        this.appendDesks,
        message
        )
    }

    appendCreateTodos() {
        const { create } = this.desks;
        createCount.addContent(create.length);
        if (create.length) {
            create.forEach(el => {
                const createLayout = $(document.importNode(createTemplate.$el.content, true));
                this.innerLogic(el, createLayout);
                const btnMove = createLayout.find("[data-todo-btn-move]");
                btnMove.addEvent("click", () => {
                const limit = 4;
                if (this.desks.progress.length >= limit) {
                    Modal.addWarningLimitLayout(limit);
                    return;
                }
                const newCreateDesk = this.desks.create.filter(todo => todo.id !== el.id)
                const newProgressDesk = [...this.desks.progress, el];  
                const newDesks = {
                    ...this.desks,
                    create: newCreateDesk,
                    progress: newProgressDesk
                };
                this.putUserLogic(newDesks, ERROR_MOVING_MESSAGE);
                });

                const btnRemove = createLayout.find("[data-todo-btn-remove]");
                btnRemove.addEvent("click", () => {
                    this.removeTodo("create", el);
                });

                const btnEdit = createLayout.find("[data-todo-btn-edit]");
                btnEdit.addEvent("click", () => {
                    const editTodo = (newEl) => {
                        const newCreate = [...this.desks.create].map(todo => {
                            if (todo.id === el.id) {
                                return newEl;
                            }
                            return todo;
                        });
                    const newDesks = { ...this.desks, create: newCreate }
                    this.putUserLogic(newDesks, ERROR_EDITING_MESSAGE);
                    }
                    Modal.addEditTodoLayout(el, editTodo);
                })
                createDesc.append(createLayout);
            })
        } else {
            createDesc.innerHTML("afterbegin", `<p>No todos yet...</p>`);
        }
    }

    appendProgressTodos() {
        const { progress } = this.desks;
        progressCount.addContent(progress.length);
        if (progress.length) {
        progress.forEach(el => {
            const progressLayout = $(document.importNode(progressTemplate.$el.content, true));
            this.innerLogic(el, progressLayout);

            const btnMove = progressLayout.find("[data-todo-btn-move]");
            btnMove.addEvent("click", () => {
                const newProgressDesk = this.desks.progress.filter(todo => todo.id !== el.id)
                const newDoneDesk = [...this.desks.done, el];  
                const newDesks = {
                    ...this.desks,
                    progress: newProgressDesk,
                    done: newDoneDesk
                };
                this.putUserLogic(newDesks, ERROR_MOVING_MESSAGE);
                });

                const btnBack = progressLayout.find("[data-todo-btn-back]");
                btnBack.addEvent("click", () => {
                    const newProgressDesk = this.desks.progress.filter(todo => todo.id !== el.id);
                    const newCreateDesk = [...this.desks.create, el];
                    const newDesks = {
                        ...this.desks, 
                        create: newCreateDesk,
                        progress: newProgressDesk
                    }
                    this.putUserLogic(newDesks, ERROR_MOVING_MESSAGE);
                });

                const btnRemove = progressLayout.find("[data-todo-btn-remove]");
                btnRemove.addEvent("click", () => {
                    this.removeTodo("progress", el);
                });
            progressDesc.append(progressLayout);
        }) 
    } else {
        progressDesc.innerHTML("afterbegin", `<p>No todos yet...</p>`);
    };
    }

    appendDoneTodos() {
        const { done } = this.desks;
        doneCount.addContent(done.length);
        if (done.length) {
        done.forEach(el => {
        const doneLayout = $(document.importNode(doneTemplate.$el.content, true));
        this.innerLogic(el, doneLayout);
        const btnRemove = doneLayout.find("[data-todo-btn-remove]");
        btnRemove.addEvent("click", () => {
            this.removeTodo("done", el);
        });
        doneDesc.append(doneLayout);
        }) 
    } else {
        doneDesc.innerHTML("afterbegin", `<p>No todos yet...</p>`);
    };

    }
    removeTodo(desk, el) {
        const newTodo = this.desks[desk]
        .filter(todo => todo.id !== el.id);
        const newDesks = {...this.desks, [desk]: newTodo};
        this.putUserLogic(newDesks, ERROR_REMOVING_MESSAGE);
    }

    removeAll() {
        const remove = () => {
            const newDesks = {
                ...this.desks,
                done: []
            }
            this.putUserLogic(newDesks, ERROR_REMOVING_MESSAGE);
        }
        Modal.addWarning(remove);
    }
    addNewTodo() {
        const createTodo = (newTodo) => {
            const newCreate = [...this.desks.create, newTodo];
            const newDesks = { ...this.desks, create: newCreate }
            this.putUserLogic(newDesks, ERROR_CREATING_MESSAGE);
        }
        Modal.addNewTodoLayout(createTodo);
    }
}