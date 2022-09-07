import { API } from "./API.js"
import { DesksLogic } from "./DesksLogic.js"
import { $, DOM } from "./DOM.js"
import { createTemplate, progressTemplate, doneTemplate, createDesc, progressDesc, doneDesc, createCount, progressCount, doneCount, btnRemoveAll, btnAddTodo, headerUserName, headerAvatar } from "./elements.js"
import { User } from "./User.js"
import { getDate } from "./utils/date.js"
import { ERROR_RECEIVING_MESSAGE, ERROR_REMOVING_MESSAGE } from "./messages.js";

export class Desks extends User {
    constructor(id) {
        super(id);
    }

    deskLogic() {
        return new DesksLogic(this.user, this.getAndSendUser.bind(this),
        this.appendDesks.bind(this)
        );
    }

    appendDesks() {
        createDesc.clear();
        progressDesc.clear();
        doneDesc.clear();
        headerUserName.addContent(this.user.name);
        headerAvatar.$el.src = this.user.avatar;
        const $logic = this.deskLogic();
        $logic.appendCreateTodos();
        $logic.appendProgressTodos();
        $logic.appendDoneTodos();
    }

    render() {
        this.getAndSendUser(
            () => API.getOneUser(this.id), 
            this.appendDesks.bind(this),
            ERROR_RECEIVING_MESSAGE
            )
        btnRemoveAll.addEvent("click", () => {
            this.deskLogic().removeAll();
        })
        btnAddTodo.addEvent("click", () => {
            this.deskLogic().addNewTodo();
        })
    }
}