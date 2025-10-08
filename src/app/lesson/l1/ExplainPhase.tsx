'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { L1Content } from '@/lib/content/l1-content';

export default function ExplainPhase({ onComplete }: { onComplete: () => void }) {
  const [currentSection, setCurrentSection] = useState<'bigIdea' | 'example1' | 'example2' | 'summary'>('bigIdea');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Phase Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold text-lg mb-4">
          💡 EXPLAIN: Learn the Formula!
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {L1Content.explain.title}
        </h2>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex gap-2">
          {[
            { id: 'bigIdea', label: '📐 Formula', color: 'from-pink-500 to-red-500' },
            { id: 'example1', label: '📝 Example 1', color: 'from-red-500 to-orange-500' },
            { id: 'example2', label: '⚠️ Example 2', color: 'from-orange-500 to-amber-500' },
            { id: 'summary', label: '📋 Summary', color: 'from-amber-500 to-yellow-500' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id as any)}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                currentSection === section.id
                  ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentSection === 'bigIdea' && <BigIdeaSection key="bigIdea" onNext={() => setCurrentSection('example1')} />}
        {currentSection === 'example1' && <Example1Section key="example1" onNext={() => setCurrentSection('example2')} />}
        {currentSection === 'example2' && <Example2Section key="example2" onNext={() => setCurrentSection('summary')} />}
        {currentSection === 'summary' && <SummarySection key="summary" onComplete={onComplete} />}
      </AnimatePresence>
    </motion.div>
  );
}

// Big Idea Section
function BigIdeaSection({ onNext }: { onNext: () => void }) {
  const bigIdea = L1Content.explain.bigIdea;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl p-12 shadow-2xl">
        <h3 className="text-3xl font-bold mb-6 text-center">{bigIdea.title}</h3>

        <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
          <div className="font-mono text-5xl font-bold text-center text-white mb-8">
            {bigIdea.formula}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">a</div>
            <p className="text-white/90">{bigIdea.meaning.a}</p>
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="text-sm text-white/70">If a &gt; 0: opens ↑</div>
              <div className="text-sm text-white/70">If a &lt; 0: opens ↓</div>
              <div className="text-sm text-white/70">Larger |a|: narrower</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">h</div>
            <p className="text-white/90">{bigIdea.meaning.h}</p>
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="text-sm text-white/70 font-semibold">⚠️ Watch the sign!</div>
              <div className="text-sm text-white/70">(x - 3) → h = 3</div>
              <div className="text-sm text-white/70">(x + 3) → h = -3</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <div className="text-3xl font-bold mb-2">k</div>
            <p className="text-white/90">{bigIdea.meaning.k}</p>
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="text-sm text-white/70">Positive k: up</div>
              <div className="text-sm text-white/70">Negative k: down</div>
              <div className="text-sm text-white/70">k = height of vertex</div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-400/20 backdrop-blur rounded-xl p-6 border-2 border-yellow-300/50">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <div className="font-bold text-xl mb-2">Key Point:</div>
              <div className="text-lg">{bigIdea.meaning.vertex}</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
      >
        See Worked Example 1 →
      </button>
    </motion.div>
  );
}

// Example 1 Section
function Example1Section({ onNext }: { onNext: () => void }) {
  const example = L1Content.explain.workedExample1;
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < example.solution.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{example.title}</h3>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-500 mb-8">
          <div className="font-mono text-2xl font-bold text-gray-900">
            {example.problem}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {example.solution.length}</span>
            <span>{Math.round(((currentStep + 1) / example.solution.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / example.solution.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {example.solution.slice(0, currentStep + 1).map((step: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx === currentStep ? 0 : 0 }}
              className={`p-6 rounded-xl border-2 ${
                idx === currentStep
                  ? 'bg-red-50 border-red-500'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  idx === currentStep
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-2">{step.question}</div>
                  {step.work && (
                    <div className="bg-white rounded-lg p-3 mb-2 font-mono text-sm border border-gray-200">
                      {step.work}
                    </div>
                  )}
                  <div className="text-lg font-bold text-red-600 mb-2">
                    ➜ {step.answer}
                  </div>
                  <div className="text-sm text-gray-600">
                    💡 {step.meaning}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          {currentStep < example.solution.length - 1 ? 'Next Step →' : 'See Example 2 (Tricky Signs!) →'}
        </button>
      </div>
    </motion.div>
  );
}

// Example 2 Section
function Example2Section({ onNext }: { onNext: () => void }) {
  const example = L1Content.explain.workedExample2;
  const [showMistake, setShowMistake] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (!showMistake) {
      setShowMistake(true);
    } else if (currentStep < example.solution.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">⚠️</span>
          <h3 className="text-2xl font-bold text-gray-900">{example.title}</h3>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border-l-4 border-orange-500 mb-8">
          <div className="font-mono text-2xl font-bold text-gray-900">
            {example.problem}
          </div>
        </div>

        {/* Common Mistake Warning */}
        {showMistake && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 rounded-xl p-6 border-2 border-red-300 mb-6"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">❌</span>
              <div>
                <div className="font-bold text-red-900 mb-2">Common Mistake:</div>
                <div className="text-red-800 mb-2">{example.commonMistake.mistake}</div>
                <div className="text-red-700 text-sm">
                  <span className="font-semibold">Why this happens:</span> {example.commonMistake.why}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Correct Solution */}
        {showMistake && (
          <div className="space-y-4">
            <div className="font-semibold text-lg text-gray-900 mb-4">✓ Correct Solution:</div>

            {example.solution.slice(0, currentStep + 1).map((step: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-xl border-2 ${
                  idx === currentStep
                    ? 'bg-green-50 border-green-500'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    idx === currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-2">{step.step}</div>
                    {step.work && (
                      <div className="bg-white rounded-lg p-3 mb-2 font-mono border border-gray-200">
                        {step.work}
                      </div>
                    )}
                    {step.explanation && (
                      <div className="text-sm text-gray-600 mb-2">
                        {step.explanation}
                      </div>
                    )}
                    {step.answer && (
                      <div className="text-lg font-bold text-green-600">
                        ➜ {step.answer}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {currentStep === example.solution.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500"
              >
                <div className="text-blue-900">
                  <span className="font-bold">✓ Check Yourself:</span> {example.checkYourself}
                </div>
              </motion.div>
            )}
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          {!showMistake
            ? 'See Common Mistake →'
            : currentStep < example.solution.length - 1
            ? 'Next Step →'
            : 'View Features Summary →'}
        </button>
      </div>
    </motion.div>
  );
}

// Summary Section
function SummarySection({ onComplete }: { onComplete: () => void }) {
  const features = L1Content.explain.keyFeatures;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {features.title}
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {features.features.map((feature: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h4>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-700">Definition:</span>
                  <p className="text-gray-600">{feature.definition}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">How to find:</span>
                  <p className="text-gray-600 font-mono text-sm">{feature.howToFind}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-300">
          <div className="text-center mb-6">
            <div className="text-3xl mb-3">🎓</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              You've Learned the Formula!
            </div>
            <p className="text-gray-600">
              Now let's practice using it with real problems.
            </p>
          </div>

          <button
            onClick={onComplete}
            className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-lg"
          >
            ✓ Complete Explain Phase → Start Practice
          </button>
        </div>
      </div>
    </motion.div>
  );
}
