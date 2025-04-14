import { Tube } from "types";

import DetailedTubeStatusTable from "components/DetailedTubeStatusTable";
import CollapsibleRow from "components/CollapsibleRow";
import CustomTable from "components/CustomTable";

type TubeStatusProps = {
  tubeData: Tube[];
};
export const TubeStatusTable = ({ tubeData }: TubeStatusProps) => {
  const rowFactory = ({ rowData }: { rowData: Tube }) => {
    const innerComponent = () => <DetailedTubeStatusTable tube={rowData} />;
    return (
      <CollapsibleRow
        innerComponent={innerComponent}
        cols={[rowData.name, rowData.status.description]}
      ></CollapsibleRow>
    );
  };
  return (
    <CustomTable
      data={tubeData}
      rowFactory={rowFactory}
      cols={["", "Name", "Status"]}
    />
  );
};

export default TubeStatusTable;
