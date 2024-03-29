import { KnackAppData } from "@/types";
import getObjectsAndFields from "@/utils/client/getAppData/getObjectsAndFields";
import getScenesAndViews from "@/utils/client/getAppData/getScenesAndViews";
import axios from "axios";

export default async function getAppData(appId: string) {
  // get app data from database
  const { data } = await axios.get(`https://api.knack.com/v1/applications/${appId}`);

  console.time("getAppData");

  const rawAppData = data.application;

  const { fields, fieldsByKey, fieldRules, objectsByKey, tasks, tasksByKey } =
    getObjectsAndFields(rawAppData);

  const { scenesByKey, views, viewsByKey, viewRules } = getScenesAndViews(rawAppData);

  const formattedAppData: KnackAppData = {
    id: rawAppData.id,
    appName: rawAppData.name,
    appDescription: rawAppData.description,
    appSlug: rawAppData.slug,
    homeSlug: rawAppData.home_scene.slug,
    homeSceneKey: rawAppData.home_scene.key,
    usersEnabled: rawAppData.users.enabled,
    objectCount: rawAppData.objects.length,
    sceneCount: rawAppData.scenes.length,
    ecommerceEnabled: rawAppData.ecommerce.enabled,
    apiLimit: rawAppData.account.plan_limits.api_limit,
    appTimezone: rawAppData.settings.timezone,
    recordCounts: rawAppData.counts,
    objects: rawAppData.objects,
    objectsByKey,
    fields,
    fieldsByKey,
    fieldRules,
    scenes: rawAppData.scenes,
    scenesByKey,
    views,
    viewsByKey,
    viewRules,
    tasks,
    tasksByKey,
  };

  console.timeEnd("getAppData");

  return formattedAppData;
}
