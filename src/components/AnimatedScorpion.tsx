import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "motion/react";

export default function AnimatedScorpion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isStinging, setIsStinging] = useState(false);
  const [circuitPulse, setCircuitPulse] = useState(0);

  const leftPincerControls = useAnimation();
  const rightPincerControls = useAnimation();
  const tailControls = useAnimation();

  useEffect(() => {
    // Pulse circuit lights continuously
    const interval = setInterval(() => {
      setCircuitPulse((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const triggerSting = async () => {
    if (isStinging) return;
    setIsStinging(true);

    // Animate sting action
    // Tail pulls back and stabs forward quickly
    await tailControls.start({
      translateY: -35,
      scaleY: 1.15,
      rotate: [-5, 5, -8, 2, 0],
      transition: { duration: 0.2, ease: "easeOut" },
    });
    
    await tailControls.start({
      translateY: 10,
      scaleY: 0.9,
      transition: { duration: 0.1, ease: "easeInOut" },
    });

    await tailControls.start({
      translateY: 0,
      scaleY: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    });

    setIsStinging(false);
  };

  return (
    <div
      id="animated-scorpion-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={triggerSting}
      className="relative w-full max-w-[420px] aspect-square mx-auto cursor-pointer drop-shadow-[0_0_35px_rgba(212,175,55,0.2)] flex items-center justify-center select-none"
    >
      {/* Glow Rings behind the Hexagon */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent scale-110 blur-xl pointer-events-none" />

      {/* Hexagonal Badge Background */}
      <svg
        viewBox="0 0 400 440"
        className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="innerMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#222222" />
            <stop offset="50%" stopColor="#121212" />
            <stop offset="100%" stopColor="#0B0B0B" />
          </linearGradient>
          <linearGradient id="circuitGold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>
          <radialGradient id="cyberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#D97706" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="activeCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer Hexagon Gold Border */}
        <path
          d="M 200,15 L 365,110 L 365,305 L 200,400 L 35,305 L 35,110 Z"
          fill="url(#goldBorder)"
          className="transition-all duration-300"
          stroke="#D97706"
          strokeWidth="1.5"
          filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.3))"
        />

        {/* Inner Carbon/Brushed Metal Hexagon Base */}
        <path
          d="M 200,28 L 350,115 L 350,295 L 200,382 L 50,295 L 50,115 Z"
          fill="url(#innerMetal)"
          stroke="#1E1E1E"
          strokeWidth="3"
        />

        {/* Dynamic Interactive circuit grid lines background */}
        <g stroke="url(#circuitGold)" strokeWidth="0.8" strokeOpacity="0.15" fill="none">
          <path d="M 50,115 L 140,200 L 140,260 L 200,320" />
          <path d="M 350,115 L 260,200 L 260,260 L 200,320" />
          <path d="M 50,200 L 110,200 L 160,250" />
          <path d="M 350,200 L 290,200 L 240,250" />
          <circle cx="140" cy="200" r="2.5" fill="none" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="260" cy="200" r="2.5" fill="none" strokeWidth="1" strokeOpacity="0.3" />
        </g>

        {/* --- DYNAMIC ROBOTIC SCORPION PARTS (fully responsive SVG) --- */}
        <g transform="translate(0, 10)">
          {/* Cybernetic legs behind body (4 pairs = 8 legs) */}
          <g id="scorpion-legs">
            {/* L1 & R1 Legs */}
            <path d="M 170,195 Q 110,170 85,210" fill="none" stroke="url(#circuitGold)" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 230,195 Q 290,170 315,210" fill="none" stroke="url(#circuitGold)" strokeWidth="4.5" strokeLinecap="round" />

            {/* L2 & R2 Legs */}
            <path d="M 165,215 Q 98,205 75,250" fill="none" stroke="url(#circuitGold)" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 235,215 Q 302,205 325,250" fill="none" stroke="url(#circuitGold)" strokeWidth="4.5" strokeLinecap="round" />

            {/* L3 & R3 Legs */}
            <path d="M 168,235 Q 102,245 80,300" fill="none" stroke="url(#circuitGold)" strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 232,235 Q 298,245 320,300" fill="none" stroke="url(#circuitGold)" strokeWidth="4.2" strokeLinecap="round" />

            {/* L4 & R4 Legs */}
            <path d="M 172,255 Q 112,285 92,345" fill="none" stroke="url(#circuitGold)" strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 228,255 Q 288,285 308,345" fill="none" stroke="url(#circuitGold)" strokeWidth="4.2" strokeLinecap="round" />
          </g>

          {/* Golden Scorpion Tail (Segmented & Animated) */}
          <motion.g
            id="scorpion-tail"
            animate={tailControls}
            style={{ originX: "200px", originY: "300px" }}
            className="transition-all"
          >
            {/* Tail segments curving backwards */}
            <path d="M 190,290 C 190,320 210,340 225,350 C 235,355 245,345 240,335 C 220,310 205,290 205,260" fill="url(#circuitGold)" />
            <path d="M 215,350 Q 248,362 250,335" fill="none" stroke="url(#circuitGold)" strokeWidth="12" strokeLinecap="round" />
            <path d="M 245,340 Q 275,325 260,295" fill="none" stroke="url(#circuitGold)" strokeWidth="11" strokeLinecap="round" />
            <path d="M 260,300 Q 272,260 235,270" fill="none" stroke="url(#circuitGold)" strokeWidth="10" strokeLinecap="round" />
            
            {/* Golden cyber sting casing */}
            <path d="M 240,265 C 235,250 215,248 215,260 C 215,278 240,285 245,268 Z" fill="url(#circuitGold)" />
            
            {/* Sharp golden needle sting */}
            <path d="M 225,250 C 215,238 200,240 195,245" fill="none" stroke="url(#circuitGold)" strokeWidth="3.5" strokeLinecap="round" />

            {/* Sting dynamic energy orb light */}
            <circle
              cx="220"
              cy="252"
              r={isStinging ? "9" : "3.5"}
              fill={isStinging ? "url(#activeCyan)" : "url(#cyberGlow)"}
              filter="url(#glow)"
              className="transition-all duration-300"
            />
          </motion.g>

          {/* Left Pincer arm & Joint */}
          <motion.g
            id="left-pincer-arm"
            animate={{
              rotate: mousePos.y * 3 - (isHovered ? 5 : 0),
              x: mousePos.x * 6 - (isHovered ? 4 : 0),
            }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ originX: "155px", originY: "195px" }}
          >
            {/* Arm segment 1 */}
            <path d="M 155,190 Q 110,130 145,110" fill="none" stroke="url(#circuitGold)" strokeWidth="10" strokeLinecap="round" />
            {/* Joint */}
            <circle cx="145" cy="110" r="7" fill="#3D2602" stroke="#D97706" strokeWidth="2" />
            {/* Arm segment 2 */}
            <path d="M 145,110 Q 170,80 152,70" fill="none" stroke="url(#circuitGold)" strokeWidth="8" strokeLinecap="round" />

            {/* Big Left Claw Base */}
            <g transform="translate(142, 60) rotate(-15)">
              <path d="M-8,-12 C-15,-2 0,18 15,10 C25,2 18,-15 -8,-12 Z" fill="url(#circuitGold)" />
              {/* Outer sharp curved mechanical hook */}
              <path d="M-8,-12 C-25,-32 -4, -40 2,-42 C-5,-35 -15,-20 -5,-12" fill="url(#circuitGold)" />
              {/* Inner flexible golden thumb hook (rotates on trigger) */}
              <motion.path
                d="M 12,8 C 25,25 35,5 30,-5"
                fill="none"
                stroke="url(#circuitGold)"
                strokeWidth="4.5"
                strokeLinecap="round"
                animate={{ rotate: isHovered || isStinging ? -12 : 0 }}
                style={{ originX: "12px", originY: "8px" }}
              />
            </g>
          </motion.g>

          {/* Right Pincer arm & Joint */}
          <motion.g
            id="right-pincer-arm"
            animate={{
              rotate: mousePos.y * -3 + (isHovered ? 5 : 0),
              x: mousePos.x * 6 + (isHovered ? 4 : 0),
            }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ originX: "245px", originY: "195px" }}
          >
            {/* Arm segment 1 */}
            <path d="M 245,190 Q 290,130 255,110" fill="none" stroke="url(#circuitGold)" strokeWidth="10" strokeLinecap="round" />
            {/* Joint */}
            <circle cx="255" cy="110" r="7" fill="#3D2602" stroke="#D97706" strokeWidth="2" />
            {/* Arm segment 2 */}
            <path d="M 255,110 Q 230,80 248,70" fill="none" stroke="url(#circuitGold)" strokeWidth="8" strokeLinecap="round" />

            {/* Big Right Claw Base */}
            <g transform="translate(258, 60) rotate(15)">
              <path d="M 8,-12 C 15,-2 0,18 -15,10 C -25,2 -18,-15 8,-12 Z" fill="url(#circuitGold)" />
              {/* Outer sharp curved mechanical hook */}
              <path d="M 8,-12 C 25,-32 4,-40 -2,-42 C 5,-35 15,-20 5,-12" fill="url(#circuitGold)" />
              {/* Inner flexible golden thumb hook (rotates on trigger) */}
              <motion.path
                d="M -12,8 C -25,25 -35,5 -30,-5"
                fill="none"
                stroke="url(#circuitGold)"
                strokeWidth="4.5"
                strokeLinecap="round"
                animate={{ rotate: isHovered || isStinging ? 12 : 0 }}
                style={{ originX: "-12px", originY: "8px" }}
              />
            </g>
          </motion.g>

          {/* Main Cybernetic Scorpion Body Casing */}
          <motion.g
            id="scorpion-body-casing"
            animate={{
              x: mousePos.x * 5,
              y: mousePos.y * 5,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            {/* Tail Connecter Link */}
            <path d="M 188,275 C188,290 212,290 212,275 Z" fill="#3D2602" />

            {/* Segment 5 (Lowest abdominal segment) */}
            <path d="M 183,250 C 183,275 217,275 217,250 Z" fill="url(#circuitGold)" stroke="#3D2602" strokeWidth="1" />
            
            {/* Segment 4 */}
            <path d="M 181,228 C 181,253 219,253 219,228 Z" fill="url(#circuitGold)" stroke="#3D2602" strokeWidth="1" />

            {/* Segment 3 */}
            <path d="M 179,206 C 179,231 221,231 221,206 Z" fill="url(#circuitGold)" stroke="#3D2602" strokeWidth="1" />

            {/* Segment 2 */}
            <path d="M 177,184 C 177,209 223,209 223,184 Z" fill="url(#circuitGold)" stroke="#3D2602" strokeWidth="1" />

            {/* Segment 1 (Upper abdominal chest) */}
            <path d="M 174,162 C 174,188 226,188 226,162 Z" fill="url(#circuitGold)" stroke="#3D2602" strokeWidth="1" />

            {/* Cybernetic circuit lines on segments (dynamically pulses) */}
            <path
              d="M 200,165 L 200,270 M 186,180 L 214,180 M 188,202 L 212,202 M 190,224 L 210,224 M 192,246 L 208,246"
              stroke="#FEF08A"
              strokeWidth="1.2"
              strokeDasharray="4,4"
              strokeOpacity={circuitPulse === 0 ? 0.3 : 0.85}
              fill="none"
              className="transition-all duration-300"
            />

            {/* Scorpion Head Plate (Golden Shield) */}
            <path d="M 170,165 C 168,140 185,115 200,111 C 215,115 232,140 230,165 C 220,172 180,172 170,165 Z" fill="url(#circuitGold)" />

            {/* Head Circuit lines mimicking neural connectors */}
            <path d="M 190,130 L 195,145 L 200,150 L 205,145 L 210,130" fill="none" stroke="#3D2602" strokeWidth="1.5" />
            <path d="M 200,111 L 200,150" fill="none" stroke="#3D2602" strokeWidth="1.5" />

            {/* Animated Cyber Glowing Eyes */}
            <circle
              cx="191"
              cy="133"
              r="2.5"
              fill={isStinging ? "#38bdf8" : "#FDE047"}
              filter={isStinging ? "url(#glow)" : "none"}
              className="transition-all duration-300"
            />
            <circle
              cx="209"
              cy="133"
              r="2.5"
              fill={isStinging ? "#38bdf8" : "#FDE047"}
              filter={isStinging ? "url(#glow)" : "none"}
              className="transition-all duration-300"
            />
            
            {/* Cyber Core Light (center carapace) */}
            <circle
              cx="200"
              cy="195"
              r={isHovered ? "7" : "5"}
              fill={isStinging ? "#38bdf8" : "url(#cyberGlow)"}
              filter="url(#glow)"
              className="transition-all duration-300"
            />
          </motion.g>
        </g>
      </svg>

      {/* Scorpion Technical Coordinates HUD Overlay */}
      <div className="absolute bottom-4 left-6 right-6 flex justify-between font-mono text-[9px] text-amber-500/60 pointer-events-none">
        <span>UNIT: SC_V2.2_SYS</span>
        <span>STING: {isStinging ? "ENGAGED" : "READY_"}</span>
        <span>GRID: [X:{(mousePos.x * 100).toFixed(0)}, Y:{(mousePos.y * 100).toFixed(0)}]</span>
      </div>
    </div>
  );
}
