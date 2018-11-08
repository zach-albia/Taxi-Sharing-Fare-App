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
  public shapley = (p: P) =>
    math.multiply(
      math.divide(1, math.factorial(this.players.size)),
      Seq.Indexed([...this.formCoalitions()])
        .filterNot(coalition => coalition.contains(p))
        .map(S =>
          math.multiply(
            math.multiply(
              math.factorial(S.size),
              math.factorial(math.subtract(
                math.subtract(this.players.size, S.size),
                1
              ) as number)
            ),
            math.subtract(this.gainFunc(S.union(Set(p))), this.gainFunc(S))
          )
        )
        .reduce(math.add)
    );

  // tslint:disable:no-bitwise
  public *formCoalitions(): IterableIterator<Set<P>> {
    const playersArr = this.players.toArray();
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
  }
  // tslint:enable:no-bitwise
}
