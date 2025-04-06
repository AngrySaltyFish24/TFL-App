import { useEffect, useState } from "react";
import Table from "@mui/material/Table";

import { useFetchAllTubeData, Tube, useFetchTubeDataById } from "./services";

import {
  TableContainer,
  TableHead,
  TableBody,
  Paper,
  TableCell,
  TableRow,
} from "@mui/material";

const useTubeData: () => [Tube[], (id: string) => Promise<void>] = () => {
  const [data, setData] = useState<Tube[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [tubes, loading] = useFetchAllTubeData();

  const [updatedTube, updateLoading] = useFetchTubeDataById(id);

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
