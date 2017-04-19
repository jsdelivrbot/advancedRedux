// Middleware that handles action payload containing Promise, waits for it to be
// resolved, converts it into data and then sends it to any other Middleware in
// the stack.
export default function({dispatch}) {
  return next => action => {
    if(!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    action.payload
      .then(response => {
        // create a new action from old type, but replace the promise with
        // response data
        const newAction = {...action, payload: response};

        // We do not want to remember or follow the order of middlewares when we
        // write custom middlewares. Once we process an action, we migth want to
        // pass it from all other middlewares to make sure it gets processed
        // correctly. We do not want to rely on middleware order to process our
        // actions. Hence, instead of calling "next" here, we call "dispatch"
        dispatch(newAction);
      })

  };
}
