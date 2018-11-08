import { Set } from "immutable";
import jsc from "jsverify";
import { Game } from "../shapley";

const neSet = (arb: jsc.Arbitrary<any>) =>
  jsc
    .nearray(arb)
    .smap((arr: any[]) => Set.of(...arr), (set: Set<{}>) => set.toArray());

const noop = _ => undefined;

describe("formCoalitions", () => {
  jsc.property(
    "yields 2^n elements",
    neSet(jsc.nestring),
    (players: Set<string>) => {
      const game = new Game(players, noop);
      let count = 0;
      for (const _ of game.formCoalitions()) {
        count++;
      }
      // tslint:disable:no-bitwise
      return 1 << players.size === count;
    }
  );

  jsc.property(
    "all coalitions' elements are subsets of the sets of players",
    neSet(jsc.nestring),
    (players: Set<string>) => {
      const game = new Game(players, noop);
      let areAllSubsets = true;
      for (const coalition of game.formCoalitions()) {
        areAllSubsets = areAllSubsets && coalition.isSubset(players);
      }
      return areAllSubsets;
    }
  );
});
