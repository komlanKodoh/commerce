import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FindContext from "../../Contexts/FindContext";
import ActiveFilter from "../../component/ActiveFilters";
import FilterOverlay from "../../component/FilterOverlay";
import ProductListGrid from "../../component/ProductList-grid";
import Explore_SectionTitle from "../../component/Explore_SectionTitle";

function Find() {
  const {
    query: { categories },
  } = useRouter();

  const [displayType, setDisplayType] = useState("single" || "double");

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <title>Discover goods in gabon</title>
      </Head>
      <FindContext>
        
        <div className="container">
          <Explore_SectionTitle categories={categories} />
        </div>

        <FilterOverlay />
        <ActiveFilter
          displayType={displayType}
          setDisplayType={setDisplayType}
        />

        <main className="container">
          <ProductListGrid displayType={displayType} />
        </main>
      </FindContext>
    </div>
  );
}

export default Find;
