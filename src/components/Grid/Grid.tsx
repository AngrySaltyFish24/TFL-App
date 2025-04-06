import { useEffect, useState } from "react";
import Table from "@mui/material/Table";

import Collapse from "@mui/material/Collapse";

import { useFetchAllTubeData, useFetchTubeDataById } from "services";

import { Tube } from "types";

import TableContainer from "@mui/material/TableContainer";
import {
  TableHead,
  TableBody,
  Paper,
  TableCell,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";

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

type RowProps = {
  tube: Tube;
};
const Row = ({ tube }: RowProps) => {
  const [open, setOpen] = useState(false);

  return (
      <>
    <TableRow
      key={tube.id}
      hover={true}
      onClick={() => {}}
      sx={{
        cursor: "pointer",
      }}
    >
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell>{tube.name}</TableCell>
      <TableCell>{tube.status.description}</TableCell>
    </TableRow>
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Reason</TableCell>
                    <TableCell>{tube.status.reason}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
              </Table>
          </Collapse>
        </TableCell>
      </TableRow>

    </>
  );
};

export const Grid = () => {
  const [tubeData, updateTube] = useTubeData();

  return (
    <TableContainer component={Paper} sx={{ margin: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tubeData.map((data) => (
            <Row tube={data}></Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Grid;
