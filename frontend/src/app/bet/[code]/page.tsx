"use client";

import { useQuery } from "@tanstack/react-query";
import BetTable from "~/features/bet/components/BetTable";

export default function BetDetails({ params }: { params: { code: string } }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bet", params.code],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/bet/${params.code}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);

      return response.json();
    },
  });

  return (
    <div className="container">
      {params.code}
      <BetTable array={[{ name: "jar", odds: "" }]} />
    </div>
  );
}
