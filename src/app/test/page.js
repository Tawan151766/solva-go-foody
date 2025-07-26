"use client";
import "../test-simple.css";

export default function TestPage() {
  return (
    <div>
      <h1>CSS Test</h1>
      <div className="test-red">This should be red</div>
      <div className="test-blue">This should be blue</div>
      
      <h2>Tailwind Test</h2>
      <div className="bg-red-500 text-white p-4 m-4">Tailwind Red</div>
      <div className="bg-blue-500 text-white p-4 m-4">Tailwind Blue</div>
      <div className="bg-green-500 text-white p-4 m-4 rounded-lg">Tailwind Green with Rounded</div>
    </div>
  );
}