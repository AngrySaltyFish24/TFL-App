import { Predicate, Tube } from "types";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useCallback, useMemo } from "react";

import { useState } from "react";
const makeFilterFunc = (name: string) => {
  return (tube: Tube) => tube.status.description === name;
};

type CheckboxState = {
  [key: string]: {
    checked: boolean;
    filterFunc: Predicate<Tube>;
  };
};

export const useCheckboxes = (
  names: string[],
): [
  CheckboxState,
  () => Predicate<Tube>[],
  (name: string, value: boolean) => void,
] => {
  const defaultCheckboxes: CheckboxState = useMemo(() => {
    const result: CheckboxState = {};
    names.forEach((value) => {
      result[value] = {
        checked: true,
        filterFunc: makeFilterFunc(value),
      };
    });
    return result;
  }, [names]);

  const [checkboxes, setCheckboxes] =
    useState<CheckboxState>(defaultCheckboxes);

  const updateCheckboxState = useCallback((name: string, value: boolean) => {
    setCheckboxes((current) => {
      const newValue: CheckboxState = {};
      newValue[name] = Object.assign(current[name], {
        checked: value,
      });

      return {
        ...current,
        ...newValue,
      };
    });
  }, []);

  const currentActiveFilters = () => {
    const activeCheckboxFilters = names
      .map((name) => checkboxes[name])
      .filter((checkboxStatus) => checkboxStatus["checked"])
      .map((checkbox) => checkbox["filterFunc"]);

    return activeCheckboxFilters;
  };

  return [checkboxes, currentActiveFilters, updateCheckboxState];
};
type CheckboxProps = {
  checkboxState: CheckboxState;
  updateCheckboxState: (name: string, value: boolean) => void;
  onCheckboxChange: () => void;
};
const Checkboxes = ({ checkboxState, updateCheckboxState }: CheckboxProps) => {
  return (
    <>
      {Object.keys(checkboxState).map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={checkboxState[item]["checked"]}
              onChange={(event) => {
                updateCheckboxState(item, event.target.checked);
              }}
            />
          }
          label={item}
        />
      ))}
    </>
  );
};

export default Checkboxes;
