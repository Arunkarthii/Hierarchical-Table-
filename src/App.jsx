import React from "react";
import Table from "./components/Table";
import { initialData } from "./data";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-10 uppercase tracking-wide bg-gray-800 text-white p-5 rounded-lg">
        Hierarchical Table
      </h1>
      <div className="w-full">
        <Table data={initialData} />
      </div>
    </div>
  );
};

export default App;
