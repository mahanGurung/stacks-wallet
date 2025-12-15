
import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = simnet.deployer;
const address1 = accounts.get("wallet_1")!;
const address2 = accounts.get("wallet_2")!;

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/stacks/clarinet-js-sdk
*/
describe("wallet lock lifecycle", () => {
  it("locks STX", () => {
    const { result } = simnet.callPublicFn(
      "wallet",
      "lock",
      [
        Cl.principal(address2),
        Cl.uint(100),
        Cl.uint(1000000),
      ],
      deployer
    );

    expect(result).toBeOk(Cl.bool(true));
  });

  it("bestows to new beneficiary", () => {
    simnet.callPublicFn(
      "wallet",
      "lock",
      [
        Cl.principal(address2),
        Cl.uint(100),
        Cl.uint(1000000),
      ],
      deployer
    );

    const { result } = simnet.callPublicFn(
      "wallet",
      "bestow",
      [Cl.principal(address1)],
      address2
    );

    expect(result).toBeOk(Cl.bool(true));
  });

});

