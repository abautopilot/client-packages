import { useEffect, useState } from "react";

export default function useABAutoPilot(
  team: number | string,
  experiment: string,
  token: string,
) {
  // TODO: Replace with actual host URL from environment.
  const HOST_URL = "http://localhost";

  const [candidates, setCandidates] = useState(null);
  const [candidateCopy, setCandidateCopy] = useState("");
  const [loading, setLoading] = useState(true);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  function url() {
    return `${HOST_URL}/api/teams/${team}/experiments/${experiment}/candidates`;
  }

  useEffect(() => {
    fetch(url(), { headers })
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
        setCandidateCopy(data[0]["copy"]);
        setLoading(false);
        return data;
      })
      .then((candidates) =>
        fetch(`${url()}/${candidates[0]["id"]}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            ...candidates[0],
            seenCount: candidates[0]["seenCount"] + 1,
          }),
        }),
      );
  }, [team, experiment, token]);

  const candidateClick = () => {
    if (!candidates) {
      return;
    }
    fetch(`${url()}${candidates[0]["id"]}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        ...candidates[0],
        clickedCount: candidates[0]["clickedCount"] + 1,
      }),
    });
  };

  return {
    team,
    experiment,
    loading,
    candidateClick,
    candidateCopy,
  };
}
