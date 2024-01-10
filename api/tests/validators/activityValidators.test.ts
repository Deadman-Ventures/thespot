import { ActivityValidationMessages } from '../../src/types/validationMessages.js'
import {
  validateActivity, validateActivityItineraryId,
  validateActivityCategory, validateActivityName, validateActivityTime
} from '../../src/validators/activityValidators.js'
import { selectItinerary } from '../../src/models/itinerary.js'
import { v4 as uuid } from 'uuid'
import { ActivityCategories } from '../../src/types/activityCategories.js'

jest.mock('../../src/models/itinerary.js')

describe('unit tests for the activity validators', () => {
  beforeAll(() => {

  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('validName returns message for invalid name over 50 characters', () => {
    expect(validateActivityName('a'.repeat(51))).toBe(ActivityValidationMessages.INVALID_NAME)
  })

  test('validname returns empty string when name is valid', () => {
    expect(validateActivityName('a'.repeat(50))).toBe('')
  })

  test('validItineraryId returns empty string when itinerary ID is valid', async () => {
    const validId = uuid()
    const mockSelectItinerary = selectItinerary as jest.MockedFunction<typeof selectItinerary>
    mockSelectItinerary.mockResolvedValueOnce({ id: validId, name: 'test', startDate: new Date(), endDate: new Date(), createdBy: uuid(), editors: [], viewers: [] })

    expect(await validateActivityItineraryId(validId)).toBe('')
  })

  test('validItineraryId returns message when the ID does not exist', async () => {
    const invalidId = uuid()
    const mockSelectItinerary = selectItinerary as jest.MockedFunction<typeof selectItinerary>
    mockSelectItinerary.mockResolvedValueOnce(undefined)

    expect(await validateActivityItineraryId(invalidId)).toBe(ActivityValidationMessages.INVALID_ITINERARY_ID)
  })

  test('validateActivityCategoty returns message for invalid category', () => {
    expect(validateActivityCategory('invalid category' as ActivityCategories)).toBe(ActivityValidationMessages.INVALID_CATEGORY)
  })

  test('validateActivityCategory returns empty string for a valid category', () => {
    expect(validateActivityCategory(ActivityCategories.LODGING)).toBe('')
  })

  test('validateActivityTime returns message for invalid time format', () => {
    expect(validateActivityTime('3:00pm')).toBe(ActivityValidationMessages.INVALID_TIME)
  })

  test('validateActivityTime returns empty string for valid AM time', () => {
    expect(validateActivityTime('03:00')).toBe('')
  })

  test('validateActivityTime returns empty string for valid PM time', () => {
    expect(validateActivityTime('15:00')).toBe('')
  })

})