const getScenesAndViews = (rawAppData: any) => {
  const data = rawAppData.scenes.reduce(
    (acc: any, scene: any) => {
      // add view to views array and viewsByKey object

      scene.views.forEach((view: any) => {
        acc.views.push(view);
        acc.viewsByKey[view.key] = view;

        // viewRules.push(...(view?.rules || []));
      });

      acc[scene.key] = scene;
      return acc;
    },
    {
      scenesByKey: {},
      views: [],
      viewsByKey: {},
      viewRules: [],
    }
  );

  return data;
};

export default getScenesAndViews;
