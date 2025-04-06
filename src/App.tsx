import Grid from "components/Grid";
import Filter from "components/Filter";
import LayoutGrid from "@mui/material/Grid";
import { useState } from "react";

import { useFetchAllTubeData } from "services";

import { Tube } from "types";

function App() {
  const [tubeData, loading] = useFetchAllTubeData();
  const [filteredTubeData, setFilteredTubeData] = useState<Tube[]>([]);
  // TODO: Use tenery operator
  let content = <></>;
  if (!loading && tubeData !== null && tubeData.length > 1) {
    content = (
      <LayoutGrid container spacing={2}>
        <LayoutGrid size="grow">
          <Grid tubeData={filteredTubeData} />
        </LayoutGrid>
        <LayoutGrid size={3}>
          <Filter
            tubeData={tubeData}
            setFilteredTubeData={setFilteredTubeData}
          />
        </LayoutGrid>
      </LayoutGrid>
    );
  }

  return content;
}

export default App;
