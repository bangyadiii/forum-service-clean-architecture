const NewThread = require("../../Domains/threads/entities/NewThread");

class ThreadsUseCase {
    constructor({ threadRepository, userRepository }) {
        this._threadRepository = threadRepository;
        this._usersRepository = userRepository;
    }

    async createThread(payload) {
        this._validatePayload(payload);
        const { credentialId } = payload;
        await this._usersRepository.getUserById(credentialId);

        payload.owner = payload.credentialId;

        const newThread = new NewThread(payload);
        return await this._threadRepository.createThread(newThread);
    }

    _validatePayload(payload) {
        const { credentialId } = payload;
        if (!credentialId) {
            throw new Error("AUTHENTICATION.UNAUTHENTICATED");
        }
    }
}

module.exports = ThreadsUseCase;
