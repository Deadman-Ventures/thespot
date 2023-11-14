import { insertItinerary, updateItinerary, selectItinerary, Itinerary } from "../../src/models";
import { query } from '../../src/db'
import { v4 as uuid } from 'uuid'
import { QueryArrayResult } from "pg";

jest.mock('../../src/db');

describe('unit tests for the itinerary services', () => {
    const validId = uuid()
    const validItinerary: Itinerary = {
        id: validId,
        createdBy: 'test user',
        editors: [],
        viewers: [],
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-01-16'),
        name: 'Test trip'
    }

    beforeAll(() => {
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    test('create new itinerary works for valid itinerary', async () => {
        const newItinerary: Itinerary = {
            createdBy: 'test user',
            editors: [],
            viewers: [],
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-01-16'),
            name: 'Test trip'
        }
        const mockQuery = query as jest.MockedFunction<typeof query>
        mockQuery.mockResolvedValue({
            rows: [{ ...validItinerary }], rowCount: 1, fields: [1],
            command: '', oid: 1
        } as unknown as QueryArrayResult)

        const result = await insertItinerary(newItinerary)

        expect(result).toEqual(validItinerary)
    })

    test('select itinerary by id', async () => {
        const mockQuery = query as jest.MockedFunction<typeof query>
        mockQuery.mockResolvedValue({
            rows: [{ ...validItinerary }], rowCount: 1, fields: [1],
            command: '', oid: 1
        } as unknown as QueryArrayResult)
        const result = await selectItinerary(validId)

        expect(result).toEqual(validItinerary)
    })

    test('select itinerary id does not exist', async () => {
        const mockQuery = query as jest.MockedFunction<typeof query>
        mockQuery.mockResolvedValue({ rows: [], rowCount: 1, fields: [1], command: '', oid: 1 } as unknown as QueryArrayResult)
        const result = await selectItinerary(validId)

        expect(result).toEqual(undefined)
    })

    test('update existing itinerary', async () => {
        const newItinerary: Itinerary = {
            id: validId,
            createdBy: 'test user',
            editors: ['random editor'],
            viewers: [],
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-01-20'),
            name: 'Test trip with updates'
        }
        const mockQuery = query as jest.MockedFunction<typeof query>
        mockQuery.mockResolvedValue({
            rows: [{ ...newItinerary }], rowCount: 1, fields: [1],
            command: '', oid: 1
        } as unknown as QueryArrayResult)

        const result = await updateItinerary(newItinerary)

        expect(result).toEqual(newItinerary)
    })
})