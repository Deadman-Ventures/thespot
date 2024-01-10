import { v4 as uuid } from 'uuid'
import { DoesNotExistError, ValidationError } from "../../../src/errors/index.js";
import { Activity, insertActivity, selectActivity, updateActivity } from "../../../src/models/activity.js";
import { validateActivity } from '../../../src/validators/activityValidators.js';
import { ActivityCategories } from '../../../src/types/activityCategories.js';
import { createNewActivity, getActivity, updateExistingActivity } from '../../../src/services/activity/activityService.js';

jest.mock("../../../src/validators/activityValidators")
jest.mock("../../../src/models/activity")

describe('unit tests for the activity services', () => {
  const validId = uuid()
  const validActivity: Activity = {
    id: validId,
    itineraryId: uuid(),
    name: 'test',
    category: ActivityCategories.LODGING,
    time: '03:00',
    location: 'test',
    link: 'test',
    cost: 0,
    notes: 'test'
  }

  beforeAll(() => {

  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('create new activity works for valid activity', async () => {
    const mockInsert = insertActivity as jest.MockedFunction<typeof insertActivity>
    mockInsert.mockResolvedValue(validActivity)
    const mockValidate = validateActivity as jest.MockedFunction<typeof validateActivity>
    mockValidate.mockReturnValue('')

    const result = await createNewActivity(validActivity)

    expect(result).toBe(validActivity)
    expect(mockValidate).toHaveBeenCalled()
    expect(mockInsert).toHaveBeenCalled()
  })

  test('create new activity throws validation error for invalid activity', async () => {
    const invalidActivity: Activity = {
      itineraryId: uuid(),
      name: 'test',
      category: ActivityCategories.LODGING,
      time: '03:00',
      location: 'test',
      link: 'test',
      cost: 0,
      notes: 'test'
    }
    const mockValidate = validateActivity as jest.MockedFunction<typeof validateActivity>
    mockValidate.mockReturnValue('test error')

    const call = async () => await createNewActivity(invalidActivity)

    expect(call).rejects.toThrow(ValidationError)
    expect(mockValidate).toHaveBeenCalled()
  })

  test('update existing activity works for valid activity', async () => {
    const mockValidate = validateActivity as jest.MockedFunction<typeof validateActivity>
    mockValidate.mockReturnValue('')
    const mockSelect = selectActivity as jest.MockedFunction<typeof selectActivity>
    mockSelect.mockResolvedValue(validActivity)
    const updatedActivity = { ...validActivity, name: 'updated' }
    const mockUpdate = updateActivity as jest.MockedFunction<typeof updateActivity>
    mockUpdate.mockResolvedValue(updatedActivity)

    const result = await updateExistingActivity(updatedActivity)

    expect(result).toBe(updatedActivity)
    expect(mockValidate).toHaveBeenCalled()
  })

  test('update existing activity throws validation error for invalid activity', async () => {
    const invalidActivity: Activity = {
      itineraryId: uuid(),
      name: 'test',
      category: ActivityCategories.LODGING,
      time: '03:00',
      location: 'test',
      link: 'test',
      cost: 0,
      notes: 'test'
    }
    const mockValidate = validateActivity as jest.MockedFunction<typeof validateActivity>
    mockValidate.mockReturnValue('test error')

    const call = async () => await updateExistingActivity(invalidActivity)

    expect(call).rejects.toThrow(ValidationError)
    expect(mockValidate).toHaveBeenCalled()
  })

  test('update existing activity throws does not exist error for non-existent activity', async () => {
    const mockValidate = validateActivity as jest.MockedFunction<typeof validateActivity>
    mockValidate.mockReturnValue('')
    const mockSelect = selectActivity as jest.MockedFunction<typeof selectActivity>
    mockSelect.mockResolvedValue(undefined)

    const call = async () => await updateExistingActivity(validActivity)

    expect(call).rejects.toThrow(DoesNotExistError)
    expect(mockValidate).toHaveBeenCalled()
    expect(mockSelect).toHaveBeenCalled()
  })

  test('get activity works for valid activity', async () => {
    const mockSelect = selectActivity as jest.MockedFunction<typeof selectActivity>
    mockSelect.mockResolvedValue(validActivity)

    const result = await getActivity(validId)

    expect(result).toBe(validActivity)
    expect(mockSelect).toHaveBeenCalled()
  })

  test('get activity throws does not exist error for non-existent activity', async () => {
    const mockSelect = selectActivity as jest.MockedFunction<typeof selectActivity>
    mockSelect.mockResolvedValue(undefined)

    const call = async () => await getActivity(validId)

    expect(call).rejects.toThrow(DoesNotExistError)
    expect(mockSelect).toHaveBeenCalled()
  })
})