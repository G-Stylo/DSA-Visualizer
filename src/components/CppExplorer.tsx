import React, { useState } from 'react';
import { cppCodeFiles, CodeFile } from '../data/cpp_code';
import { File, Folder, Copy, Check, Info, Server, Terminal, ShieldAlert } from 'lucide-react';

export default function CppExplorer() {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(cppCodeFiles[3]); // Default to IAlgorithm.hpp
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Ultra-polished regex-based syntax highlighter for C++, CMake, and Markdown
  const highlightCode = (code: string, language: string) => {
    if (language === 'markdown') {
      return code
        .replace(/^(#+ )(.*)$/gm, '<span class="text-indigo-400 font-bold">$1$2</span>')
        .replace(/(\*\*|__)(.*?)\1/g, '<span class="text-amber-300 font-semibold">$2</span>')
        .replace(/`([^`]+)`/g, '<span class="text-emerald-400 bg-slate-900/50 px-1 rounded font-mono">$1</span>');
    }

    if (language === 'cmake') {
      return code
        .replace(/(#.*)$/gm, '<span class="text-slate-500 italic">$1</span>')
        .replace(/\b(cmake_minimum_required|project|set|add_executable|find_package|target_link_libraries|target_include_directories)\b/g, '<span class="text-violet-400 font-medium">$1</span>')
        .replace(/\b(REQUIRED|PRIVATE|LANGUAGES|CXX|VERSION)\b/g, '<span class="text-indigo-300">$1</span>')
        .replace(/(\$\{.*?\})/g, '<span class="text-sky-300">$1</span>');
    }

    // Default to C++ highlighting
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return escaped
      // Multi-line comments
      .replace(/(\/\*([\s\S]*?)\*\/)/g, '<span class="text-slate-500 italic">$1</span>')
      // Single-line comments
      .replace(/(\/\/.*)$/gm, '<span class="text-slate-500 italic">$1</span>')
      // Preprocessor directives
      .replace(/(#pragma once|#include\s+&lt;.*&gt;|#include\s+".*")/g, '<span class="text-emerald-400 font-semibold">$1</span>')
      // Keywords
      .replace(/\b(class|struct|public|private|protected|virtual|override|explicit|default|delete|return|bool|int|float|double|size_t|char|const|void|true|false|new|delete|nullptr|using|namespace|dynamic_cast|std::swap|std::vector|std::unique_ptr|std::shared_ptr|std::make_unique|std::srand|std::time)\b/g, '<span class="text-sky-400 font-semibold">$1</span>')
      // Functions
      .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g, '<span class="text-violet-300">$1</span>')
      // Numbers
      .replace(/\b(\d+(?:\.\d+)?f?)\b/g, '<span class="text-amber-300">$1</span>')
      // Strings
      .replace(/("[^"\\]*(?:\\.[^"\\]*)*")/g, '<span class="text-amber-400">$1</span>');
  };

  return (
    <div className="bg-[#161618] border border-gray-800 rounded overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[780px]" id="cpp-explorer-container">
      {/* Sidebar File Explorer */}
      <div className="w-full lg:w-72 bg-[#09090a] border-r border-gray-800 p-4 flex flex-col justify-between" id="sidebar-explorer">
        <div>
          <div className="flex items-center gap-2 mb-4" id="compiler-label">
            <Terminal className="text-blue-400 w-4.5 h-4.5" />
            <h3 className="font-mono text-xs tracking-wider text-gray-300 font-bold uppercase">C++ Source Files</h3>
          </div>

          <div className="space-y-4" id="file-groups">
            {/* Build Config Group */}
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-bold mb-1.5 flex items-center gap-1.5">
                <Folder className="w-3 h-3 text-blue-400" />
                Root Setup
              </div>
              <div className="space-y-0.5">
                {cppCodeFiles.filter(f => !f.path.includes('/')).map((file) => (
                  <button
                    key={file.path}
                    id={`file-btn-${file.name.replace(/\./g, '-')}`}
                    onClick={() => { setSelectedFile(file); setCopied(false); }}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded font-mono text-[11px] transition-all text-left ${
                      selectedFile.path === file.path
                        ? 'bg-blue-600/10 text-blue-400 font-medium border-l-2 border-blue-500 pl-1.5'
                        : 'text-gray-400 hover:bg-[#121214] hover:text-gray-200'
                    }`}
                  >
                    <File className="w-3 h-3 flex-shrink-0 text-gray-500" />
                    {file.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Source Code Group */}
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-bold mb-1.5 flex items-center gap-1.5">
                <Folder className="w-3 h-3 text-green-400" />
                src/ (Codebase)
              </div>
              <div className="space-y-0.5">
                {cppCodeFiles.filter(f => f.path.includes('/')).map((file) => (
                  <button
                    key={file.path}
                    id={`file-btn-${file.name.replace(/\./g, '-')}`}
                    onClick={() => { setSelectedFile(file); setCopied(false); }}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded font-mono text-[11px] transition-all text-left ${
                      selectedFile.path === file.path
                        ? 'bg-blue-600/10 text-blue-400 font-medium border-l-2 border-blue-500 pl-1.5'
                        : 'text-gray-400 hover:bg-[#121214] hover:text-gray-200'
                    }`}
                  >
                    <File className="w-3 h-3 flex-shrink-0 text-gray-500" />
                    <span className="truncate">{file.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick info footer */}
        <div className="bg-[#121214] p-3 rounded border border-gray-800 mt-4" id="compiler-spec-panel">
          <div className="flex items-start gap-2 text-[10px] text-gray-500 leading-relaxed font-mono">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-gray-300">Architect Specs</p>
              <p>Compiler: GCC c++17</p>
              <p>Graphics: Raylib (Unweighted)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 flex flex-col min-w-0" id="editor-main-panel">
        {/* Editor Tab Bar */}
        <div className="bg-[#09090a] px-4 py-3 border-b border-gray-800 flex items-center justify-between" id="editor-header">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-white font-bold">{selectedFile.path}</span>
              <span className="text-[9px] bg-gray-800 text-gray-400 font-mono px-1.5 py-0.5 rounded uppercase">
                {selectedFile.language}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">{selectedFile.description}</p>
          </div>

          <button
            onClick={handleCopy}
            id="copy-code-btn"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1c] hover:bg-[#121214] border border-gray-850 hover:border-gray-500 text-gray-300 hover:text-white rounded transition-colors text-[10px] font-mono font-medium shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-blue-400" />
                Copy File
              </>
            )}
          </button>
        </div>

        {/* Code Canvas */}
        <div className="flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed bg-[#0c0c0d] select-text" id="editor-canvas">
          <pre className="relative h-full">
            <code
              className="block overflow-x-auto text-gray-300 font-mono whitespace-pre"
              dangerouslySetInnerHTML={{ __html: highlightCode(selectedFile.content, selectedFile.language) }}
            />
          </pre>
        </div>

        {/* Architectural Insight Banner */}
        <div className="bg-[#09090a] border-t border-gray-800 p-3.5 shrink-0 flex items-start gap-2.5 shadow-inner" id="architect-insights">
          <Server className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-mono font-semibold text-blue-400 uppercase tracking-wider text-[10px] mr-1.5">Design Choice:</span>
            <span className="text-gray-400">
              {selectedFile.name === 'IAlgorithm.hpp' && "The virtual IAlgorithm::Step() returns false when outstanding steps remain. This yields frame-time execution back to Raylib's loop, allowing effortless pausing and frame-delay adjustments without custom threads or UI locks!"}
              {selectedFile.name === 'BubbleSort.hpp' && "Instead of typical blocking loops (e.g. nested for-loops), sorting indexes m_currentI and m_currentJ are persisted as class properties. Each Step() executes exactly one swap analysis and advances the trackers, preserving context."}
              {selectedFile.name === 'main.cpp' && "Raylib's main loop remains unblocked. It delegates performance to sortingViz.Update() which schedules steps according to the time delta. Control commands directly alter of timing intervals."}
              {selectedFile.name === 'CMakeLists.txt' && "Utilizes CMake's standard target-linking API (target_link_libraries) to resolve dependencies cleanly across OS builds (MSVC, Linux, macOS) through system path injections."}
              {selectedFile.name === 'README.md' && "Ready for production GitHub publishing. Outlines developer build workflows, dependencies, installation details, files structure, and development plans."}
              {selectedFile.name === '.gitignore' && "Keeps code repositories minimal and clean. Automatically ignores OS layout logs, IDE projects, CMake build outputs, compiled static DLL/SO files, and executable modules."}
              {selectedFile.name === 'SortingVisualizer.hpp' && "Decoupled array state holder. It manages state vectors and active algorithms using std::unique_ptr, adhering to RAII design principles."}
              {selectedFile.name === 'SortingVisualizer.cpp' && "Uses RTTI dynamic_cast to query if the active IAlgorithm is a BubbleSort, unlocking specialized visualization data (active swaps index indices and sorted domains) for custom coloring."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
