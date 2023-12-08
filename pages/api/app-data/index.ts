import { KnackAppData } from "@/types";
import getObjectsAndFields from "@/utils/server/getObjectsAndFields";
import getScenesAndViews from "@/utils/server/getScenesAndViews";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // get app id from query params
  const appId = req.query.id as string;

  if (!appId) {
    res.status(400).json({ error: "Missing app id" });
    return;
  }

  // get app data from database
  const { data } = await axios.get(`https://api.knack.com/v1/applications/${appId}`);

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

  res.status(200).json(formattedAppData);
}

export const config = {
  api: {
    responseLimit: false,
  },
};
