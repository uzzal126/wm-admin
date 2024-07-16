import { useEffect, useRef, } from 'react';

/**
 * 
 * @param {import('react').MutableRefObject<boolean>} isExecuted 
 * @param {import('react').MutableRefObject<import('react').DependencyList>} previousDependencies 
 * @param {import('react').DependencyList>} dependencies 
 * @param {() => Promise<() => Promise<void>>} callback 
 */
const executeCallbackAsync = async (isExecuted, previousDependencies, dependencies, callback) => {
  if (typeof callback !== 'function') { return; }
  // if the value of 'isExecuted' is true, we shall not proceed...
  if (isExecuted.current && previousDependencies.current === dependencies) { return; }

  // if the value of 'isExecuted' is false, we shall set it to true...
  isExecuted.current = true;
  // we'll also set the dependencies to our previousDependencies to keep track of changes...
  previousDependencies.current = dependencies;

  let destructor;

  try {
    // executes callback function...
    destructor = await callback();
  } catch (error) {
    console.error('An error occurred while executing callback.', error);

    return;
  }

  // if destructor function is not returned, we shall not proceed...
  if (typeof destructor !== 'function') { return; }

  try {
    // executes destructor function...
    await destructor();
  } catch (error) {
    console.error('An error occurred while executing destructor function.', error);

    return;
  }
};

/**
 * @param {() => Promise<() => Promise<void>>} callback Callback can be asynchronous function.
 * @param {import('react').DependencyList} dependencies 
 */
export const useEffectEnhanced = (callback, dependencies = undefined, cleanupCallback = undefined) => {
  const isExecuted = useRef(false);
  const previousDependencies = useRef();

  useEffect(() => {
    executeCallbackAsync(isExecuted, previousDependencies, dependencies, callback);

    if (typeof cleanupCallback !== 'function') { return; }

    return () => {
      try {
        cleanupCallback();
      } catch (error) {
        console.error('An error occurred while executing the cleanup callback.', error);
      }
    };
  }, dependencies);
};
