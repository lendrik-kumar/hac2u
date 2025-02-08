import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { forceSimulation, forceManyBody, forceCenter } from "d3-force";
import Node from "./Node";

export default function NodeGraph() {
  const [nodes, setNodes] = useState([]);
  const { lastJsonMessage } = useWebSocket("ws://localhost:8080/ws", { shouldReconnect: () => true });

  useEffect(() => {
    if (lastJsonMessage) {
      setNodes((prev) => [
        ...prev,
        {
          id: lastJsonMessage.meter_id,
          x: Math.random() * 800,
          y: Math.random() * 600,
          phase: lastJsonMessage.new_phase,
          imbalance: lastJsonMessage.imbalance, // Added imbalance
        },
      ].slice(-50)); // Keep only the last 50 nodes
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-5))
      .force("center", forceCenter(400, 300))
      .on("tick", () => setNodes([...nodes]));

    return () => simulation.stop();
  }, [nodes]);

  return (
    <div className="flex gap-6 bg-gray-950 p-6 h-screen">
      {/* Sidebar for Real-time Data */}
      <div className="border-gray-700 shadow-2xl p-6 border rounded-xl w-1/4 h-[600px] text-white overflow-y-auto glassmorphism">
        <h2 className="border-gray-600 mb-4 pb-3 border-b font-semibold text-gray-300 text-lg uppercase tracking-wide">📡 Real-time Data</h2>
        <ul className="space-y-3">
          {nodes.slice(-15).reverse().map((node) => (
            <li key={node.id} className="bg-gray-700/50 hover:bg-gray-600/60 shadow-md p-4 rounded-lg transition-all hover:scale-105">
              <span className="font-bold text-blue-400">ID:</span> {node.id} |
              <span className="ml-2 font-bold text-yellow-400">Phase:</span> {node.phase} |
              <span className="ml-2 font-bold text-red-400">Imbalance:</span> {(node.imbalance * 100).toFixed(1)}%
            </li>
          ))}
        </ul>
      </div>

      {/* Node Graph */}
      <div className="flex flex-grow justify-center items-center border-gray-700 bg-gray-900 shadow-2xl border rounded-xl">
        <svg width={900} height={600} className="bg-gray-800 shadow-lg rounded-xl">
          {nodes.map((node) => <Node key={node.id} node={node} />)}
        </svg>
      </div>
    </div>
  );
}
