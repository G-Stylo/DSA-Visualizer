import React, { useState, useEffect, useRef } from 'react';
import {
  DsaTraceStep,
  staticGraphNodes,
  staticGraphEdges,
  generateBfsTrace,
  generateDfsTrace,
  generateBinarySearchTrace,
  generateNQueensTrace,
  generateGreedyTrace
} from '../utils/dsaAlgorithms';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Shuffle,
  Sparkles,
  Settings2,
  Sliders,
  ChevronRight,
  Info,
  Cpu,
  Code2,
  Layers,
  Terminal,
  Search,
  CheckCircle,
  HelpCircle,
  Clock,
  Menu,
  Activity as ActIcon,
  FileText,
  Database,
  Crown,
  Check,
  X
} from 'lucide-react';

const dsaCodes: Record<string, Record<'cpp' | 'java' | 'python', string[]>> = {
  BFS: {
    cpp: [
      "void bfs(int start, vector<vector<int>>& adj) {",
      "    vector<bool> visited(adj.size(), false);",
      "    queue<int> q;",
      "    q.push(start); visited[start] = true;",
      "    while (!q.empty()) {",
      "        int curr = q.front(); q.pop();",
      "        for (int neighbor : adj[curr]) {",
      "            if (!visited[neighbor]) {",
      "                visited[neighbor] = true;",
      "                q.push(neighbor);",
      "            }",
      "        }",
      "    }",
      "}"
    ],
    java: [
      "public static void bfs(int start, List<List<Integer>> adj) {",
      "    boolean[] visited = new boolean[adj.size()];",
      "    Queue<Integer> q = new LinkedList<>();",
      "    q.add(start); visited[start] = true;",
      "    while (!q.isEmpty()) {",
      "        int curr = q.poll();",
      "        for (int neighbor : adj.get(curr)) {",
      "            if (!visited[neighbor]) {",
      "                visited[neighbor] = true;",
      "                q.add(neighbor);",
      "            }",
      "        }",
      "    }",
      "}"
    ],
    python: [
      "def bfs(start, adj):",
      "    visited = [False] * len(adj)",
      "    q = deque([start])",
      "    visited[start] = True",
      "    while q:",
      "        curr = q.popleft()",
      "        for neighbor in adj[curr]:",
      "            if not visited[neighbor]:",
      "                visited[neighbor] = True",
      "                q.append(neighbor)"
    ]
  },
  DFS: {
    cpp: [
      "void dfs(int curr, vector<vector<int>>& adj, vector<bool>& visited) {",
      "    visited[curr] = true;",
      "    for (int neighbor : adj[curr]) {",
      "        if (!visited[neighbor]) {",
      "            dfs(neighbor, adj, visited);",
      "        }",
      "    }",
      "}"
    ],
    java: [
      "public static void dfs(int curr, List<List<Integer>> adj, boolean[] visited) {",
      "    visited[curr] = true;",
      "    for (int neighbor : adj.get(curr)) {",
      "        if (!visited[neighbor]) {",
      "            dfs(neighbor, adj, visited);",
      "        }",
      "    }",
      "}"
    ],
    python: [
      "def dfs(curr, adj, visited):",
      "    visited[curr] = True",
      "    for neighbor in adj[curr]:",
      "        if not visited[neighbor]:",
      "            dfs(neighbor, adj, visited)"
    ]
  },
  'Binary Search': {
    cpp: [
      "int binarySearch(vector<int>& arr, int target) {",
      "    int low = 0, high = arr.size() - 1;",
      "    while (low <= high) {",
      "        int mid = low + (high - low) / 2;",
      "        if (arr[mid] == target) return mid;",
      "        if (arr[mid] < target) low = mid + 1;",
      "        else high = mid - 1;",
      "    }",
      "    return -1;",
      "}"
    ],
    java: [
      "public static int binarySearch(int[] arr, int target) {",
      "    int low = 0, high = arr.length - 1;",
      "    while (low <= high) {",
      "        int mid = low + (high - low) / 2;",
      "        if (arr[mid] == target) return mid;",
      "        if (arr[mid] < target) low = mid + 1;",
      "        else high = mid - 1;",
      "    }",
      "    return -1;",
      "}"
    ],
    python: [
      "def binarySearch(arr, target):",
      "    low, high = 0, len(arr) - 1",
      "    while low <= high:",
      "        mid = low + (high - low) // 2",
      "        if arr[mid] == target: return mid",
      "        if arr[mid] < target: low = mid + 1",
      "        else: high = mid - 1",
      "    return -1"
    ]
  },
  'Complete Search': {
    cpp: [
      "bool solveNQueens(int row) {",
      "    if (row == N) return true;",
      "    for (int col = 0; col < N; col++) {",
      "        if (isSafe(row, col)) {",
      "            placeQueen(row, col);",
      "            if (solveNQueens(row + 1)) return true;",
      "            removeQueen(row, col); // backtrack",
      "        }",
      "    }",
      "    return false;",
      "}"
    ],
    java: [
      "public static boolean solveNQueens(int row) {",
      "    if (row == N) return true;",
      "    for (int col = 0; col < N; col++) {",
      "        if (isSafe(row, col)) {",
      "            placeQueen(row, col);",
      "            if (solveNQueens(row + 1)) return true;",
      "            removeQueen(row, col); // backtrack",
      "        }",
      "    }",
      "    return false;",
      "}"
    ],
    python: [
      "def solveNQueens(row):",
      "    if row == N: return True",
      "    for col in range(N):",
      "        if isSafe(row, col):",
      "            placeQueen(row, col)",
      "            if solveNQueens(row + 1): return True",
      "            removeQueen(row, col) # backtrack",
      "    return False"
    ]
  },
  Greedy: {
    cpp: [
      "int maxMovies(vector<Movie>& movies) {",
      "    sort(movies.begin(), movies.end(), compareEndTime);",
      "    int count = 0, lastEnd = -1;",
      "    for (auto& movie : movies) {",
      "        if (movie.start >= lastEnd) {",
      "            count++;",
      "            lastEnd = movie.end;",
      "            // Watch movie",
      "        }",
      "    }",
      "    return count;",
      "}"
    ],
    java: [
      "public static int maxMovies(List<Movie> movies) {",
      "    movies.sort((a, b) -> Integer.compare(a.end, b.end));",
      "    int count = 0, lastEnd = -1;",
      "    for (Movie movie : movies) {",
      "        if (movie.start >= lastEnd) {",
      "            count++;",
      "            lastEnd = movie.end;",
      "            // Watch movie",
      "        }",
      "    }",
      "    return count;",
      "}"
    ],
    python: [
      "def maxMovies(movies):",
      "    movies.sort(key=lambda x: x.end)",
      "    count, lastEnd = 0, -1",
      "    for movie in movies:",
      "        if movie.start >= lastEnd:",
      "            count += 1",
      "            lastEnd = movie.end",
      "            # Watch movie",
      "    return count"
    ]
  }
};

export interface CPProblemSpec {
  name: string;
  source: string;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  rawStdin: string;
  rawStdout: string;
}

export const cpProblems: Record<string, CPProblemSpec> = {
  BFS: {
    name: "Message Route",
    source: "CSES 1667",
    statement: "Akshay's network consists of N computers and M connections. Find a route from computer 1 (represented visually as 'A') to computer N ('H') so that Akshay can send a message. What is the minimum number of computers on such a route, and what is the path of computers?",
    inputFormat: "The first input line has two integers N and M: the number of computers and connections. Then there are M lines describing the connections.",
    outputFormat: "First print an integer K: the minimum number of computers on a valid route. If there are no routes, print 'IMPOSSIBLE'. Otherwise, print the path of computers.",
    constraints: [
      "2 ≤ N ≤ 10^5",
      "1 ≤ M ≤ 2 * 10^5",
      "1 ≤ a, b ≤ N"
    ],
    rawStdin: "8 10\n1 2\n1 3\n2 4\n2 5\n3 5\n4 6\n5 6\n5 7\n6 8\n7 8",
    rawStdout: "5\n1 2 5 6 8 (Path: A → B → E → F → H)"
  },
  DFS: {
    name: "Building Roads",
    source: "CSES 1666",
    statement: "Byteland has N cities and M roads. The goal is to traverse all connected systems to verify if all cities can communicate. Perform a Depth First Search (DFS) starting at city 1 ('A') to traverse the graph deeply and build a spanning tree. Print the order in which cities are visited during deep recursive search traversal.",
    inputFormat: "The first input line has two integers N and M: the number of cities and roads. The next M lines describe the roads between cities.",
    outputFormat: "Print the total connected components or nodes, followed by the zero-indexed vertex labels in the order of DFS discovery.",
    constraints: [
      "2 ≤ N ≤ 10^5",
      "1 ≤ M ≤ 2 * 10^5",
      "1 ≤ a, b ≤ N"
    ],
    rawStdin: "8 10\n1 2\n1 3\n2 4\n2 5\n3 5\n4 6\n5 6\n5 7\n6 8\n7 8",
    rawStdout: "8\n0 1 3 5 7 6 4 2 (Path: A → B → D → F → H → G → E → C)"
  },
  'Binary Search': {
    name: "Factory Machines (Target Element)",
    source: "CSES 1620 (Adapted)",
    statement: "Given a sorted non-decreasing array of N positive integers and a target value x, determine if the target exists in the array. If it does, find its 0-based index using a logarithmic binary search algorithm. Report mid, low, and high pointer changes on every search split.",
    inputFormat: "The first line contains N (size of the array) and the search target x. The second line contains N sorted integers.",
    outputFormat: "Print the 0-based index of the target in the sorted array, or -1 if the target is not present.",
    constraints: [
      "1 ≤ N ≤ 2 * 10^5",
      "1 ≤ arr[i], x ≤ 10^9",
      "arr is sorted in non-decreasing order"
    ],
    rawStdin: "15 72\n12 17 24 29 35 38 42 51 59 65 72 78 83 91 98",
    rawStdout: "10"
  },
  'Complete Search': {
    name: "Chessboard and Queens",
    source: "CSES 1624 (Simplified)",
    statement: "Your task is to place 4 queens on a 4x4 chessboard so that no two queens are attacking each other. Two queens attack each other if they share the same row, column, or diagonal line. Your backtracking algorithm must systematically place queens column by column, pruning safe coordinates and rolling back upon conflicts.",
    inputFormat: "An empty 4x4 coordinate space where each block can host a queen.",
    outputFormat: "Print the position of the queen in each row in 0-based column notation.",
    constraints: [
      "N = 4 rows",
      "N = 4 columns",
      "Time Limit: 1.00 s"
    ],
    rawStdin: "[4x4 empty grid representation]",
    rawStdout: "Row 0: Col 1\nRow 1: Col 3\nRow 2: Col 0\nRow 3: Col 2"
  },
  Greedy: {
    name: "Movie Festival",
    source: "CSES 1629",
    statement: "In a movie festival, N movies will be shown. You know the starting time s and finishing time e of each movie. What is the maximum number of movies you can watch entire configurations of, if you can only watch one movie at any given time? Watch next movie only if it starts after prior terminates.",
    inputFormat: "The first input line has N: the number of movies. Then, there are N lines, each containing start s and end e times of a movie.",
    outputFormat: "Print one integer: the maximum number of movies you can watch without any interval conflict.",
    constraints: [
      "1 ≤ N ≤ 2 * 10^5",
      "1 ≤ s < e ≤ 10^9"
    ],
    rawStdin: "7\n1 3\n2 5\n3 8\n4 6\n6 9\n5 7\n8 10",
    rawStdout: "3 (Selected: Sci-Fi Space Film, Mystery Thriller, Drama Showcase)"
  }
};

export default function DsaArena() {
  const [activeAlgo, setActiveAlgo] = useState<'BFS' | 'DFS' | 'Binary Search' | 'Complete Search' | 'Greedy'>('BFS');
  const [cpTab, setCpTab] = useState<'problem' | 'io' | 'memory'>('problem');
  const [selectedLanguage, setSelectedLanguage] = useState<'cpp' | 'java' | 'python'>('cpp');
  const [trace, setTrace] = useState<DsaTraceStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(120); // wait time in ms
  const [binarySearchTarget, setBinarySearchTarget] = useState<number>(72);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const codeLinesContainerRef = useRef<HTMLDivElement | null>(null);

  // Re-generate trace whenever the active algorithm or settings change
  useEffect(() => {
    setIsPlaying(false);
    let newTrace: DsaTraceStep[] = [];
    if (activeAlgo === 'BFS') {
      newTrace = generateBfsTrace();
    } else if (activeAlgo === 'DFS') {
      newTrace = generateDfsTrace();
    } else if (activeAlgo === 'Binary Search') {
      newTrace = generateBinarySearchTrace(binarySearchTarget);
    } else if (activeAlgo === 'Complete Search') {
      newTrace = generateNQueensTrace();
    } else if (activeAlgo === 'Greedy') {
      newTrace = generateGreedyTrace();
    }
    setTrace(newTrace);
    setCurrentStepIndex(0);
  }, [activeAlgo, binarySearchTarget]);

  // Playback Interval Control
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < trace.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, playbackSpeed);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, trace, playbackSpeed]);

  // Terminal Auto Scroller
  useEffect(() => {
    if (autoScroll && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentStepIndex, autoScroll]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < trace.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const currentStep = trace[currentStepIndex];
  const activeLineIdx = currentStep ? currentStep.lineIndex : -1;
  const rawCodeLines = dsaCodes[activeAlgo]?.[selectedLanguage] || [];

  // Auto-scroll inside source view matchingHighlighted instruction
  useEffect(() => {
    if (activeLineIdx >= 0 && codeLinesContainerRef.current) {
      const activeElement = codeLinesContainerRef.current.querySelector(`[data-line-index="${activeLineIdx}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeLineIdx]);

  const getLanguageNiceName = (lang: 'cpp' | 'java' | 'python') => {
    if (lang === 'cpp') return 'C++';
    if (lang === 'java') return 'Java';
    return 'Python';
  };

  // ----------------------------------------------------
  // SUB-RENDERER: BFS/DFS BREADTH VERTICES & NETWORK
  // ----------------------------------------------------
  const renderGraphVisualizer = () => {
    if (!currentStep || !currentStep.bfsDfsState) return null;
    const { visited, queue, stack, currentNode, activeNeighbor, discoveredTreeEdges } = currentStep.bfsDfsState;

    return (
      <div className="flex flex-col h-full justify-between" id="bfs-dfs-canvas-layout">
        <div className="relative flex-1 bg-[#09090a] rounded border border-gray-800 p-2 min-h-[280px]" id="network-scene">
          {/* SVG canvas links and Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" id="graph-svg-canvas">
            {/* Draw standard graph edges */}
            {staticGraphEdges.map((edge, idx) => {
              const uNode = staticGraphNodes.find(n => n.id === edge.from);
              const vNode = staticGraphNodes.find(n => n.id === edge.to);
              if (!uNode || !vNode) return null;

              // Check if edge was active/highlighted as part of BFS/DFS tree discover
              const isTreeEdge = discoveredTreeEdges.some(
                ([f, t]) => (f === edge.from && t === edge.to) || (f === edge.to && t === edge.from)
              );
              const isActiveWalk = currentNode !== null && activeNeighbor !== null &&
                ((currentNode === edge.from && activeNeighbor === edge.to) || (currentNode === edge.to && activeNeighbor === edge.from));

              let strokeColor = '#374151'; // standard gray
              let strokeWidth = '2';
              let isDashed = false;

              if (isActiveWalk) {
                strokeColor = '#f59e0b'; // amber scanning
                strokeWidth = '3.5';
              } else if (isTreeEdge) {
                strokeColor = '#10b981'; // green tree edge
                strokeWidth = '3';
              }

              return (
                <line
                  key={idx}
                  x1={`${uNode.x}%`}
                  y1={`${uNode.y}%`}
                  x2={`${vNode.x}%`}
                  y2={`${vNode.y}%`}
                  stroke={strokeColor}
                  className="transition-all duration-300"
                  strokeWidth={strokeWidth}
                  strokeDasharray={isDashed ? '4,4' : 'none'}
                />
              );
            })}
          </svg>

          {/* Render individual node blocks */}
          {staticGraphNodes.map((node) => {
            const isCurrentNode = currentNode === node.id;
            const isScanningNeighbor = activeNeighbor === node.id;
            const isVisited = visited.includes(node.id);
            const inQueue = queue.includes(node.id);
            const inStack = stack.includes(node.id);

            let nodeBg = 'bg-[#1a1a1c] border-gray-700 text-gray-400';
            let ringPulse = '';

            if (isCurrentNode) {
              nodeBg = 'bg-yellow-500 border-yellow-400 text-[#09090a] font-black scale-110 shadow-lg shadow-yellow-500/20';
              ringPulse = 'animate-ping border-yellow-400 absolute inset-0 rounded-full opacity-40';
            } else if (isScanningNeighbor) {
              nodeBg = 'bg-amber-600 border-amber-400 text-white scale-110 shadow-amber-500/10';
              ringPulse = 'animate-pulse border-amber-400 absolute inset-0 rounded-full opacity-60';
            } else if (inQueue) {
              nodeBg = 'bg-cyan-950 border-cyan-500 text-cyan-300';
            } else if (inStack) {
              nodeBg = 'bg-purple-950 border-purple-500 text-purple-300';
            } else if (isVisited) {
              nodeBg = 'bg-[#183a2b] border-[#10b981]/50 text-emerald-400';
            }

            return (
              <div
                key={node.id}
                id={`graph-node-${node.id}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="relative w-9 h-9">
                  <div className={ringPulse} />
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-mono font-bold select-none ${nodeBg}`}>
                    {node.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Frontier Queue or Stack details */}
        <div className="mt-3 p-3 bg-[#111112] rounded border border-gray-800" id="container-element-history">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] uppercase font-mono font-bold text-gray-500 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-cyan-400" />
              Dynamic Frontier Segment ({activeAlgo === 'BFS' ? 'FIFO Queue' : 'LIFO Recursion Stack'})
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              {activeAlgo === 'BFS' ? 'Count: ' + queue.length : 'Depth: ' + stack.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 min-h-[30px] overflow-x-auto pr-1">
            {activeAlgo === 'BFS' ? (
              queue.length === 0 ? (
                <span className="text-[10px] text-gray-600 font-mono italic">Frontier queue is currently empty</span>
              ) : (
                queue.map((nodeId, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 bg-cyan-950/40 border border-cyan-800/60 rounded text-cyan-300 font-mono text-[10px] font-bold flex items-center gap-1 animate-fadeIn"
                  >
                    <span className="text-[8px] text-cyan-500">[{idx}]</span>
                    {staticGraphNodes[nodeId].label}
                  </div>
                ))
              )
            ) : (
              stack.length === 0 ? (
                <span className="text-[10px] text-gray-600 font-mono italic">Call stack is empty (Idle)</span>
              ) : (
                stack.map((nodeId, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 bg-purple-950/40 border border-purple-800/60 rounded text-purple-300 font-mono text-[10px] font-bold flex items-center gap-1 animate-fadeIn"
                  >
                    <span className="text-[8px] text-purple-500">#{idx}</span>
                    {staticGraphNodes[nodeId].label}
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // SUB-RENDERER: BINARY SEARCH ON SORTED ARRAY
  // ----------------------------------------------------
  const renderBinarySearchVisualizer = () => {
    if (!currentStep || !currentStep.binarySearchState) return null;
    const { low, high, mid, found, target } = currentStep.binarySearchState;
    const arr = [12, 17, 24, 29, 35, 38, 42, 51, 59, 65, 72, 78, 83, 91, 98];

    return (
      <div className="flex flex-col h-full justify-between gap-4" id="binsearch-scene">
        {/* Upper Search Target Selector Controller */}
        <div className="grid grid-cols-2 gap-3" id="binsearch-config">
          <div className="bg-[#121214] p-3 rounded border border-gray-800 flex flex-col justify-between" id="target-value-input-deck">
            <span className="text-[9px] uppercase font-mono font-bold text-gray-500 flex items-center gap-1">
              <Search className="w-3 h-3 text-cyan-400" /> Search Target
            </span>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                value={binarySearchTarget}
                disabled={isPlaying}
                onChange={(e) => {
                  const val = Math.max(1, Math.min(100, Number(e.target.value)));
                  setBinarySearchTarget(val);
                }}
                className="w-full bg-[#161618] border border-gray-800 rounded px-2 py-1 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-500 disabled:opacity-40"
              />
            </div>
          </div>

          <div className="bg-[#121214] p-3 rounded border border-gray-800 flex flex-col justify-between text-right" id="target-presets-selector">
            <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block">Common Presets</span>
            <div className="flex flex-wrap justify-end gap-1 mt-2">
              {[29, 72, 98, 45].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setIsPlaying(false);
                    setBinarySearchTarget(val);
                  }}
                  disabled={isPlaying}
                  className={`px-1.5 py-0.5 text-[9.5px] font-mono rounded font-bold border transition-all ${
                    binarySearchTarget === val
                      ? 'bg-cyan-600/20 border-cyan-500 text-cyan-400'
                      : 'bg-[#18181a] border-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sorted blocks grid visualizer */}
        <div className="flex-1 min-h-[180px] bg-[#09090a] rounded border border-gray-800 flex items-center justify-center p-4 relative" id="array-strip-board">
          <div className="w-full grid gap-1 select-none" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }} id="block-grid">
            {arr.map((val, idx) => {
              const insideSearchSpace = idx >= low && idx <= high;
              const isMid = idx === mid;
              const isMatch = isMid && val === target;

              let cellBg = 'bg-[#141416] border-gray-800 text-gray-500 opacity-25'; // Default inactive grayed out
              let scaleClass = 'scale-95';

              if (insideSearchSpace) {
                cellBg = 'bg-[#1a1a1c] border-gray-750 text-gray-300';
                scaleClass = 'scale-100';
              }

              if (isMid) {
                cellBg = 'bg-yellow-900/30 border-yellow-500 text-yellow-300 font-bold scale-110 ring-2 ring-yellow-400/20 z-10';
              }

              if (isMatch || (found && isMid)) {
                cellBg = 'bg-emerald-950/40 border-emerald-500 text-emerald-400 font-extrabold scale-110 ring-4 ring-emerald-500/20 z-10';
              }

              return (
                <div
                  key={idx}
                  id={`array-cell-${idx}`}
                  className={`relative border rounded flex flex-col justify-between py-2 text-center transition-all duration-300 h-20 ${cellBg} ${scaleClass}`}
                >
                  {/* Element Value */}
                  <span className="text-[11px] font-mono font-bold leading-none block">{val}</span>
                  {/* Element Index */}
                  <span className="text-[8px] font-mono text-gray-600 font-medium block">[{idx}]</span>

                  {/* Indicator labels */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center gap-0.5 whitespace-nowrap z-20">
                    {idx === low && (
                      <span className="text-[8px] font-mono font-bold text-cyan-400 bg-cyan-950/90 px-1 border border-cyan-800 rounded animate-fadeIn select-none">
                        L
                      </span>
                    )}
                    {idx === high && (
                      <span className="text-[8px] font-mono font-bold text-red-400 bg-red-950/90 px-1 border border-red-800 rounded animate-fadeIn select-none">
                        H
                      </span>
                    )}
                    {isMid && (
                      <span className="text-[8px] font-mono font-bold text-yellow-400 bg-yellow-950/90 px-1 border border-yellow-850 rounded animate-bounce select-none">
                        M
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed diagnostic logs of low, mid, and high pointers */}
        <div className="p-3 bg-[#111112] rounded border border-gray-850 grid grid-cols-3 gap-2 text-center" id="search-statistics">
          <div className="bg-[#09090a] p-1.5 rounded border border-gray-800">
            <span className="text-[8px] font-mono text-gray-500 uppercase block">Pointer low</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">{low <= high ? low : 'N/A'}</span>
          </div>
          <div className="bg-[#09090a] p-1.5 rounded border border-gray-800">
            <span className="text-[8px] font-mono text-gray-500 uppercase block">Pointer mid</span>
            <span className="text-xs font-mono text-yellow-400 font-bold">{mid !== -1 ? mid : '-'}</span>
          </div>
          <div className="bg-[#09090a] p-1.5 rounded border border-gray-800">
            <span className="text-[8px] font-mono text-gray-500 uppercase block">Pointer high</span>
            <span className="text-xs font-mono text-red-300 font-bold">{low <= high ? high : 'N/A'}</span>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // SUB-RENDERER: COMPLETE SEARCH BACKTRACKING CHESSBOARD
  // ----------------------------------------------------
  const renderNQueensVisualizer = () => {
    if (!currentStep || !currentStep.backtrackingState) return null;
    const { queens, row, checkingCol, isSafe, stack } = currentStep.backtrackingState;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="nqueens-scene">
        {/* Backtracking Live Stack */}
        <div className="bg-[#121214] border border-gray-800 rounded p-3 flex flex-col justify-between" id="call-stack-logs">
          <div>
            <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-2">Backtracking Tree Stack</span>
            <div className="space-y-1 overflow-y-auto max-h-[190px]">
              {stack.map((func, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1.5 font-mono text-[9.5px] rounded bg-[#09090a] border border-gray-800 flex items-center justify-between text-gray-300 animate-fadeIn"
                >
                  <span className="text-[8.5px] text-gray-500 select-none">[{idx}]</span>
                  <span className="truncated text-blue-400 font-bold">{func}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#09090a] px-2 py-1 rounded border border-gray-850 mt-2 text-center text-[9px] font-mono text-gray-500 leading-normal">
            Recursion Depth: <span className="font-bold text-white">{row}</span>
          </div>
        </div>

        {/* Chessboard Section */}
        <div className="md:col-span-2 flex items-center justify-center p-3 bg-[#09090a] rounded border border-gray-850 h-[280px]" id="chessboard-viewport">
          <div className="grid grid-cols-4 grid-rows-4 w-52 h-52 border-2 border-gray-800 rounded overflow-hidden select-none" id="4x4-chessboard font-sans">
            {Array(4).fill(null).map((_, rIdx) => {
              return Array(4).fill(null).map((_, cIdx) => {
                const isBlack = (rIdx + cIdx) % 2 === 1;
                const hasQueen = queens[rIdx] === cIdx;
                const isScanning = rIdx === row && checkingCol === cIdx;

                let squareBg = isBlack ? 'bg-[#18181c]' : 'bg-[#292930]';
                let contentClass = '';

                if (isScanning) {
                  squareBg = isSafe ? 'bg-emerald-950 border border-emerald-500/50' : 'bg-red-950 border border-red-500/50 animate-pulse';
                }

                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    id={`chess-cell-${rIdx}-${cIdx}`}
                    className={`relative border border-gray-900/10 flex items-center justify-center font-bold text-xs select-none transition-colors duration-200 ${squareBg}`}
                  >
                    {/* Visual coordinates inside the box */}
                    <span className="absolute top-0.5 left-1 text-[7px] text-gray-600 mt-0.5 leading-none">
                      {rIdx},{cIdx}
                    </span>

                    {/* Placed Queen character */}
                    {hasQueen && (
                      <div className="flex flex-col items-center justify-center animate-bounce z-10 gap-0.5">
                        <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500 drop-shadow select-none" />
                        <span className="text-[6.5px] font-mono font-bold uppercase text-yellow-400 tracking-tight select-none">Row {rIdx}</span>
                      </div>
                    )}

                    {/* Temporary checking marker */}
                    {isScanning && (
                      <div className="flex flex-col items-center justify-center z-10 select-none gap-0.5">
                        {isSafe ? (
                          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 stroke-[3]" />
                        )}
                        <span className="text-[7px] font-mono text-gray-400 select-none">Check</span>
                      </div>
                    )}
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // SUB-RENDERER: GREEDY ACTIVITY SELECTION GANTT
  // ----------------------------------------------------
  const renderGreedyVisualizer = () => {
    if (!currentStep || !currentStep.greedyState) return null;
    const { activities, currentIndex, lastEndTime, selectedCount } = currentStep.greedyState;

    return (
      <div className="flex flex-col h-full justify-between gap-4" id="greedy-scene">
        {/* Timeline Timeline Graph */}
        <div className="flex-1 min-h-[220px] bg-[#09090a] rounded border border-gray-800 p-4 flex flex-col justify-between relative" id="activities-gantt-panel">
          
          {/* Hour ticks line */}
          <div className="flex items-center justify-between border-b border-gray-850 pb-1 flex-shrink-0 select-none" id="timeline-ticks">
            <span className="text-[8px] font-mono font-bold text-gray-600 uppercase">Interactive Timeline Slot:</span>
            <div className="flex gap-4 font-mono text-[9px] text-gray-600 font-bold">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(tick => (
                <span key={tick} className="w-4 text-center">{tick}h</span>
              ))}
            </div>
          </div>

          {/* Activity stacked rows */}
          <div className="flex-1 flex flex-col justify-center gap-1.5 py-2 overflow-y-auto" id="gantt-rows">
            {activities.map((act, idx) => {
              const isCurrent = idx === currentIndex;
              
              // Map percentage width based on timeline limits 1-10
              const startPct = ((act.start - 1) / 9) * 100;
              const widthPct = ((act.end - act.start) / 9) * 100;

              let barBg = 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-gray-400';
              let pointerOutline = '';

              if (act.status === 'checking' || isCurrent) {
                barBg = 'bg-yellow-950/40 border-yellow-500 text-yellow-300 font-bold';
                pointerOutline = 'ring-2 ring-yellow-400/30';
              } else if (act.status === 'selected') {
                barBg = 'bg-emerald-950/40 border-emerald-500 text-emerald-400 font-bold';
              } else if (act.status === 'rejected') {
                barBg = 'bg-red-950/20 border-red-950/50 text-red-500/45 border-dashed line-through opacity-40';
              }

              return (
                <div key={act.id} className="relative h-6 flex items-center" id={`gantt-row-${act.id}`}>
                  {/* Left Label */}
                  <span className="text-[9px] font-mono text-gray-500 truncate w-24 shrink-0 font-bold uppercase select-none">
                    {act.name}
                  </span>

                  {/* Horizontal Bar */}
                  <div className="flex-1 relative h-full">
                    <div
                      className={`absolute rounded border flex items-center justify-between px-2.5 h-full transition-all duration-300 text-[9.5px] font-mono truncate select-none ${barBg} ${pointerOutline}`}
                      style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                    >
                      <span className="truncate leading-none select-none">{act.start}h → {act.end}h</span>
                      {act.status === 'selected' && <span className="text-[8px] uppercase font-bold text-emerald-400">Watched</span>}
                      {act.status === 'rejected' && <span className="text-[8px] uppercase font-bold text-red-500 font-mono">Overlap</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Greedy State Diagnostics Tracker */}
        <div className="p-3 bg-[#111112] rounded border border-gray-850 flex items-center justify-between" id="greedy-statistics">
          <div className="font-mono text-[10px] text-gray-500 uppercase">
            Last selected limit bound: <span className="font-bold text-cyan-400">{lastEndTime !== -1 ? `${lastEndTime}h` : 'None'}</span>
          </div>
          <div className="font-mono text-[10px] text-gray-500 uppercase">
            Watched films: <span className="font-bold text-emerald-400">{selectedCount} Movies</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 font-sans text-gray-200" id="dsa-arena-masterplate">
      {/* Top Navbar details */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#161618] border border-gray-800 p-4 rounded-lg" id="dsa-top-header">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-white uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#22d3ee]" />
            Data Structures & Algorithms
          </h2>
          <p className="text-[10px] text-gray-500 font-mono mt-0.5">
            LOADED SUITE: {activeAlgo.toUpperCase()} | TARGET SOURCE CODE: C++ / Java / Python Standard Template Library
          </p>
        </div>

        {/* Algorithm Selectors */}
        <div className="flex flex-wrap items-center gap-1.5" id="dsa-active-algorithm-deck">
          {(['BFS', 'DFS', 'Binary Search', 'Complete Search', 'Greedy'] as const).map((algoName) => (
            <button
              key={algoName}
              id={`dsa-tab-selector-${algoName.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => {
                setActiveAlgo(algoName);
                setCpTab('problem'); // reset back to problem statement tab on algo switch
              }}
              className={`px-3 py-1.5 text-[10px] font-mono rounded font-bold border transition-all cursor-pointer ${
                activeAlgo === algoName
                  ? 'bg-cyan-600/15 border-cyan-500 text-cyan-400 font-extrabold shadow-[0_0_12px_rgba(34,211,238,0.1)]'
                  : 'bg-[#121214] border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1c]'
              }`}
            >
              {algoName}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3-Column IDE Workspace Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4" id="dsa-three-column-workspace">
        
        {/* ==========================================
            COLUMN 1 (3/12 width): CP PROBLEM SPECIFICATION
           ========================================== */}
        <div className="xl:col-span-3 bg-[#161618] border border-gray-800 rounded-lg p-4 flex flex-col justify-between min-h-[520px]" id="cp-problem-spec-column">
          
          <div className="flex flex-col h-full overflow-hidden">
            {/* CP Tabs Selection */}
            <div className="flex items-center gap-1 border-b border-gray-800 pb-2 mb-3 shrink-0" id="cp-spec-tabs-switch">
              <button
                onClick={() => setCpTab('problem')}
                className={`flex-1 py-1 px-1 flex items-center justify-center gap-1 font-mono text-[9.5px] font-bold rounded uppercase transition-all cursor-pointer ${
                  cpTab === 'problem'
                    ? 'bg-cyan-950/40 border border-cyan-800 text-cyan-300 font-extrabold'
                    : 'text-gray-500 hover:text-gray-305'
                }`}
              >
                <FileText className="w-3 h-3 text-[#22d3ee]" />
                <span>Problem</span>
              </button>
              <button
                onClick={() => setCpTab('io')}
                className={`flex-1 py-1 px-1 flex items-center justify-center gap-1 font-mono text-[9.5px] font-bold rounded uppercase transition-all cursor-pointer ${
                  cpTab === 'io'
                    ? 'bg-cyan-950/40 border border-cyan-800 text-cyan-300 font-extrabold'
                    : 'text-gray-500 hover:text-gray-305'
                }`}
              >
                <Terminal className="w-3 h-3 text-[#22d3ee]" />
                <span>I/O</span>
              </button>
              <button
                onClick={() => setCpTab('memory')}
                className={`flex-1 py-1 px-1 flex items-center justify-center gap-1 font-mono text-[9.5px] font-bold rounded uppercase transition-all cursor-pointer ${
                  cpTab === 'memory'
                    ? 'bg-cyan-950/40 border border-cyan-800 text-cyan-300 font-extrabold'
                    : 'text-gray-500 hover:text-gray-305'
                }`}
              >
                <Database className="w-3 h-3 text-[#22d3ee]" />
                <span>Variables</span>
              </button>
            </div>

            {/* Content for CP Specs Panel */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 scrollbar-thin text-xs" id="cp-tab-content-area text-gray-400">
              {cpTab === 'problem' && (
                <div className="space-y-3 animate-fadeIn" id="cp-problem-statement-tab">
                  {/* Title & Badge */}
                  <div className="flex items-start justify-between gap-2 border-b border-gray-850 pb-2">
                    <div>
                      <h4 className="font-sans text-xs font-bold text-white uppercase">
                        {cpProblems[activeAlgo].name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-cyan-405 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-850 block mt-1 w-max">
                        {cpProblems[activeAlgo].source}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase shrink-0">Standard IO</span>
                  </div>

                  {/* Narrative Body */}
                  <div className="text-gray-400 leading-relaxed space-y-2">
                    <span className="text-[10px] uppercase font-mono font-bold text-gray-400 block">Problem Narrative:</span>
                    <p className="bg-[#121214] p-3 rounded border border-gray-850/50 italic text-[11px] text-gray-300 leading-relaxed">
                      "{cpProblems[activeAlgo].statement}"
                    </p>
                  </div>

                  {/* IO specs text */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold text-gray-400 block">Input Format:</span>
                      <p className="text-gray-400 text-[11px] leading-normal mt-0.5 pl-1.5">{cpProblems[activeAlgo].inputFormat}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold text-gray-400 block">Output Format:</span>
                      <p className="text-gray-400 text-[11px] leading-normal mt-0.5 pl-1.5">{cpProblems[activeAlgo].outputFormat}</p>
                    </div>
                  </div>

                  {/* Constraints chips */}
                  <div className="pt-2 border-t border-gray-800">
                    <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-1.5">Constraints & Limits:</span>
                    <div className="flex flex-wrap gap-1.5 font-mono">
                      {cpProblems[activeAlgo].constraints.map((constraint, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-900 border border-gray-800 rounded text-[9.5px] text-gray-400">
                          {constraint}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {cpTab === 'io' && (
                <div className="space-y-4 animate-fadeIn" id="cp-file-io-tab font-mono">
                  {/* Input file editor lookalike */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono font-bold text-gray-401 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-blue-400" /> stdin (input.txt)
                      </span>
                      <span className="text-[8px] font-mono text-gray-500 bg-gray-900 px-1 border border-gray-850 rounded">READ ONLY</span>
                    </div>
                    <pre className="p-3 bg-[#121214] border border-gray-800 rounded font-mono text-[10.5px] leading-normal text-cyan-300/80 whitespace-pre overflow-x-auto min-h-[90px] shadow-inner select-text scrollbar-thin">
                      {cpProblems[activeAlgo].rawStdin}
                    </pre>
                  </div>

                  {/* Output standard lookalike */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono font-bold text-gray-401 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> expected stdout (output.txt)
                      </span>
                      <span className="text-[8px] font-mono text-emerald-800 bg-emerald-950/30 px-1 border border-emerald-900/40 rounded">SUCCESS</span>
                    </div>
                    <pre className="p-3 bg-[#121214] border border-gray-800 rounded font-mono text-[10.5px] leading-normal text-emerald-400/85 whitespace-pre overflow-x-auto min-h-[80px] shadow-inner select-text scrollbar-thin">
                      {cpProblems[activeAlgo].rawStdout}
                    </pre>
                  </div>
                </div>
              )}

              {cpTab === 'memory' && (
                <div className="space-y-3.5 animate-fadeIn font-mono text-xs" id="cp-vars-tab">
                  <div className="border-b border-gray-850 pb-2">
                    <h5 className="font-sans text-xs font-bold text-white uppercase">C++ Static Memory Dump</h5>
                    <p className="text-[9px] text-gray-500 uppercase mt-0.5">Real-time variables register status</p>
                  </div>

                  <div className="space-y-2.5">
                    {/* BFS/DFS Variables Exposer */}
                    {(activeAlgo === 'BFS' || activeAlgo === 'DFS') && currentStep?.bfsDfsState && (
                      <>
                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded">
                          <span className="text-[8px] font-bold text-[#f59e0b] uppercase">Variable: int curr_node</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            {currentStep.bfsDfsState.currentNode !== null ? `'${staticGraphNodes[currentStep.bfsDfsState.currentNode].label}' (ID: ${currentStep.bfsDfsState.currentNode})` : 'NULL'}
                          </p>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded">
                          <span className="text-[8px] font-bold text-amber-500 uppercase">Variable: int active_neighbor</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            {currentStep.bfsDfsState.activeNeighbor !== null ? `'${staticGraphNodes[currentStep.bfsDfsState.activeNeighbor].label}' (ID: ${currentStep.bfsDfsState.activeNeighbor})` : 'NULL'}
                          </p>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded">
                          <span className="text-[8px] font-bold text-cyan-400 uppercase">Variable: bool visited[{staticGraphNodes.length}]</span>
                          <div className="grid grid-cols-4 gap-1 mt-1 font-mono text-[9px] text-center">
                            {staticGraphNodes.map((n) => {
                              const isVisited = currentStep.bfsDfsState.visited.includes(n.id);
                              return (
                                <div key={n.id} className={`p-1 rounded border ${isVisited ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400 font-bold' : 'bg-[#18181b] border-gray-850 text-gray-500'}`}>
                                  {n.label}: {isVisited ? 'T' : 'F'}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded">
                          <span className="text-[8px] font-bold text-purple-400 uppercase">{activeAlgo === 'BFS' ? 'std::queue<int> frontier' : 'std::vector<int> recursive_stack'}</span>
                          <p className="text-[11px] text-gray-300 font-bold pl-1 bg-[#18181b] p-1 rounded font-mono truncate">
                            {activeAlgo === 'BFS'
                              ? `[ ${currentStep.bfsDfsState.queue.map(id => staticGraphNodes[id].label).join(', ')} ]`
                              : `[ ${currentStep.bfsDfsState.stack.map(id => staticGraphNodes[id].label).join(' → ')} ]`
                            }
                          </p>
                        </div>
                      </>
                    )}

                    {/* Binary Search States */}
                    {activeAlgo === 'Binary Search' && currentStep?.binarySearchState && (
                      <>
                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-cyan-400 uppercase">Variable: int low pointer</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            Index: {currentStep.binarySearchState.low} (Value: { [12, 17, 24, 29, 35, 38, 42, 51, 59, 65, 72, 78, 83, 91, 98][currentStep.binarySearchState.low] || 'OUT_OF_BOUNDS' })
                          </p>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-red-400 uppercase">Variable: int high pointer</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            Index: {currentStep.binarySearchState.high} (Value: { [12, 17, 24, 29, 35, 38, 42, 51, 59, 65, 72, 78, 83, 91, 98][currentStep.binarySearchState.high] || 'OUT_OF_BOUNDS' })
                          </p>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-yellow-400 uppercase">Variable: int mid index</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            {currentStep.binarySearchState.mid !== -1 ? `Index: ${currentStep.binarySearchState.mid} (Value: ${[12, 17, 24, 29, 35, 38, 42, 51, 59, 65, 72, 78, 83, 91, 98][currentStep.binarySearchState.mid]})` : 'INITIALIZING'}
                          </p>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-emerald-400 uppercase">Variable: bool target_found</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            {currentStep.binarySearchState.found ? 'TRUE (Index Matched!)' : 'FALSE (Probing)'}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Complete Search Variables */}
                    {activeAlgo === 'Complete Search' && currentStep?.backtrackingState && (
                      <>
                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-yellow-500 uppercase">vector&lt;int&gt; queens_placement</span>
                          <div className="text-[10px] font-bold text-white pl-1 bg-[#18181b] p-1.5 rounded font-mono leading-none flex flex-wrap gap-1.5">
                            {Array(4).fill(null).map((_, rIdx) => {
                              const col = currentStep.backtrackingState.queens[rIdx];
                              return (
                                <span key={rIdx} className="bg-gray-900 border border-gray-850 px-1 py-0.5 rounded leading-none">
                                  R{rIdx}: {col !== -1 ? `C${col}` : 'None'}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-[#6366f1] uppercase">Variable: int current_row</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            Line value: {currentStep.backtrackingState.row} (N = 4)
                          </p>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-[#ec4899] uppercase">Checking Column Placement</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            Probing Column: {currentStep.backtrackingState.checkingCol !== -1 ? currentStep.backtrackingState.checkingCol : 'Backtracking...'}
                          </p>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-[#10b981] uppercase">Constraint Check: is_safe</span>
                          <p className={`text-xs font-bold pl-1 p-1 rounded font-mono ${currentStep.backtrackingState.isSafe ? 'text-emerald-400 bg-emerald-950/20 border border-emerald-900/30' : 'text-red-400 bg-red-950/20 border border-red-900/30'}`}>
                            {currentStep.backtrackingState.isSafe ? 'YES (No conflicts)' : 'NO (Attacked on row/diag)'}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Greedy States */}
                    {activeAlgo === 'Greedy' && currentStep?.greedyState && (
                      <>
                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-emerald-400 uppercase">Variable: int selected_count</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            Count: {currentStep.greedyState.selectedCount} Movies Watched
                          </p>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-cyan-400 uppercase">Variable: int last_end_time</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            Limit: {currentStep.greedyState.lastEndTime !== -1 ? `${currentStep.greedyState.lastEndTime}h` : '0 (Unbound)'}
                          </p>
                        </div>

                        <div className="space-y-1 bg-[#121214] p-2 border border-gray-800 rounded animate-fadeIn">
                          <span className="text-[8px] font-bold text-yellow-500 uppercase">Variable: int current_active_index</span>
                          <p className="text-xs font-bold text-white pl-1 bg-[#18181b] p-1 rounded font-mono">
                            Probing Index: {currentStep.greedyState.currentIndex} / {currentStep.greedyState.activities.length - 1} (Film List)
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Informative complexity card */}
          <div className="bg-[#1c1c1e] p-2.5 border border-gray-800 rounded mt-3 text-[10px] font-mono leading-normal shadow-md shrink-0">
            <span className="text-[8.5px] font-mono tracking-widest uppercase font-bold text-[#a1a1aa] block mb-1">Complexity Tag:</span>
            <div className="flex justify-between items-center bg-[#121214] px-2 py-1 rounded border border-gray-850">
              <span className="text-[#a1a1aa]">Asymptotic:</span>
              <span className="text-cyan-400 font-bold font-mono">
                {activeAlgo === 'BFS' && "O(V + E)"}
                {activeAlgo === 'DFS' && "O(V + E)"}
                {activeAlgo === 'Binary Search' && "O(log N)"}
                {activeAlgo === 'Complete Search' && "O(N!)"}
                {activeAlgo === 'Greedy' && "O(N log N)"}
              </span>
            </div>
          </div>
        </div>

        {/* ==========================================
            COLUMN 2 (4/12 width): THE ACTIVE VISUALIZATION CANVAS
           ========================================== */}
        <div className="xl:col-span-4 bg-[#161618] border border-gray-800 rounded-lg p-4 flex flex-col justify-between min-h-[520px]" id="dsa-visualization-board">
          
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3 shrink-0">
            <div>
              <span className="text-[8px] uppercase font-mono tracking-widest text-[#a1a1aa] font-medium block">Visual Interpreter</span>
              <h3 className="font-sans text-xs font-black text-white uppercase tracking-wider mt-0.5">
                {activeAlgo} Execution Field
              </h3>
            </div>
            <span className="text-[8.5px] font-mono text-cyan-400 font-bold bg-cyan-950/50 border border-cyan-850 rounded px-1.5 py-0.5">
              Live State Framework
            </span>
          </div>

          {/* Render Actual Visual Component */}
          <div className="flex-1 flex flex-col justify-between py-2 min-h-[300px] md:min-h-[380px]" id="dsa-display-panel">
            {activeAlgo === 'BFS' && renderGraphVisualizer()}
            {activeAlgo === 'DFS' && renderGraphVisualizer()}
            {activeAlgo === 'Binary Search' && renderBinarySearchVisualizer()}
            {activeAlgo === 'Complete Search' && renderNQueensVisualizer()}
            {activeAlgo === 'Greedy' && renderGreedyVisualizer()}
          </div>

          {/* Playback action deck controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 border-t border-gray-800 pt-3 shrink-0" id="dsa-action-playback">
            <div className="flex items-center gap-1.5" id="dsa-playback-control-buttons">
              <button
                onClick={togglePlay}
                id="dsa-play-btn"
                className={`p-2 rounded border flex items-center justify-center transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-red-950/25 border-red-800 hover:border-red-500 text-red-400'
                    : 'bg-[#121214] border-gray-800 hover:border-cyan-500 text-cyan-400 shadow-[inset_0_0_8px_rgba(6,182,212,0.1)]'
                }`}
                title={isPlaying ? 'Pause Simulation' : 'Run Simulation'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-red-400" /> : <Play className="w-4 h-4 fill-cyan-400" />}
              </button>

              <button
                onClick={handleStepForward}
                id="dsa-step-btn"
                disabled={currentStepIndex >= trace.length - 1}
                className="p-2 bg-[#1a1a1c] border border-gray-800 hover:border-gray-750 hover:bg-[#121214] active:bg-gray-850 text-gray-300 rounded transition-all disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
                title="Single frame forward"
              >
                <StepForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                id="dsa-reset-btn"
                className="p-2 bg-[#1a1a1c] border border-gray-800 hover:border-gray-750 hover:bg-[#121214] active:bg-gray-850 text-gray-300 rounded transition-all cursor-pointer"
                title="Reset simulation step"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Delay Speed Settings Slider */}
            <div className="flex items-center gap-2" id="playback-speed-slider">
              <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-gray-500 flex items-center gap-1">
                <Sliders className="w-2.5 h-2.5 text-gray-500" /> Delay: {playbackSpeed}ms
              </span>
              <input
                type="range"
                min="10"
                max="800"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="w-20 md:w-28 h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Column 3: Realtime code highlight & diagnostic panel */}
        <div className="xl:col-span-5 flex flex-col gap-4 text-gray-300" id="dsa-code-terminal-wrapper">
          {/* Main highlights container */}
          <div className="bg-[#09090a] border border-gray-800 rounded-lg p-4 flex flex-col h-[520px]" id="dsa-tracer-card">
            
            {/* Split Panel Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2 flex-shrink-0" id="tracer-header">
              <div className="flex items-center gap-1.5">
                <Terminal className="text-[#22d3ee] w-3.5 h-3.5 animate-pulse" />
                <span className="font-mono text-[9.5px] text-gray-300 font-black uppercase tracking-wider">
                  Tracer ({getLanguageNiceName(selectedLanguage)})
                </span>
              </div>

              {/* Language toggle switches */}
              <div className="flex items-center gap-1" id="selected-language-switches">
                {(['cpp', 'java', 'python'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    id={`lang-toggle-${lang}`}
                    className={`px-1.5 py-0.5 text-[9.5px] font-mono rounded font-bold uppercase border transition-all cursor-pointer ${
                      selectedLanguage === lang
                        ? 'bg-cyan-600/25 border-cyan-500/50 text-cyan-400'
                        : 'bg-[#121214] border-gray-850 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : 'Py'}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Top: Instruction Pointer highlighting frame */}
            <div className="h-[210px] border-b border-gray-900 overflow-y-auto mb-2 pr-1 scrollbar-thin" ref={codeLinesContainerRef} id="source-highlighter">
              <span className="text-[9px] uppercase font-mono font-bold text-gray-500 mb-1.5 flex items-center justify-between select-none shrink-0 font-mono">
                <span className="flex items-center gap-1">
                  <Code2 className="w-3 text-cyan-400" />
                  <span>Interactive Walkthrough</span>
                </span>
                <span className="text-[8px] text-gray-650">Line {activeLineIdx + 1 || '-'}</span>
              </span>

              <div className="font-mono text-[10.5px] bg-[#121214]/80 p-2 rounded border border-gray-900 select-none space-y-1">
                {rawCodeLines.map((line, idx) => {
                  const isActive = idx === activeLineIdx;

                  return (
                    <div
                      key={idx}
                      data-line-index={idx}
                      className={`flex gap-2.5 px-1 py-0.5 rounded transition-all ${
                        isActive
                          ? 'bg-cyan-600/25 text-white font-extrabold border-l-2 border-cyan-500 pl-1.5 shadow-[0_0_8px_rgba(6,182,212,0.1)]'
                          : 'text-gray-500 hover:text-gray-450'
                      }`}
                    >
                      <span className={`w-4 shrink-0 text-right text-[10px] font-bold ${isActive ? 'text-cyan-400 font-black' : 'text-gray-750'}`}>
                        {idx + 1}
                      </span>
                      <pre className="whitespace-pre overflow-x-auto select-text font-mono leading-tight pr-1 scrollbar-thin">{line}</pre>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Split Bottom: Stdout streams log visualizer */}
            <div className="flex-1 min-h-0 flex flex-col" id="logs-panel">
              <div className="text-[9px] uppercase font-mono font-bold text-gray-500 mb-1.5 flex items-center justify-between select-none shrink-0 font-mono">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 text-[#22d3ee] animate-pulse" />
                  <span>stdout execution outputs</span>
                </span>

                <label className="flex items-center gap-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoScroll}
                    onChange={(e) => setAutoScroll(e.target.checked)}
                    className="w-2.5 h-2.5 accent-cyan-530 rounded bg-[#09090a] border-gray-800 cursor-pointer"
                  />
                  <span className="text-[8px] font-mono font-bold text-gray-500 select-none">AUTO-SCROLL</span>
                </label>
              </div>

              <div className="flex-1 overflow-y-auto font-mono text-[9.5px] space-y-1 p-2 bg-[#121214] rounded border border-gray-900 leading-normal scrollbar-thin select-text text-gray-400" id="stdout-output">
                {trace.slice(0, currentStepIndex + 1).map((step, idx) => (
                  <div key={idx} className="flex gap-1.5 text-gray-400 items-start hover:text-white transition-colors">
                    <ChevronRight className="w-3 h-3 text-[#22d3ee] shrink-0 mt-0.5 animate-pulse" />
                    <p>
                      <span className="text-gray-600 select-none font-bold">[{idx.toString().padStart(3, '0')}]</span>{' '}
                      {step.log}
                    </p>
                  </div>
                ))}
                {/* Scroll buffer */}
                <span ref={terminalEndRef} className="h-0.5 block" />
              </div>
            </div>

          </div>

          {/* Quick Architect instruction */}
          <div className="bg-[#161618] border border-gray-800 rounded-lg p-3.5 flex flex-col justify-between" id="quick-insight">
            <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-1">CP Algorithm Guide:</span>
            <p className="text-[10px] text-gray-400 font-mono leading-normal pl-0.5 border-l border-cyan-900/50">
              {activeAlgo === 'BFS' && 'BFS traverses levels starting from root node A. Crucial for unweighted shortest path computation (CSES Message Route).'}
              {activeAlgo === 'DFS' && 'DFS searches paths deep before backtracking. Perfect for connectivity tests & spanning tree analysis (CSES Building Roads).'}
              {activeAlgo === 'Binary Search' && 'Binary Search halves sorted spaces (CSES Factory Machines). Demonstrating fast division bounds checks.'}
              {activeAlgo === 'Complete Search' && 'Systematically places queens block by block, recursively probing column matches and rolling back upon conflicts.'}
              {activeAlgo === 'Greedy' && 'Activity selection picks slots sorted by finish time. This greedy strategy guarantees maximal concurrent bookings.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
