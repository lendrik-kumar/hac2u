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
        },
      ].slice(-100)); // Keep only the last 100 nodes
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
    <div className="flex justify-center items-center gap-10 bg-gray-900 p-6 h-screen">
      {/* Node Graph (Centered) */}
      <div className="flex flex-col justify-center items-center border-gray-700 bg-gray-800 shadow-xl p-6 border rounded-lg">
        <h2 className="mb-4 font-bold text-white text-xl tracking-wide">Live Node Map</h2>
        <svg width={800} height={600} className="bg-gray-700 shadow-lg rounded-lg">
          {nodes.map((node) => <Node key={node.id} node={node} />)}
        </svg>
      </div>

      {/* Real-time Meter List (Right Side) */}
      <div className="border-gray-700 bg-gray-800 shadow-xl p-6 border rounded-lg w-1/4 h-[600px] text-white overflow-y-auto">
        <h2 className="border-gray-600 mb-4 pb-2 border-b font-bold text-lg tracking-wide">Real-time Meter Data</h2>
        <ul className="space-y-3">
          {nodes.slice(-20).reverse().map((node) => (
            <li key={node.id} className="bg-gray-700 shadow-md p-3 rounded-lg text-sm">
              <span className="font-bold text-blue-400">ID:</span> {node.id} | 
              <span className="ml-2 font-bold text-yellow-400">Phase:</span> {node.phase}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
