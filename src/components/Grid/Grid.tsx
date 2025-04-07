import { useState } from "react";
import Table from "@mui/material/Table";

import Collapse from "@mui/material/Collapse";

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

type RowProps = {
  tube: Tube;
};
const Row = ({ tube }: RowProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  return (
    <>
      <TableRow
        hover={true}
        onClick={toggleOpen}
        sx={{
          cursor: "pointer",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={toggleOpen}
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
              <TableBody></TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

type GridProps = {
  tubeData: Tube[];
};
export const TubeStatusTable = ({ tubeData }: GridProps) => {
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
            <Row key={data.id} tube={data}></Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TubeStatusTable;
