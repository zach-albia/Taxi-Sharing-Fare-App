import { Set } from "immutable";
import jsc from "jsverify";
import { formCoalitions } from "../shapley";

const neSet = (arb: jsc.Arbitrary<any>) =>
  jsc
    .nearray(arb)
    .smap((arr: any[]) => Set.of(...arr), (set: Set<{}>) => set.toArray());

describe("formCoalitions", () => {
  jsc.property(
    "yields 2^n elements",
    neSet(jsc.nestring),
    jsc.bool,
    (s: Set<any>) => {
      let count = 0;
      for (const _ of formCoalitions(s)) {
        count++;
      }
      // tslint:disable:no-bitwise
      return 1 << s.size === count;
    }
  );
});
