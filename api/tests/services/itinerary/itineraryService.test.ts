import { insertItinerary, updateItinerary, selectItinerary, Itinerary } from "../../../src/models/itinerary.js";
import { validateItinerary } from "../../../src/validators/itineraryValidators.js";
import {
  createNewItinerary, editItinerary,
  getItinerary
} from "../../../src/services/itinerary/itineraryService.js";
import { v4 as uuid } from 'uuid'
import { DoesNotExistError, ValidationError } from "../../../src/errors/index.js";

jest.mock("../../../src/validators/itineraryValidators")
jest.mock("../../../src/models/itinerary")

describe('unit tests for the itinerary services', () => {
  const validId = uuid()
  const validItinerary: Itinerary = {
    id: validId,
    createdBy: 'test user',
    editors: [],
    viewers: [],
    startDate: '2023-01-01',
    endDate: '2023-01-16',
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
      startDate: '2023-01-01',
      endDate: '2023-01-16',
      name: 'Test trip'
    }
    const mockInsert = insertItinerary as jest.MockedFunction<typeof insertItinerary>
    mockInsert.mockResolvedValue(validItinerary)
    const mockValidate = validateItinerary as jest.MockedFunction<typeof validateItinerary>
    mockValidate.mockReturnValue('')

    const result = await createNewItinerary(newItinerary)

    expect(result).toBe(validItinerary)
    expect(mockValidate).toHaveBeenCalled()
    expect(mockInsert).toHaveBeenCalled()
  })

  test('create new itinerary throws error when not valid', async () => {
    // bad because start is after end
    const newItinerary: Itinerary = {
      createdBy: 'test user',
      editors: [],
      viewers: [],
      startDate: '2023-05-01',
      endDate: '2023-01-16',
      name: 'Test trip'
    }
    const mockInsert = insertItinerary as jest.MockedFunction<typeof insertItinerary>
    const mockValidate = validateItinerary as jest.MockedFunction<typeof validateItinerary>
    mockValidate.mockReturnValue('Invalid date range.')

    const call = async () => await createNewItinerary(newItinerary)

    await expect(call).rejects.toThrow(ValidationError)
    expect(mockValidate).toHaveBeenCalled()
    expect(mockInsert).not.toHaveBeenCalled()
  })

  test('get itinerary works for itinerary that exists', async () => {
    const mockSelect = selectItinerary as jest.MockedFunction<typeof selectItinerary>
    mockSelect.mockResolvedValue(validItinerary)

    const result = await getItinerary(validId)

    expect(result).toBe(validItinerary)
  })

  test('get itinerary throws for id does not exist', async () => {
    const call = async () => await getItinerary(validId)

    await expect(call).rejects.toThrow(DoesNotExistError)
  })

  test('edit itinerary successfully', async () => {
    const newItinerary: Itinerary = {
      id: validId,
      createdBy: 'test user EDIT',
      editors: [],
      viewers: [],
      startDate: '2023-01-01',
      endDate: '2023-01-16',
      name: 'Test trip EDIT'
    }
    const mockUpdate = updateItinerary as jest.MockedFunction<typeof updateItinerary>
    mockUpdate.mockResolvedValue(newItinerary)
    const mockValidate = validateItinerary as jest.MockedFunction<typeof validateItinerary>
    mockValidate.mockReturnValue('')
    const mockSelect = selectItinerary as jest.MockedFunction<typeof selectItinerary>
    mockSelect.mockResolvedValue(validItinerary)

    const result = await editItinerary(newItinerary)

    expect(result).toBe(newItinerary)
    expect(mockValidate).toHaveBeenCalled()
    expect(mockUpdate).toHaveBeenCalled()
  })

  test('edit itinerary fails because id does not exist', async () => {
    const newItinerary: Itinerary = {
      id: uuid(),
      createdBy: 'test user',
      editors: [],
      viewers: [],
      startDate: '2023-01-01',
      endDate: '2023-01-16',
      name: 'Test trip'
    }
    const mockExists = selectItinerary as jest.MockedFunction<typeof selectItinerary>
    mockExists.mockResolvedValue(undefined)

    const call = async () => await editItinerary(newItinerary)

    await expect(call).rejects.toThrow(DoesNotExistError)
    expect(mockExists).toHaveBeenCalled()
  })

  test('edit itinerary fails because not valid', async () => {
    // bad because start is after end
    const newItinerary: Itinerary = {
      id: validId,
      createdBy: 'test user',
      editors: [],
      viewers: [],
      startDate: '2023-05-01',
      endDate: '2023-01-16',
      name: 'Test trip'
    }
    const mockValidate = validateItinerary as jest.MockedFunction<typeof validateItinerary>
    mockValidate.mockReturnValue('Invalid date range.')
    const mockExists = selectItinerary as jest.MockedFunction<typeof selectItinerary>
    mockExists.mockResolvedValue(validItinerary)

    const call = async () => await editItinerary(newItinerary)

    await expect(call).rejects.toThrow(ValidationError)
    expect(mockValidate).toHaveBeenCalled()
  })
})