const ThreadRepository = require("../ThreadRepository");

describe("ThreadRepository", () => {
    it("should throw error when invoke unimplemented method", async () => {
        // Arrange
        const threadRepository = new ThreadRepository();

        // Action & Assert
        await expect(threadRepository.createThread("")).rejects.toThrowError(
            "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED"
        );
        await expect(threadRepository.editThread("")).rejects.toThrowError(
            "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED"
        );
        await expect(threadRepository.deleteThread("")).rejects.toThrowError(
            "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED"
        );
    });
});
