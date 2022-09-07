import { $ } from "./DOM.js";

const clockField = $("[data-clock]");
const createTemplate = $("[data-create-template]");
const progressTemplate = $("[data-progress-template]");
const doneTemplate = $("[data-done-template]");

const createCount = $("[data-todo-desk-count]");
const progressCount = $("[data-progress-desk-count]");
const doneCount = $("[data-done-desk-count]");

const createDesc = $("[data-todo-desk-content]");
const progressDesc = $("[data-progress-desk-content]");
const doneDesc = $("[data-done-desk-content]");

const root = $("[data-root]");

const btnRemoveAll = $("[data-btn-remove-all]");
const btnAddTodo = $("[data-btn-add]");
const headerUserName = $("[data-header-user]");
const headerAvatar = $("[data-header-avatar]");

export {
    clockField,
    createTemplate,
    progressTemplate,
    doneTemplate,
    createDesc,
    progressDesc,
    doneDesc,
    createCount,
    progressCount,
    doneCount,
    root,
    btnRemoveAll,
    btnAddTodo,
    headerUserName,
    headerAvatar
}