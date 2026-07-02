export interface SortStep {
  array: number[];
  comparing: [number, number] | null;
  swapping: boolean;
  pivotIndex?: number;
  sortedIndices: Set<number>;
  log: string;
}

// 1. Bubble Sort Trace Generator
export function generateBubbleSortTrace(arr: number[]): SortStep[] {
  const trace: SortStep[] = [];
  const array = [...arr];
  const size = array.length;
  const sortedIndices = new Set<number>();

  // Add initial state
  trace.push({
    array: [...array],
    comparing: null,
    swapping: false,
    sortedIndices: new Set(sortedIndices),
    log: "Bubble Sort initiated. Beginning outer loops."
  });

  for (let i = 0; i < size - 1; i++) {
    let swapped = false;
    for (let j = 0; j < size - i - 1; j++) {
      // Comparison step
      trace.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: false,
        sortedIndices: new Set(sortedIndices),
        log: `Checking: Is Array[${j}] (${array[j]}) > Array[${j + 1}] (${array[j + 1]})?`
      });

      if (array[j] > array[j + 1]) {
        // Swap step
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;

        trace.push({
          array: [...array],
          comparing: [j, j + 1],
          swapping: true,
          sortedIndices: new Set(sortedIndices),
          log: `Yes! Swapping elements at indices ${j} & ${j + 1}: ${array[j]} <-> ${array[j + 1]}`
        });
      }
    }

    // After each pass, the last element is guaranteed sorted
    sortedIndices.add(size - i - 1);
    trace.push({
      array: [...array],
      comparing: null,
      swapping: false,
      sortedIndices: new Set(sortedIndices),
      log: `Pass completeness. Element at index ${size - i - 1} (${array[size - i - 1]}) is locked in final position.`
    });

    if (!swapped) {
      // Early exit if sorted
      break;
    }
  }

  // Final lock-in
  for (let i = 0; i < size; i++) {
    sortedIndices.add(i);
  }
  trace.push({
    array: [...array],
    comparing: null,
    swapping: false,
    sortedIndices: new Set(sortedIndices),
    log: "Sorting complete! Array is fully ordered."
  });

  return trace;
}

// 2. Quick Sort Trace Generator (Lomuto Partition)
export function generateQuickSortTrace(arr: number[]): SortStep[] {
  const trace: SortStep[] = [];
  const array = [...arr];
  const sortedIndices = new Set<number>();

  trace.push({
    array: [...array],
    comparing: null,
    swapping: false,
    sortedIndices: new Set(sortedIndices),
    log: "Quick Sort initiated. Beginning Lomuto partitioning trace."
  });

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pIdx = partition(low, high);
      sortedIndices.add(pIdx);
      trace.push({
        array: [...array],
        comparing: null,
        swapping: false,
        pivotIndex: pIdx,
        sortedIndices: new Set(sortedIndices),
        log: `Pivot placed securely at index ${pIdx} (${array[pIdx]}). Partition splitting recursion bounds.`
      });

      quickSortHelper(low, pIdx - 1);
      quickSortHelper(pIdx + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);
    }
  }

  function partition(low: number, high: number): number {
    const pivot = array[high];
    trace.push({
      array: [...array],
      comparing: null,
      swapping: false,
      pivotIndex: high,
      sortedIndices: new Set(sortedIndices),
      log: `Selected pivot value ${pivot} at index ${high}. Commencing partition scans.`
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Comparison Step
      trace.push({
        array: [...array],
        comparing: [j, high],
        swapping: false,
        pivotIndex: high,
        sortedIndices: new Set(sortedIndices),
        log: `Comparing Array[${j}] (${array[j]}) with pivot (${pivot})`
      });

      if (array[j] < pivot) {
        i++;
        // Swap Step
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        trace.push({
          array: [...array],
          comparing: [i, j],
          swapping: true,
          pivotIndex: high,
          sortedIndices: new Set(sortedIndices),
          log: `Swapping Array[${i}] (${array[i]}) & Array[${j}] (${array[j]}) in partition scan`
        });
      }
    }

    // Swap pivot into place
    const pivotTemp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = pivotTemp;

    trace.push({
      array: [...array],
      comparing: [i + 1, high],
      swapping: true,
      pivotIndex: i + 1,
      sortedIndices: new Set(sortedIndices),
      log: `Swapping pivot at index ${high} into final position ${i + 1}`
    });

    return i + 1;
  }

  quickSortHelper(0, array.length - 1);

  // Lock-in all elements as sorted
  for (let idx = 0; idx < array.length; idx++) {
    sortedIndices.add(idx);
  }
  trace.push({
    array: [...array],
    comparing: null,
    swapping: false,
    sortedIndices: new Set(sortedIndices),
    log: "Quick Sort finished. All array sub-sections are fully merged."
  });

  return trace;
}

// 3. Merge Sort Trace Generator (Step by Step tracking array values)
export function generateMergeSortTrace(arr: number[]): SortStep[] {
  const trace: SortStep[] = [];
  const array = [...arr];
  const sortedIndices = new Set<number>();

  trace.push({
    array: [...array],
    comparing: null,
    swapping: false,
    sortedIndices: new Set(sortedIndices),
    log: "Merge Sort initiated. Breaking array divisions recursively."
  });

  function mergeSortHelper(l: number, r: number) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    
    trace.push({
      array: [...array],
      comparing: [l, r],
      swapping: false,
      sortedIndices: new Set(sortedIndices),
      log: `Splitting segment [${l}..${r}] at mid-point ${m}`
    });

    mergeSortHelper(l, m);
    mergeSortHelper(m + 1, r);
    merge(l, m, r);
  }

  function merge(l: number, m: number, r: number) {
    const leftArr = array.slice(l, m + 1);
    const rightArr = array.slice(m + 1, r + 1);

    let i = 0; // index of left sub-array
    let j = 0; // index of right sub-array
    let k = l; // index of merged array

    trace.push({
      array: [...array],
      comparing: [l, r],
      swapping: false,
      sortedIndices: new Set(sortedIndices),
      log: `Merging sub-arrays [${l}..${m}] and [${m+1}..${r}] back in sorted order`
    });

    while (i < leftArr.length && j < rightArr.length) {
      trace.push({
        array: [...array],
        comparing: [l + i, m + 1 + j],
        swapping: false,
        sortedIndices: new Set(sortedIndices),
        log: `Comparing left element ${leftArr[i]} with right element ${rightArr[j]}`
      });

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }

      trace.push({
        array: [...array],
        comparing: [k, k],
        swapping: true,
        sortedIndices: new Set(sortedIndices),
        log: `Placing value ${array[k]} at index ${k}`
      });
      k++;
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      trace.push({
        array: [...array],
        comparing: [k, k],
        swapping: true,
        sortedIndices: new Set(sortedIndices),
        log: `Copying remaining left value ${leftArr[i]} to index ${k}`
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      trace.push({
        array: [...array],
        comparing: [k, k],
        swapping: true,
        sortedIndices: new Set(sortedIndices),
        log: `Copying remaining right value ${rightArr[j]} to index ${k}`
      });
      j++;
      k++;
    }

    // If we've successfully merged the final section (main root width), lock these elements in sorted tracker
    if (l === 0 && r === array.length - 1) {
      for (let s = 0; s < array.length; s++) {
        sortedIndices.add(s);
      }
    }
  }

  mergeSortHelper(0, array.length - 1);

  // Ensure all indices are glowing green at completion
  for (let s = 0; s < array.length; s++) {
    sortedIndices.add(s);
  }
  trace.push({
    array: [...array],
    comparing: null,
    swapping: false,
    sortedIndices: sortedIndices,
    log: "Merge Sort finished! Nested arrays merged and structured successfully."
  });

  return trace;
}

// ----------------------------------------------------
// 2D GRID PATHFINDING STRUCTURES & TRACE GENERATORS
// ----------------------------------------------------

export type CellType = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'openset' | 'path';

export interface PathfindingCell {
  row: number;
  col: number;
  type: CellType;
  distance: number;
  heuristic: number;
  totalCost: number;
  parent: [number, number] | null;
}

export interface GridStep {
  grid: CellType[][];
  currentNode: [number, number] | null;
  openSet: [number, number][];
  closedSet: [number, number][];
  activeNeighbors: [number, number][];
  log: string;
  found: boolean;
  steps: number;
}

// Helper to find neighboring cells in grid
function getNeighbors(row: number, col: number, numRows: number, numCols: number): [number, number][] {
  const directions = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1]   // Right
  ];
  const neighbors: [number, number][] = [];
  for (const [dr, dc] of directions) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr >= 0 && nr < numRows && nc >= 0 && nc < numCols) {
      neighbors.push([nr, nc]);
    }
  }
  return neighbors;
}

// Manhattan Distance Heuristic
function getManhattanDistance(r1: number, c1: number, r2: number, c2: number): number {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}

// 4. Dijkstra's Trace Generator
export function generateDijkstraTrace(
  initialGrid: CellType[][], 
  start: [number, number], 
  end: [number, number]
): GridStep[] {
  const trace: GridStep[] = [];
  const numRows = initialGrid.length;
  const numCols = initialGrid[0].length;

  // Clone grid and create distance board
  const gridState: CellType[][] = initialGrid.map(row => [...row]);
  const distances: number[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(Infinity));
  const parents: ([number, number] | null)[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  const visited: boolean[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(false));

  const openSet: [number, number][] = [start];
  distances[start[0]][start[1]] = 0;

  trace.push({
    grid: gridState.map(r => [...r]),
    currentNode: null,
    openSet: [...openSet],
    closedSet: [],
    activeNeighbors: [],
    log: `Dijkstra initiated: Source node set at (${start[0]}, ${start[1]}). Target node at (${end[0]}, ${end[1]}).`,
    found: false,
    steps: 0
  });

  let stepCounter = 0;
  let targetFound = false;

  while (openSet.length > 0) {
    stepCounter++;

    // Find node in open set with minimal distance
    let minIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      const [rMin, cMin] = openSet[minIndex];
      const [rCheck, cCheck] = openSet[i];
      if (distances[rCheck][cCheck] < distances[rMin][cMin]) {
        minIndex = i;
      }
    }

    const [currR, currC] = openSet.splice(minIndex, 1)[0];
    visited[currR][currC] = true;

    if (gridState[currR][currC] !== 'start' && gridState[currR][currC] !== 'end') {
      gridState[currR][currC] = 'visited';
    }

    // Build the closed set list
    const closedSet: [number, number][] = [];
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (visited[r][c] && (r !== start[0] || c !== start[1])) {
          closedSet.push([r, c]);
        }
      }
    }

    trace.push({
      grid: gridState.map(r => [...r]),
      currentNode: [currR, currC],
      openSet: [...openSet],
      closedSet: closedSet,
      activeNeighbors: [],
      log: `Examining node (${currR}, ${currC}) with distance = ${distances[currR][currC]}`,
      found: false,
      steps: stepCounter
    });

    if (currR === end[0] && currC === end[1]) {
      targetFound = true;
      break;
    }

    const neighbors = getNeighbors(currR, currC, numRows, numCols);
    const activeNeighbors: [number, number][] = [];

    for (const [nR, nC] of neighbors) {
      if (initialGrid[nR][nC] === 'wall' || visited[nR][nC]) continue;

      const altDistance = distances[currR][currC] + 1; // Unweighted step grid cost = 1
      if (altDistance < distances[nR][nC]) {
        distances[nR][nC] = altDistance;
        parents[nR][nC] = [currR, currC];
        activeNeighbors.push([nR, nC]);

        // Add to open set if not present
        if (!openSet.some(([r, c]) => r === nR && c === nC)) {
          openSet.push([nR, nC]);
          if (gridState[nR][nC] !== 'start' && gridState[nR][nC] !== 'end') {
            gridState[nR][nC] = 'openset';
          }
        }
      }
    }

    if (activeNeighbors.length > 0) {
      trace.push({
        grid: gridState.map(r => [...r]),
        currentNode: [currR, currC],
        openSet: [...openSet],
        closedSet: closedSet,
        activeNeighbors: activeNeighbors,
        log: `Updating tentative cost for neighbor cells: ${activeNeighbors.map(([r, c]) => `(${r}, ${c})`).join(", ")}`,
        found: false,
        steps: stepCounter
      });
    }
  }

  // Draw final shortest path if discovered
  if (targetFound) {
    const shortestPath: [number, number][] = [];
    let curr: [number, number] | null = end;
    while (curr !== null) {
      shortestPath.push(curr);
      const [r, c] = curr;
      curr = parents[r][c];
    }
    shortestPath.reverse();

    // Color final path
    for (const [pR, pC] of shortestPath) {
      if (initialGrid[pR][pC] !== 'start' && initialGrid[pR][pC] !== 'end') {
        gridState[pR][pC] = 'path';
      }
    }

    trace.push({
      grid: gridState.map(r => [...r]),
      currentNode: end,
      openSet: [],
      closedSet: [],
      activeNeighbors: [],
      log: `Shortest path discovered! Distance: ${distances[end[0]][end[1]]} cells. Backtracking path coordinates...`,
      found: true,
      steps: stepCounter
    });
  } else {
    trace.push({
      grid: gridState.map(r => [...r]),
      currentNode: null,
      openSet: [],
      closedSet: [],
      activeNeighbors: [],
      log: `Evaluation concluded: Path to end node (${end[0]}, ${end[1]}) is blocked. Shortest path does not exist.`,
      found: false,
      steps: stepCounter
    });
  }

  return trace;
}

// 5. A* Search Trace Generator (F = G + H)
export function generateAStarTrace(
  initialGrid: CellType[][],
  start: [number, number],
  end: [number, number]
): GridStep[] {
  const trace: GridStep[] = [];
  const numRows = initialGrid.length;
  const numCols = initialGrid[0].length;

  const gridState: CellType[][] = initialGrid.map(row => [...row]);
  
  // Cost lists
  const gCost: number[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(Infinity));
  const fCost: number[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(Infinity));
  const parents: ([number, number] | null)[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  const visited: boolean[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(false));

  const openSet: [number, number][] = [start];
  gCost[start[0]][start[1]] = 0;
  fCost[start[0]][start[1]] = getManhattanDistance(start[0], start[1], end[0], end[1]);

  trace.push({
    grid: gridState.map(r => [...r]),
    currentNode: null,
    openSet: [...openSet],
    closedSet: [],
    activeNeighbors: [],
    log: `A* Search initiated. Manhattan heuristic utilized for direction vectors.`,
    found: false,
    steps: 0
  });

  let stepCounter = 0;
  let targetFound = false;

  while (openSet.length > 0) {
    stepCounter++;

    // Find node in open set with lowest F score
    let bestIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      const [rBest, cBest] = openSet[bestIndex];
      const [rCheck, cCheck] = openSet[i];
      if (fCost[rCheck][cCheck] < fCost[rBest][cBest]) {
        bestIndex = i;
      }
    }

    const [currR, currC] = openSet.splice(bestIndex, 1)[0];
    visited[currR][currC] = true;

    if (gridState[currR][currC] !== 'start' && gridState[currR][currC] !== 'end') {
      gridState[currR][currC] = 'visited';
    }

    const closedSet: [number, number][] = [];
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (visited[r][c] && (r !== start[0] || c !== start[1])) {
          closedSet.push([r, c]);
        }
      }
    }

    trace.push({
      grid: gridState.map(r => [...r]),
      currentNode: [currR, currC],
      openSet: [...openSet],
      closedSet: closedSet,
      activeNeighbors: [],
      log: `Examining cell (${currR}, ${currC}) -> F: ${fCost[currR][currC]} | G: ${gCost[currR][currC]} | H (Heuristic): ${fCost[currR][currC] - gCost[currR][currC]}`,
      found: false,
      steps: stepCounter
    });

    if (currR === end[0] && currC === end[1]) {
      targetFound = true;
      break;
    }

    const neighbors = getNeighbors(currR, currC, numRows, numCols);
    const activeNeighbors: [number, number][] = [];

    for (const [nR, nC] of neighbors) {
      if (initialGrid[nR][nC] === 'wall' || visited[nR][nC]) continue;

      const tentativeGCost = gCost[currR][currC] + 1;
      if (tentativeGCost < gCost[nR][nC]) {
        gCost[nR][nC] = tentativeGCost;
        const heuristic = getManhattanDistance(nR, nC, end[0], end[1]);
        fCost[nR][nC] = tentativeGCost + heuristic;
        parents[nR][nC] = [currR, currC];
        activeNeighbors.push([nR, nC]);

        if (!openSet.some(([r, c]) => r === nR && c === nC)) {
          openSet.push([nR, nC]);
          if (gridState[nR][nC] !== 'start' && gridState[nR][nC] !== 'end') {
            gridState[nR][nC] = 'openset';
          }
        }
      }
    }

    if (activeNeighbors.length > 0) {
      trace.push({
        grid: gridState.map(r => [...r]),
        currentNode: [currR, currC],
        openSet: [...openSet],
        closedSet: closedSet,
        activeNeighbors: activeNeighbors,
        log: `Expanding node: Found highly scoring neighbors: ${activeNeighbors.map(([r, c]) => `(${r}, ${c})`).join(", ")}`,
        found: false,
        steps: stepCounter
      });
    }
  }

  if (targetFound) {
    const shortestPath: [number, number][] = [];
    let curr: [number, number] | null = end;
    while (curr !== null) {
      shortestPath.push(curr);
      const [r, c] = curr;
      curr = parents[r][c];
    }
    shortestPath.reverse();

    for (const [pR, pC] of shortestPath) {
      if (initialGrid[pR][pC] !== 'start' && initialGrid[pR][pC] !== 'end') {
        gridState[pR][pC] = 'path';
      }
    }

    trace.push({
      grid: gridState.map(r => [...r]),
      currentNode: end,
      openSet: [],
      closedSet: [],
      activeNeighbors: [],
      log: `Target path completed! Cost budget used: ${gCost[end[0]][end[1]]} cells. Total execution cycles: ${stepCounter}`,
      found: true,
      steps: stepCounter
    });
  } else {
    trace.push({
      grid: gridState.map(r => [...r]),
      currentNode: null,
      openSet: [],
      closedSet: [],
      activeNeighbors: [],
      log: `A* search failed: No available moves. Maze wall blocking exit.`,
      found: false,
      steps: stepCounter
    });
  }

  return trace;
}
