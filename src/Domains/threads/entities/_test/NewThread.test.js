const NewThread = require("../NewThread");

describe("Create New Thread", () => {
    it("should throw error when payload not meet data type specification", () => {
        const payload = {
            title: true,
            body: "akdssjdkj",
            owner: "user-123",
        };

        // Action & Assert
        expect(() => new NewThread(payload)).toThrowError(
            "THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
        );
    });

    it("should throw error when payload not contain needed property", () => {
        // Arrange
        const payload = {
            owner: "user-123",
        };

        // Action & Assert
        expect(() => new NewThread(payload)).toThrowError(
            "THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
        );
    });

    it("should throw error when unauthenticated", () => {
        // Arrange
        const payload = {
            body: "long body",
        };

        // Action & Assert
        expect(() => new NewThread(payload)).toThrowError(
            "AUTHENTICATION.UNAUTHENTICATED"
        );
    });

    it("should create NewThread when payload is valid ", () => {
        const payload = {
            title: "new thread",
            body: "this thread is wonderful",
            owner: "user-123",
        };
        const newThread = new NewThread(payload);
        // Action & Assert
        expect(newThread).toBeInstanceOf(NewThread);
        expect(newThread.title).toEqual(payload.title);
        expect(newThread.body).toEqual(payload.body);
    });
});
