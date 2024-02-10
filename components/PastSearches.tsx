"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KnackIDContext } from "@/types";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppIdContext } from "./Store";
import { Button } from "./ui/button";

export default function PastSearches() {
  const { setKnackAppId } = useContext(AppIdContext) as KnackIDContext;
  const [pastSearches, setPastSearches] = useState<{ [key: string]: string }[]>([]);

  useEffect(() => {
    // check for local storage
    const localData = localStorage.getItem("knackLens");

    const localDataObj = localData ? JSON.parse(localData) : [];

    setPastSearches(localDataObj);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 mt-16">
      {pastSearches.map((search) => {
        return (
          <Card key={search.id} className="col-span-4">
            <CardHeader>
              <CardTitle>{search.appName}</CardTitle>
              <CardDescription>{search.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setKnackAppId(search.id)} asChild>
                <Link href={`/${search.id}`}>View</Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
