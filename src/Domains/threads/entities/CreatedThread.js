class CreatedThread {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, title, body, owner } = payload;

        this.id = id;
        this.title = title;
        this.body = body;
        this.owner = owner;
    }

    _verifyPayload({ id, title, body, owner }) {
        if (!id || !title || !body || !owner) {
            throw new Error("CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
        }

        if (
            typeof id !== "string" ||
            typeof title !== "string" ||
            typeof body !== "string" ||
            typeof owner !== "string"
        ) {
            throw new Error("CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
        }
    }
}

module.exports = CreatedThread;
