const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const NewThread = require("../../../Domains/threads/entities/NewThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");

describe("ThreadRepositoryPostgres", () => {
    beforeAll(async () => {
        await UsersTableTestHelper.cleanTable();
    });

    afterEach(async () => {
        await ThreadTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe("createThread function", () => {
        it("should create new thread to database and return created thread correctly", async () => {
            await UsersTableTestHelper.addUser({
                id: "user-123",
            });

            const newThread = new NewThread({
                title: "new title thread",
                body: "this is long thread",
                owner: "user-123",
            });

            const fakeIdGenerator = () => "123";
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(
                pool,
                fakeIdGenerator
            );

            // Action
            await threadRepositoryPostgres.createThread(newThread);

            // Assert
            const thread = await ThreadTableTestHelper.findThreadById(
                "thread-123"
            );
            expect(thread).toHaveLength(1);
        });
    });
});
