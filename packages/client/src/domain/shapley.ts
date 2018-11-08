import { Seq, Set } from "immutable";
import * as math from "mathjs";

type RealNumber = number | math.BigNumber | math.Fraction;

export class Game<P> {
  private players: Set<P>;
  private gainFunc: (S: Set<P>) => RealNumber;

  constructor(players: Set<P>, gainFunc: (S: Set<P>) => RealNumber) {
    this.players = players;
    this.gainFunc = gainFunc;
  }
  public shapley = (p: P) => shapley(this.players, this.gainFunc)(p);

  // tslint:disable:no-bitwise
  public *formCoalitions(): IterableIterator<Set<P>> {
    yield* formCoalitions(this.players)();
  }
  // tslint:enable:no-bitwise
}

// tslint:disable:no-bitwise
export function formCoalitions<P>(players: Set<P>) {
  return function*() {
    const playersArr = players.toArray();
    const numPlayers = playersArr.length;
    for (let i = 0; i < 1 << numPlayers; i++) {
      let combination = Set<P>();
      for (let j = 0; j < numPlayers; j++) {
        if ((i & (1 << j)) !== 0) {
          combination = combination.add(playersArr[j]);
        }
      }
      yield combination;
    }
  };
}
// tslint:enable:no-bitwise

export function shapley<P>(N: Set<P>, v: (S: Set<P>) => RealNumber) {
  return (p: P) =>
    math.divide(
      Seq.Indexed([...formCoalitions(N)()])
        .filterNot(coalition => coalition.contains(p))
        .map(S =>
          math.multiply(
            math.multiply(
              math.factorial(S.size),
              math.factorial(math.subtract(
                math.subtract(N.size, S.size),
                1
              ) as number)
            ),
            math.subtract(v(S.union(Set.of(p))), v(S))
          )
        )
        .reduce((a: number, b) => math.add(a, b), 0),
      math.factorial(N.size)
    );
}
