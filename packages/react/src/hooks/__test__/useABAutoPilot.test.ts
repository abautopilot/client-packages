import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useABAutoPilot from "../useABAutoPilot";

describe("useABAutoPilot", () => {
  it("should return the correct values", () => {
    const expectedTeam = 1;
    const expectedCopy = "boo!";
    const experiment = "experiment";
    const token = "token";

    // must mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              copy: expectedCopy,
              seenCount: 0,
              clickedCount: 0,
            },
          ]),
      }),
    );

    const { result } = renderHook(() =>
      useABAutoPilot(expectedTeam, experiment, token),
    );

    expect(result.current.team).toBe(expectedTeam);
  });
});
