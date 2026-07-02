# DSA Visualizer

An interactive Data Structures and Algorithms visualizer built with Modern C++ (C++17), Raylib, React, TypeScript, Vite, and Tailwind CSS. This project explores fundamental concepts in sorting, graph traversal, competitive programming problem solving, and state-machine simulation through real-time interactive visualizers.

---

## Included Algorithms & Modules

### 1. Sorting Algorithms
- **Bubble Sort**: Step-by-step adjacent element comparisons, swapping animations, and lock-in pass completion states.
- **Quick Sort (Lomuto Partitioning)**: Pivot selection, index pointer partitioning (`i` & `j`), and recursive subarray range tracking.
- **Merge Sort**: Divide and conquer array splitting, recursive range division, and sequential merged subarray rebuilding.
- **Custom Script Execution**: Interactive custom code trace parser for step-by-step line highlighting and array mutation.

### 2. Graph Algorithms & Shortest Path Discovery
- **Breadth-First Search (BFS / Message Route - CSES 1667)**: Level-order network graph traversal, FIFO queue visualization, visited tracking, and shortest path reconstruction from computer 1 to computer N.
- **Depth-First Search (DFS)**: Recursive stack-based graph exploration, call stack tracing, and node discovery order visualization.

### 3. Searching & Competitive Programming Algorithms
- **Binary Search (Factory Machines - CSES 1620)**: Search space halving on ordered domains with `low`, `high`, and `mid` pointer tracking.
- **N-Queens Backtracking (Chessboard & Queens - CSES 1624)**: Constraint satisfaction algorithm placing 8 queens on an 8x8 grid with row, column, and diagonal collision checks.
- **Greedy Activity Selection (Movie Festival - CSES 1629)**: Interval scheduling algorithm selecting maximal non-overlapping intervals sorted by finish times.

### 4. C++ Architecture & CP Utilities
- **Abstract `IAlgorithm` Interface**: Object-oriented base class strategy enforcing non-blocking, frame-by-frame state-machine transitions (`Step()`, `Reset()`, `IsComplete()`).
- **C++ Sorting Visualizer Engine**: Raylib C++ state machine preserving loop state variables (`m_currentI`, `m_currentJ`) across render cycles.
- **Competitive Programming Fast I/O Boilerplate (`cp_template.cpp`)**: Industry-standard fast input/output stream decoupling (`sync_with_stdio(false)`), type aliases, and multi-testcase solver.
- **Coordinate Compression Utility (`coord_compress.cpp`)**: Mapping sparse values up to 10^9 into contiguous ranks `[0, U-1]` using `std::sort`, `std::unique`, and `std::lower_bound` for Segment and Fenwick Trees.

---

## Features

### Phase 1: Sorting Arena
- Interactive array visualization with active comparison & swap color highlights
- Multi-language source code synchronization (C++, Java, Python, JavaScript)
- Custom dataset generation (Random, Descending, Ascending)
- Step-by-step playback deck (Play, Pause, Single Step, Reset, Speed Slider)

### Phase 2: DSA Problem Arena
- Interactive 8-node network graph canvas with real-time queue/stack states
- Live problem statement reader with constraints, input/output formats, and source tags (CSES)
- Real-time memory and execution metrics tracking
- Multi-language source code previewer with active line highlighting

### Phase 3: Modern C++ Code Explorer
- Built-in code editor & viewer with file tree navigation
- Clean separation of header specifications (`.hpp`) and implementation files (`.cpp`)
- Integrated CMake build configuration and Raylib graphics engine examples

---

## Technologies

### Core Engine & Graphics
- Modern C++ (C++17)
- Raylib Graphics Library
- CMake Build System

### Frontend & Web App
- React 18
- TypeScript
- Vite

### Styling
- Tailwind CSS
- Lucide React Icons

### Execution Engine
- State Machine Scheduling
- Abstract Algorithm Interfaces

---

## Algorithmic Concepts

The visualizer demonstrates several key data structures and algorithmic principles:

### Frame-Driven State Machine

Algorithms implement step-based scheduling rather than blocking recursion:

```cpp
class IAlgorithm {
public:
    virtual ~IAlgorithm() = default;
    virtual bool Step() = 0;
    virtual void Reset() = 0;
    virtual bool IsComplete() const = 0;
    virtual const char* GetStatus() const = 0;
};
```

Where:

- `Step()` = advances algorithm by exactly one logical state transition
- `IsComplete()` = checks if sorting or graph traversal is finished
- `Reset()` = restores dataset and pointers to original state

---

## Project Structure

```text
src/
├── components/
│   ├── CppExplorer.tsx
│   ├── DsaArena.tsx
│   └── SortingArena.tsx
├── data/
│   └── cpp_code.ts
├── utils/
│   ├── algorithms.ts
│   └── dsaAlgorithms.ts
├── App.tsx
└── main.tsx
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/G-Stylo/cpp-dsa-visualizer.git
```

Navigate into the project directory:

```bash
cd cpp-dsa-visualizer
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:5173
```

---

## Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Implemented Features

- [x] **Sorting Algorithms**: Bubble Sort, Quick Sort (Lomuto), Merge Sort, Custom Scripting
- [x] **Graph Traversal Algorithms**: Breadth-First Search (BFS), Depth-First Search (DFS)
- [x] **Searching Algorithms**: Binary Search (Search space reduction)
- [x] **Backtracking Algorithms**: N-Queens (Grid constraint satisfaction)
- [x] **Greedy Algorithms**: Activity Selection (Interval scheduling)
- [x] **C++ Engine & Utilities**: Raylib state-machine visualizer, Coordinate Compression, CP Fast I/O Template
- [x] Interactive real-time playback controls (Play, Pause, Single Step, Speed Control)
- [x] Code synched line-by-line highlight viewer in C++, Java, Python, and JavaScript

---

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a pull request

---

## Author

Developed by Kodee Garcia.

GitHub: https://github.com/G-Stylo
