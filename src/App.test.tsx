import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import App from "./App";

import { makeTestTubeData } from "testing";

import { TFLAxios } from "services";
import AxiosMockAdapter from "axios-mock-adapter";

const setupMocks = () => {
  const mock = new AxiosMockAdapter(TFLAxios);
  const mock_data = makeTestTubeData();

  mock
    .onGet("https://api.tfl.gov.uk/Line/Mode/tube/Status")
    .replyOnce(200, mock_data);

};

beforeEach(() => {
  setupMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderApp = () => {
  setupMocks();
  render(<App />);
};

test("Data is filtered", () => {
  renderApp();
  const checkboxes = screen.queryAllByRole("checkbox");
  const firstRowName = makeTestTubeData()[0].name;

  waitFor(() => {
      expect(screen.getByText(firstRowName)).toBeInTheDocument();
    for (const checkbox of checkboxes) {
      expect(checkbox).toBeChecked();
      fireEvent.click(checkbox);
      expect(screen.getByText(firstRowName)).not.toBeInTheDocument();
    }

  });
});
