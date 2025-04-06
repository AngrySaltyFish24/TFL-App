import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Grid from "./Grid";

import { makeTestTubeData } from "testing";

import { TFLAxios } from "services";
import AxiosMockAdapter from "axios-mock-adapter";

const mock_data = [
  {
    id: "bakerloo",
    name: "Bakerloo",
    created: "2025-03-31T10:36:12.297Z",
    modified: "2025-03-31T10:36:12.297Z",
    lineStatuses: [
      {
        $type:
          "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
        id: 0,
        statusSeverity: 10,
        statusSeverityDescription: "Good Service",
        created: "0001-01-01T00:00:00",
        validityPeriods: [],
      },
    ],
  },
  {
    id: "central",
    name: "Central",
    created: "2025-03-31T10:36:12.28Z",
    modified: "2025-03-31T10:36:12.28Z",
    lineStatuses: [
      {
        $type:
          "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
        id: 0,
        statusSeverity: 10,
        statusSeverityDescription: "Good Service",
        created: "0001-01-01T00:00:00",
        validityPeriods: [],
      },
    ],
  },
];

const setupMocks = () => {
  const mock = new AxiosMockAdapter(TFLAxios);

  mock
    .onGet("https://api.tfl.gov.uk/Line/Mode/tube/Status")
    .replyOnce(200, mock_data);

  mock.onGet("https://api.tfl.gov.uk/Line/bakerloo/Status").replyOnce(200, [
    {
      ...mock_data[0],
      lineStatuses: [{ statusSeverityDescription: "Bad Service" }],
    },
  ]);
};

beforeEach(() => {
  setupMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderApp = async () => {
  render(<Grid tubeData={makeTestTubeData()}></Grid>);
  await waitFor(() => {
    expect(screen.getByText("Bakerloo"));
  });
};

test("All rows are rendered", async () => {
  await renderApp();
  for (const obj of mock_data) {
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
  await renderApp();
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
