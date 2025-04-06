import useAxios from "axios-hooks";
import { useEffect, useState } from "react";

import { useTFLAPI } from "./index";

export type Tube = {
  name: string;
  id: string;
  status: string;
};

type TubeStatusResponse = {
  name: string;
  id: string;
  lineStatuses: {
    statusSeverityDescription: string;
  }[];
};

type Predicate<T> = (x: T) => boolean;
type TypeGuard = Predicate<unknown>;

const isValidTubeResponse: TypeGuard = (x) => {
  return (
    typeof x === "object" &&
    x !== null &&
    "name" in x &&
    "id" in x &&
    "lineStatuses" in x
  );
};

const makeTubeFromStatusResponse = (resp: TubeStatusResponse) => {
  if (isValidTubeResponse(resp)) {
    return {
      name: resp["name"],
      id: resp["id"],
      status: resp["lineStatuses"][0]["statusSeverityDescription"],
    } as Tube;
  }
  throw Error("Failed to convert invalid type");
};

export const useFetchAllTubeData: () => [Tube[], boolean] = () => {
  let tubes: Tube[] = [];
  const [{ data, loading }] = useTFLAPI("/Line/Mode/tube/Status");
  if (data !== undefined) {
    tubes = data.map(makeTubeFromStatusResponse);
  }
  return [tubes, loading];
};

export const useFetchTubeDataById: (
  id: string | null,
) => [null | Tube, boolean] = (id: string | null) => {
  let [tube, setTube] = useState<null | Tube>(null);
  const [{ loading }, execute] = useTFLAPI(`/Line/${id}/Status`, {
    manual: true,
  });

  const fetch = async () => {
    const data = await execute();
    if (data !== undefined) {
      setTube(makeTubeFromStatusResponse(data.data[0]));
    }
  };

  useEffect(() => {
    if (id !== null) {
      fetch();
    }
  }, [id]);
  return [tube, loading];
};
