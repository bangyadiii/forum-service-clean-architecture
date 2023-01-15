const CreatedThread = require("../../Domains/threads/entities/CreatedThread");

class ThreadRepositoryPostgres {
    constructor(pool, idGenerator) {
        this._pool = pool;
        this._idGenerator = idGenerator;
        this.createThread = this.createThread.bind(this);
    }

    async createThread(payload) {
        const { title, body, owner } = payload;
        const id = `thread-${this._idGenerator()}`;
        const query = {
            text: "INSERT INTO threads VALUES($1, $2, $3, $4) returning id, title, body, owner",
            values: [id, title, body, owner],
        };
        const res = await this._pool.query(query);
        return new CreatedThread({ ...res.rows[0] });
    }
}

module.exports = ThreadRepositoryPostgres;
