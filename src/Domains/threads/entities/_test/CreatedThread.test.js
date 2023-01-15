const CreatedThread = require("../CreatedThread");

describe("CreatedThread", () => {
    it("should throw error when payload not contain needed property", () => {
        // Arrange
        const payload = {
            owner: "user-123",
            id: false,
        };

        // Action & Assert
        expect(() => new CreatedThread(payload)).toThrowError(
            "CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
        );
    });

    it("should throw error when payload not meet data type specification", () => {
        const payload = {
            id: true,
            title: true,
            body: "akdssjdkj",
            owner: "user-123",
        };

        // Action & Assert
        expect(() => new CreatedThread(payload)).toThrowError(
            "CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
        );
    });

    it("should have correct created threads properties", () => {
        const payload = {
            id: "thread-123",
            title: "new thread",
            body: "this thread is wonderful",
            owner: "user-123",
        };
        const createdThread = new CreatedThread(payload);
        // Action & Assert
        expect(createdThread).toBeInstanceOf(CreatedThread);
        expect(createdThread.title).toEqual(payload.title);
        expect(createdThread.body).toEqual(payload.body);
        expect(createdThread.id).toEqual(payload.id);
        expect(createdThread.owner).toEqual(payload.owner);
    });
});
