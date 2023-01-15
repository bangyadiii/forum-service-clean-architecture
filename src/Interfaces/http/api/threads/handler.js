const ThreadsUseCase = require("../../../../Applications/use_case/ThreadsUseCase");

class ThreadsHandler {
    constructor(container) {
        this._container = container;

        this.postThreadHandler = this.postThreadHandler.bind(this);
    }

    async postThreadHandler(request, h) {
        const threadsUseCase = this._container.getInstance(ThreadsUseCase.name);
        const { id: credentialId } = request.auth.credentials;
        const addedThread = await threadsUseCase.createThread({
            ...request.payload,
            credentialId,
        });

        const response = h.response({
            status: "success",
            data: {
                addedThread,
            },
        });
        response.code(201);
        return response;
    }
}

module.exports = ThreadsHandler;
