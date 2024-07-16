import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { isArray, isObject, } from '../../../../common';

export const CustomTagify = ({ creatable, clearable, allowMultipleSelect, identifier, name, value, placeholder, suggestions, onChange, }) => {

  const onTagsChanged = event => {
    let values;

    if (isObject(event)) {
      values = [event];
    } else if (isArray(event)) {
      values = event;
    } else { return; }

    const valuesOnly = [];

    for (const value of values) {
      valuesOnly.push(value.value);
    }

    typeof onChange === 'function' && onChange({
      target: {
        name: name,
        value: values,
        valuesOnly: valuesOnly,
      },
    });
  };

  let SelectComponent = CreatableSelect;

  if (creatable === false) {
    SelectComponent = Select;
  }

  return <div className='position-relative'>
    <SelectComponent
      id={identifier}
      placeholder={placeholder}
      options={suggestions ?? []}
      value={value}
      isClearable={clearable ?? true}
      isMulti={allowMultipleSelect ?? true}
      onChange={onTagsChanged} />
  </div>;
};
