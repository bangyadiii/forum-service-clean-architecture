/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const ThreadsTableTestHelper = {
    async addThread({
        id = "thread-123",
        title = "dicoding",
        body = "long thread body",
    }) {
        const query = {
            text: "INSERT INTO threads VALUES($1, $2, $3)",
            values: [id, title, body],
        };

        await pool.query(query);
    },

    async findThreadById(id) {
        const query = {
            text: "SELECT * FROM threads WHERE id = $1",
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query("DELETE FROM threads WHERE 1=1");
    },
};

module.exports = ThreadsTableTestHelper;
