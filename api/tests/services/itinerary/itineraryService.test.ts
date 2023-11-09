import { insertItinerary, updateItinerary, selectItinerary, Itinerary, itineraryExists } from "../../../src/models";
import { validateItinerary } from "../../../src/validators/itineraryValidators";
import { createNewItinarary, editItinerary, getItinerary } from "../../../src/services/itinerary/itineraryService";
import { v4 as uuid } from 'uuid'
import { DoesNotExistError, ValidationError } from "../../../src/errors";

jest.mock("../../../src/validators/itineraryValidators")
jest.mock("../../../src/models")

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

    test('create new itinerary works for valid itinerary', () => {
        const newItinerary: Itinerary = {
            createdBy: 'test user',
            editors: [],
            viewers: [],
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-01-16'),
            name: 'Test trip'
        }
        const mockInsert = insertItinerary as jest.MockedFunction<typeof insertItinerary>
        mockInsert.mockReturnValue(validItinerary)
        const mockValidate = validateItinerary as jest.MockedFunction<typeof validateItinerary>
        mockValidate.mockReturnValue()

        const result = createNewItinarary(newItinerary)

        expect(result).toBe(validItinerary)
        expect(mockValidate).toHaveBeenCalled()
        expect(mockInsert).toHaveBeenCalled()
    })

    test('create new itinerary throws error when not valid', () => {
        // bad because start is after end
        const newItinerary: Itinerary = {
            createdBy: 'test user',
            editors: [],
            viewers: [],
            startDate: new Date('2023-05-01'),
            endDate: new Date('2023-01-16'),
            name: 'Test trip'
        }
        const mockInsert = insertItinerary as jest.MockedFunction<typeof insertItinerary>
        const mockValidate = validateItinerary as jest.MockedFunction<typeof validateItinerary>
        mockValidate.mockReturnValue('Invalid date range.')

        const call = () => createNewItinarary(newItinerary)

        expect(call).toThrow(ValidationError)
        expect(mockValidate).toHaveBeenCalled()
        expect(mockInsert).not.toHaveBeenCalled()
    })

    test('get itinerary works for itinerary that exists', () => {
        const mockSelect = selectItinerary as jest.MockedFunction<typeof selectItinerary>
        mockSelect.mockReturnValue(validItinerary)

        const result = getItinerary(validId)

        expect(result).toBe(validItinerary)
    })

    test('get itinerary throws for id does not exist', () => {
        const call = () => getItinerary(validId)

        expect(call).toThrow(DoesNotExistError)
    })

    test('edit itinerary successfully', () => {
        const newItinerary: Itinerary = {
            id: validId,
            createdBy: 'test user EDIT',
            editors: [],
            viewers: [],
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-01-16'),
            name: 'Test trip EDIT'
        }
        const mockUpdate = updateItinerary as jest.MockedFunction<typeof updateItinerary>
        mockUpdate.mockReturnValue(newItinerary)
        const mockValidate = validateItinerary as jest.MockedFunction<typeof validateItinerary>
        mockValidate.mockReturnValue()
        const mockSelect = itineraryExists as jest.MockedFunction<typeof itineraryExists>
        mockSelect.mockReturnValue(true)

        const result = editItinerary(newItinerary)

        expect(result).toBe(newItinerary)
        expect(mockValidate).toHaveBeenCalled()
        expect(mockUpdate).toHaveBeenCalled()
    })

    test('edit itinerary fails because id does not exist', () => {
        const newItinerary: Itinerary = {
            id: uuid(),
            createdBy: 'test user',
            editors: [],
            viewers: [],
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-01-16'),
            name: 'Test trip'
        }
        const mockSelect = itineraryExists as jest.MockedFunction<typeof itineraryExists>
        mockSelect.mockReturnValue(false)

        const call = () => editItinerary(newItinerary)

        expect(call).toThrow(DoesNotExistError)
        expect(mockSelect).toHaveBeenCalled()
    })

    test('edit itinerary fails because not valid', () => {
        // bad because start is after end
        const newItinerary: Itinerary = {
            id: validId,
            createdBy: 'test user',
            editors: [],
            viewers: [],
            startDate: new Date('2023-05-01'),
            endDate: new Date('2023-01-16'),
            name: 'Test trip'
        }
        const mockValidate = validateItinerary as jest.MockedFunction<typeof validateItinerary>
        mockValidate.mockReturnValue('Invalid date range.')

        const call = () => createNewItinarary(newItinerary)

        expect(call).toThrow(ValidationError)
        expect(mockValidate).toHaveBeenCalled()
    })
})