import { Set } from "immutable";
import { formCoalitions } from "../shapley";

describe("formCoalitions", () => {
  test("generates 2^n sets", () => {
    const S = formCoalitions(Set.of("A", "B", "C"));
    let n = 0;
    for (const s of S) {
      // tslint:disable-next-line
      console.log(s);
      n++;
    }
    expect(n).toStrictEqual(8);
  });
});
