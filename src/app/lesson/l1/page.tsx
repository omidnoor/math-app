'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { L1Content } from '@/lib/content/l1-content';

type Phase = 'engage' | 'explore' | 'explain' | 'elaborate' | 'evaluate';

export default function Lesson1() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('engage');
  const [currentActivity, setCurrentActivity] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const phases: { id: Phase; title: string; color: string }[] = [
    { id: 'engage', title: '🎬 Engage', color: 'from-indigo-500 to-purple-500' },
    { id: 'explore', title: '🔍 Explore', color: 'from-purple-500 to-pink-500' },
    { id: 'explain', title: '💡 Explain', color: 'from-pink-500 to-red-500' },
    { id: 'elaborate', title: '🎯 Practice', color: 'from-red-500 to-orange-500' },
    { id: 'evaluate', title: '✅ Check', color: 'from-orange-500 to-yellow-500' },
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === currentPhase);
  const currentPhaseData = phases[currentPhaseIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              ← Back to Home
            </Link>
            <div className="text-sm text-gray-600">
              ⏱ 35-45 minutes • Lesson 1 of 9
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {L1Content.title}
          </h1>

          {/* Progress Phases */}
          <div className="flex gap-2">
            {phases.map((phase, idx) => (
              <div
                key={phase.id}
                className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                  idx < currentPhaseIndex
                    ? 'bg-gradient-to-r from-green-400 to-green-500'
                    : idx === currentPhaseIndex
                    ? `bg-gradient-to-r ${currentPhaseData.color}`
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between mt-2">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id)}
                className={`text-xs font-medium transition-colors ${
                  currentPhase === phase.id
                    ? 'text-indigo-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {phase.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {currentPhase === 'engage' && (
            <EngagePhase
              key="engage"
              onComplete={() => setCurrentPhase('explore')}
            />
          )}

          {currentPhase === 'explore' && (
            <ExplorePhase
              key="explore"
              onComplete={() => setCurrentPhase('explain')}
            />
          )}

          {currentPhase === 'explain' && (
            <ExplainPhase
              key="explain"
              onComplete={() => setCurrentPhase('elaborate')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ========== ENGAGE PHASE ==========
function EngagePhase({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);

  const phenomenon = L1Content.engage.phenomenon;
  const questions = phenomenon.questions;

  const handleSubmit = () => {
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setStudentAnswer('');
      setAnswered(false);
      setShowHint(false);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Phase Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-bold text-lg mb-4">
          🎬 ENGAGE: See It In Action!
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {phenomenon.title}
        </h2>
        <p className="text-xl text-gray-600">
          {phenomenon.description}
        </p>
      </div>

      {/* Video/Animation Placeholder */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-12 text-center shadow-2xl">
        <div className="bg-white/10 backdrop-blur rounded-xl p-16 mb-6">
          <div className="text-white/80 text-lg mb-4">
            🏀 [Basketball Shot Animation]
          </div>
          <div className="text-white/60 text-sm">
            Watch the ball arc through the air...
          </div>
        </div>
        <p className="text-white text-lg font-medium">
          💡 {phenomenon.guidance}
        </p>
      </div>

      {/* Guiding Questions */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <div className="text-sm text-gray-500">
              {currentQuestion + 1}/{questions.length}
            </div>
          </div>

          <div className="h-1 bg-gray-200 rounded-full mb-6">
            <div
              className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 rounded-xl p-6 border-l-4 border-indigo-500">
            <p className="text-lg font-medium text-gray-900">
              {questions[currentQuestion].prompt}
            </p>
          </div>

          <textarea
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all min-h-[120px] text-gray-900"
            disabled={answered}
          />

          {!answered && (
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={!studentAnswer.trim()}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                Submit Answer
              </button>

              <button
                onClick={() => setShowHint(!showHint)}
                className="px-6 py-4 bg-yellow-100 text-yellow-700 rounded-xl font-semibold hover:bg-yellow-200 transition-all"
              >
                💡 {showHint ? 'Hide' : 'Show'} Hint
              </button>
            </div>
          )}

          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-400"
            >
              <p className="text-yellow-900">
                <span className="font-semibold">💡 Hint:</span> {questions[currentQuestion].hint}
              </p>
            </motion.div>
          )}

          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <p className="text-green-900 mb-2">
                  <span className="font-bold">✓ Great thinking!</span>
                </p>
                <p className="text-green-800">
                  <span className="font-semibold">Expected answer:</span> {questions[currentQuestion].expectedAnswer}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question →' : '✓ Complete Engage Phase'}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Transition Message */}
      {currentQuestion === questions.length - 1 && answered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-8 text-center shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-3">
            {phenomenon.transition}
          </h3>
          <p className="text-lg opacity-90">
            Ready to explore? Click "Complete Engage Phase" above to continue!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ========== EXPLORE PHASE (Placeholder) ==========
function ExplorePhase({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-20"
    >
      <h2 className="text-4xl font-bold mb-4">🔍 EXPLORE Phase</h2>
      <p className="text-gray-600 mb-8">Interactive graph activities coming next...</p>
      <button
        onClick={onComplete}
        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold"
      >
        Continue to Explain
      </button>
    </motion.div>
  );
}

// ========== EXPLAIN PHASE (Placeholder) ==========
function ExplainPhase({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-20"
    >
      <h2 className="text-4xl font-bold mb-4">💡 EXPLAIN Phase</h2>
      <p className="text-gray-600 mb-8">Worked examples and formulas coming next...</p>
      <button
        onClick={onComplete}
        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-semibold"
      >
        Continue to Practice
      </button>
    </motion.div>
  );
}
