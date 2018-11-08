import { Set } from "immutable";
import jsc from "jsverify";
import * as math from "mathjs";
import { Game } from "../shapley";

const neSet = (arb: jsc.Arbitrary<any>) =>
  jsc
    .nearray(arb)
    .smap((arr: any[]) => Set.of(...arr), (set: Set<{}>) => set.toArray());

const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);

const smallLetter: jsc.Arbitrary<string> = jsc.suchthat(jsc.asciichar, ch => {
  const charCode = ch.charCodeAt(0);
  return a <= charCode && charCode <= z;
});

const smallLetterStrings: jsc.Arbitrary<string> = jsc
  .nearray(smallLetter)
  .smap(arr => arr.join(""), s => s.split(""));

const noop = _ => undefined;

describe("formCoalitions", () => {
  jsc.property(
    "yields 2^n elements",
    neSet(smallLetterStrings),
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
    neSet(smallLetterStrings),
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

function charCodeTotal(s: string): number {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    total += s.charCodeAt(i);
  }
  return total;
}

function gainFunc(coalition: Set<string>): number {
  return coalition
    .toIndexedSeq()
    .reduce((total, s) => charCodeTotal(s) + total, 0);
}

describe("shapley", () => {
  jsc.property(
    "efficiency: the total gain is distributed",
    neSet(smallLetterStrings),
    jsc.constant(gainFunc),
    (N: Set<string>, v: (_: Set<string>) => number) => {
      const game = new Game(N, v);
      const sumOfGains = N.toIndexedSeq()
        .map(game.shapley)
        .reduce((x: number, y) => math.add(x, y), 0);
      const gainOfAll = v(N);
      return sumOfGains === gainOfAll;
    }
  );
});
