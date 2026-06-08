"use client";

import { MessageSquare, Database, Mail, Zap, Send, Sparkles } from "lucide-react";

/**
 * Animated node graph for the AI service — sources flow into the Nodo core and
 * out as actions. Light pulses travel the SVG paths via CSS stroke-dash
 * (so the global prefers-reduced-motion rule freezes them). Fixed coordinates,
 * zero-dependency.
 */

const PATHS = [
  { d: "M28,38 C95,38 110,85 170,85", out: false, delay: "0s" },
  { d: "M28,85 C95,85 120,85 170,85", out: false, delay: "0.45s" },
  { d: "M28,132 C95,132 110,85 170,85", out: false, delay: "0.9s" },
  { d: "M170,85 C235,85 250,55 312,55", out: true, delay: "0.3s" },
  { d: "M170,85 C235,85 250,115 312,115", out: true, delay: "0.75s" },
];

function Node({
  x,
  y,
  hub = false,
  children,
}: {
  x: number;
  y: number;
  hub?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[9px] ${
        hub ? "h-12 w-12 border border-white/20" : "h-8 w-8 border border-white/10 bg-[rgba(18,18,32,0.92)]"
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        ...(hub
          ? {
              background: "linear-gradient(135deg,#8b2fef,#2785fe,#00c1f4)",
              boxShadow: "0 0 26px rgba(88,99,242,0.55)",
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
}

export default function AIBeams() {
  return (
    <div className="relative aspect-[2/1] w-full">
      <svg viewBox="0 0 340 170" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ai-in" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00c1f4" />
            <stop offset="100%" stopColor="#5863f2" />
          </linearGradient>
          <linearGradient id="ai-out" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5863f2" />
            <stop offset="100%" stopColor="#8b2fef" />
          </linearGradient>
        </defs>
        {/* static tracks */}
        {PATHS.map((p, i) => (
          <path key={`t-${i}`} d={p.d} stroke="rgba(255,255,255,0.09)" strokeWidth="1.25" />
        ))}
        {/* traveling pulses */}
        {PATHS.map((p, i) => (
          <path
            key={`p-${i}`}
            d={p.d}
            stroke={p.out ? "url(#ai-out)" : "url(#ai-in)"}
            strokeWidth="1.75"
            strokeLinecap="round"
            style={{
              strokeDasharray: "5 235",
              animation: "beam-flow 2.6s linear infinite",
              animationDelay: p.delay,
            }}
          />
        ))}
      </svg>

      <Node x={8.2} y={22.4}>
        <MessageSquare className="h-4 w-4 text-nodo-cyan" />
      </Node>
      <Node x={8.2} y={50}>
        <Database className="h-4 w-4 text-nodo-cyan" />
      </Node>
      <Node x={8.2} y={77.6}>
        <Mail className="h-4 w-4 text-nodo-cyan" />
      </Node>
      <Node x={50} y={50} hub>
        <Sparkles className="h-5 w-5 text-white" />
      </Node>
      <Node x={91.8} y={32.4}>
        <Zap className="h-4 w-4 text-nodo-purple" />
      </Node>
      <Node x={91.8} y={67.6}>
        <Send className="h-4 w-4 text-nodo-purple" />
      </Node>
    </div>
  );
}
