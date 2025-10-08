'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveParabola from '@/components/InteractiveParabola';
import { L1Content } from '@/lib/content/l1-content';

export default function ExplorePhase({ onComplete }: { onComplete: () => void }) {
  const [currentActivity, setCurrentActivity] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [params, setParams] = useState({ a: 1, h: 0, k: 0 });
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);

  const activities = [
    L1Content.explore.activity1,
    L1Content.explore.activity2,
    L1Content.explore.activity3
  ];

  const currentActivityData = activities[currentActivity - 1];
  const currentQuestionData = currentActivityData.guidedQuestions[currentQuestion];

  const handleNextQuestion = () => {
    if (currentQuestion < currentActivityData.guidedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Move to checkpoint
      setCurrentQuestion(currentActivityData.guidedQuestions.length);
    }
  };

  const handleCheckpointSubmit = () => {
    setCheckpointSubmitted(true);
  };

  const handleNextActivity = () => {
    if (currentActivity < 3) {
      setCurrentActivity(currentActivity + 1);
      setCurrentQuestion(0);
      setCheckpointAnswer(null);
      setCheckpointSubmitted(false);
      // Reset params based on next activity
      setParams(activities[currentActivity].initialParams);
    } else {
      // Move to synthesis
      setCurrentActivity(4);
    }
  };

  const handleCompleteSynthesis = () => {
    onComplete();
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
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg mb-4">
          🔍 EXPLORE: Discover by Doing!
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {L1Content.explore.title}
        </h2>
        <p className="text-xl text-gray-600">
          {L1Content.explore.description}
        </p>
      </div>

      {/* Activity Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            {currentActivity < 4 ? `Activity ${currentActivity} of 3` : 'Synthesis Challenge'}
          </h3>
          <div className="flex gap-2">
            {[1, 2, 3].map(num => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  num < currentActivity
                    ? 'bg-green-500 text-white'
                    : num === currentActivity
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {num < currentActivity ? '✓' : num}
              </div>
            ))}
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${(currentActivity / 3) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ACTIVITY 1: Changing k */}
        {currentActivity === 1 && (
          <Activity1
            key="activity1"
            params={params}
            setParams={setParams}
            currentQuestion={currentQuestion}
            currentQuestionData={currentQuestionData}
            activityData={currentActivityData}
            checkpointAnswer={checkpointAnswer}
            setCheckpointAnswer={setCheckpointAnswer}
            checkpointSubmitted={checkpointSubmitted}
            handleNextQuestion={handleNextQuestion}
            handleCheckpointSubmit={handleCheckpointSubmit}
            handleNextActivity={handleNextActivity}
          />
        )}

        {/* ACTIVITY 2: Changing h */}
        {currentActivity === 2 && (
          <Activity2
            key="activity2"
            params={params}
            setParams={setParams}
            currentQuestion={currentQuestion}
            currentQuestionData={currentQuestionData}
            activityData={currentActivityData}
            checkpointAnswer={checkpointAnswer}
            setCheckpointAnswer={setCheckpointAnswer}
            checkpointSubmitted={checkpointSubmitted}
            handleNextQuestion={handleNextQuestion}
            handleCheckpointSubmit={handleCheckpointSubmit}
            handleNextActivity={handleNextActivity}
          />
        )}

        {/* ACTIVITY 3: Changing a */}
        {currentActivity === 3 && (
          <Activity3
            key="activity3"
            params={params}
            setParams={setParams}
            currentQuestion={currentQuestion}
            currentQuestionData={currentQuestionData}
            activityData={currentActivityData}
            checkpointAnswer={checkpointAnswer}
            setCheckpointAnswer={setCheckpointAnswer}
            checkpointSubmitted={checkpointSubmitted}
            handleNextQuestion={handleNextQuestion}
            handleCheckpointSubmit={handleCheckpointSubmit}
            handleNextActivity={handleNextActivity}
          />
        )}

        {/* SYNTHESIS */}
        {currentActivity === 4 && (
          <SynthesisActivity
            key="synthesis"
            onComplete={handleCompleteSynthesis}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Activity 1: Changing k (vertical movement)
function Activity1({ params, setParams, currentQuestion, currentQuestionData, activityData, checkpointAnswer, setCheckpointAnswer, checkpointSubmitted, handleNextQuestion, handleCheckpointSubmit, handleNextActivity }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Activity Title */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {activityData.title}
        </h3>
        <div className="space-y-2">
          {activityData.instructions.map((instruction: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </span>
              <p className="text-gray-700">{instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Graph */}
      <InteractiveParabola
        initialA={params.a}
        initialH={params.h}
        initialK={params.k}
        lockedParams={activityData.lockedParams}
        onParamsChange={setParams}
        showEquation={true}
        showVertex={true}
        showAxis={true}
      />

      {/* Guided Questions */}
      {currentQuestion < activityData.guidedQuestions.length && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold text-gray-900">
                Question {currentQuestion + 1} of {activityData.guidedQuestions.length}
              </h4>
              <span className="text-sm text-gray-500">
                {currentQuestion + 1}/{activityData.guidedQuestions.length}
              </span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full">
              <div
                className="h-1 bg-purple-500 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / activityData.guidedQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500 mb-6">
            <p className="text-lg font-medium text-gray-900">
              {currentQuestionData.question}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
            <p className="text-green-900 mb-2">
              <span className="font-bold">Answer:</span> {currentQuestionData.answer}
            </p>
            <p className="text-green-800 text-sm">
              <span className="font-semibold">Why?</span> {currentQuestionData.explanation}
            </p>
          </div>

          {currentQuestionData.keyInsight && (
            <div className="mt-4 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <p className="text-yellow-900">
                <span className="font-bold">💡 Key Insight:</span> {currentQuestionData.keyInsight}
              </p>
            </div>
          )}

          <button
            onClick={handleNextQuestion}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            {currentQuestion < activityData.guidedQuestions.length - 1 ? 'Next Question →' : 'Check Your Understanding →'}
          </button>
        </div>
      )}

      {/* Checkpoint */}
      {currentQuestion === activityData.guidedQuestions.length && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-6">
            ✓ Checkpoint: {activityData.checkpoint.question}
          </h4>

          <div className="space-y-3 mb-6">
            {activityData.checkpoint.options.map((option: string, idx: number) => (
              <button
                key={idx}
                onClick={() => !checkpointSubmitted && setCheckpointAnswer(idx)}
                disabled={checkpointSubmitted}
                className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all ${
                  checkpointAnswer === idx
                    ? checkpointSubmitted
                      ? idx === activityData.checkpoint.correctIndex
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-red-500 bg-red-50 text-red-900'
                      : 'border-purple-500 bg-purple-50 text-purple-900'
                    : checkpointSubmitted && idx === activityData.checkpoint.correctIndex
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                } ${checkpointSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                {option}
                {checkpointSubmitted && idx === activityData.checkpoint.correctIndex && (
                  <span className="ml-2 text-green-600 font-bold">✓ Correct</span>
                )}
              </button>
            ))}
          </div>

          {!checkpointSubmitted ? (
            <button
              onClick={handleCheckpointSubmit}
              disabled={checkpointAnswer === null}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              Submit Answer
            </button>
          ) : (
            <div className="space-y-4">
              {checkpointAnswer === activityData.checkpoint.correctIndex ? (
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                  <p className="text-green-900 font-bold mb-2">✓ {activityData.checkpoint.feedback.correct}</p>
                </div>
              ) : (
                <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                  <p className="text-red-900 font-bold mb-2">✗ {activityData.checkpoint.feedback.incorrect}</p>
                </div>
              )}

              <button
                onClick={handleNextActivity}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Continue to Activity 2 →
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// Activity 2 & 3: Similar structure
function Activity2(props: any) {
  return <Activity1 {...props} />;
}

function Activity3(props: any) {
  const { params, setParams } = props;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Same structure as Activity1 but with a slider for 'a' */}
      <Activity1 {...props} />

      {/* Add slider for 'a' parameter */}
      {props.currentQuestion === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">
            Adjust the 'a' parameter:
          </h4>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={params.a}
            onChange={(e) => setParams({ ...params, a: parseFloat(e.target.value) })}
            className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>-3 (wide, down)</span>
            <span className="font-bold text-purple-600">a = {params.a.toFixed(1)}</span>
            <span>3 (narrow, up)</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Synthesis Activity
function SynthesisActivity({ onComplete }: { onComplete: () => void }) {
  const [params, setParams] = useState({ a: 1, h: 0, k: 0 });
  const synthesis = L1Content.explore.synthesis;

  const isCorrect = params.h === 3 && params.k === -2 && params.a < 0 && Math.abs(params.a) >= 1.5;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-8">
        <h3 className="text-3xl font-bold mb-4">🎯 {synthesis.title}</h3>
        <p className="text-xl mb-4">{synthesis.task}</p>
        <ul className="space-y-2">
          {synthesis.requirements.map((req: string, idx: number) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">
                {idx + 1}
              </span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      <InteractiveParabola
        initialA={params.a}
        initialH={params.h}
        initialK={params.k}
        lockedParams={[]}
        onParamsChange={setParams}
        showEquation={true}
        showVertex={true}
        showAxis={true}
      />

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Adjust 'a' parameter:</h4>
        <input
          type="range"
          min="-3"
          max="3"
          step="0.1"
          value={params.a}
          onChange={(e) => setParams({ ...params, a: parseFloat(e.target.value) })}
          className="w-full"
        />
        <div className="text-center mt-2 font-bold text-purple-600">
          a = {params.a.toFixed(1)}
        </div>
      </div>

      {isCorrect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 rounded-xl p-8 border-2 border-green-500"
        >
          <h4 className="text-2xl font-bold text-green-900 mb-4">
            ✓ Perfect! You've mastered transformations!
          </h4>
          <p className="text-green-800 mb-4">
            <span className="font-semibold">Expected equation:</span> {synthesis.solution.equation}
          </p>
          <p className="text-green-700 mb-6">
            {synthesis.solution.explanation}
          </p>

          <button
            onClick={onComplete}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            ✓ Complete Explore Phase → Continue to Explain
          </button>
        </motion.div>
      )}

      {!isCorrect && (
        <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
          <p className="text-yellow-900">
            Keep adjusting! Make sure the vertex is at (3, -2), opens downward, and is fairly narrow.
          </p>
        </div>
      )}
    </motion.div>
  );
}
