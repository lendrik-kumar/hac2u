import { useSpring, animated } from "react-spring";

const getPhaseColor = (phase) => ({
  A: "#ff4444",
  B: "#44ff44",
  C: "#4488ff",
}[phase] || "#999999");

export default function Node({ node }) {
  if (!node) return null;

  const props = useSpring({ to: { x: node.x, y: node.y }, config: { tension: 200, friction: 15 } });

  return (
    <animated.circle
      cx={props.x}
      cy={props.y}
      r="8"
      fill={getPhaseColor(node.phase)}
      className="hover:stroke-white hover:stroke-[3px] hover:scale-125 drop-shadow-lg transition-transform animate-pulse duration-300 cursor-pointer"
    >
      <title>{`Meter ID: ${node.id} | Phase: ${node.phase} `}</title>
    </animated.circle>
  );
}
