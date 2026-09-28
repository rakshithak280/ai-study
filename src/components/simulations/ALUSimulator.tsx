import React, { useState } from 'react';
import { Cpu, HelpCircle, Binary, ArrowRight } from 'lucide-react';

export const ALUSimulator: React.FC = () => {
  const [inputA, setInputA] = useState<number[]>([0, 1, 0, 1]); // 5 in 4-bit [A3, A2, A1, A0]
  const [inputB, setInputB] = useState<number[]>([0, 0, 1, 1]); // 3 in 4-bit [B3, B2, B1, B0]
  const [carryIn, setCarryIn] = useState<number>(0);
  const [operation, setOperation] = useState<'ADD' | 'SUB' | 'AND' | 'OR' | 'XOR' | 'NOT' | 'SHL' | 'SHR'>('ADD');

  // Helper conversions
  const bitsToNum = (bits: number[]) => {
    return (bits[0] << 3) | (bits[1] << 2) | (bits[2] << 1) | bits[3];
  };

  const numToBits = (val: number): number[] => {
    const clamped = (val & 0xf);
    return [
      (clamped >> 3) & 1,
      (clamped >> 2) & 1,
      (clamped >> 1) & 1,
      clamped & 1
    ];
  };

  const toggleBitA = (index: number) => {
    const updated = [...inputA];
    updated[index] = updated[index] === 1 ? 0 : 1;
    setInputA(updated);
  };

  const toggleBitB = (index: number) => {
    const updated = [...inputB];
    updated[index] = updated[index] === 1 ? 0 : 1;
    setInputB(updated);
  };

  const valA = bitsToNum(inputA);
  const valB = bitsToNum(inputB);

  // Compute ALU Result & Flags
  let rawResult = 0;
  let carryOut = 0;
  let overflow = 0;

  switch (operation) {
    case 'ADD': {
      const sum = valA + valB + carryIn;
      rawResult = sum & 0xf;
      carryOut = sum > 15 ? 1 : 0;
      // 2's complement overflow
      const aSign = inputA[0];
      const bSign = inputB[0];
      const resSign = (rawResult >> 3) & 1;
      overflow = (aSign === bSign && aSign !== resSign) ? 1 : 0;
      break;
    }
    case 'SUB': {
      const diff = valA - valB - carryIn;
      rawResult = (diff + 16) & 0xf;
      carryOut = valA >= (valB + carryIn) ? 1 : 0; // Inverted borrow
      const aSign = inputA[0];
      const bSign = inputB[0];
      const resSign = (rawResult >> 3) & 1;
      overflow = (aSign !== bSign && aSign !== resSign) ? 1 : 0;
      break;
    }
    case 'AND':
      rawResult = valA & valB;
      break;
    case 'OR':
      rawResult = valA | valB;
      break;
    case 'XOR':
      rawResult = valA ^ valB;
      break;
    case 'NOT':
      rawResult = (~valA) & 0xf;
      break;
    case 'SHL':
      rawResult = (valA << 1) & 0xf;
      carryOut = (valA >> 3) & 1;
      break;
    case 'SHR':
      rawResult = (valA >> 1) & 0xf;
      carryOut = valA & 1;
      break;
  }

  const resultBits = numToBits(rawResult);
  const zeroFlag = rawResult === 0 ? 1 : 0;
  const negativeFlag = resultBits[0]; // Sign bit in 2's complement

  // 2's complement signed value calculation
  const signedValA = valA > 7 ? valA - 16 : valA;
  const signedValB = valB > 7 ? valB - 16 : valB;
  const signedResult = rawResult > 7 ? rawResult - 16 : rawResult;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Silicon & Microarchitecture Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>4-Bit Combinational ALU</span>
            <span aria-hidden="true">·</span>
            <span>Logic Gate Synthesis</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mt-1">Arithmetic Logic Unit (ALU) & Digital Logic Explorer</h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>No Software OS: Pure Transistor Gates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Inputs & Opcode */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Input Register A */}
          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Register A (4-Bit Input)
              </span>
              <span className="text-xs font-mono text-slate-400">
                Dec: <strong className="text-cyan-300">{valA}</strong> (Signed: {signedValA})
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {inputA.map((bit, idx) => (
                <button
                  key={`a-${idx}`}
                  onClick={() => toggleBitA(idx)}
                  className={`py-3 rounded-lg flex flex-col items-center justify-center border font-mono font-bold transition-all ${
                    bit === 1
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 shadow-sm shadow-cyan-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl">{bit}</span>
                  <span className="text-[10px] font-normal text-slate-400 mt-0.5">A{3 - idx}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Operation Selector */}
          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              ALU Opcode (Function Select)
            </span>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
              {(['ADD', 'SUB', 'AND', 'OR', 'XOR', 'NOT', 'SHL', 'SHR'] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => setOperation(op)}
                  className={`py-2 px-1 rounded-md font-semibold transition-colors ${
                    operation === op
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>

            {/* Carry In bit toggle for arithmetic */}
            {(operation === 'ADD' || operation === 'SUB') && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Carry In Bit (C_in)</span>
                <button
                  onClick={() => setCarryIn(carryIn === 1 ? 0 : 1)}
                  className={`px-3 py-1 font-mono font-bold rounded border transition-colors ${
                    carryIn === 1 ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  {carryIn}
                </button>
              </div>
            )}
          </div>

          {/* Input Register B */}
          {operation !== 'NOT' && operation !== 'SHL' && operation !== 'SHR' && (
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Register B (4-Bit Input)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Dec: <strong className="text-amber-300">{valB}</strong> (Signed: {signedValB})
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {inputB.map((bit, idx) => (
                  <button
                    key={`b-${idx}`}
                    onClick={() => toggleBitB(idx)}
                    className={`py-3 rounded-lg flex flex-col items-center justify-center border font-mono font-bold transition-all ${
                      bit === 1
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm shadow-amber-500/10'
                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xl">{bit}</span>
                    <span className="text-[10px] font-normal text-slate-400 mt-0.5">B{3 - idx}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: ALU Processing Schematic & Results */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Results Display */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-lg">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-3">
              ALU Output Bus (Y = A {operation} B)
            </span>

            {/* Large 4-bit display */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {resultBits.map((bit, idx) => (
                <div
                  key={`res-${idx}`}
                  className="bg-emerald-950/30 border border-emerald-500/40 rounded-lg p-3 text-center"
                >
                  <span className="text-3xl font-mono font-bold text-emerald-300 block">{bit}</span>
                  <span className="text-[10px] text-emerald-500 font-mono">Y{3 - idx}</span>
                </div>
              ))}
            </div>

            {/* Numerical breakdown */}
            <div className="grid grid-cols-3 gap-3 bg-slate-900/60 border border-slate-800/80 p-3 rounded-lg text-center font-mono">
              <div>
                <span className="text-[11px] text-slate-500 block">Unsigned Dec</span>
                <span className="text-lg font-bold text-slate-200">{rawResult}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Signed (2s Comp)</span>
                <span className="text-lg font-bold text-slate-200">{signedResult}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Hexadecimal</span>
                <span className="text-lg font-bold text-emerald-400">0x{rawResult.toString(16).toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Status Flags (Status Register / NZCV) */}
          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
              Processor Condition Status Flags (NZCV)
            </span>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className={`p-2.5 rounded-lg border ${zeroFlag ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <span className="text-xs font-bold block">Z (Zero)</span>
                <span className="text-lg font-mono font-bold">{zeroFlag}</span>
                <span className="text-[10px] block mt-0.5">{zeroFlag ? 'Result is 0' : 'Non-zero'}</span>
              </div>

              <div className={`p-2.5 rounded-lg border ${carryOut ? 'bg-amber-950/40 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <span className="text-xs font-bold block">C (Carry)</span>
                <span className="text-lg font-mono font-bold">{carryOut}</span>
                <span className="text-[10px] block mt-0.5">{carryOut ? 'Carry out > 15' : 'No carry'}</span>
              </div>

              <div className={`p-2.5 rounded-lg border ${negativeFlag ? 'bg-purple-950/40 border-purple-500 text-purple-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <span className="text-xs font-bold block">N (Negative)</span>
                <span className="text-lg font-mono font-bold">{negativeFlag}</span>
                <span className="text-[10px] block mt-0.5">{negativeFlag ? 'MSB is 1' : 'Positive'}</span>
              </div>

              <div className={`p-2.5 rounded-lg border ${overflow ? 'bg-rose-950/40 border-rose-500 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <span className="text-xs font-bold block">V (Overflow)</span>
                <span className="text-lg font-mono font-bold">{overflow}</span>
                <span className="text-[10px] block mt-0.5">{overflow ? 'Signed overflow' : 'Valid'}</span>
              </div>
            </div>
          </div>

          {/* Cross-Branch Intuition Box */}
          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-lg text-xs leading-relaxed text-slate-300">
            <span className="text-slate-200 font-semibold flex items-center gap-1.5 mb-1 text-cyan-400">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>How Mechanical & Civil Engineers Can Understand This</span>
            </span>
            An ALU is not code or magic. It is literally a bank of microscopic water valves (MOSFET transistors).
            When electrical pressure (Voltage) is applied, high-impedance channels conduct or pinch off.
            In <strong>ADD</strong> mode, four cascading 1-bit Full Adders propagate carries like mechanical odometer gears advancing from 9 to 0!
          </div>
        </div>
      </div>
    </div>
  );
};
