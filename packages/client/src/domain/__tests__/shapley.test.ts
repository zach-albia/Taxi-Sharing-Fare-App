import { Seq, Set } from "immutable";
import jsc from "jsverify";
import identity from "lodash/identity";
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

const noop = () => undefined;

describe("formCoalitions", () => {
  jsc.property(
    "yields 2^n elements",
    neSet(smallLetterStrings),
    (players: Set<string>) => {
      const game = new Game(players, noop);
      const coalitions = Seq.Indexed(game.formCoalitions());
      const size = coalitions.reduce((r, _) => r + 1, 0);
      // tslint:disable:no-bitwise
      return size === 1 << players.size; // bitwise 2^n
    }
  );

  jsc.property(
    "all coalitions are subsets of the set of players",
    neSet(smallLetterStrings),
    (players: Set<string>) => {
      const game = new Game(players, noop);
      return Seq.Indexed(game.formCoalitions()).every(coalition =>
        coalition.isSubset(players)
      );
    }
  );

  jsc.property(
    "all coalitions are unique",
    neSet(smallLetterStrings),
    (players: Set<string>) => {
      const game = new Game(players, noop);
      return Set(game.formCoalitions()).size === 1 << players.size;
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

function charCodeGainFunc(coalition: Set<string>): number {
  return coalition.reduce((total, s) => charCodeTotal(s) + total, 0);
}

function lengthGainFunc(coalition: Set<string>): number {
  return coalition.reduce((total, s) => s.length + total, 0);
}

describe("shapley", () => {
  jsc.property(
    "efficiency: the total gain is distributed",
    neSet(smallLetterStrings),
    jsc.constant(charCodeGainFunc),
    (N: Set<string>, v: (_: Set<string>) => number) => {
      const game = new Game(N, v);
      const sumOfGains = N.toIndexedSeq()
        .map(game.shapley)
        .reduce((x: number, y) => math.add(x, y), 0);
      const gainOfAll = v(N);
      return sumOfGains === gainOfAll;
    }
  );

  jsc.property(
    "symmetry: v(S U {i}) = v(S U {j}) -> ϕ(i, v) = ϕ(j, v)",
    jsc.suchthat(neSet(smallLetterStrings), s => s.size >= 2),
    jsc.constant(lengthGainFunc),
    (N: Set<string>, v: (_: Set<string>) => number) => {
      const game = new Game(N, v);
      const pairs = N.flatMap(i => N.map(j => Set.of(i, j)))
        .toSetSeq()
        .filter(p => p.size === 2);
      return pairs
        .map(pair => {
          const [i, j] = pair.toArray();
          const subsets = Seq(game.formCoalitions()).filter(
            s => !(s.contains(i) || s.contains(j))
          );
          return subsets
            .map(S => {
              const shapleyI = game.shapley(i);
              const shapleyJ = game.shapley(j);
              const vSUnionI = v(S.union(Set.of(i)));
              const vSUnionJ = v(S.union(Set.of(j)));
              return (
                (vSUnionI === vSUnionJ && shapleyI === shapleyJ) ||
                (vSUnionI !== vSUnionJ && shapleyI !== shapleyJ)
              );
            })
            .every(identity);
        })
        .every(identity);
    }
  );
});
