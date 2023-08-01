// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

  // format data to a more useful format
  const appMetadata = {
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
  };

  const objectsByKey = rawAppData.objects.reduce((acc: any, object: any) => {
    const count = rawAppData.counts[object.key];

    acc[object.key] = {
      ...object,
      count,
    };
    return acc;
  }, {});

  const fields: any[] = [];
  const fieldsByKey: any = {};

  rawAppData.objects.forEach((object: any) => {
    object.fields.forEach((field: any) => {
      fields.push(field);
      fieldsByKey[field.key] = field;
    });
  });

  const scenesByKey = rawAppData.scenes.reduce((acc: any, scene: any) => {
    acc[scene.key] = scene;
    return acc;
  }, {});

  const views: any[] = [];
  const viewsByKey: any = {};

  rawAppData.scenes.forEach((scene: any) => {
    scene.views.forEach((view: any) => {
      views.push(view);
      viewsByKey[view.key] = view;
    });
  });

  const tasks: any[] = [];
  const tasksByKey: any = {};

  rawAppData.objects.forEach((object: any) => {
    object.tasks.forEach((task: any) => {
      tasks.push(task);
      tasksByKey[task.key] = task;
    });
  });

  // TODO rules
  const formattedAppData = {
    ...appMetadata,
    objects: rawAppData.objects,
    objectsByKey,
    fields,
    fieldsByKey,
    scenes: rawAppData.scenes,
    scenesByKey,
    views,
    viewsByKey,
    tasks,
    tasksByKey,
  };

  res.status(200).json(formattedAppData);
}
