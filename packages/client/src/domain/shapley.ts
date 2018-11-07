import { Set } from "immutable";
// import * as math from "mathjs";

// type RealNumber = number | math.BigNumber | math.Fraction;

export class Game<P> {
  private players: Set<P>;
  // private gainFunc: (S: Set<P>) => RealNumber;

  constructor(players: Set<P> /*, gainFunc: (S: Set<P>) => RealNumber*/) {
    this.players = players;
    // this.gainFunc = gainFunc;
  }
  public shapley = (_: number) => undefined; // TODO: implement
  // math.multiply(math.divide(1, math.factorial(this.players.size)), );

  // tslint:disable:no-bitwise
  public *formCoalitions(): IterableIterator<Set<P>> {
    const playersArr = this.players.toArray();
    const numPlayers = playersArr.length;
    for (let i = 0; i < 1 << numPlayers; i++) {
      let combination: Set<P> = Set.of();
      for (let j = 0; j < numPlayers; j++) {
        if ((i & (1 << j)) !== 0) {
          combination = combination.add(playersArr[j]);
        }
      }
      yield combination;
    }
    return 1 << numPlayers;
  }
  // tslint:enable:no-bitwise
}
