import FormGroup from "@mui/material/FormGroup";
import { useEffect, useCallback } from "react";

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

type FilterProps = {
  tubeData: Tube[];
  setFilteredTubeData: SetState<Tube[]>;
};
const FilterPanel = ({ tubeData, setFilteredTubeData }: FilterProps) => {
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

export default FilterPanel;
