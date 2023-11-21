import { KnackAppData } from "@/types";
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

  const fields: any[] = [];
  const fieldsByKey: any = {};

  const tasks: any[] = [];
  const tasksByKey: any = {};

  const fieldRules: any[] = [];
  // TODO field rules by field key

  const objectsByKey = rawAppData.objects.reduce((acc: any, object: any) => {
    const count = rawAppData.counts[object.key];

    // add field to fields array and fieldsByKey object
    object.fields.forEach((field: any) => {
      fields.push(field);
      fieldsByKey[field.key] = field;

      fieldRules.push(...(field?.rules || []));
    });

    // add task to tasks array and tasksByKey object
    object.tasks.forEach((task: any) => {
      tasks.push(task);
      tasksByKey[task.key] = task;
    });

    acc[object.key] = {
      ...object,
      count,
    };
    return acc;
  }, {});

  const views: any[] = [];
  const viewsByKey: any = {};

  const viewRules: any[] = [];

  const scenesByKey = rawAppData.scenes.reduce((acc: any, scene: any) => {
    // add view to views array and viewsByKey object
    scene.views.forEach((view: any) => {
      views.push(view);
      viewsByKey[view.key] = view;

      // viewRules.push(...(view?.rules || []));
    });

    acc[scene.key] = scene;
    return acc;
  }, {});

  const sceneEmailRules = rawAppData.scenes.reduce((acc: any, scene: any) => {
    const rules = scene?.rules || [];

    rules?.forEach((rule: any) => {
      console.log(rule);

      if (!rule) return;

      rule?.criteria?.forEach((criterion: any) => {
        if (criterion?.field === "all_users-field_14" && criterion?.value?.includes("ksensetech")) {
          acc.push({ scene: scene.key, criterion });
        }
      });
    });

    return acc;
  }, []);

  // format data to a more useful format

  // TODO rules
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
    sceneEmailRules,
  };

  res.status(200).json(formattedAppData);
}

export const config = {
  api: {
    responseLimit: false,
  },
};
