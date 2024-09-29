"use client";

import React, { useCallback, useEffect, useState } from "react";
import CreateShortenUrl from "./create-shorten-url";
import CopyShortenedUrl from "./copy-shortened-url";
import { DataTable } from "./data-table/table";
import { columns } from "./data-table/columns";
import { URLMapping } from "@/type";
import { getStorageItems } from "@/lib/storage";
import FeaturesSection from "./features-section";
import HeaderSection from "./header-section";
import FooterSection from "./footer-section";

export default function HomeScreen() {
  const [longURL, setLongURL] = useState<string>("");
  const [shortURL, setShortURL] = useState<string>("");
  const [storedData, setStoredData] = useState<URLMapping[]>([]);

  const updateStoredData = useCallback(() => {
    let data = getStorageItems("tiny_url_shortened");
    // Sort data by 'createdAt' in descending order (latest first)
    data = data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setStoredData(data);
  }, []);

  useEffect(() => {
    updateStoredData();
  }, [updateStoredData]);

  return (
    <main className="p-4">
      <HeaderSection />
      <h1 className="text-center mt-10 md:mt-12 text-2xl md:text-4xl font-bold text-sky-500">
        Tiny-URL
      </h1>
      <h2 className="mt-3 text-center text-2xl md:text-4xl text-neutral-300">
        Shorten Your URLs with Ease
      </h2>
      {shortURL === "" && (
        <CreateShortenUrl
          longURL={longURL}
          storedData={storedData}
          setLongURL={setLongURL}
          setShortURL={setShortURL}
          setStoredData={setStoredData}
        />
      )}
      {shortURL !== "" && (
        <CopyShortenedUrl
          longURL={longURL}
          shortURL={shortURL}
          setLongURL={setLongURL}
          setShortURL={setShortURL}
        />
      )}
      {storedData.length > 0 ? (
        <DataTable columns={columns(updateStoredData)} data={storedData} />
      ) : (
        <div className="mt-8 text-center text-neutral-300">
          <p>No recently shortened URLs</p>
          <p>Create your first shortened URL</p>
        </div>
      )}
      <FeaturesSection />
      <FooterSection />
    </main>
  );
}
