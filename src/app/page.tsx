'use client'
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
// Components
import SamlResponseInput from "./components/SamlResponseInput";
import SamlResponseDecoded from "./components/SamlResponseDecoded";

export default function Home() {
  const [decodedValue, setDecodedValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleDecodeClick = () => {
    const decodedValue = decodeFunction(inputValue);
    setDecodedValue(decodedValue);
  };

  const decodeFunction = (value: string) => {
    return value;
  };
  
  return (
    <main>
      <div className="m-8">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab className={({selected})=>classNames("w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",selected?'bg-blue-500 text-white': 'text-blue-700')}>SAML Response Input</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'">
              <SamlResponseInput onInputChange={handleInputChange} onDecodeClick={handleDecodeClick} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div>
        {decodedValue && <SamlResponseDecoded inputData={decodedValue} />}
      </div>
    </main>
  )
}