"use client";

import React, { useState } from "react";

const Page = () => {
  const [documents, setDocuments] = useState("");

  const fetchDocuments = async () => {
    const response = await fetch("/api/document-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startCountry: "India", endCountry: "China" }),
    });

    const data = await response.json();
    setDocuments(data.documents);
  };

  return (
    <div>
      <h1>Required Documents</h1>
      <button onClick={fetchDocuments}>Get Documents</button>
      <p>{documents}</p>
    </div>
  );
};

export default Page;
 