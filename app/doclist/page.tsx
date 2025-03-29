"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";
import { useCountryStore } from "@/lib/zustand";

const Page = () => {
  const [documents, setDocuments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { endCountry,passport_type, startCountry,visa_type } = useCountryStore();

  const fetchDocuments = async () => {
    setLoading(true);
    const response = await fetch("/api/document-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        startCountry,
        endCountry,
        passport_type,
        visa_type
       }),
    });

    const data = await response.json();
    setDocuments(data.documents.split(" || ").map((doc: string) => doc.trim())); // Convert string into array
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Required Documents</h1>
      
      <div className="flex justify-center mb-4">
        <Button onClick={fetchDocuments} disabled={loading}>
          {loading ? <Loader2 className="animate-spin mr-2" /> : "Get Documents"}
        </Button>
      </div>

      {documents.length > 0 && (
        <Card className="p-4 shadow-lg">
          <CardContent>
            <ul className="list-none space-y-2">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-center space-x-2 text-lg">
                  <FileText className="text-blue-500" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
