import { useState } from "react";

import FilterPanel from "./filter";

import { render, screen } from "@testing-library/react";
import { makeTestTubeData } from "testing";

const renderFilter = () => {
  const DummyComponent = () => {
    const [data, setData] = useState(makeTestTubeData());

    return <FilterPanel tubeData={data} setFilteredTubeData={setData} />;
  };

  render(<DummyComponent />);
};

test("Checkboxes are generated", () => {
  renderFilter();

  expect(screen.getByText("Good Service")).toBeInTheDocument();
  expect(screen.getByText("Bad Service")).toBeInTheDocument();
});

export {};
