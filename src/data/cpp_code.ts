import readmeContent from '../../README.md?raw';

export interface CodeFile {
  name: string;
  path: string;
  language: string;
  content: string;
  description: string;
}

export const cppCodeFiles: CodeFile[] = [
  {
    name: "CMakeLists.txt",
    path: "CMakeLists.txt",
    language: "cmake",
    description: "Modern CMake build configuration to find and link Raylib.",
    content: `cmake_minimum_required(VERSION 3.16)
project(DSAVisualizer LANGUAGES CXX)

# Require C++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Source Files
set(SOURCES
    src/main.cpp
    src/SortingVisualizer.cpp
    src/GridVisualizer.cpp
)

set(HEADERS
    src/IAlgorithm.hpp
    src/SortingVisualizer.hpp
    src/GridVisualizer.hpp
    src/BubbleSort.hpp
    src/PathfindingAlgorithms.hpp
)

# Output Executable
add_executable(DSAVisualizer \${SOURCES} \${HEADERS})

# Find Raylib dependency (expects installed on system, or via package managers like Vcpkg/Conan)
find_package(raylib REQUIRED)

# Link Raylib and configure include directories
target_link_libraries(DSAVisualizer PRIVATE raylib)
target_include_directories(DSAVisualizer PRIVATE src)
`
  },
  {
    name: ".gitignore",
    path: ".gitignore",
    language: "xml",
    description: "Standard C++ and CMake workspace gitignore rules.",
    content: `# Prerequisites
*.d

# Compiled Object files
*.slo
*.lo
*.o
*.obj

# Precompiled Headers
*.gch
*.pch

# Shared Libraries, Static Libraries, Executables
*.so
*.dylib
*.dll
*.lib
*.a
*.la
*.lai
*.exe
*.out
*.app

# Build directory (CMake output)
/build/
/out/
/bin/

# IDE files and workspace configuration
.vscode/
.idea/
*.user
*.suo
*.sln
*.vcxproj
*.filters
CMakeSettings.json
CMakeUserPresets.json

# Raylib local downloads / system caches
src/raylib/
`
  },
  {
    name: "README.md",
    path: "README.md",
    language: "markdown",
    description: "Comprehensive product description, build instructions, and roadmap.",
    content: readmeContent
  },
  {
    name: "IAlgorithm.hpp",
    path: "src/IAlgorithm.hpp",
    language: "cpp",
    description: "The base abstract interface defining the state-machine execution flow.",
    content: `#pragma once

// Abstract Base Class for all Step-Based Visual Algorithms
class IAlgorithm {
public:
    virtual ~IAlgorithm() = default;

    // Execute exactly one logical step.
    // Returns true if the algorithm has fully completed, false otherwise.
    virtual bool Step() = 0;

    // Reset the internal state variables to start over
    virtual void Reset() = 0;

    // Check if the current routine is finished
    virtual bool IsComplete() const = 0;

    // Return current metrics or state description string
    virtual const char* GetStatus() const = 0;
};
`
  },
  {
    name: "BubbleSort.hpp",
    path: "src/BubbleSort.hpp",
    language: "cpp",
    description: "Proof-of-concept step-by-step Bubble Sort implementation preserving loop states.",
    content: `#pragma once
#include "IAlgorithm.hpp"
#include <vector>
#include <utility>

class BubbleSort : public IAlgorithm {
private:
    std::vector<int>& m_array;
    size_t m_currentI = 0;
    size_t m_currentJ = 0;
    bool m_swapped = false;
    bool m_isComplete = false;

    // Tracking indices for Raylib interface color highlights
    int m_compareLeft = -1;
    int m_compareRight = -1;
    size_t m_sortedBoundary = 0;

public:
    BubbleSort(std::vector<int>& targetArray) 
        : m_array(targetArray) {
        Reset();
    }

    bool Step() override {
        if (m_isComplete || m_array.size() <= 1) {
            m_isComplete = true;
            return true;
        }

        // Perform one element comparison/swap per frame
        if (m_currentI < m_array.size() - 1) {
            size_t endLimit = m_array.size() - m_currentI - 1;
            
            if (m_currentJ < endLimit) {
                m_compareLeft = m_currentJ;
                m_compareRight = m_currentJ + 1;

                if (m_array[m_currentJ] > m_array[m_currentJ + 1]) {
                    std::swap(m_array[m_currentJ], m_array[m_currentJ + 1]);
                    m_swapped = true;
                }
                
                m_currentJ++;
                return false; // Steps remain
            } else {
                // If no swaps occurred in this inner loop pass, array is completely sorted
                if (!m_swapped) {
                    m_isComplete = true;
                    m_sortedBoundary = 0; // entire array sorted
                    return true;
                }
                
                m_currentI++;
                m_currentJ = 0;
                m_swapped = false;
                m_sortedBoundary = m_array.size() - m_currentI;
                return false;
            }
        }

        m_isComplete = true;
        m_sortedBoundary = 0;
        return true;
    }

    void Reset() override {
        m_currentI = 0;
        m_currentJ = 0;
        m_swapped = false;
        m_isComplete = false;
        m_compareLeft = -1;
        m_compareRight = -1;
        m_sortedBoundary = m_array.size();
    }

    bool IsComplete() const override { return m_isComplete; }

    const char* GetStatus() const override {
        return m_isComplete ? "State: Complete" : "State: Active Sorting";
    }

    // Highlighting Getters for use by SortingVisualizer
    std::pair<int, int> GetActiveComparisons() const {
        return { m_compareLeft, m_compareRight };
    }

    size_t GetSortedBoundary() const {
        return m_sortedBoundary;
    }
};
`
  },
  {
    name: "SortingVisualizer.hpp",
    path: "src/SortingVisualizer.hpp",
    language: "cpp",
    description: "The Sorting Visualizer controller class managing values and render updates.",
    content: `#pragma once
#include <vector>
#include <memory>
#include "IAlgorithm.hpp"

class SortingVisualizer {
private:
    std::vector<int> m_array;
    std::unique_ptr<IAlgorithm> m_activeAlgorithm;
    
    bool m_isPlaying = false;
    float m_stepTimer = 0.0f;
    float m_stepDelay = 0.05f; // Time in seconds between updates

public:
    SortingVisualizer();
    void GenerateRandomArray(int size, int minValue, int maxValue);
    
    void Update(float deltaTime);
    void Draw(int screenWidth, int screenHeight);
    
    void SetAlgorithm(std::unique_ptr<IAlgorithm> algo);
    void Play() { m_isPlaying = true; }
    void Pause() { m_isPlaying = false; }
    void StepOnce();
    void Reset();
    
    void SetSpeed(float delay) { m_stepDelay = delay; }
    bool IsPlaying() const { return m_isPlaying; }
    const std::vector<int>& GetArray() const { return m_array; }
};
`
  },
  {
    name: "SortingVisualizer.cpp",
    path: "src/SortingVisualizer.cpp",
    language: "cpp",
    description: "The main rendering and state dispatch operations using Raylib calls.",
    content: `#include "SortingVisualizer.hpp"
#include "BubbleSort.hpp"
#include "raylib.h"
#include <cstdlib>
#include <ctime>

SortingVisualizer::SortingVisualizer() {
    std::srand(static_cast<unsigned int>(std::time(nullptr)));
    GenerateRandomArray(50, 10, 300);
}

void SortingVisualizer::GenerateRandomArray(int size, int minValue, int maxValue) {
    m_array.clear();
    for (int i = 0; i < size; ++i) {
        m_array.push_back(minValue + std::rand() % (maxValue - minValue + 1));
    }
    Reset();
}

void SortingVisualizer::SetAlgorithm(std::unique_ptr<IAlgorithm> algo) {
    m_activeAlgorithm = std::move(algo);
}

void SortingVisualizer::Reset() {
    m_isPlaying = false;
    m_stepTimer = 0.0f;
    if (m_activeAlgorithm) {
        m_activeAlgorithm->Reset();
    }
}

void SortingVisualizer::StepOnce() {
    if (m_activeAlgorithm) {
        m_activeAlgorithm->Step();
    }
}

void SortingVisualizer::Update(float deltaTime) {
    if (!m_isPlaying || !m_activeAlgorithm) return;

    m_stepTimer += deltaTime;
    while (m_stepTimer >= m_stepDelay) {
        m_stepTimer -= m_stepDelay;
        bool done = m_activeAlgorithm->Step();
        if (done) {
            m_isPlaying = false;
            break;
        }
    }
}

void SortingVisualizer::Draw(int screenWidth, int screenHeight) {
    int arraySize = static_cast<int>(m_array.size());
    if (arraySize == 0) return;

    // Margins and layout
    float startX = 50.0f;
    float startY = 100.0f;
    float areaWidth = screenWidth - 100.0f;
    float areaHeight = screenHeight - 200.0f;
    float barWidth = areaWidth / arraySize;

    // Fetch comparison highlight states safely utilizing downcasts
    int highlightLeft = -1;
    int highlightRight = -1;
    size_t sortedBoundary = m_array.size();

    // Check if the current algorithm is BubbleSort to fetch its rendering aids
    BubbleSort* bubble = dynamic_cast<BubbleSort*>(m_activeAlgorithm.get());
    if (bubble) {
        auto comps = bubble->GetActiveComparisons();
        highlightLeft = comps.first;
        highlightRight = comps.second;
        sortedBoundary = bubble->GetSortedBoundary();
    }

    // Draw bars
    for (int i = 0; i < arraySize; ++i) {
        float barHeight = m_array[i];
        float x = startX + (i * barWidth);
        float y = (startY + areaHeight) - barHeight;

        Color barColor = SKYBLUE;

        if (m_activeAlgorithm && m_activeAlgorithm->IsComplete()) {
            barColor = GREEN; // Completed
        } else if (i == highlightLeft || i == highlightRight) {
            barColor = RED;   // Comparing / Active indices
        } else if (static_cast<size_t>(i) >= sortedBoundary) {
            barColor = LIME;  // Placed in sorted domain
        }

        DrawRectangle(
            static_cast<int>(x), 
            static_cast<int>(y), 
            static_cast<int>(barWidth - 2.0f), 
            static_cast<int>(barHeight), 
            barColor
        );
    }
    
    // Status text
    if (m_activeAlgorithm) {
        DrawText(m_activeAlgorithm->GetStatus(), 50, screenHeight - 50, 18, DARKGRAY);
    }
}
`
  },
  {
    name: "main.cpp",
    path: "src/main.cpp",
    language: "cpp",
    description: "The core application bootstrap and desktop presentation loop using Raylib graphics.",
    content: `#include "raylib.h"
#include "SortingVisualizer.hpp"
#include "BubbleSort.hpp"
#include <memory>

int main() {
    const int screenWidth = 1020;
    const int screenHeight = 600;

    // Initialize desktop Raylib Window
    InitWindow(screenWidth, screenHeight, "Data Structures and Algorithms Visualizer - C++");
    SetTargetFPS(60);

    // Instantiate modular visualizer
    SortingVisualizer sortingViz;
    
    // Setup initial BubbleSort algorithm linked to target vector
    auto initialAlgo = std::make_unique<BubbleSort>(
        const_cast<std::vector<int>&>(sortingViz.GetArray())
    );
    sortingViz.SetAlgorithm(std::move(initialAlgo));

    // Application main-loop
    while (!WindowShouldClose()) {
        float dt = GetFrameTime();

        // 1. Controls Dispatcher
        if (IsKeyPressed(KEY_SPACE)) {
            if (sortingViz.IsPlaying()) sortingViz.Pause();
            else sortingViz.Play();
        }
        if (IsKeyPressed(KEY_R)) {
            sortingViz.GenerateRandomArray(50, 10, 300);
            auto resetAlgo = std::make_unique<BubbleSort>(
                const_cast<std::vector<int>&>(sortingViz.GetArray())
            );
            sortingViz.SetAlgorithm(std::move(resetAlgo));
        }
        if (IsKeyPressed(KEY_S)) {
            sortingViz.StepOnce();
        }
        if (IsKeyPressed(KEY_ONE)) {
            sortingViz.SetSpeed(0.1f); // Slow
        }
        if (IsKeyPressed(KEY_TWO)) {
            sortingViz.SetSpeed(0.01f); // Fast
        }

        // 2. Logic Update
        sortingViz.Update(dt);

        // 3. Render Canvas
        BeginDrawing();
        ClearBackground(RAYWHITE);

        // Header info
        DrawText("DSA C++ Visualizer - Bubble Sort Proof of Concept", 20, 20, 24, DARKGRAY);
        DrawText("[SPACE] Play/Pause | [S] Step Once | [R] Reset/New Array", 20, 55, 14, GRAY);
        DrawText("[1] Speed Sl (0.1s) | [2] Speed Fs (0.01s)", 20, 72, 14, GRAY);

        // Draw sorting domain
        sortingViz.Draw(screenWidth, screenHeight);

        EndDrawing();
    }

    CloseWindow();
    return 0;
}
`
  },
  {
    name: "cp_template.cpp",
    path: "src/cp_template.cpp",
    language: "cpp",
    description: "Industry-standard C++ competitive programming template with Fast I/O, common type macros, and multiple testcase support.",
    content: `#include <bits/stdc++.h>
using namespace std;

// --- FAST I/O DESIGN OPTIMIZATION ---
// De-synchronizes C++ standard streams (cin, cout) from C's stdio (scanf, printf).
// Removes default flush coupling between 'cin' and 'cout' for max stream performance.
void fast_io() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
}

// --- OPTIMIZATION TYPE DEFINITIONS ---
using ll = long long;
using ld = long double;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using vi = vector<int>;
using vll = vector<ll>;
using vvi = vector<vi>;

#define pb push_back
#define mp make_pair
#define all(x) (x).begin(), (x).end()
#define sz(x) ((int)(x).size())

// --- SOLUTION INSTANTIATE ---
void solve(int tc) {
    // Read input variables
    int n;
    if (!(cin >> n)) return;
    
    vi a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    // Sort optimally using std::sort (O(N log N) - IntroSort, safe from TLE)
    sort(all(a));
    
    // Log outputs cleanly without using 'endl' (which causes costly stream flushing)
    for (int i = 0; i < n; i++) {
        cout << a[i] << (i == n - 1 ? "" : " ");
    }
    cout << "\n";
}

int main() {
    fast_io();
    
    int t = 1;
    // Uncomment if input contains multiple test cases
    // cin >> t; 
    
    for (int tc = 1; tc <= t; tc++) {
        solve(tc);
    }
    
    return 0;
}
`
  },
  {
    name: "coord_compress.cpp",
    path: "src/coord_compress.cpp",
    language: "cpp",
    description: "Fast Coordinate Compression utility mapping sparse values to range [0, U-1]. Critical CP tool for Segment Trees / Fenwick Trees.",
    content: `#include <bits/stdc++.h>
using namespace std;

// Coordinate Compression:
// Maps an array of large values (eg. up to 10^9) maintaining their relative order,
// such that all values are mapped to coordinates in [0, U-1] where U is the count of unique values.
// This is critical for range queries (e.g., Segment Trees / Fenwick Trees) with coordinate sizes > 10^6.
vector<int> compress_coordinates(const vector<int>& a) {
    vector<int> temp = a;
    
    // 1. Sort all values
    sort(temp.begin(), temp.end());
    
    // 2. Remove duplicates
    temp.erase(unique(temp.begin(), temp.end()), temp.end());
    
    // 3. Map original items to their ranks using binary search (lower_bound)
    vector<int> compressed(a.size());
    for (size_t i = 0; i < a.size(); i++) {
        compressed[i] = lower_bound(temp.begin(), temp.end(), a[i]) - temp.begin();
    }
    return compressed;
}

int main() {
    vector<int> original = {1000000005, 42, 999999999, 42, 1000000};
    
    vector<int> compressed = compress_coordinates(original);
    
    cout << "Original: ";
    for (int x : original) cout << x << " ";
    cout << "\n";
    
    cout << "Compressed: ";
    for (int x : compressed) cout << x << " "; // Expected output: 3 0 2 0 1
    cout << "\n";
    
    return 0;
}
`
  }
];
