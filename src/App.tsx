import React, { useState } from 'react';
import SortingArena from './components/SortingArena';
import DsaArena from './components/DsaArena';
import { Layers, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'visualizer-sort' | 'visualizer-dsa'>('visualizer-sort');

  return (
    <div className="min-h-screen bg-[#121214] text-[#e1e1e6] flex flex-col selection:bg-blue-500/30 selection:text-blue-200" id="app-root">
      {/* Top Navigation Header */}
      <header className="h-14 border-b border-gray-800 bg-[#1a1a1c] flex items-center justify-between px-6 flex-shrink-0 z-30" id="main-navigation-header">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">C++</div>
          <div>
            <h1 className="text-sm font-bold tracking-tight uppercase text-white">DSA Visualizer <span className="text-blue-500 font-mono text-[10px]">v1.2.0</span></h1>
            <p className="text-[10px] text-gray-500 font-mono uppercase">ARCH: StateMachine | RENDER: Raylib-GL</p>
          </div>
        </div>

        {/* Tab Controls Deck */}
        <div className="flex items-center gap-1 bg-[#121214] p-0.5 rounded border border-gray-800" id="main-navigation-dashboard">
          <button
            onClick={() => setActiveTab('visualizer-sort')}
            id="tab-btn-sort"
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] rounded transition-all font-semibold uppercase cursor-pointer ${
              activeTab === 'visualizer-sort'
                ? 'bg-blue-600/10 border border-blue-500/50 text-blue-400'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Sorting
          </button>
          <button
            onClick={() => setActiveTab('visualizer-dsa')}
            id="tab-btn-dsa"
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] rounded transition-all font-semibold uppercase cursor-pointer ${
              activeTab === 'visualizer-dsa'
                ? 'bg-cyan-500/10 border border-cyan-500/50 text-cyan-400'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Algorithms & DS
          </button>
        </div>

        {/* System state dashboard */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
            <span className="text-[11px] font-mono uppercase text-gray-400">System Ready</span>
          </div>
        </div>
      </header>

      {/* Main Structural Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col gap-6" id="dashboard-content">
        {/* Core Presentation Tab Panels Switcher */}
        <div className="transition-all duration-300 flex-1 flex flex-col justify-between" id="active-panel-container">
          {activeTab === 'visualizer-sort' && (
            <div className="space-y-4" id="visualizer-sort-panel">
              <SortingArena />
            </div>
          )}

          {activeTab === 'visualizer-dsa' && (
            <div className="space-y-4" id="visualizer-dsa-panel">
              <DsaArena />
            </div>
          )}
        </div>
      </main>

      {/* Status Bar Footer */}
      <footer className="h-8 border-t border-gray-800 bg-[#1a1a1c] px-6 flex items-center justify-between flex-shrink-0 text-[10px] font-mono text-gray-500">
        <div className="flex gap-4">
          <span>VRAM: <span className="text-gray-300">256MB</span></span>
          <span>CPU: <span className="text-gray-300">1.2%</span></span>
          <span>FPS: <span className="text-green-400">60.0</span></span>
        </div>
        <div className="flex gap-4">
          <span className="text-blue-500">UTF-8</span>
          <span className="text-gray-500 italic uppercase tracking-widest">Algorithm Execution Layer High-Priority</span>
        </div>
      </footer>
    </div>
  );
}
