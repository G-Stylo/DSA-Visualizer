export interface DsaBfsDfsState {
  visited: number[];
  queue: number[];
  stack: number[];
  currentNode: number | null;
  activeNeighbor: number | null;
  discoveredTreeEdges: [number, number][];
}

export interface DsaBinarySearchState {
  low: number;
  high: number;
  mid: number;
  found: boolean;
  target: number;
}

export interface DsaBacktrackingState {
  queens: number[]; // Index represents Row, value represents Column; -1 means unplaced
  row: number;
  checkingCol: number | null;
  isSafe: boolean;
  stack: string[];
}

export interface DsaGreedyState {
  activities: {
    id: number;
    name: string;
    start: number;
    end: number;
    status: 'unprocessed' | 'checking' | 'selected' | 'rejected';
  }[];
  currentIndex: number;
  lastEndTime: number;
  selectedCount: number;
}

export interface DsaTraceStep {
  log: string;
  lineIndex: number;
  bfsDfsState?: DsaBfsDfsState;
  binarySearchState?: DsaBinarySearchState;
  backtrackingState?: DsaBacktrackingState;
  greedyState?: DsaGreedyState;
}

// ----------------------------------------------------
// GRAPH METADATA FOR BFS/DFS GRAPH VISUALIZER
// ----------------------------------------------------
export interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: number;
  to: number;
}

export const staticGraphNodes: GraphNode[] = [
  { id: 0, label: "A", x: 12, y: 30 },
  { id: 1, label: "B", x: 35, y: 18 },
  { id: 2, label: "C", x: 22, y: 78 },
  { id: 3, label: "D", x: 62, y: 22 },
  { id: 4, label: "E", x: 48, y: 56 },
  { id: 5, label: "F", x: 76, y: 46 },
  { id: 6, label: "G", x: 68, y: 82 },
  { id: 7, label: "H", x: 90, y: 72 }
];

export const staticGraphEdges: GraphEdge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
  { from: 4, to: 6 },
  { from: 5, to: 7 },
  { from: 6, to: 7 }
];

const adjList: Record<number, number[]> = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 4],
  3: [1, 5],
  4: [1, 2, 5, 6],
  5: [3, 4, 7],
  6: [4, 7],
  7: [5, 6]
};

// ----------------------------------------------------
// BFS TRACE GENERATOR
// ----------------------------------------------------
export function generateBfsTrace(): DsaTraceStep[] {
  const trace: DsaTraceStep[] = [];
  const visited: number[] = [];
  const queue: number[] = [];
  const discoveredTreeEdges: [number, number][] = [];

  // Initial Step
  queue.push(0);
  visited.push(0);
  trace.push({
    log: "BFS initialization: Start node set at A (0). Push to queue and mark as visited.",
    lineIndex: 0,
    bfsDfsState: {
      visited: [...visited],
      queue: [...queue],
      stack: [],
      currentNode: null,
      activeNeighbor: null,
      discoveredTreeEdges: []
    }
  });

  while (queue.length > 0) {
    // Pop current node
    const curr = queue[0];
    trace.push({
      log: `Examining frontier: Is container empty? No. Read front node: ${staticGraphNodes[curr].label} (${curr}).`,
      lineIndex: 4,
      bfsDfsState: {
        visited: [...visited],
        queue: [...queue],
        stack: [],
        currentNode: curr,
        activeNeighbor: null,
        discoveredTreeEdges: [...discoveredTreeEdges]
      }
    });

    const shifted = queue.shift();
    trace.push({
      log: `Dequed node ${staticGraphNodes[curr].label} (${curr}) from frontier queue.`,
      lineIndex: 5,
      bfsDfsState: {
        visited: [...visited],
        queue: [...queue],
        stack: [],
        currentNode: curr,
        activeNeighbor: null,
        discoveredTreeEdges: [...discoveredTreeEdges]
      }
    });

    const neighbors = adjList[curr] || [];
    for (const neighbor of neighbors) {
      trace.push({
        log: `Scanning neighbors of node ${staticGraphNodes[curr].label}: check adjacent node ${staticGraphNodes[neighbor].label} (${neighbor}).`,
        lineIndex: 6,
        bfsDfsState: {
          visited: [...visited],
          queue: [...queue],
          stack: [],
          currentNode: curr,
          activeNeighbor: neighbor,
          discoveredTreeEdges: [...discoveredTreeEdges]
        }
      });

      const isVisited = visited.includes(neighbor);
      trace.push({
        log: `Checking visited map for neighbor node ${staticGraphNodes[neighbor].label}: ${isVisited ? 'Already visited.' : 'Not visited yet.'}`,
        lineIndex: 7,
        bfsDfsState: {
          visited: [...visited],
          queue: [...queue],
          stack: [],
          currentNode: curr,
          activeNeighbor: neighbor,
          discoveredTreeEdges: [...discoveredTreeEdges]
        }
      });

      if (!isVisited) {
        visited.push(neighbor);
        queue.push(neighbor);
        discoveredTreeEdges.push([curr, neighbor]);
        trace.push({
          log: `Marked neighbor node ${staticGraphNodes[neighbor].label} as visited and pushed to queue.`,
          lineIndex: 8,
          bfsDfsState: {
            visited: [...visited],
            queue: [...queue],
            stack: [],
            currentNode: curr,
            activeNeighbor: neighbor,
            discoveredTreeEdges: [...discoveredTreeEdges]
          }
        });
      }
    }
  }

  trace.push({
    log: "BFS complete! Frontier queue is empty. Checked all connected vertices.",
    lineIndex: 9,
    bfsDfsState: {
      visited: [...visited],
      queue: [],
      stack: [],
      currentNode: null,
      activeNeighbor: null,
      discoveredTreeEdges: [...discoveredTreeEdges]
    }
  });

  return trace;
}

// ----------------------------------------------------
// DFS TRACE GENERATOR
// ----------------------------------------------------
export function generateDfsTrace(): DsaTraceStep[] {
  const trace: DsaTraceStep[] = [];
  const visited: number[] = [];
  const stack: number[] = [];
  const discoveredTreeEdges: [number, number][] = [];

  trace.push({
    log: "DFS initiated: Commencing recursive trace from root node A (0).",
    lineIndex: 0,
    bfsDfsState: {
      visited: [],
      queue: [],
      stack: [],
      currentNode: null,
      activeNeighbor: null,
      discoveredTreeEdges: []
    }
  });

  function dfsHelper(curr: number, parent: number | null) {
    visited.push(curr);
    stack.push(curr);

    if (parent !== null) {
      discoveredTreeEdges.push([parent, curr]);
    }

    trace.push({
      log: `Calling DFS(${staticGraphNodes[curr].label}): Mark node as visited. Added to the visual recursion stack.`,
      lineIndex: 1,
      bfsDfsState: {
        visited: [...visited],
        queue: [],
        stack: [...stack],
        currentNode: curr,
        activeNeighbor: null,
        discoveredTreeEdges: [...discoveredTreeEdges]
      }
    });

    const neighbors = adjList[curr] || [];
    for (const neighbor of neighbors) {
      trace.push({
        log: `In DFS(${staticGraphNodes[curr].label}): Iterating and examining neighbor ${staticGraphNodes[neighbor].label}.`,
        lineIndex: 2,
        bfsDfsState: {
          visited: [...visited],
          queue: [],
          stack: [...stack],
          currentNode: curr,
          activeNeighbor: neighbor,
          discoveredTreeEdges: [...discoveredTreeEdges]
        }
      });

      const isVisited = visited.includes(neighbor);
      trace.push({
        log: `Checking adjacency: Is neighbor ${staticGraphNodes[neighbor].label} visited? ${isVisited ? 'Yes, skipping recursively.' : 'No, placing call.'}`,
        lineIndex: 3,
        bfsDfsState: {
          visited: [...visited],
          queue: [],
          stack: [...stack],
          currentNode: curr,
          activeNeighbor: neighbor,
          discoveredTreeEdges: [...discoveredTreeEdges]
        }
      });

      if (!isVisited) {
        dfsHelper(neighbor, curr);
        // Back from recursion
        trace.push({
          log: `Returned from recursive call: Back to node DFS(${staticGraphNodes[curr].label}). Stack pop performed.`,
          lineIndex: 4,
          bfsDfsState: {
            visited: [...visited],
            queue: [],
            stack: [...stack],
            currentNode: curr,
            activeNeighbor: neighbor,
            discoveredTreeEdges: [...discoveredTreeEdges]
          }
        });
      }
    }

    stack.pop();
  }

  dfsHelper(0, null);

  trace.push({
    log: "DFS complete! Call stack empty. Backtracked to root.",
    lineIndex: 5,
    bfsDfsState: {
      visited: [...visited],
      queue: [],
      stack: [],
      currentNode: null,
      activeNeighbor: null,
      discoveredTreeEdges: [...discoveredTreeEdges]
    }
  });

  return trace;
}

// ----------------------------------------------------
// BINARY SEARCH TRACE GENERATOR
// ----------------------------------------------------
export function generateBinarySearchTrace(target: number): DsaTraceStep[] {
  const trace: DsaTraceStep[] = [];
  const arr = [12, 17, 24, 29, 35, 38, 42, 51, 59, 65, 72, 78, 83, 91, 98];
  
  let low = 0;
  let high = arr.length - 1;
  let found = false;

  trace.push({
    log: `Binary Search initiated on sorted dataset of size ${arr.length}. Searching for Target = ${target}.`,
    lineIndex: 1,
    binarySearchState: { low, high, mid: -1, found: false, target }
  });

  while (low <= high) {
    trace.push({
      log: `Verifying loop condition: testing bounds low (${low}) <= high (${high}).`,
      lineIndex: 2,
      binarySearchState: { low, high, mid: -1, found: false, target }
    });

    const mid = Math.floor(low + (high - low) / 2);
    const midVal = arr[mid];

    trace.push({
      log: `Computed midpoint index mid = ${mid} (value: ${midVal}). Split search boundary.`,
      lineIndex: 3,
      binarySearchState: { low, high, mid, found: false, target }
    });

    if (midVal === target) {
      found = true;
      trace.push({
        log: `Success! Checked position index ${mid} and found match: ${midVal} == ${target}.`,
        lineIndex: 4,
        binarySearchState: { low, high, mid, found: true, target }
      });
      break;
    }

    if (midVal < target) {
      const prevLow = low;
      low = mid + 1;
      trace.push({
        log: `Value ${midVal} is less than target ${target}. Target is in right subsegment. Advance low pointer to mid + 1 = ${low}. Graded out index ${prevLow}..${mid}.`,
        lineIndex: 5,
        binarySearchState: { low, high, mid, found: false, target }
      });
    } else {
      const prevHigh = high;
      high = mid - 1;
      trace.push({
        log: `Value ${midVal} is greater than target ${target}. Target is in left subsegment. Advance high pointer to mid - 1 = ${high}. Graded out index ${mid}..${prevHigh}.`,
        lineIndex: 6,
        binarySearchState: { low, high, mid, found: false, target }
      });
    }
  }

  if (!found) {
    trace.push({
      log: `Termination: low (${low}) exceeded high (${high}). Target element ${target} is not present in sorted array.`,
      lineIndex: 7,
      binarySearchState: { low, high, mid: -1, found: false, target }
    });
  }

  return trace;
}

// ----------------------------------------------------
// BACKTRACKING (N-QUEENS) TRACE GENERATOR
// ----------------------------------------------------
export function generateNQueensTrace(): DsaTraceStep[] {
  const trace: DsaTraceStep[] = [];
  const N = 4;
  const board: number[] = [-1, -1, -1, -1]; // cols placed in each row
  const calls: string[] = ["main()"];

  trace.push({
    log: "Backtracking N-Queens (4x4) initiated. Seeking constraint-safe solutions.",
    lineIndex: 0,
    backtrackingState: { queens: [...board], row: 0, checkingCol: null, isSafe: false, stack: [...calls] }
  });

  function isSafe(row: number, col: number, currentBoard: number[]): boolean {
    for (let i = 0; i < row; i++) {
      if (currentBoard[i] === col) return false; // same column
      if (Math.abs(currentBoard[i] - col) === Math.abs(i - row)) return false; // diagonal clash
    }
    return true;
  }

  let solutionsFound = 0;

  function solve(row: number): boolean {
    calls.push(`solveNQueens(row=${row})`);
    
    trace.push({
      log: `Running solveNQueens for row = ${row}. Check if row equals board size ${N}.`,
      lineIndex: 1,
      backtrackingState: { queens: [...board], row, checkingCol: null, isSafe: false, stack: [...calls] }
    });

    if (row === N) {
      solutionsFound++;
      trace.push({
        log: `Base Case reached: All ${N} queens are safely positioned! Found safe solution configurations.`,
        lineIndex: 1,
        backtrackingState: { queens: [...board], row, checkingCol: null, isSafe: true, stack: [...calls] }
      });
      calls.pop();
      return true;
    }

    for (let col = 0; col < N; col++) {
      board[row] = -1; // reset current row queen
      
      trace.push({
        log: `At Row ${row}: testing placement in Column ${col}...`,
        lineIndex: 2,
        backtrackingState: { queens: [...board], row, checkingCol: col, isSafe: false, stack: [...calls] }
      });

      const safe = isSafe(row, col, board);
      trace.push({
        log: `Position check (${row}, ${col}) is ${safe ? 'SAFE from other queens' : 'UNSAFE (attacks exist)'}.`,
        lineIndex: 3,
        backtrackingState: { queens: [...board], row, checkingCol: col, isSafe: safe, stack: [...calls] }
      });

      if (safe) {
        board[row] = col;
        trace.push({
          log: `Secure placement: Positioned queen at board coordinates (${row}, ${col}). Advance to next row.`,
          lineIndex: 4,
          backtrackingState: { queens: [...board], row, checkingCol: col, isSafe: true, stack: [...calls] }
        });

        const solved = solve(row + 1);
        if (solved) {
          calls.pop();
          return true; // Stop at first solution for visualization clarity
        }

        // Backtrack
        board[row] = -1;
        trace.push({
          log: `Constraint breach downstream: Backtracking at Row ${row}. Remove Queen from Column ${col} to look for alternative solutions.`,
          lineIndex: 6,
          backtrackingState: { queens: [...board], row, checkingCol: col, isSafe: false, stack: [...calls] }
        });
      }
    }

    trace.push({
      log: `No safe positions available in Row ${row}. Backtracking to previous Row ${row - 1}.`,
      lineIndex: 7,
      backtrackingState: { queens: [...board], row, checkingCol: null, isSafe: false, stack: [...calls] }
    });
    
    calls.pop();
    return false;
  }

  solve(0);

  trace.push({
    log: `Backtracking visualization trace completed. Found coordinates: Row 0 -> Col 1, Row 1 -> Col 3, Row 2 -> Col 0, Row 3 -> Col 2.`,
    lineIndex: 8,
    backtrackingState: { queens: [1, 3, 0, 2], row: 4, checkingCol: null, isSafe: true, stack: ["main()"] }
  });

  return trace;
}

// ----------------------------------------------------
// GREEDY (MOVIE FESTIVAL SELECTION) TRACE GENERATOR
// ----------------------------------------------------
export function generateGreedyTrace(): DsaTraceStep[] {
  const trace: DsaTraceStep[] = [];
  
  // Movies to pick from
  const rawActs: {
    id: number;
    name: string;
    start: number;
    end: number;
    status: 'unprocessed' | 'checking' | 'selected' | 'rejected';
  }[] = [
    { id: 1, name: "Sci-Fi Space Film", start: 1, end: 3, status: 'unprocessed' },
    { id: 2, name: "Romantic Comedy", start: 2, end: 5, status: 'unprocessed' },
    { id: 3, name: "Action Movie", start: 3, end: 8, status: 'unprocessed' },
    { id: 4, name: "Mystery Thriller", start: 4, end: 6, status: 'unprocessed' },
    { id: 5, name: "Drama Showcase", start: 6, end: 9, status: 'unprocessed' },
    { id: 6, name: "Indie Short Film", start: 5, end: 7, status: 'unprocessed' },
    { id: 7, name: "Midnight Horror", start: 8, end: 10, status: 'unprocessed' }
  ];

  trace.push({
    log: "Movie Festival Selection initiated. Goal: watch the maximum number of non-overlapping movies.",
    lineIndex: 0,
    greedyState: {
      activities: rawActs.map(a => ({ ...a })),
      currentIndex: -1,
      lastEndTime: -1,
      selectedCount: 0
    }
  });

  // Step 1: Sort by End Time (Greedy Strategy Choice)
  const sortedActs = [...rawActs].sort((a, b) => a.end - b.end);
  trace.push({
    log: "Greedy Strategy: Sort movies by finish-time ASC to maximize remaining film availability slots.",
    lineIndex: 1,
    greedyState: {
      activities: sortedActs.map(a => ({ ...a })),
      currentIndex: -1,
      lastEndTime: -1,
      selectedCount: 0
    }
  });

  let count = 0;
  let lastEnd = -1;

  trace.push({
    log: "Initialized film count = 0, tracking last movie endbound = -1.",
    lineIndex: 2,
    greedyState: {
      activities: sortedActs.map(a => ({ ...a })),
      currentIndex: -1,
      lastEndTime: -1,
      selectedCount: 0
    }
  });

  for (let i = 0; i < sortedActs.length; i++) {
    const act = sortedActs[i];
    act.status = 'checking';
    
    trace.push({
      log: `Examining movie: [${act.name}] (Interval: ${act.start}h → ${act.end}h).`,
      lineIndex: 3,
      greedyState: {
        activities: sortedActs.map(a => ({ ...a })),
        currentIndex: i,
        lastEndTime: lastEnd,
        selectedCount: count
      }
    });

    const isNonOverlapping = act.start >= lastEnd;
    trace.push({
      log: `Overlap check for [${act.name}]: Does start time (${act.start}h) >= last endbound (${lastEnd}h)? ${isNonOverlapping ? 'Yes! No conflict found.' : 'No! Overlaps with previous watched selection.'}`,
      lineIndex: 4,
      greedyState: {
        activities: sortedActs.map(a => ({ ...a })),
        currentIndex: i,
        lastEndTime: lastEnd,
        selectedCount: count
      }
    });

    if (isNonOverlapping) {
      count++;
      lastEnd = act.end;
      act.status = 'selected';
      trace.push({
        log: `Selecting [${act.name}] for watching schedule. Increment watched count to ${count}. Update end limit to ${lastEnd}h.`,
        lineIndex: 5,
        greedyState: {
          activities: sortedActs.map(a => ({ ...a })),
          currentIndex: i,
          lastEndTime: lastEnd,
          selectedCount: count
        }
      });
    } else {
      act.status = 'rejected';
      trace.push({
        log: `Skipping [${act.name}] which has timeline conflict with watched selections (start ${act.start}h < bound ${lastEnd}h).`,
        lineIndex: 3, // continue
        greedyState: {
          activities: sortedActs.map(a => ({ ...a })),
          currentIndex: i,
          lastEndTime: lastEnd,
          selectedCount: count
        }
      });
    }
  }

  trace.push({
    log: `Greedy selection completed. Watched maximum of ${count} movies without any overlapping clash list!`,
    lineIndex: 7,
    greedyState: {
      activities: sortedActs.map(a => ({ ...a })),
      currentIndex: sortedActs.length,
      lastEndTime: lastEnd,
      selectedCount: count
    }
  });

  return trace;
}
