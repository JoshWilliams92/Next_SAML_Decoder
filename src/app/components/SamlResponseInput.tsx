'use client'
import React, { useState } from "react"

interface SamlInputProps {
    onInputChange: (value: string) => void;
    onDecodeClick: () => void;
  }

export default function SamlResponseInput({onInputChange, onDecodeClick}: SamlInputProps) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
        onInputChange(event.target.value);
      };

    return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <textarea
        className="w-full border-gray-300 rounded-md resize-none"
        rows={8}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a SAML Response to decode..."
      ></textarea>
      <div className="flex justify-end">
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={onDecodeClick}>Decode</button>
      </div>
    </div>
    )
}
