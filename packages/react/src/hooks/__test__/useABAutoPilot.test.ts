import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useABAutoPilot from "../useABAutoPilot";

describe("useABAutoPilot", () => {
  it("should return the correct values", () => {
    const expectedTeam = 1;
    const experiment = "experiment";
    const token = "token";
    const { result } = renderHook(() =>
      useABAutoPilot(expectedTeam, experiment, token),
    );

    expect(result.current.team).toBe(expectedTeam);
  });
});
