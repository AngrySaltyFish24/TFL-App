export type Predicate<T> = (x: T) => boolean;
export type TypeGuard = Predicate<unknown>;

type Status = {
  description: string;
  reason: string | null;
};

export type Tube = {
  name: string;
  id: string;
  status: Status;
};
