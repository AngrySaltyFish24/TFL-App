import { Tube } from "types";

export const makeTestTubeData = () => {
  const result: Tube[] = [
    {
      id: "bakerloo",
      name: "Bakerloo",
      status: {
        description: "Good Service",
        reason: null,
      },
    },

    {
      id: "central",
      name: "Central",
      status: {
        description: "Bad Service",
        reason: "Broken track",
      },
    },
  ];

  return result;
};

export const makeTestTubeRequestData = () => {
  const result = [
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
  return result;
};
