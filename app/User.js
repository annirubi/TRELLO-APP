import { Modal } from "./Modal.js";

export class User {
    #user = {};
    #desks = {};
    #id;
    constructor(id) {
        this.#id = id; 
    }

    get id() {
        return this.#id;
    }

    get user() {
        return this.#user;
    }

    set user(user) {
        this.#user = user;
    }

    get desks() {
        return this.#desks;
    }

    set desks(desks) {
        this.#desks = desks;
    }

    async getAndSendUser(cb, appendDesks, message = "") {
        try {
            const user = await cb();
            this.user = user;
            this.desks = user.desks;
            appendDesks();
        } catch(e) {
            Modal.addErrorLayout(`${message} - ${e.message}`);
        }
    }
}