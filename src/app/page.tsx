'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Master Quadratics
            </h1>
            <p className="text-2xl text-gray-700 mb-4 font-light">
              Through Discovery, Not Memorization
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Interactive lessons that teach you to <span className="font-semibold text-indigo-600">SEE patterns</span>,
              {' '}<span className="font-semibold text-purple-600">BUILD models</span>, and
              {' '}<span className="font-semibold text-pink-600">SOLVE real problems</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lesson/l1"
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10">Start Learning Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="/teacher"
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-indigo-200"
              >
                Teacher Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          How You'll Learn
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Start with Real Life</h3>
            <p className="text-gray-600 leading-relaxed">
              Watch a basketball arc through the air. Launch a projectile. See the math in action FIRST,
              then learn the formulas.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Discovery</h3>
            <p className="text-gray-600 leading-relaxed">
              Drag vertices, adjust sliders, and DISCOVER patterns yourself.
              You'll build deep understanding by exploring, not memorizing.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Guidance</h3>
            <p className="text-gray-600 leading-relaxed">
              Get immediate feedback on every question. Stuck? Click for hints.
              Made a mistake? See exactly where and why, with clear explanations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Your Learning Journey
        </h2>

        <div className="space-y-8">
          {[
            {
              num: '01',
              title: 'Transformations & Features',
              desc: 'Discover how a, h, and k move and shape parabolas',
              time: '35-45 min',
              color: 'from-indigo-500 to-purple-500',
              available: true
            },
            {
              num: '02',
              title: 'Forms & Conversions',
              desc: 'Master standard, vertex, and intercept forms',
              time: '40-50 min',
              color: 'from-purple-500 to-pink-500',
              available: false
            },
            {
              num: '03',
              title: 'Solving Methods',
              desc: 'Learn when to factor, complete square, or use the formula',
              time: '45-55 min',
              color: 'from-pink-500 to-red-500',
              available: false
            }
          ].map((lesson, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg ${lesson.available ? 'hover:shadow-2xl cursor-pointer' : 'opacity-60'} transition-all duration-300`}
            >
              <div className="flex items-start gap-6">
                <div className={`text-6xl font-bold bg-gradient-to-br ${lesson.color} bg-clip-text text-transparent`}>
                  {lesson.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{lesson.title}</h3>
                    {lesson.available ? (
                      <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Available Now
                      </span>
                    ) : (
                      <span className="px-4 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-semibold">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{lesson.desc}</p>
                  <p className="text-sm text-gray-500">⏱ {lesson.time}</p>
                </div>
                {lesson.available && (
                  <Link
                    href="/lesson/l1"
                    className={`px-6 py-3 bg-gradient-to-r ${lesson.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                  >
                    Start →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg mb-2">Built with modern pedagogy principles</p>
          <p className="text-sm opacity-80">
            Interactive learning • Immediate feedback • Real-world connections
          </p>
        </div>
      </div>
    </div>
  );
}
