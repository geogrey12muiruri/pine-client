import ShirtModel from '../models/shirt.model';

/**
 * Get a shirt by its ID.
 * @param {string} id - The ID of the shirt to retrieve.
 * @returns {Promise<Document | null>} - A promise that resolves with the shirt document or null if not found.
 */
export const getShirtByIdService = async (id: string) => {
    try {
        const shirt = await ShirtModel.findById(id);
        return shirt;
    } catch (error) {
        throw new Error(`Error retrieving shirt by ID: ${error}`);
    }
};

/**
 * Get all shirts.
 * @returns {Promise<Document[]>} - A promise that resolves with an array of shirt documents.
 */
export const getAllShirtsService = async () => {
    try {
        const shirts = await ShirtModel.find({});
        return shirts;
    } catch (error) {
        throw new Error(`Error retrieving all shirts: ${error}`);
    }
};
