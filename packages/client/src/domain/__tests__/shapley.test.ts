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
    (players: Set<any>) => {
      let count = 0;
      for (const _ of formCoalitions(players)) {
        count++;
      }
      // tslint:disable:no-bitwise
      return 1 << players.size === count;
    }
  );

  jsc.property(
    "all coalitions' elements are subsets of the sets of players",
    neSet(jsc.nestring),
    (players: Set<any>) => {
      let areAllSubsets = true;
      for (const coalition of formCoalitions(players)) {
        areAllSubsets = areAllSubsets && coalition.isSubset(players);
      }
      return areAllSubsets;
    }
  );
});
