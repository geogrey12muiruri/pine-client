import TrouserModel from '../models/trouser.model';

/**
 * Get a trouser by its ID.
 * @param {string} id - The ID of the trouser to retrieve.
 * @returns {Promise<Document | null>} - A promise that resolves with the trouser document or null if not found.
 */
export const getTrouserByIdService = async (id: string) => {
    try {
        const trouser = await TrouserModel.findById(id);
        return trouser;
    } catch (error) {
        throw new Error(`Error retrieving trouser by ID: ${error}`);
    }
};

/**
 * Get all trousers.
 * @returns {Promise<Document[]>} - A promise that resolves with an array of trouser documents.
 */
export const getAllTrousersService = async () => {
    try {
        const trousers = await TrouserModel.find({});
        return trousers;
    } catch (error) {
        throw new Error(`Error retrieving all trousers: ${error}`);
    }
};
