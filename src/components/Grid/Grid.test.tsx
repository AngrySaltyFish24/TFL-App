import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TubeStatusTable from "./Grid";

import { makeTestTubeData } from "testing";

const renderGrid = async () => {
  render(<TubeStatusTable tubeData={makeTestTubeData()}></TubeStatusTable>);
  await waitFor(() => {
    expect(screen.getByText("Bakerloo"));
  });
};

test("All rows are rendered", async () => {
  await renderGrid();
  for (const obj of makeTestTubeData()) {
    expect(screen.getByText(obj.name));
  }
});

test("Rows can expand with more information", async () => {
  await renderGrid();
  const button = screen.queryAllByLabelText("expand row")[0];
  fireEvent.click(button);
  await waitFor(() => {
    expect(screen.queryByText("Reason")).toBeInTheDocument();
  });

  fireEvent.click(button);
  await waitFor(() => {
    expect(screen.queryByText("Reason")).not.toBeInTheDocument();
  });
});
