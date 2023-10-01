function listTaskLists() {
  const optionalArgs = {
    maxResults: 10
  };
  try {
    // Returns all the authenticated user's task lists.
    const response = Tasks.Tasklists.list(optionalArgs);
    const taskLists = response.items;
    // Print task list of user if available.
    if (!taskLists || taskLists.length === 0) {
      console.log('No task lists found.');
      return;
    }
    for (const taskList of taskLists) {
      console.log('%s (%s)', taskList.title, taskList.id);
    }
  } catch (err) {
    // TODO (developer) - Handle exception from Task API
    console.log('Failed with error %s', err.message);
  }

  
}