import {
    validateItinerary, isValidItineraryDates,
    isValidItineraryName
} from "../../src/validators/itineraryValidators.js";
import { Itinerary } from "../../src/models/itinerary.js";
import { ItineraryValidationMessages } from "../../src/types/validationMessages.js";


describe('unit tests for the itinerary validators', () => {
    beforeAll(() => {

    })

    afterEach(() => {
    })

    test('valid name', () => {
        const name = 'test trip name'

        const result = isValidItineraryName(name)

        expect(result).toBe(true)
    })

    test('invalid name', () => {
        const name = 'test trip name that is way too long becuase it is more than 50 char'

        const result = isValidItineraryName(name)

        expect(result).toBe(false)
    })

    test('invalid dates', () => {
        const start = new Date('2023-06-10')
        const end = new Date('2023-01-01')

        const result = isValidItineraryDates(start, end)

        expect(result).toBe(false)
    })

    test('valid dates', () => {
        const start = new Date('2022-06-10')
        const end = new Date('2023-01-01')

        const result = isValidItineraryDates(start, end)

        expect(result).toBe(true)
    })

    test('invalid name in itinerary returns proper message', () => {
        const itinerary: Itinerary = {
            name: 'test trip name that is way too long becuase it is more than 50 char',
            createdBy: 'test user',
            editors: [],
            viewers: [],
            endDate: new Date('2023-01-01'),
            startDate: new Date('2022-06-10')
        }

        const result = validateItinerary(itinerary)

        expect(result).toBe(ItineraryValidationMessages.INVALID_NAME)
    })

    test('invalid dates in itinerary returns proper message', () => {
        const itinerary: Itinerary = {
            name: 'test trip',
            createdBy: 'test user',
            editors: [],
            viewers: [],
            endDate: new Date('2023-01-01'),
            startDate: new Date('2023-06-10')
        }

        const result = validateItinerary(itinerary)

        expect(result).toBe(ItineraryValidationMessages.INVALID_DATE_RANGE)
    })

    test('invalid dates and name in itinerary returns proper message', () => {
        const itinerary: Itinerary = {
            name: 'test trip name that is way too long becuase it is more than 50 char',
            createdBy: 'test user',
            editors: [],
            viewers: [],
            endDate: new Date('2023-01-01'),
            startDate: new Date('2023-06-10')
        }

        const result = validateItinerary(itinerary)

        expect(result).toBe(ItineraryValidationMessages.INVALID_NAME + ItineraryValidationMessages.INVALID_DATE_RANGE)
    })

    test('valid itinerary returns no message', () => {
        const itinerary: Itinerary = {
            name: 'test trip',
            createdBy: 'test user',
            editors: [],
            viewers: [],
            endDate: new Date('2023-01-01'),
            startDate: new Date('2022-06-10')
        }

        const result = validateItinerary(itinerary)

        expect(result).toBeFalsy()
    })
})