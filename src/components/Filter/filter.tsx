import { useEffect, useCallback, FC } from "react";

import FormGroup from "@mui/material/FormGroup";

import { Predicate, Tube, SetState } from "types";
import Checkboxes, { useCheckboxes } from "components/Checkboxes";

const useFilters = (
  tubeData: Tube[],
  setFilteredData: SetState<Tube[]>,
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

type FilterComponentProp = {
  onChange: () => void;
};

type FilterPanelProps = {
  tubeData: Tube[];
  setFilteredTubeData: SetState<Tube[]>;
};
const FilterPanel = ({ tubeData, setFilteredTubeData }: FilterPanelProps) => {
  const descriptions = [
    ...new Set(tubeData.map((item) => item.status.description)),
  ];

  const [checkboxState, getCheckboxFilters, updateCheckboxState] =
    useCheckboxes(descriptions);

  const CheckBoxFilterComponent = ({
    onChange: onChange,
  }: FilterComponentProp) => {
    return (
      <Checkboxes
        key={"Checkbox"}
        checkboxState={checkboxState}
        updateCheckboxState={updateCheckboxState}
        onCheckboxChange={onChange}
      />
    );
  };

  return (
    <FormGroup>
      <FilterController
        filterComponents={[CheckBoxFilterComponent]}
        filters={getCheckboxFilters}
        tubeData={tubeData}
        setFilteredData={setFilteredTubeData}
      />
    </FormGroup>
  );
};

type FilterControllerProps = {
  tubeData: Tube[];
  filters: Predicate<Tube>[];
  setFilteredData: SetState<Tube[]>;
  filterComponents: FC<FilterComponentProp>[];
};
const FilterController = ({
  tubeData,
  filters,
  setFilteredData,
  filterComponents,
}: FilterControllerProps) => {
  const onFilterChange = useFilters(tubeData, setFilteredData, filters);

  return (
    <>{filterComponents.map((comp) => comp({ onChange: onFilterChange }))}</>
  );
};

export default FilterPanel;
