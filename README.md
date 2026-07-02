# C++ DSA Visualizer

An interactive Data Structures and Algorithms visualizer built with Modern C++ (C++17), Raylib, React, TypeScript, Vite, and Tailwind CSS. This project explores fundamental concepts in sorting, pathfinding, graph algorithms, competitive programming, and state-machine simulation through real-time interactive visualizers.

---

## Features

### Phase 1: Sorting Algorithms
- Interactive array visualization with active comparison & swap highlighting
- Bubble Sort, Quick Sort (pivot state tracking), and Merge Sort
- Custom dataset generation (Random, Descending, Ascending)
- Real-time speed adjustment and step-by-step frame execution

### Phase 2: Pathfinding & Graph Algorithms
- Dijkstra's Algorithm for weighted shortest path discovery
- A* Search with Heuristic cost function optimization
- Breadth-First Search (BFS / Message Route) for unweighted networks
- Interactive grid matrix creation with draggable start/end nodes and wall painting

### Phase 3: Competitive Programming & Stress Testing
- Custom C++ script inspection and interactive problem suite
- Real-time execution metrics (comparison counters, array accesses, time complexity)
- Interactive control deck: Play, Pause, Single-Step, and Reset triggers
- Dynamic state machine debugging

### Phase 4: Modern C++ Architecture
- Object-Oriented Design (OOD) strictly decoupling algorithm logic from presentation
- Abstract `IAlgorithm` interface strategy enabling frame-by-frame scheduling
- Memory-safe state retention per `Update()` cycle
- Modular Raylib rendering engine architecture

---

## Technologies

### Core Engine & Graphics
- Modern C++ (C++17)
- Raylib Graphics Library
- CMake Build System

### Frontend & Web App
- React
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
    virtual void Update() = 0;
    virtual bool IsFinished() const = 0;
    virtual void Reset() = 0;
};
```

Where:

- `Update()` = advances algorithm by exactly one state transition
- `IsFinished()` = checks if sorting or pathfinding is complete
- `Reset()` = restores dataset and pointers to original state

### Complexity Analysis

The simulator tracks:

- Comparison count
- Array reads / writes
- Path length and visited nodes

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
├── App.tsx
└── main.tsx

cpp/
├── include/
│   ├── IAlgorithm.hpp
│   ├── SortingVisualizer.hpp
│   └── GridVisualizer.hpp
└── src/
    ├── BubbleSort.cpp
    ├── QuickSort.cpp
    ├── Dijkstra.cpp
    └── main.cpp
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

- [x] Interactive 2D array and grid rendering
- [x] Real-time simulation controls (Play, Pause, Step, Reset)
- [x] Adjustable simulation speed and custom presets
- [x] Sorting algorithms (Bubble, Quick, Merge)
- [x] Pathfinding algorithms (Dijkstra, A*, BFS)
- [x] Interactive obstacle painting and node placement
- [x] Real-time comparison and array access metrics
- [x] Frame-by-frame state machine execution
- [x] Modern C++ (C++17) interface and architecture
- [x] Interactive C++ code explorer & Competitive Programming suite

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
