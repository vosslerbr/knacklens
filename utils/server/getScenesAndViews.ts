const getScenesAndViews = (rawAppData: any) => {
  const views: any[] = [];
  const viewsByKey: any = {};

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

  const viewRules: any[] = [];
  return {
    scenesByKey,
    views,
    viewsByKey,
    viewRules,
  };
};

export default getScenesAndViews;
