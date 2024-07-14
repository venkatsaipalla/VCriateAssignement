import Head from "next/head";
import { StatsComponent } from "../components/Stats";
import React from "react";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <StatsComponent />
      </main>
    </div>
  );
}
