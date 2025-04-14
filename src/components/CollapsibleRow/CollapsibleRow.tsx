import { FC, useState } from "react";

import Collapse from "@mui/material/Collapse";
import { TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";

type CollapsibleRowProps = {
  cols: string[];
  innerComponent: FC<{}>;
};
export const CollapsibleRow = ({
  innerComponent,
  cols,
}: CollapsibleRowProps) => {
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
          <IconButton aria-label="expand row" size="small" onClick={toggleOpen}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {cols.map((col) => {
          return <TableCell id={col}>{col}</TableCell>;
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {innerComponent({})}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsibleRow;
