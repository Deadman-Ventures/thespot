import { DoesNotExistError, ValidationError } from "../../errors/index.js"
import { Activity } from "../../models/activity.js"
import { validateActivity } from "../../validators/activityValidators.js"
import { insertActivity, updateActivity, selectActivity } from "../../models/activity.js"


export async function createNewActivity(activity: Activity): Promise<Activity> {
  const validationMessage = validateActivity(activity)

  if (validationMessage) throw new ValidationError(validationMessage)

  return await insertActivity(activity)
}

export async function updateExistingActivity(activity: Activity): Promise<Activity> {
  const validationMessage = validateActivity(activity)

  if (validationMessage) throw new ValidationError(validationMessage)

  const existingActivity = await selectActivity(activity.id)

  if (!existingActivity) throw new DoesNotExistError('Activity does not exist')

  return await updateActivity(activity)
}

export async function getActivity(id: string): Promise<Activity> {
  const activity = await selectActivity(id)

  if (!activity) throw new DoesNotExistError(`No activity exists for ID: ${id}`)

  return activity
}
