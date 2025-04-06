import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

import { Predicate, Tube } from "types";
import { useState } from "react";

const makeFilterFunc = (name: string) => {
  return (tube: Tube) => tube.status.description === name;
};

type CheckBoxRegistry = {
  [key: string]: {
    checked: boolean;
    filterFunc: Predicate<Tube>;
  };
};

type FilterProps = {
  tubeData: Tube[];
  // TODO: Make a type for setState
  setFilteredTubeData: Dispatch<SetStateAction<Tube[]>>;
};
//TODO: Seperate out bussiness logic into hook
const Filter = ({ tubeData, setFilteredTubeData }: FilterProps) => {
  const names = [...new Set(tubeData.map((item) => item.status.description))];

  const defaultCheckboxes: CheckBoxRegistry = useMemo(() => {
    const result: CheckBoxRegistry = {};
    names.forEach((value) => {
      result[value] = {
        checked: true,
        filterFunc: makeFilterFunc(value),
      };
    });
    return result;
  }, []);

  const [checkboxes, setCheckboxes] =
    useState<CheckBoxRegistry>(defaultCheckboxes);

  useEffect(() => {
    onFilterChange();
  }, []);

  const onFilterChange = () => {
    const activeCheckboxFilters = names
      .map((name) => checkboxes[name])
      .filter((checkboxStatus) => checkboxStatus["checked"])
      .map((checkbox) => checkbox["filterFunc"]);

    const filteredData = tubeData.filter((tube) => {
      return activeCheckboxFilters.map((filter) => filter(tube)).some((x) => x);
    });
    setFilteredTubeData(filteredData);
  };

  return (
    <FormGroup>
      {names.map((item) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxes[item]["checked"]}
              onChange={(event) => {
                setCheckboxes((current) => {
                  //TODO: Make this cleaner
                  const newValue: CheckBoxRegistry = {};
                  newValue[item] = Object.assign(current[item], {
                    checked: event.target.checked,
                  });

                  return {
                    ...current,
                    ...newValue,
                  };
                });

                onFilterChange();
              }}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
};

export default Filter;
