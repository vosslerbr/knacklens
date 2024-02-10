const getObjectsAndFields = (rawAppData: any) => {
  const data = rawAppData.objects.reduce(
    (acc: any, object: any) => {
      const count = rawAppData.counts[object.key];

      // add field to fields array and fieldsByKey object
      object.fields.forEach((field: any) => {
        if (!field.object_key) {
          field.object_key = object.key;
        }

        acc.fields.push(field);
        acc.fieldsByKey[field.key] = field;

        acc.fieldRules.push(...(field?.rules || []));
      });

      // add task to tasks array and tasksByKey object
      object.tasks.forEach((task: any) => {
        acc.tasks.push(task);
        acc.tasksByKey[task.key] = task;
      });

      acc[object.key] = {
        ...object,
        count,
      };
      return acc;
    },
    {
      fields: [],
      fieldsByKey: {},
      fieldRules: [],
      tasks: [],
      tasksByKey: {},
      objectsByKey: {},
    }
  );

  return data;
};

export default getObjectsAndFields;
