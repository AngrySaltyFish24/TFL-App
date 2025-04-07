import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import { Predicate, Tube } from "types";
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

const useCheckboxes = (
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

const useFilters = (
  tubeData: Tube[],
  setFilteredData: Dispatch<SetStateAction<Tube[]>>,
  activeFilters: Predicate<Tube>[],
) => {
  const activeFilterHash = JSON.stringify(activeFilters);

  const onFilterChange = useCallback(() => {
    const filteredData = tubeData.filter((tube) => {
      return activeFilters.map((filter) => filter(tube)).some((x) => x);
    });
    setFilteredData(filteredData);
  }, [activeFilterHash, setFilteredData]);

  useEffect(() => {
    onFilterChange();
  }, [activeFilterHash, onFilterChange]);
  return onFilterChange;
};

type FilterProps = {
  tubeData: Tube[];
  // TODO: Make a type for setState
  setFilteredTubeData: Dispatch<SetStateAction<Tube[]>>;
};
const Filter = ({ tubeData, setFilteredTubeData }: FilterProps) => {
  const descriptions = [
    ...new Set(tubeData.map((item) => item.status.description)),
  ];
  const [checkboxState, getCheckboxFilters, updateCheckboxState] =
    useCheckboxes(descriptions);
  const onFilterChange = useFilters(
    tubeData,
    setFilteredTubeData,
    getCheckboxFilters(),
  );

  return (
    <FormGroup>
      <Checkboxes
        checkboxState={checkboxState}
        updateCheckboxState={updateCheckboxState}
        onCheckboxChange={onFilterChange}
        checkboxKey={"DescriptionFilterCheckboxes"}
      />
    </FormGroup>
  );
};

type CheckboxProps = {
  checkboxState: CheckboxState;
  updateCheckboxState: (name: string, value: boolean) => void;
  onCheckboxChange: () => void;
  checkboxKey: string;
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

export default Filter;
