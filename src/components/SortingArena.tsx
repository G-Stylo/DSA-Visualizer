import React, { useState, useEffect, useRef } from 'react';
import { SortStep, generateBubbleSortTrace, generateQuickSortTrace, generateMergeSortTrace } from '../utils/algorithms';
import { Play, Pause, RotateCcw, StepForward, Shuffle, Sparkles, Settings2, Sliders, ChevronRight, Info, Cpu, Code2, Layers, PlayCircle, Terminal } from 'lucide-react';

// Extend SortStep with customLine support
interface ExtendedSortStep extends SortStep {
  customLine?: number;
}

// Map algorithm steps to line positions in displayed code snippets
const getActiveLineIndex = (step: ExtendedSortStep | undefined, algo: string, lang: 'js' | 'cpp' | 'java' | 'python'): number => {
  if (!step) return -1;
  if (algo === 'Custom') {
    return step.customLine !== undefined ? step.customLine : -1;
  }
  
  const log = step.log.toLowerCase();
  
  if (algo === 'Bubble') {
    if (lang === 'python') {
      if (log.includes("initiated")) return 0;
      if (log.includes("complete")) return 6;
      if (log.includes("pass completeness") || log.includes("final position")) return 1;
      if (step.comparing) {
        return step.swapping ? 5 : 3;
      }
    } else {
      if (log.includes("initiated")) return 0;
      if (log.includes("complete")) return 8;
      if (log.includes("pass completeness") || log.includes("final position")) return 1;
      if (step.comparing) {
        return step.swapping ? 4 : 3;
      }
    }
  }
  
  if (algo === 'Quick') {
    if (lang === 'cpp') {
      if (log.includes("initiated")) return 0;
      if (log.includes("complete")) return 19;
      if (log.includes("recursion") || log.includes("recursive")) return 3;
      if (log.includes("partition completed") || log.includes("placed at pivot")) return 16;
      if (step.comparing) {
        return step.swapping ? 14 : 12;
      }
    } else if (lang === 'java') {
      if (log.includes("initiated")) return 0;
      if (log.includes("complete")) return 24;
      if (log.includes("recursion") || log.includes("recursive")) return 3;
      if (log.includes("partition completed") || log.includes("placed at pivot")) return 21;
      if (step.comparing) {
        return step.swapping ? 15 : 13;
      }
    } else if (lang === 'python') {
      if (log.includes("initiated")) return 0;
      if (log.includes("complete")) return 14;
      if (log.includes("recursion") || log.includes("recursive")) return 3;
      if (log.includes("partition completed") || log.includes("placed at pivot")) return 13;
      if (step.comparing) {
        return step.swapping ? 12 : 10;
      }
    } else {
      if (log.includes("initiated")) return 0;
      if (log.includes("complete")) return 22;
      if (log.includes("recursion") || log.includes("recursive")) return 3;
      if (log.includes("partition completed") || log.includes("placed at pivot")) return 19;
      if (step.comparing) {
        return step.swapping ? 13 : 11;
      }
    }
  }
  
  if (algo === 'Merge') {
    if (lang === 'python') {
      if (log.includes("initiated")) return 11;
      if (log.includes("complete")) return 17;
      if (log.includes("splitting") || log.includes("divide")) return 13;
      if (log.includes("merged") || log.includes("rebuilding")) return 16;
      if (step.comparing) {
        return step.swapping ? 4 : 3;
      }
    } else {
      if (log.includes("initiated")) return 11;
      if (log.includes("complete")) return 18;
      if (log.includes("splitting") || log.includes("divide")) return 13;
      if (log.includes("merged") || log.includes("rebuilding")) return 16;
      if (step.comparing) {
        return step.swapping ? 4 : 3;
      }
    }
  }
  
  return -1;
};

// Source Code representations mapped by algorithm and language
const getCodeLines = (algo: string, lang: 'js' | 'cpp' | 'java' | 'python', customCode: string): string[] => {
  if (algo === 'Custom') {
    return customCode.split('\n');
  }

  if (lang === 'cpp') {
    if (algo === 'Bubble') {
      return [
        "void bubbleSort(int arr[], int n) {",
        "    for (int i = 0; i < n - 1; i++) {",
        "        for (int j = 0; j < n - i - 1; j++) {",
        "            if (arr[j] > arr[j + 1]) {",
        "                swap(arr[j], arr[j + 1]);",
        "            }",
        "        }",
        "    }",
        "}"
      ];
    }
    if (algo === 'Quick') {
      return [
        "void quickSort(int arr[], int low, int high) {",
        "    if (low < high) {",
        "        int pi = partition(arr, low, high);",
        "        quickSort(arr, low, pi - 1);",
        "        quickSort(arr, pi + 1, high);",
        "    }",
        "}",
        "int partition(int arr[], int low, int high) {",
        "    int pivot = arr[high];",
        "    int i = (low - 1);",
        "    for (int j = low; j <= high - 1; j++) {",
        "        if (arr[j] < pivot) {",
        "            i++;",
        "            swap(arr[i], arr[j]);",
        "        }",
        "    }",
        "    swap(arr[i + 1], arr[high]);",
        "    return (i + 1);",
        "}"
      ];
    }
    if (algo === 'Merge') {
      return [
        "void merge(int arr[], int l, int m, int r) {",
        "    int i = 0, j = 0, k = l;",
        "    while (i < n1 && j < n2) {",
        "        if (L[i] <= R[j]) {",
        "            arr[k] = L[i++];",
        "        } else {",
        "            arr[k] = R[j++];",
        "        }",
        "        k++;",
        "    }",
        "}",
        "void mergeSort(int arr[], int l, int r) {",
        "    if (l < r) {",
        "        int m = l + (r - l) / 2;",
        "        mergeSort(arr, l, m);",
        "        mergeSort(arr, m + 1, r);",
        "        merge(arr, l, m, r);",
        "    }",
        "}"
      ];
    }
  }

  if (lang === 'java') {
    if (algo === 'Bubble') {
      return [
        "public static void bubbleSort(int[] arr) {",
        "    int n = arr.length;",
        "    for (int i = 0; i < n - 1; i++) {",
        "        for (int j = 0; j < n - i - 1; j++) {",
        "            if (arr[j] > arr[j + 1]) {",
        "                int temp = arr[j];",
        "                arr[j] = arr[j + 1];",
        "                arr[j + 1] = temp;",
        "            }",
        "        }",
        "    }",
        "}"
      ];
    }
    if (algo === 'Quick') {
      return [
        "public static void quickSort(int[] arr, int low, int high) {",
        "    if (low < high) {",
        "        int pi = partition(arr, low, high);",
        "        quickSort(arr, low, pi - 1);",
        "        quickSort(arr, pi + 1, high);",
        "    }",
        "}",
        "private static int partition(int[] arr, int low, int high) {",
        "    int pivot = arr[high];",
        "    int i = (low - 1);",
        "    for (int j = low; j < high; j++) {",
        "        if (arr[j] < pivot) {",
        "            i++;",
        "            int temp = arr[i];",
        "            arr[i] = arr[j];",
        "            arr[j] = temp;",
        "        }",
        "    }",
        "    int temp = arr[i + 1];",
        "    arr[i + 1] = arr[high];",
        "    arr[high] = temp;",
        "    return i + 1;",
        "}"
      ];
    }
    if (algo === 'Merge') {
      return [
        "private static void merge(int[] arr, int l, int m, int r) {",
        "    int i = 0, j = 0, k = l;",
        "    while (i < n1 && j < n2) {",
        "        if (L[i] <= R[j]) {",
        "            arr[k] = L[i++];",
        "        } else {",
        "            arr[k] = R[j++];",
        "        }",
        "        k++;",
        "    }",
        "}",
        "public static void mergeSort(int[] arr, int l, int r) {",
        "    if (l < r) {",
        "        int m = l + (r - l) / 2;",
        "        mergeSort(arr, l, m);",
        "        mergeSort(arr, m + 1, r);",
        "        merge(arr, l, m, r);",
        "    }",
        "}"
      ];
    }
  }

  if (lang === 'python') {
    if (algo === 'Bubble') {
      return [
        "def bubbleSort(arr):",
        "    n = len(arr)",
        "    for i in range(n - 1):",
        "        for j in range(n - i - 1):",
        "            if arr[j] > arr[j + 1]:",
        "                arr[j], arr[j + 1] = arr[j + 1], arr[j]",
        ""
      ];
    }
    if (algo === 'Quick') {
      return [
        "def quickSort(arr, low, high):",
        "    if low < high:",
        "        pi = partition(arr, low, high)",
        "        quickSort(arr, low, pi - 1)",
        "        quickSort(arr, pi + 1, high)",
        "",
        "def partition(arr, low, high):",
        "    pivot = arr[high]",
        "    i = low - 1",
        "    for j in range(low, high):",
        "        if arr[j] < pivot:",
        "            i += 1",
        "            arr[i], arr[j] = arr[j], arr[i]",
        "    arr[i + 1], arr[high] = arr[high], arr[i + 1]",
        "    return i + 1"
      ];
    }
    if (algo === 'Merge') {
      return [
        "def merge(arr, l, m, r):",
        "    i, j, k = 0, 0, l",
        "    while i < len(L) and j < len(R):",
        "        if L[i] <= R[j]:",
        "            arr[k] = L[i]",
        "            i += 1",
        "            k += 1",
        "        else:",
        "            arr[k] = R[j]",
        "            j += 1",
        "            k += 1",
        "",
        "def mergeSort(arr, l, r):",
        "    if l < r:",
        "        m = (l + r) // 2",
        "        mergeSort(arr, l, m)",
        "        mergeSort(arr, m + 1, r)",
        "        merge(arr, l, m, r)"
      ];
    }
  }

  // JS/TS as default fallback
  if (algo === 'Bubble') {
    return [
      "function bubbleSort(arr) {",
      "    let n = arr.length;",
      "    for (let i = 0; i < n - 1; i++) {",
      "        for (let j = 0; j < n - i - 1; j++) {",
      "            if (arr[j] > arr[j + 1]) {",
      "                let temp = arr[j];",
      "                arr[j] = arr[j + 1];",
      "                arr[j + 1] = temp;",
      "            }",
      "        }",
      "    }",
      "}"
    ];
  }
  if (algo === 'Quick') {
    return [
      "function quickSort(arr, low, high) {",
      "    if (low < high) {",
      "        let pi = partition(arr, low, high);",
      "        quickSort(arr, low, pi - 1);",
      "        quickSort(arr, pi + 1, high);",
      "    }",
      "}",
      "function partition(arr, low, high) {",
      "    let pivot = arr[high];",
      "    let i = (low - 1);",
      "    for (let j = low; j < high; j++) {",
      "        if (arr[j] < pivot) {",
      "            i++;",
      "            let temp = arr[i];",
      "            arr[i] = arr[j];",
      "            arr[j] = temp;",
      "        }",
      "    }",
      "    let temp = arr[i + 1];",
      "    arr[i + 1] = arr[high];",
      "    arr[high] = temp;",
      "    return i + 1;",
      "}"
    ];
  }
  if (algo === 'Merge') {
    return [
      "function merge(arr, l, m, r) {",
      "    let i = 0, j = 0, k = l;",
      "    while (i < n1 && j < n2) {",
      "        if (L[i] <= R[j]) {",
      "            arr[k] = L[i++];",
      "        } else {",
      "            arr[k] = R[j++];",
      "        }",
      "        k++;",
      "    }",
      "}",
      "function mergeSort(arr, l, r) {",
      "    if (l < r) {",
      "        let m = Math.floor(l + (r - l) / 2);",
      "        mergeSort(arr, l, m);",
      "        mergeSort(arr, m + 1, r);",
      "        merge(arr, l, m, r);",
      "    }",
      "}"
    ];
  }

  return customCode.split('\n');
};

// Python Transpiler
function transpilePython(code: string): string {
  const lines = code.split('\n');
  let jsCode = '';
  let indentLevels: number[] = [0];
  
  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      jsCode += line + '\n';
      continue;
    }
    
    // Calculate indentation
    const match = line.match(/^(\s*)/);
    const indent = match ? match[1].length : 0;
    
    // Close blocks when indentation decreases
    while (indentLevels.length > 1 && indent < indentLevels[indentLevels.length - 1]) {
      indentLevels.pop();
      jsCode += ' '.repeat(indentLevels[indentLevels.length - 1] || 0) + '}\n';
    }
    
    let processedLine = trimmed;
    
    // Is it a function definition?
    if (processedLine.startsWith('def customSort(')) {
      processedLine = 'function customSort(arr, compare, swap) {';
      indentLevels.push(indent + 4);
    } else if (processedLine.startsWith('def ')) {
      processedLine = processedLine.replace(/^def\s+(\w+)\s*\(([^)]*)\):/, 'function $1($2) {');
      indentLevels.push(indent + 4);
    }
    // Is it a loop?
    else if (processedLine.match(/^for\s+(\w+)\s+in\s+range\(([^)]+)\):/)) {
      processedLine = processedLine.replace(/^for\s+(\w+)\s+in\s+range\(([^)]+)\):/, (m, varName, rangeArgs) => {
        const args = rangeArgs.split(',').map((x: string) => x.trim());
        if (args.length === 1) {
          return `for (let ${varName} = 0; ${varName} < ${args[0]}; ${varName}++) {`;
        } else if (args.length === 2) {
          return `for (let ${varName} = ${args[0]}; ${varName} < ${args[1]}; ${varName}++) {`;
        } else if (args.length === 3) {
          return `for (let ${varName} = ${args[0]}; ${varName} < ${args[1]}; ${varName} += ${args[2]}) {`;
        }
        return m;
      });
      indentLevels.push(indent + 4);
    }
    // Is it an if statement?
    else if (processedLine.startsWith('if ') && processedLine.endsWith(':')) {
      const cond = processedLine.slice(3, -1).trim();
      processedLine = `if (${cond}) {`;
      indentLevels.push(indent + 4);
    }
    // Is it an elif statement?
    else if (processedLine.startsWith('elif ') && processedLine.endsWith(':')) {
      const cond = processedLine.slice(5, -1).trim();
      processedLine = `else if (${cond}) {`;
      indentLevels.push(indent + 4);
    }
    // Is it an else statement?
    else if (processedLine === 'else:') {
      processedLine = 'else {';
      indentLevels.push(indent + 4);
    }
    // Replace len(arr)
    processedLine = processedLine.replace(/len\(([^)]+)\)/g, '$1.length');
    // Replace Logical operators
    processedLine = processedLine.replace(/\band\b/g, '&&');
    processedLine = processedLine.replace(/\bor\b/g, '||');
    processedLine = processedLine.replace(/\bnot\b/g, '!');
    
    jsCode += ' '.repeat(indent) + processedLine + '\n';
  }
  
  // Close any remaining blocks
  while (indentLevels.length > 1) {
    indentLevels.pop();
    jsCode += ' '.repeat(indentLevels[indentLevels.length - 1] || 0) + '}\n';
  }
  
  return jsCode;
}

// C++ / Java Transpiler
function transpileCppJava(code: string): string {
  let jsCode = code;
  
  // Remove standard boilerplate inclusions
  jsCode = jsCode.replace(/#include\s+<[^>]+>/g, '');
  jsCode = jsCode.replace(/using\s+namespace\s+std\s*;/g, '');
  jsCode = jsCode.replace(/package\s+[\w.]+;/g, '');
  jsCode = jsCode.replace(/import\s+[\w.]+;/g, '');
  
  // If user wrapped in full java class definitions, safely strip the wrapper
  jsCode = jsCode.replace(/public\s+class\s+\w+\s*\{/, '');
  
  // Convert customSort signature type signatures to simple function statements
  jsCode = jsCode.replace(/(?:public\s+static\s+)?void\s+customSort\s*\([^)]*\)/, 'function customSort(arr, compare, swap)');
  
  // Replace simple standard primitive declarations inside local scopes
  jsCode = jsCode.replace(/\b(?:int|double|float|long|boolean|char|string|auto)\s+(\w+)\b/g, 'let $1');
  jsCode = jsCode.replace(/\b(?:int|double|float|long|boolean|char|string|auto)\[\]\s+(\w+)\b/g, 'let $1');
  
  // Replace standard length qualifiers
  jsCode = jsCode.replace(/\.length\s*\(\s*\)/g, '.length');
  jsCode = jsCode.replace(/\.size\s*\(\s*\)/g, '.length');
  
  return jsCode;
}

export default function SortingArena() {
  const [arraySize, setArraySize] = useState<number>(35);
  const [activeAlgorithm, setActiveAlgorithm] = useState<'Bubble' | 'Quick' | 'Merge' | 'Custom'>('Bubble');
  const [array, setArray] = useState<number[]>([]);
  const [trace, setTrace] = useState<ExtendedSortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(100); // delay in ms

  // Dedicated multiple language code states
  const [selectedLanguage, setSelectedLanguage] = useState<'cpp' | 'java' | 'python' | 'js'>('cpp');
  const [languageCodes, setLanguageCodes] = useState<{ [key in 'js' | 'cpp' | 'java' | 'python']: string }>({
    js: `function customSort(arr, compare, swap) {
  let n = arr.length;
  // Let's implement Selection Sort as our baseline custom JS sort!
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (compare(i, j)) {
        swap(i, j);
      }
    }
  }
}`,
    cpp: `void customSort(int arr[], int n) {
    // Let's implement Selection Sort as our baseline custom C++ sort!
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (compare(i, j)) {
                swap(i, j);
            }
        }
    }
}`,
    java: `public static void customSort(int[] arr) {
    int n = arr.length;
    // Let's implement Selection Sort as our baseline custom Java sort!
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (compare(i, j)) {
                swap(i, j);
            }
        }
    }
}`,
    python: `def customSort(arr):
    n = len(arr)
    # Let's implement Selection Sort as our baseline custom Python sort!
    for i in range(n):
        for j in range(i + 1, n):
            if compare(i, j):
                swap(i, j)`
  });
  
  const [compileStatus, setCompileStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Layout Refs & Settings
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [customInput, setCustomInput] = useState<string>("");
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const codeLinesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (autoScroll && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentStepIndex, autoScroll]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize unique random values array
  const generateNewDataset = (size = arraySize) => {
    setIsPlaying(false);
    const newArr: number[] = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 500) + 10);
    }
    setArray(newArr);
    setCurrentStepIndex(0);
  };

  // Compile and run the written sorting script
  const generateCustomSortTrace = (arr: number[], rawCode: string, lang: 'cpp' | 'java' | 'python' | 'js'): ExtendedSortStep[] => {
    const localTrace: ExtendedSortStep[] = [];
    const arrayCopy = [...arr];
    const sortedIndices = new Set<number>();

    localTrace.push({
      array: [...arrayCopy],
      comparing: null,
      swapping: false,
      sortedIndices: new Set(sortedIndices),
      log: `Sandbox Compiler: Bootstrapped dynamic [${lang.toUpperCase()}] interpreter runtime.`
    });

    // Instrument the user's raw code lines first so line numbers map exactly to whatever they wrote!
    const lines = rawCode.split('\n');
    const instrumentedLines = lines.map((line, idx) => {
      let modified = line;
      modified = modified.replace(/compare\s*\(\s*([^,)]+)\s*,\s*([^,)]+)\s*\)/g, `compare($1, $2, ${idx})`);
      modified = modified.replace(/swap\s*\(\s*([^,)]+)\s*,\s*([^,)]+)\s*\)/g, `swap($1, $2, ${idx})`);
      return modified;
    });
    const instrumentedRawCode = instrumentedLines.join('\n');

    // Transpile the raw instrumented code into JavaScript executable
    let transpiledJS = instrumentedRawCode;
    if (lang === 'python') {
      transpiledJS = transpilePython(instrumentedRawCode);
    } else if (lang === 'cpp' || lang === 'java') {
      transpiledJS = transpileCppJava(instrumentedRawCode);
    }

    const compare = (i: number, j: number, lineIndex: number) => {
      if (i < 0 || i >= arrayCopy.length || j < 0 || j >= arrayCopy.length) return false;
      localTrace.push({
        array: [...arrayCopy],
        comparing: [i, j],
        swapping: false,
        sortedIndices: new Set(sortedIndices),
        log: `Comparing A[${i}] (${arrayCopy[i]}) & A[${j}] (${arrayCopy[j]})`,
        customLine: lineIndex
      });
      return arrayCopy[i] > arrayCopy[j];
    };

    const swap = (i: number, j: number, lineIndex: number) => {
      if (i < 0 || i >= arrayCopy.length || j < 0 || j >= arrayCopy.length) return;
      const temp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[j];
      arrayCopy[j] = temp;
      localTrace.push({
        array: [...arrayCopy],
        comparing: [i, j],
        swapping: true,
        sortedIndices: new Set(sortedIndices),
        log: `Swapped parameters: A[${i}] (${arrayCopy[i]}) ↔ A[${j}] (${arrayCopy[j]})`,
        customLine: lineIndex
      });
    };

    try {
      const evalCode = `
        ${transpiledJS}
        if (typeof customSort === 'function') {
          customSort(arr, compare, swap);
        } else {
          throw new Error("Function 'customSort' not found. Please declare it explicitly.");
        }
      `;

      const runner = new Function('arr', 'compare', 'swap', evalCode);
      runner(arrayCopy, compare, swap);

      // Lock as sorted
      for (let i = 0; i < arrayCopy.length; i++) {
        sortedIndices.add(i);
      }
      localTrace.push({
        array: [...arrayCopy],
        comparing: null,
        swapping: false,
        sortedIndices: new Set(sortedIndices),
        log: `Success: Execution finished. Completed [${lang.toUpperCase()}] trace creation.`
      });
      setCompileStatus({ success: true, message: `Compilation of ${lang.toUpperCase()} succeeded.` });
    } catch (err: any) {
      localTrace.push({
        array: [...arrayCopy],
        comparing: null,
        swapping: false,
        sortedIndices: new Set(sortedIndices),
        log: `TRANSPILE / RUNTIME ERROR: ${err?.message || err}`
      });
      setCompileStatus({ success: false, message: err?.message || String(err) });
    }

    return localTrace;
  };

  // Generate trace whenever algorithm, array, or language changes
  useEffect(() => {
    if (array.length === 0) {
      generateNewDataset();
      return;
    }

    let searchTrace: ExtendedSortStep[] = [];
    if (activeAlgorithm === 'Bubble') {
      searchTrace = generateBubbleSortTrace(array);
    } else if (activeAlgorithm === 'Quick') {
      searchTrace = generateQuickSortTrace(array);
    } else if (activeAlgorithm === 'Merge') {
      searchTrace = generateMergeSortTrace(array);
    } else if (activeAlgorithm === 'Custom') {
      searchTrace = generateCustomSortTrace(array, languageCodes[selectedLanguage], selectedLanguage);
    }

    setTrace(searchTrace);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [array, activeAlgorithm, selectedLanguage]);

  // Handle Playback Interval
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

  // Mapped Presets for CP Edge Cases & Stress Scenarios
  const applyPreset = (type: 'worst' | 'sorted' | 'duplicates' | 'binary' | 'oscillating') => {
    setIsPlaying(false);
    const size = arraySize;
    let newArr: number[] = [];

    if (type === 'worst') {
      for (let i = 0; i < size; i++) {
        newArr.push((size - i) * 15);
      }
    } else if (type === 'sorted') {
      for (let i = 0; i < size; i++) {
        newArr.push((i + 1) * 15);
      }
    } else if (type === 'duplicates') {
      const base = 250;
      for (let i = 0; i < size; i++) {
        newArr.push(i % 5 === 0 ? 450 : base);
      }
    } else if (type === 'binary') {
      for (let i = 0; i < size; i++) {
        newArr.push(Math.random() > 0.5 ? 400 : 80);
      }
    } else if (type === 'oscillating') {
      for (let i = 0; i < size; i++) {
        newArr.push(i % 2 === 0 ? 480 - i * 4 : 50 + i * 4);
      }
    }

    setArray(newArr);
    setCurrentStepIndex(0);
  };

  // Custom User Array Import Loader
  const handleLoadCustomArray = () => {
    if (!customInput.trim()) return;
    setIsPlaying(false);

    const parsed = customInput
      .replace(/[,;]/g, ' ')
      .trim()
      .split(/\s+/)
      .map(Number)
      .filter(val => !isNaN(val) && val >= 0);

    if (parsed.length < 5) {
      alert("Please specify at least 5 integers (comma or space separated) to visualize.");
      return;
    }
    if (parsed.length > 100) {
      alert("Input bounded at 100 integers to assure browser renderer viewport optimization.");
      return;
    }

    setArray(parsed);
    setArraySize(parsed.length);
    setCurrentStepIndex(0);
  };

  // Re-run the custom algorithm compiler explicitly
  const runCodeCompilation = () => {
    setIsPlaying(false);
    const customTrace = generateCustomSortTrace(array, languageCodes[selectedLanguage], selectedLanguage);
    setTrace(customTrace);
    setCurrentStepIndex(0);
  };

  // Fetch current visualization state properties
  const currentStep = trace[currentStepIndex];
  const renderedArray = currentStep ? currentStep.array : array;
  const comparingIndices = currentStep?.comparing || null;
  const isSwapping = currentStep?.swapping || false;
  const pivotIdx = currentStep?.pivotIndex;
  const sortedIndices = currentStep?.sortedIndices || new Set<number>();

  // Percentage complete calculation
  const progressPercent = trace.length > 0 ? Math.round((currentStepIndex / (trace.length - 1)) * 100) : 0;

  // Visual proportional height scaling calculator
  const maxVal = Math.max(...renderedArray, 1);
  const minVal = Math.min(...renderedArray, 0);
  const valueRange = maxVal - minVal || 1;

  // Compute code lines and currently active code highlights
  const activeCodeToFetchOrEdit = languageCodes[selectedLanguage];
  const codeLines = getCodeLines(activeAlgorithm, selectedLanguage, activeCodeToFetchOrEdit);
  const activeLineIdx = getActiveLineIndex(currentStep, activeAlgorithm, selectedLanguage);

  // Auto-scroll the code list to the highlighted line
  useEffect(() => {
    if (activeLineIdx >= 0 && codeLinesContainerRef.current) {
      const activeElement = codeLinesContainerRef.current.querySelector(`[data-line-index="${activeLineIdx}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeLineIdx]);

  // Load preset bubble sort based on chosen language
  const loadLanguageBubblePreset = () => {
    let presetCode = '';
    if (selectedLanguage === 'cpp') {
      presetCode = `void customSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (compare(j, j + 1)) {
                swap(j, j + 1);
            }
        }
    }
}`;
    } else if (selectedLanguage === 'java') {
      presetCode = `public static void customSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (compare(j, j + 1)) {
                swap(j, j + 1);
            }
        }
    }
}`;
    } else if (selectedLanguage === 'python') {
      presetCode = `def customSort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if compare(j, j + 1):
                swap(j, j + 1)`;
    } else {
      presetCode = `function customSort(arr, compare, swap) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (compare(j, j + 1)) {
        swap(j, j + 1);
      }
    }
  }
}`;
    }
    
    setLanguageCodes(prev => ({
      ...prev,
      [selectedLanguage]: presetCode
    }));
    setCompileStatus(null);
  };

  const getLanguageNiceName = (lang: 'cpp' | 'java' | 'python' | 'js') => {
    if (lang === 'cpp') return 'C++';
    if (lang === 'java') return 'Java';
    if (lang === 'python') return 'Python';
    return 'JavaScript';
  };

  return (
    <div className="space-y-4" id="sorting-arena-mainframe">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4" id="sorting-arena-root">
        {/* Simulation Arena Canvas */}
        <div className="xl:col-span-2 bg-[#161618] border border-gray-800 rounded p-4 flex flex-col justify-between min-h-[500px]" id="sorting-simulation-board">
          {/* Arena Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-3 mb-4" id="sorting-board-header">
            <div>
              <h3 className="font-sans text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                CP Target Run: {activeAlgorithm} Sort Sandbox
              </h3>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">ARRAY SIZE: {array.length} | ACTIVE STATE ENGINE MODE</p>
            </div>

            <div className="flex items-center gap-1" id="algorithm-selector-deck">
              {(['Bubble', 'Quick', 'Merge', 'Custom'] as const).map((algo) => (
                <button
                  key={algo}
                  id={`algo-btn-${algo}`}
                  onClick={() => {
                    setActiveAlgorithm(algo);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded font-semibold border transition-all cursor-pointer ${
                    activeAlgorithm === algo
                      ? 'bg-blue-600/15 border-blue-500/50 text-blue-400'
                      : 'bg-[#121214] border-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {algo}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting Array Visualizer Bars Container */}
          <div className="flex-1 flex items-end justify-center gap-0.5 sm:gap-1 px-4 py-6 bg-[#09090a] rounded min-h-[260px] border border-gray-800" id="bars-viewport">
            {renderedArray.map((value, idx) => {
              const isComparing = comparingIndices ? (comparingIndices[0] === idx || comparingIndices[1] === idx) : false;
              const isPivot = pivotIdx !== undefined && pivotIdx === idx;
              const isSorted = sortedIndices.has(idx);

              // Proportional visual height scaling calculation
              const barHeight = Math.floor(((value - minVal) / valueRange) * 220) + 35;

              let barColorClass = 'bg-blue-600/70 hover:bg-blue-500'; // Default state matching blueprint
              if (isSorted) {
                barColorClass = 'bg-[#183a2b] border border-green-500/50'; // Completed placement
              } else if (isComparing) {
                barColorClass = isSwapping ? 'bg-red-500/90 animate-pulse' : 'bg-yellow-500/90 animate-pulse'; // Swapping vs Comparing color codes
              } else if (isPivot) {
                barColorClass = 'bg-cyan-400'; // Target QuickSort pivot item
              }

              return (
                <div
                  key={idx}
                  id={`sorting-bar-${idx}`}
                  className={`w-full rounded-t-sm transition-all duration-75 relative group ${barColorClass}`}
                  style={{ height: `${barHeight}px` }}
                >
                  {/* Custom bar overlay tooltip for index and value inspections */}
                  <div className="absolute opacity-0 group-hover:opacity-100 bg-[#121214] text-[#e1e1e6] text-[9px] py-0.5 px-1.5 rounded -top-8 left-1/2 transform -translate-x-1/2 shadow-xl pointer-events-none transition-opacity border border-gray-800 font-mono z-20 whitespace-nowrap">
                    A[{idx}]: {value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Playback Deck Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 border-t border-gray-800 pt-3" id="simulation-playback-grid">
            <div className="flex items-center gap-1.5" id="play-action-deck">
              <button
                onClick={togglePlay}
                id="sort-play-btn"
                className={`p-2 rounded border flex items-center justify-center transition-all cursor-pointer ${
                  isPlaying 
                    ? 'bg-red-950/20 border-red-800 hover:border-red-500 text-red-400' 
                    : 'bg-green-950/20 border-green-800 hover:border-green-500 text-green-400'
                }`}
                title={isPlaying ? 'Pause Simulation' : 'Run Simulation'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-red-400" /> : <Play className="w-4 h-4 fill-green-400" />}
              </button>

              <button
                onClick={handleStepForward}
                id="sort-step-btn"
                disabled={currentStepIndex >= trace.length - 1}
                className="p-2 bg-[#1a1a1c] border border-gray-800 hover:border-gray-700 hover:bg-[#121214] active:bg-gray-800 text-gray-300 rounded transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Step Single Frame"
              >
                <StepForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                id="sort-reset-btn"
                className="p-2 bg-[#1a1a1c] border border-gray-800 hover:border-gray-700 hover:bg-[#121214] active:bg-gray-800 text-gray-300 rounded transition-all cursor-pointer"
                title="Reset State"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="h-4 w-[1px] bg-gray-800 mx-1" />

              <button
                onClick={() => generateNewDataset()}
                id="sort-shuffle-btn"
                className="px-2.5 py-2 bg-[#1a1a1c] border border-gray-800 hover:border-gray-500 hover:bg-blue-600/10 text-blue-400 rounded transition-all font-mono text-[10px] flex items-center gap-1.5 uppercase font-semibold cursor-pointer"
                title="Generate New DataSet"
              >
                <Shuffle className="w-3 h-3" />
                Shuffle
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4" id="configuration-deck">
              {/* Speed Delay Slider */}
              <div className="flex items-center gap-2" id="speed-slider-control">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-500 flex items-center gap-1">
                  <Sliders className="w-2.5 h-2.5" /> Delay: {playbackSpeed}ms
                </span>
                <input
                  type="range"
                  min="5"
                  max="800"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="w-20 md:w-24 h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Custom array dataset size slider */}
              <div className={`flex items-center gap-2 transition-opacity ${isPlaying ? 'opacity-40' : ''}`} id="size-slider-control">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-500 flex items-center gap-1">
                  <Settings2 className="w-2.5 h-2.5" /> Items: {arraySize}
                </span>
                <input
                  type="range"
                  min="15"
                  max="80"
                  value={arraySize}
                  disabled={isPlaying}
                  onChange={(e) => {
                    const size = Number(e.target.value);
                    setArraySize(size);
                    generateNewDataset(size);
                  }}
                  className={`w-20 md:w-24 h-1 bg-gray-800 rounded appearance-none accent-green-500 ${
                    isPlaying ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Diagnostics Terminal Column with Code Tracer Split */}
        <div className="flex flex-col gap-4" id="sorting-diagnostics-column">
          {/* Dedicated Code Highlight Panel & Stdout Consolidation */}
          <div className="bg-[#09090a] border border-gray-800 rounded p-4 flex flex-col h-[460px]" id="cpp-terminal-panel">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <Terminal className="text-cyan-400 w-3.5 h-3.5 animate-pulse" />
                <span className="font-mono text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                  {getLanguageNiceName(selectedLanguage)} Trace Engine
                </span>
              </div>
              
              {/* Mini Language Switcher */}
              <div className="flex items-center gap-1.5" id="tracer-language-selector">
                {(['cpp', 'java', 'python', 'js'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-1.5 py-0.5 text-[9.5px] font-mono rounded font-bold uppercase border transition-all cursor-pointer ${
                      selectedLanguage === lang
                        ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                        : 'bg-[#121214] border-gray-850 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : lang === 'python' ? 'Py' : 'JS'}
                  </button>
                ))}
              </div>
            </div>

            {/* upper block: Code visual framework */}
            <div className="h-[210px] border-b border-gray-900 overflow-y-auto mb-2 pr-1" ref={codeLinesContainerRef}>
              <div className="text-[9px] uppercase font-mono font-bold text-gray-500 mb-1 flex items-center justify-between select-none">
                <span className="flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-blue-400" />
                  <span>Instruction Pointer ({getLanguageNiceName(selectedLanguage)})</span>
                </span>
                <span className="text-[8px] text-gray-600">L:{activeLineIdx + 1 || '-'}</span>
              </div>
              <div className="font-mono text-[11px] bg-[#121214]/80 p-2.5 rounded border border-gray-900 select-none space-y-1">
                {codeLines.map((lineText, index) => {
                  const isActive = index === activeLineIdx;
                  return (
                    <div 
                      key={index} 
                      data-line-index={index}
                      className={`flex gap-3 px-1.5 py-0.5 rounded transition-all ${
                        isActive 
                          ? 'bg-blue-600/25 text-white font-bold border-l-2 border-blue-500 pl-2 shadow-[inset_0_0_8px_rgba(37,99,235,0.15)]' 
                          : 'text-gray-505 hover:text-gray-400'
                      }`}
                    >
                      <span className={`w-5 shrink-0 text-right text-[10px] font-bold ${isActive ? 'text-blue-400' : 'text-gray-700'}`}>
                        {index + 1}
                      </span>
                      <pre className="whitespace-pre overflow-x-auto select-text font-mono leading-tight">{lineText}</pre>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lower block: Stdout Log Stream */}
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="text-[9px] uppercase font-mono font-bold text-gray-500 mb-1 flex items-center justify-between select-none">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-[#183a2b]" />
                  <span>{getLanguageNiceName(selectedLanguage)} STDOUT Feed</span>
                </span>
                {/* Auto Scroll Checkbox */}
                <label className="flex items-center gap-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoScroll}
                    onChange={(e) => setAutoScroll(e.target.checked)}
                    className="w-2.5 h-2.5 accent-blue-550 rounded bg-[#09090a] border-gray-800 cursor-pointer"
                  />
                  <span className="text-[8px] font-mono font-bold text-gray-500">AUTO-SCROLL</span>
                </label>
              </div>
              <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-1.5 p-2 bg-[#121214]/65 rounded border border-gray-900 leading-relaxed scrollbar-thin select-text text-gray-450" id="stdout-screen">
                {trace.slice(0, currentStepIndex + 1).map((step, idx) => (
                  <div key={idx} className="flex gap-1.5 text-gray-450 items-start hover:text-[#e1e1e6] transition-colors">
                    <ChevronRight className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                    <p>
                      <span className="text-gray-650 select-none font-bold">[{idx.toString().padStart(3, '0')}]</span>{' '}
                      {step.log}
                    </p>
                  </div>
                ))}
                {/* Smooth auto-scrolling buffer target */}
                <div className="h-0.5 mt-2" ref={terminalEndRef} />
              </div>
            </div>

          </div>

          {/* Algorithm Analytics Panel */}
          <div className="bg-[#161618] border border-gray-800 rounded p-4" id="algo-analytics-panel">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3 border-b border-gray-800 pb-1.5">
              Sorting Workspace Metrics
            </h4>

            <div className="grid grid-cols-2 gap-3" id="metrics-grid">
              <div className="bg-[#09090a] p-2.5 rounded border border-gray-800">
                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-500 font-bold">Step Cycle</span>
                <p className="font-mono text-base text-blue-400 font-bold mt-0.5">
                  {currentStepIndex} <span className="text-[10px] text-gray-500 font-normal">/ {trace.length - 1}</span>
                </p>
              </div>

              <div className="bg-[#09090a] p-2.5 rounded border border-gray-800">
                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-500 font-bold">Status Completeness</span>
                <p className="font-mono text-base text-green-400 font-bold mt-0.5">
                  {progressPercent}% <span className="text-[10px] text-gray-500 font-normal">done</span>
                </p>
              </div>

              <div className="bg-[#09090a] p-2.5 rounded border border-gray-800">
                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-500 font-bold">Avg Complexity</span>
                <p className="font-mono text-xs text-gray-300 font-bold mt-1">
                  {activeAlgorithm === 'Bubble' && <span>O(N²)</span>}
                  {activeAlgorithm === 'Quick' && <span>O(N log N)</span>}
                  {activeAlgorithm === 'Merge' && <span>O(N log N)</span>}
                  {activeAlgorithm === 'Custom' && <span>Script limits</span>}
                </p>
              </div>

              <div className="bg-[#09090a] p-2.5 rounded border border-gray-800">
                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-500 font-bold">Aux Space</span>
                <p className="font-mono text-xs text-gray-300 font-bold mt-1">
                  {activeAlgorithm === 'Bubble' && <span className="text-gray-400">O(1)</span>}
                  {activeAlgorithm === 'Quick' && <span className="text-cyan-400">O(log N)</span>}
                  {activeAlgorithm === 'Merge' && <span className="text-green-400">O(N)</span>}
                  {activeAlgorithm === 'Custom' && <span className="text-violet-400">O(1) stack</span>}
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1c] border border-gray-800 p-2.5 rounded mt-3" id="sorting-insights-tip">
              <h5 className="font-mono font-bold text-[10px] text-blue-400 flex items-center gap-1.5">
                <Info className="w-3 h-3 shrink-0" />
                Line Instruction Mapping
              </h5>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed font-mono">
                Decoupled assembler tracking. Standard comparisons and custom operations trigger line adjustments in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COMPETITIVE PROGRAMMING DEVELOPER SUITE */}
      <div className="bg-[#161618] border border-gray-800 rounded p-5 space-y-4" id="cp-developer-suite">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="text-blue-500 w-5 h-5 animate-pulse" />
            <div>
              <h3 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Customization</h3>
              <p className="text-[10px] text-gray-500 font-mono">STRESS TESTERS | INTERACTIVE CUSTOM SCRIPT COMPILERS</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-600/10 border border-blue-500/30 text-blue-400 font-mono text-[9px] font-bold rounded uppercase">
              {getLanguageNiceName(selectedLanguage)} Engine Mode Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* COLUMN 1: CUSTOM TESTCASE GENERATOR */}
          <div className="space-y-4 pr-0 lg:pr-4 border-r-0 lg:border-r border-gray-800/60 flex flex-col justify-between" id="cp-testcases-studio">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-gray-300 font-mono text-[11px] font-bold uppercase">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Testcase Studio</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Feed extreme CP datasets to expose sub-optimal asymptotic behavior or divide-and-conquer overflows.
              </p>

              {/* Preset buttons */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Pre-configured Cases</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => applyPreset('worst')}
                    className="flex items-center justify-start gap-1 py-1 px-2 text-[10px] font-mono bg-[#09090a] hover:bg-red-950/15 border border-gray-800 hover:border-red-500/50 text-gray-300 hover:text-red-400 rounded transition-all cursor-pointer text-left"
                    title="Reverse sorted array"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block mr-1" />
                    Worst Cascade
                  </button>
                  <button
                    onClick={() => applyPreset('sorted')}
                    className="flex items-center justify-start gap-1 py-1 px-2 text-[10px] font-mono bg-[#09090a] hover:bg-green-950/20 border border-gray-800 hover:border-green-500/50 text-gray-300 hover:text-green-400 rounded transition-all cursor-pointer text-left"
                    title="Already sorted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-1" />
                    Sorted Best
                  </button>
                  <button
                    onClick={() => applyPreset('duplicates')}
                    className="flex items-center justify-start gap-1 py-1 px-2 text-[10px] font-mono bg-[#09090a] hover:bg-[#121214] border border-gray-800 hover:border-blue-500/50 text-gray-300 hover:text-blue-400 rounded transition-all cursor-pointer text-left"
                    title="Extreme multi-duplicates"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block mr-1" />
                    Many Duplicates
                  </button>
                  <button
                    onClick={() => applyPreset('binary')}
                    className="flex items-center justify-start gap-1 py-1 px-2 text-[10px] font-mono bg-[#09090a] hover:bg-[#121214] border border-gray-800 hover:border-cyan-500/50 text-gray-300 hover:text-cyan-400 rounded transition-all cursor-pointer text-left"
                    title="Binary array representation"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block mr-1" />
                    Binary States
                  </button>
                  <button
                    onClick={() => applyPreset('oscillating')}
                    className="col-span-2 flex items-center justify-start gap-1 py-1 px-2 text-[10px] font-mono bg-[#09090a] hover:bg-[#121214] border border-gray-800 hover:border-violet-500/50 text-gray-400 hover:text-violet-400 rounded transition-all cursor-pointer text-left"
                  >
                    <Sliders className="w-3 h-3 text-violet-400 mr-0.5" />
                    Oscillating Spikes
                  </button>
                </div>
              </div>
            </div>

            {/* Custom array text-box loading */}
            <div className="space-y-1.5 pt-2 border-t border-gray-800/80">
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Custom Space-Separated Integers</span>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="e.g. 100 42 10000000 5 15 42"
                  className="flex-1 bg-[#09090a] border border-gray-850 focus:border-blue-500 text-gray-200 font-mono text-xs rounded px-2.5 py-1.5 outline-none placeholder-gray-650"
                />
                <button
                  onClick={handleLoadCustomArray}
                  className="px-2.5 py-1.5 bg-[#121214] hover:bg-blue-600 border border-gray-850 hover:border-blue-500 text-gray-400 hover:text-white font-mono text-[11px] font-semibold rounded uppercase tracking-wider transition-all cursor-pointer"
                >
                  Load
                </button>
              </div>
            </div>
          </div>

          {/* CODES AND CUSTOM ALGORITHM WRITER - Spans remaining 2 Column Spaces explicitly */}
          <div className="lg:col-span-2 space-y-4 flex flex-col justify-between" id="custom-algo-sandbox-container">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-300 font-mono text-[11px] font-bold uppercase">
                  <Code2 className="w-3.5 h-3.5 text-violet-400" />
                  <span>Custom Sort Script Engine ({getLanguageNiceName(selectedLanguage)} API)</span>
                </div>
                <div className="flex items-center gap-1.5" id="editor-language-control">
                  {(['cpp', 'java', 'python', 'js'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-1.5 py-0.5 text-[9px] font-mono rounded font-bold uppercase border transition-all cursor-pointer ${
                        selectedLanguage === lang
                          ? 'bg-violet-600/25 border-violet-500/50 text-violet-400'
                          : 'bg-[#121214] border-gray-850 text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : lang === 'python' ? 'Python' : 'JS'}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Implement your own custom sorting routine in <span className="text-violet-400 font-bold">{getLanguageNiceName(selectedLanguage)}</span>! Run loops, compare elements, and swap items dynamically using our safe instrumented engine.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Code Editor block */}
                <div className="md:col-span-2 flex flex-col gap-1">
                  <textarea
                    value={languageCodes[selectedLanguage]}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLanguageCodes(prev => ({
                        ...prev,
                        [selectedLanguage]: val
                      }));
                    }}
                    className="w-full h-[180px] bg-[#09090a] border border-gray-850 focus:border-violet-500 text-gray-200 font-mono text-[11px] rounded p-2.5 outline-none resize-none leading-normal shadow-inner"
                    spellCheck="false"
                  />
                </div>

                {/* API Information documentation details */}
                <div className="bg-[#121214]/55 border border-gray-800 rounded p-3 font-mono text-[10px] space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Available Sandbox APIs</span>
                    <div className="space-y-2">
                      <div>
                        <code className="text-violet-400 font-bold block">compare(i, j)</code>
                        <span className="text-gray-500 block leading-tight text-[9px]">Compares items at indices i & j. Visualizes and returns true if A[i] &gt; A[j].</span>
                      </div>
                      <div>
                        <code className="text-cyan-400 font-bold block">swap(i, j)</code>
                        <span className="text-gray-500 block leading-tight text-[9px]">Exchanges values at indices i and j. Records current step frame dynamically.</span>
                      </div>
                      <div>
                        <code className="text-emerald-400 font-bold block">
                          {selectedLanguage === 'python' ? 'len(arr)' : 'arr.length'}
                        </code>
                        <span className="text-gray-500 block leading-tight text-[9px]">Returns active dataset array size safely.</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-850 pt-1.5 text-gray-600 block text-[8px] leading-relaxed">
                    Note: Define <code className="text-violet-400">customSort</code> signature to compile and simulate.
                  </div>
                </div>
              </div>
            </div>

            {/* Controls bottom block */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-800/80">
              <div className="flex-1 flex gap-2">
                <button
                  onClick={runCodeCompilation}
                  className="flex-1 py-2 px-3 bg-violet-600/10 hover:bg-violet-650/40 border border-violet-500/40 hover:border-violet-500 text-violet-400 hover:text-white font-mono text-[10px] font-bold rounded uppercase tracking-wider cursor-pointer text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-violet-400" />
                  Compile & Run {getLanguageNiceName(selectedLanguage)}
                </button>
                <button
                  onClick={loadLanguageBubblePreset}
                  className="py-2 px-3 bg-[#1a1a1c] hover:bg-[#121214] border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-gray-200 font-mono text-[10px] font-bold rounded uppercase cursor-pointer transition-all"
                >
                  Load Bubble Boilerplate
                </button>
              </div>

              {compileStatus && (
                <div className={`px-2.5 py-1.5 rounded font-mono text-[9px] font-bold border max-w-[200px] truncate ${
                  compileStatus.success 
                    ? 'bg-green-600/10 border-green-500/30 text-green-400' 
                    : 'bg-red-650/10 border-red-500/30 text-red-400'
                }`}>
                  {compileStatus.success ? "COMPILATION SUCCESS" : "COMP ERROR"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
