import {
  Activity,
  insertActivity, selectActivity, updateActivity
} from "../../src/models/activity.js"
import { query } from '../../src/db/index.js'
import { v4 as uuid } from 'uuid'
import { QueryArrayResult } from "pg";
import { ActivityCategories } from "../../src/types/activityCategories.js";

jest.mock('../../src/db');

describe('unit tests for the activity model', () => {
  const validId = uuid()
  const validItineraryId = uuid()
  const validActivity: Activity = {
    category: ActivityCategories.ACTIVITY,
    name: 'Test Activity',
    itineraryId: validItineraryId,
    cost: 1.50,
    link: 'random hyperlink',
    location: 'Colorado',
    notes: 'Test notes about the activity',
    time: '09:00'
  }

  beforeAll(() => {
  })

  afterEach(() => {
      jest.resetAllMocks()
  })

  test('create new activity works for valid activity', async () => {
    const newActivity = {
      ...validActivity
      }
      const mockQuery = query as jest.MockedFunction<typeof query>
      mockQuery.mockResolvedValue({
          rows: [{ ...validActivity }], rowCount: 1, fields: [1],
          command: '', oid: 1
      } as unknown as QueryArrayResult)

      const result = await insertActivity(newActivity)

      expect(result).toEqual(validActivity)
  })

  test('select activity by id', async () => {
      const mockQuery = query as jest.MockedFunction<typeof query>
      mockQuery.mockResolvedValue({
          rows: [{ ...validActivity }], rowCount: 1, fields: [1],
          command: '', oid: 1
      } as unknown as QueryArrayResult)
      const result = await selectActivity(validId)

      expect(result).toEqual(validActivity)
  })

  test('select activity id does not exist', async () => {
      const mockQuery = query as jest.MockedFunction<typeof query>
      mockQuery.mockResolvedValue({ rows: [], rowCount: 1, fields: [1], command: '', oid: 1 } as unknown as QueryArrayResult)
      const result = await selectActivity(validId)

      expect(result).toEqual(undefined)
  })

  test('update existing activity', async () => {
      const newActivity: Activity = {
        ...validActivity,
        name: 'new name',
        cost: 3.50
      }
      const mockQuery = query as jest.MockedFunction<typeof query>
      mockQuery.mockResolvedValue({
          rows: [{ ...newActivity }], rowCount: 1, fields: [1],
          command: '', oid: 1
      } as unknown as QueryArrayResult)

      const result = await updateActivity(newActivity)

      expect(result).toEqual(newActivity)
  })
})