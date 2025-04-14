import { FC } from "react";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import {
  TableHead,
  TableBody,
  Paper,
  TableCell,
  TableRow,
} from "@mui/material";

type CustomTableProps<T> = {
  data: T[];
  rowFactory: FC<{ rowData: T }>;
  cols: string[];
};
export const CustomTable = <T,>({
  data,
  rowFactory,
  cols,
}: CustomTableProps<T>) => {
  return (
    <TableContainer component={Paper} sx={{ margin: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            {cols.map((col) => (
              <TableCell id={col}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => rowFactory({ rowData: item }))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
