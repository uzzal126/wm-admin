import { useRef, useState } from 'react';
import { isUndefinedNullOrWhiteSpaceString } from '../../common';

const copyAttributesFromAToB = (objectA, objectB) => {
  const objectAEntries = Object.entries(objectA);

  for (const [key, value] of objectAEntries) {
    objectB[key] = value;
  }

  return objectB;
};

const mergeAttributes = (entries, data, objectToMergeInto) => {
  objectToMergeInto = copyAttributesFromAToB(data, objectToMergeInto);
  objectToMergeInto = copyAttributesFromAToB(entries, objectToMergeInto);

  return objectToMergeInto;
};

export const useStateEnhanced = ({
  initialValue = {},
  useInputValueChangeListener = false,
  debounceDelayInMilliseconds = 200,
} = {}) => {
  const timerHandle = useRef();
  const [data, setData] = useState(initialValue);

  const updateData = entry => {
    const updatedData = mergeAttributes(entry, data, Object.create(null));

    setData(updatedData);

    return {
      previousData: data,
      updatedData: updatedData,
    };
  };

  const setDataDebounced = data => {
    // we shall first clear any previously started timeout...
    timerHandle.current && clearTimeout(timerHandle.current);

    // then we shall set a new timeout which shall set data after a certain interval...
    timerHandle.current = setTimeout(() => {
      setData(data);
    }, debounceDelayInMilliseconds);
  };

  const updateDataDebounced = entry => {
    const updatedData = mergeAttributes(entry, data, Object.create(null));

    setDataDebounced(updatedData);

    return {
      previousData: data,
      updatedData: updatedData,
    };
  };

  /**
   * @param {{
   * target: {
   * type: String,
   * name: String,
   * value: *,
   * }}} event 
   */
  const onInputValueChanged = async event => {
    if (!useInputValueChangeListener) { return; }

    const targetName = event?.target?.name ?? undefined;

    if (isUndefinedNullOrWhiteSpaceString(targetName)) { return; }

    const targetType = event?.target?.type ?? undefined;
    let targetValue = event?.target?.value ?? undefined;

    // if event was generated by input type number...
    if (targetType === 'number') {
      // converts value to number...
      const _targetValue = Number(targetValue);

      // if value is actually a number, we shall assign the converted value...
      if (!isNaN(_targetValue)) { targetValue = _targetValue; }
    }

    // if event was generated by input type checkbox...
    if (targetType === 'checkbox') {
      const isChecked = event?.target?.checked ?? false;

      targetValue = isChecked;
    }

    const updatedData = {
      [targetName]: targetValue,
    };

    updateData(updatedData);
  };

  return [
    data,
    setData,
    updateData,
    setDataDebounced,
    updateDataDebounced,
    onInputValueChanged,
  ];
};