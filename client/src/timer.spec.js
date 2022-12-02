import { getCountdownAsString } from "./timer";

describe("getCountdownAsString", () => {
  it('if it returns the correct time', () =>{
    const timeLeft = 1995484483;
    const result = getCountdownAsString(timeLeft);
    expect(result).toEqual("23D : 2H : 18M : 4S")
  })
})