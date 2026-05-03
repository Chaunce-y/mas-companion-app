import AsyncStorage from '@react-native-async-storage/async-storage';

const PLAN_STORAGE_KEY = 'myPlan';

export async function getSavedPlanIds(): Promise<string[]> {
  const saved = await AsyncStorage.getItem(PLAN_STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : [];
  } catch {
    return [];
  }
}

export async function savePlanIds(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(ids));
}

export async function addToPlan(id: string): Promise<string[]> {
  const savedIds = await getSavedPlanIds();
  const updatedIds = savedIds.includes(id) ? savedIds : [...savedIds, id];

  await savePlanIds(updatedIds);

  return updatedIds;
}

export async function removeFromPlan(id: string): Promise<string[]> {
  const updatedIds = (await getSavedPlanIds()).filter((savedId) => savedId !== id);

  await savePlanIds(updatedIds);

  return updatedIds;
}

export async function togglePlanItem(id: string): Promise<string[]> {
  const savedIds = await getSavedPlanIds();
  const updatedIds = savedIds.includes(id)
    ? savedIds.filter((savedId) => savedId !== id)
    : [...savedIds, id];

  await savePlanIds(updatedIds);

  return updatedIds;
}

export function isInPlan(id: string, ids: string[]): boolean {
  return ids.includes(id);
}
