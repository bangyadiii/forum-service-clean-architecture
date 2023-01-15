class NewThread {
    constructor(payload) {
        this._verifyPayload(payload);

        this.title = payload.title;
        this.body = payload.body;
        this.owner = payload.owner;
    }

    _verifyPayload(payload) {
        const { title, body, owner } = payload;
        if (!owner) {
            throw new Error("AUTHENTICATION.UNAUTHENTICATED");
        }

        if (!title || !body) {
            throw new Error("THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
        }

        if (
            typeof title !== "string" ||
            typeof body !== "string" ||
            typeof owner !== "string"
        ) {
            throw new Error("THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
        }
    }
}

module.exports = NewThread;
