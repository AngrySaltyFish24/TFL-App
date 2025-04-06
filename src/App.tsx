import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import useAxios from "axios-hooks";

import {
  TableContainer,
  TableHead,
  TableBody,
  Paper,
  TableCell,
  TableRow,
} from "@mui/material";

type Tube = {
  name: string;
  id: string;
  status: string;
};

type TubeStatusResponse = {
  name: string;
  id: string;
  lineStatuses: {
    statusSeverityDescription: string;
  }[];
};

type Predicate<T> = (x: T) => boolean;
type TypeGuard = Predicate<unknown>;

const isValidTubeResponse: TypeGuard = (x) => {
  return (
    typeof x === "object" &&
    x !== null &&
    "name" in x &&
    "id" in x &&
    "lineStatuses" in x
  );
};

const makeTubeFromStatusResponse = (resp: TubeStatusResponse) => {
  if (isValidTubeResponse(resp)) {
    return {
      name: resp["name"],
      id: resp["id"],
      status: resp["lineStatuses"][0]["statusSeverityDescription"],
    } as Tube;
  }
  throw Error("Failed to convert invalid type");
};

const useFetchAllTubeData: () => [Tube[], boolean] = () => {
  let tubes: Tube[] = [];
  const [{ data, loading }] = useAxios(
    "https://api.tfl.gov.uk/Line/Mode/tube/Status",
  );
  if (data !== undefined) {
    tubes = data.map(makeTubeFromStatusResponse);
  }
  return [tubes, loading];
};

const useFetchTubeData: (id: string | null) => [null | Tube, boolean] = (
  id: string | null,
) => {
  let [tube, setTube] = useState<null | Tube>(null);
  const [{ loading }, execute] = useAxios(
    `https://api.tfl.gov.uk/Line/${id}/Status`,
    { manual: true },
  );

  const fetch = async () => {
    const data = await execute();
    if (data !== undefined) {
      setTube(makeTubeFromStatusResponse(data.data[0]));
    }
  };

  useEffect(() => {
    if (id !== null) {
      fetch();
    }
  }, [id]);
  return [tube, loading];
};

const useTubeData: () => [Tube[], (id: string) => Promise<void>] = () => {
  const [data, setData] = useState<Tube[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [tubes, loading] = useFetchAllTubeData();

  const [updatedTube, updateLoading] = useFetchTubeData(id);

  useEffect(() => {
    setData(tubes);
  }, [loading]);

  useEffect(() => {
    if (!updateLoading && updatedTube !== null) {
      const updatedData = data.map((item) =>
        item.id === id ? updatedTube : item,
      );
      setData(updatedData);
    }
  }, [updateLoading]);

  const updateTube = async (id: string) => {
    setId(id);
  };

  return [data, updateTube];
};

function App() {
  const [tubeData, updateTube] = useTubeData();

  return (
    <TableContainer component={Paper} sx={{ margin: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tubeData.map((data) => (
            <TableRow
              key={data.id}
              hover={true}
              onClick={() => {
                updateTube(data.id);
              }}
              sx={{
                cursor: "pointer",
              }}
            >
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
