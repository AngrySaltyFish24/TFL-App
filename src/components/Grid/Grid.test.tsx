import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Grid from "./Grid";

import { makeTestTubeData } from "testing";

const renderGrid = async () => {
  render(<Grid tubeData={makeTestTubeData()}></Grid>);
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

// test("Service is updated on click", async () => {
//   await renderApp();
//   expect(screen.queryByText("Bad Service")).not.toBeInTheDocument();
//
//   const row = screen.getByText("Bakerloo");
//   fireEvent.click(row);
//
//   await waitFor(() => {
//     expect(screen.queryByText("Bad Service")).toBeInTheDocument();
//   });
// });

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
