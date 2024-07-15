// blazer.service.ts
import BlazerModel from '../models/blazer.model';

/**
 * Get a blazer by its ID.
 * @param {string} id - The ID of the blazer to retrieve.
 * @returns {Promise<Document | null>} - A promise that resolves with the blazer document or null if not found.
 */
export const getBlazerByIdService = async (id: string) => {
    try {
        const blazer = await BlazerModel.findById(id);
        return blazer;
    } catch (error) {
        throw new Error(`Error retrieving blazer by ID: ${error}`);
    }
};

/**
 * Get all blazers.
 * @returns {Promise<Document[]>} - A promise that resolves with an array of blazer documents.
 */
export const getAllBlazersService = async () => {
    try {
        const blazers = await BlazerModel.find({});
        return blazers;
    } catch (error) {
        throw new Error(`Error retrieving all blazers: ${error}`);
    }
};