import TubeStatusTable from "components/Grid";
import FilterPanel from "components/Filter";
import Grid from "@mui/material/Grid";
import { useState } from "react";

import { useFetchAllTubeData } from "services";
import { Tube } from "types";

function App() {
  const [tubeData, loading] = useFetchAllTubeData();
  const [filteredTubeData, setFilteredTubeData] = useState<Tube[]>([]);

  return loading ? (
    <Grid container spacing={2}>
      <Grid size="grow">
        <TubeStatusTable tubeData={filteredTubeData} />
      </Grid>
      <Grid size={3}>
        <FilterPanel
          tubeData={tubeData}
          setFilteredTubeData={setFilteredTubeData}
        />
      </Grid>
    </Grid>
  ) : (
    <> </>
  );
}

export default App;
