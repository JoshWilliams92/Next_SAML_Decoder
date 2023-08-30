'use client'
import React, { useState, useEffect } from 'react'
  
interface DecodedData {
    decoded: string;
}

export interface XmlDefaultProps {
    inputData: string;
}

async function getDecodedInputData(inputData: string): Promise<DecodedData | null> {
    if (typeof inputData !== 'string') {
      console.error(`Expected inputData to be a string but instead got ${typeof inputData}`);
      return null;
    }
  
    if (!inputData.trim()) {
      console.error('inputData is empty or contains only whitespace');
      return null;
    }

    try {
      const decodedInputURI = decodeURIComponent(inputData);
      const decodedInputValue = Buffer.from(decodedInputURI, 'base64').toString('utf-8');

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(decodedInputValue, 'text/xml');
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        return null;
      }
  
      return {
        decoded: decodedInputValue
      };
    } catch (err) {
      console.error(err);
      return null;
    }
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function XmlDefaultInput({inputData}: XmlDefaultProps) {
    const [decodedInputValue, setDecodedInputValue] = useState<string | null>(null);
    const [isValidResponse, setIsValidResponse] = useState(false);

    const displayXmlInputData = async() => {
        const decodedInputValue = await getDecodedInputData(inputData);

        if (decodedInputValue) {
            setDecodedInputValue(decodedInputValue.decoded);
            setIsValidResponse(true);
        } else {
          setIsValidResponse(false)
        }
    }
    
    useEffect(() => {
    if (inputData) {
        displayXmlInputData();
    }
    }, [inputData]);

return (
<>
  <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 relative">
    {inputData && (
    <div className="bg-gray-50 mt-5 shadow sm:rounded-lg">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        {isValidResponse ? (
        <div className="px-4 py-5 sm:px-6">
          <div className="relative">
            <pre lang="xml" className="whitespace-pre-wrap break-all">
              {decodedInputValue}
            </pre>
          </div>
        </div>
        ) : (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: Invalid SAML Input</strong>
            <span className="block sm:inline">{!isValidResponse}</span>
        </div>
        )}
      </div>
    </div>
  )}
  </div>
</>
  )
}
