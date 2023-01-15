const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const NewThread = require("../../../Domains/threads/entities/NewThread");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const UserRepository = require("../../../Domains/users/UserRepository");

const ThreadsUseCase = require("../ThreadsUseCase");

describe("ThreadUseCase", () => {
    beforeAll(async () => {
        await UsersTableTestHelper.cleanTable();
    });

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
    });

    it("should throw error when credentialId was empty", async () => {
        const newThreadPayload = {
            title: "new thread title",
            body: "This is the thread body, the thread body was so long string",
        };
        const mockThreadRepository = new ThreadRepository();
        const mockUserRepository = new UserRepository();

        // create Thread Use Case
        const threadUseCase = new ThreadsUseCase({
            threadRepository: mockThreadRepository,
            userRepository: mockUserRepository,
        });

        // action & assert
        await expect(
            threadUseCase.createThread(newThreadPayload)
        ).rejects.toThrowError("AUTHENTICATION.UNAUTHENTICATED");
    });

    /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
    it("should orchestrating the add thread action correctly", async () => {
        await UsersTableTestHelper.addUser({
            id: "user-333",
            username: "eekek",
        });
        const newThreadPayload = {
            title: "new thread title",
            body: "This is the thread body, the thread body was so long string",
            credentialId: "user-333",
        };

        const expectedCreatedThread = new NewThread({
            id: "thread-123",
            title: newThreadPayload.title,
            body: newThreadPayload.body,
            owner: newThreadPayload.credentialId,
        });
        const expectedUser = {
            id: newThreadPayload.credentialId,
            username: "eekek",
        };

        const mockThreadRepository = new ThreadRepository();
        const mockUserRepository = new UserRepository();
        mockThreadRepository.createThread = jest
            .fn()
            .mockImplementation(() => Promise.resolve(expectedCreatedThread));

        mockUserRepository.getUserById = jest
            .fn()
            .mockImplementation(() => Promise.resolve(expectedUser));

        // create Thread Use Case
        const threadUseCase = new ThreadsUseCase({
            threadRepository: mockThreadRepository,
            userRepository: mockUserRepository,
        });

        const createdNewThread = await threadUseCase.createThread(
            newThreadPayload
        );

        // assert
        expect(mockUserRepository.getUserById).toBeCalledWith(
            newThreadPayload.credentialId
        );
        expect(createdNewThread).toStrictEqual(expectedCreatedThread);
        expect(mockThreadRepository.createThread).toBeCalledWith(
            new NewThread(newThreadPayload)
        );
    });
});
