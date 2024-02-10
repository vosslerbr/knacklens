const getObjectsAndFields = (rawAppData: any) => {
  const fields: any[] = [];
  const fieldsByKey: any = {};

  const tasks: any[] = [];
  const tasksByKey: any = {};

  const fieldRules: any[] = [];

  const objectsByKey = rawAppData.objects.reduce((acc: any, object: any) => {
    const count = rawAppData.counts[object.key];

    // add field to fields array and fieldsByKey object
    object.fields.forEach((field: any) => {
      if (!field.object_key) {
        field.object_key = object.key;
      }

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

  return {
    fields,
    fieldsByKey,
    fieldRules,
    objectsByKey,
    tasks,
    tasksByKey,
  };
};

export default getObjectsAndFields;
