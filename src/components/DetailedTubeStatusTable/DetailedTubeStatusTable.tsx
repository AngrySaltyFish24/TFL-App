import Table from "@mui/material/Table";
import { TableHead, TableBody, TableCell, TableRow } from "@mui/material";

import { Tube } from "types";

type DetailedTubeStatusTableProps = {
  tube: Tube;
};
export const DetailedTubeStatusTable = ({
  tube,
}: DetailedTubeStatusTableProps) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Reason</TableCell>
          <TableCell>{tube.status.reason}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody></TableBody>
    </Table>
  );
};

export default DetailedTubeStatusTable;
