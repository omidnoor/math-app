// L1: Transformations & Features - Complete Rich Content

export const L1Content = {
  id: 'l1',
  title: 'Transformations & Features of Parabolas',
  subtitle: 'Discover how changing numbers moves and shapes the parabola',
  estimatedTime: '35-45 minutes',

  // ========== ENGAGE PHASE ==========
  engage: {
    phenomenon: {
      title: "Watch This!",
      description: "A basketball player shoots the ball. Watch the path it makes.",
      guidance: "Pay attention to the shape. What do you notice? What do you wonder?",
      video: "/videos/basketball-shot.mp4", // Placeholder
      questions: [
        {
          prompt: "What shape does the ball's path make?",
          expectedAnswer: "A curved path, like a U-shape or parabola",
          hint: "Look at the overall arc from the player's hands to the basket"
        },
        {
          prompt: "Where is the highest point of the ball's flight?",
          expectedAnswer: "Somewhere in the middle of the path",
          hint: "The peak is between where the ball leaves the hand and where it goes in the basket"
        },
        {
          prompt: "Does the ball go higher than the basket or lower?",
          expectedAnswer: "Higher - it arcs above the basket",
          hint: "Watch carefully at the ball's peak height"
        }
      ],
      transition: "That curved shape is called a PARABOLA. Today you'll learn to control it with math!"
    }
  },

  // ========== EXPLORE PHASE ==========
  explore: {
    title: "Play with the Parabola",
    description: "Drag the red dot (the vertex) and watch what happens to the equation",

    activity1: {
      title: "Activity 1: Moving Up and Down (Changing k)",
      instructions: [
        "Start with the basic parabola y = x²",
        "Drag the vertex (red dot) UP and DOWN only",
        "Watch the number k change in the equation y = (x - h)² + k"
      ],
      initialParams: { a: 1, h: 0, k: 0 },
      lockedParams: ['a', 'h'], // Only k can change

      guidedQuestions: [
        {
          question: "Drag the vertex UP to y = 3. What is k now?",
          answer: "k = 3",
          explanation: "The k value shows the vertical position of the vertex!"
        },
        {
          question: "Drag the vertex DOWN to y = -2. What is k now?",
          answer: "k = -2",
          explanation: "Negative k means the vertex is below the x-axis"
        },
        {
          question: "What does k control?",
          answer: "k controls the vertical position (up/down) of the parabola",
          keyInsight: "k = vertical shift"
        }
      ],

      checkpoint: {
        question: "If the vertex is at height 5, what is k?",
        options: ["5", "-5", "0", "1"],
        correctIndex: 0,
        feedback: {
          correct: "Perfect! k = 5 means the vertex is at height 5.",
          incorrect: "Remember: k is the HEIGHT of the vertex (the y-coordinate)"
        }
      }
    },

    activity2: {
      title: "Activity 2: Moving Left and Right (Changing h)",
      instructions: [
        "Now drag the vertex LEFT and RIGHT only",
        "Watch h change in y = (x - h)² + k",
        "⚠️ TRICKY ALERT: The sign might surprise you!"
      ],
      initialParams: { a: 1, h: 0, k: 0 },
      lockedParams: ['a', 'k'],

      guidedQuestions: [
        {
          question: "Drag the vertex to x = 2. What is h in the equation?",
          answer: "h = 2",
          explanation: "When the vertex is at x = 2, we get (x - 2)²"
        },
        {
          question: "Drag the vertex to x = -3. What do you see in the equation?",
          answer: "(x - (-3))² which simplifies to (x + 3)²",
          explanation: "This is TRICKY! When vertex is at x = -3, we get (x + 3)²",
          commonMistake: "Students often think (x - 3)². The sign is opposite!"
        },
        {
          question: "What does h control?",
          answer: "h controls the horizontal position (left/right) of the parabola",
          keyInsight: "h = horizontal shift (watch the sign!)"
        }
      ],

      checkpoint: {
        question: "If the equation is y = (x + 5)², where is the vertex on the x-axis?",
        options: ["x = 5", "x = -5", "x = 0", "x = 1"],
        correctIndex: 1,
        feedback: {
          correct: "Yes! (x + 5)² means x - (-5), so h = -5",
          incorrect: "Careful! (x + 5) = (x - (-5)), so the vertex is at x = -5, not +5"
        }
      }
    },

    activity3: {
      title: "Activity 3: Opening & Squeezing (Changing a)",
      instructions: [
        "Now use the slider to change a",
        "Try positive and negative values",
        "Try values between -3 and 3"
      ],
      initialParams: { a: 1, h: 0, k: 0 },
      lockedParams: ['h', 'k'],

      guidedQuestions: [
        {
          question: "Set a = 2. What happens to the parabola?",
          answer: "It gets narrower/steeper",
          explanation: "Larger |a| makes the parabola narrower"
        },
        {
          question: "Set a = 0.5. What happens now?",
          answer: "It gets wider/flatter",
          explanation: "Smaller |a| makes the parabola wider"
        },
        {
          question: "Set a = -1. What's different?",
          answer: "The parabola flips upside down!",
          explanation: "Negative a makes the parabola open DOWN instead of UP",
          visual: "Show both a=1 and a=-1 side by side"
        },
        {
          question: "What does a control?",
          answer: "a controls the width and direction (up or down)",
          keyInsight: "a > 0: opens UP, a < 0: opens DOWN. Larger |a| = narrower"
        }
      ],

      checkpoint: {
        question: "Which value of a makes a wide parabola that opens DOWN?",
        options: ["a = 3", "a = -0.3", "a = 0.5", "a = -2"],
        correctIndex: 1,
        feedback: {
          correct: "Perfect! a = -0.3 is negative (opens down) and small (wide)",
          incorrect: "Remember: Negative a opens DOWN, small |a| is WIDE"
        }
      }
    },

    synthesis: {
      title: "Put It All Together!",
      task: "Create a parabola with:",
      requirements: [
        "Vertex at (3, -2)",
        "Opens downward",
        "Fairly narrow"
      ],
      solution: {
        equation: "y = -2(x - 3)² - 2",
        explanation: "h = 3 (vertex at x=3), k = -2 (vertex at y=-2), a = -2 (negative for down, 2 for narrow)"
      }
    }
  },

  // ========== EXPLAIN PHASE ==========
  explain: {
    title: "The Vertex Form Formula",

    bigIdea: {
      title: "🎯 Vertex Form of a Parabola",
      formula: "y = a(x - h)² + k",
      meaning: {
        a: "Controls width and direction (up/down)",
        h: "x-coordinate of the VERTEX (watch the sign!)",
        k: "y-coordinate of the VERTEX",
        vertex: "The vertex is the point (h, k)"
      },
      visual: "Annotated graph showing a, h, k clearly labeled"
    },

    workedExample1: {
      title: "Example 1: Reading Features from Vertex Form",
      problem: "For y = 3(x - 2)² + 5, identify:",

      solution: [
        {
          question: "What is a?",
          work: "a = 3",
          answer: "a = 3",
          meaning: "Opens upward (positive), fairly narrow (|3| > 1)"
        },
        {
          question: "What is h?",
          work: "We have (x - 2), so h = 2",
          answer: "h = 2",
          meaning: "Vertex is at x = 2"
        },
        {
          question: "What is k?",
          work: "k = 5",
          answer: "k = 5",
          meaning: "Vertex is at y = 5"
        },
        {
          question: "What is the vertex?",
          work: "Vertex = (h, k) = (2, 5)",
          answer: "(2, 5)",
          graph: "Show parabola with vertex clearly marked"
        },
        {
          question: "What is the axis of symmetry?",
          work: "The axis is the vertical line through the vertex",
          answer: "x = 2",
          meaning: "The parabola is symmetric around x = 2"
        },
        {
          question: "What is the range?",
          work: "Opens up, vertex at y = 5, so range is [5, ∞)",
          answer: "[5, ∞)",
          meaning: "The parabola goes from y = 5 up to infinity"
        }
      ]
    },

    workedExample2: {
      title: "Example 2: Tricky Signs!",
      problem: "For y = -½(x + 3)² + 8, identify the vertex",

      commonMistake: {
        mistake: "Thinking the vertex is at (3, 8)",
        why: "Students forget (x + 3) = (x - (-3))"
      },

      solution: [
        {
          step: "Rewrite in standard vertex form",
          work: "y = -½(x - (-3))² + 8",
          explanation: "Change (x + 3) to (x - (-3)) to match the form"
        },
        {
          step: "Identify h",
          work: "h = -3",
          answer: "h = -3"
        },
        {
          step: "Identify k",
          work: "k = 8",
          answer: "k = 8"
        },
        {
          step: "Write the vertex",
          work: "Vertex = (h, k) = (-3, 8)",
          answer: "(-3, 8)",
          graph: "Show parabola opening down with vertex at (-3, 8)"
        }
      ],

      checkYourself: "Always check: Is the vertex where you expected on the graph?"
    },

    keyFeatures: {
      title: "Key Features Summary",
      features: [
        {
          name: "Vertex",
          definition: "The turning point of the parabola",
          howToFind: "Vertex = (h, k) from y = a(x - h)² + k",
          visual: "Point clearly marked on graph"
        },
        {
          name: "Axis of Symmetry",
          definition: "The vertical line through the vertex",
          howToFind: "x = h",
          visual: "Dashed vertical line"
        },
        {
          name: "Direction",
          definition: "Does it open up or down?",
          howToFind: "If a > 0: opens UP ↑ | If a < 0: opens DOWN ↓",
          visual: "Two parabolas showing both directions"
        },
        {
          name: "Range",
          definition: "All possible y-values",
          howToFind: "If opens up: [k, ∞) | If opens down: (-∞, k]",
          visual: "Shaded region showing range"
        }
      ]
    }
  },

  // ========== ELABORATE PHASE ==========
  elaborate: {
    title: "Practice with Scaffolding",

    practice1: {
      title: "Guided Practice (Heavy Scaffolding)",
      problems: [
        {
          problem: "y = 2(x - 4)² + 1",
          scaffolding: {
            prompts: [
              "What is a? → __",
              "What is h? → __",
              "What is k? → __",
              "Vertex: (__, __)",
              "Axis: x = __",
              "Opens up or down? __",
              "Range: __"
            ]
          },
          hints: [
            "a is the number in front",
            "h comes from (x - ?) → h = ?",
            "k is the number at the end",
            "Vertex is (h, k)",
            "Axis is x = h",
            "Look at the sign of a",
            "Opens up: range is [k, ∞)"
          ],
          solution: {
            a: 2,
            h: 4,
            k: 1,
            vertex: "(4, 1)",
            axis: "x = 4",
            direction: "up",
            range: "[1, ∞)"
          }
        },
        {
          problem: "y = -(x + 2)² - 3",
          scaffolding: "Faded (fewer prompts)",
          solution: {
            a: -1,
            h: -2,
            k: -3,
            vertex: "(-2, -3)",
            axis: "x = -2",
            direction: "down",
            range: "(-∞, -3]"
          }
        }
      ]
    },

    practice2: {
      title: "Independent Practice (No Scaffolding)",
      problems: [
        { problem: "y = -3(x - 1)² + 7", difficulty: "medium" },
        { problem: "y = 0.5(x + 4)² - 2", difficulty: "medium" },
        { problem: "y = -(x - 5)²", difficulty: "medium", note: "k = 0!" }
      ]
    },

    challenge: {
      title: "🌟 Challenge Problems",
      problems: [
        {
          problem: "A parabola has vertex at (-3, 4) and passes through point (0, 13). Find the equation.",
          hint: "Start with y = a(x - (-3))² + 4, then use the point to find a",
          solution: "y = (x + 3)² + 4"
        }
      ]
    }
  },

  // ========== EVALUATE PHASE ==========
  evaluate: {
    hingeQuestions: [
      {
        question: "Which equation has a vertex at (3, -2)?",
        options: [
          "y = (x - 3)² - 2",
          "y = (x + 3)² - 2",
          "y = (x - 3)² + 2",
          "y = (x + 3)² + 2"
        ],
        correctIndex: 0,
        rationale: "Vertex (3, -2) means h = 3 and k = -2, so (x - 3)² - 2",
        misconceptionProbe: "If you chose B, remember (x + 3) means h = -3, not +3!"
      },
      {
        question: "For y = -2(x - 1)² + 5, what is the range?",
        options: [
          "[5, ∞)",
          "(-∞, 5]",
          "[1, ∞)",
          "(-∞, 1]"
        ],
        correctIndex: 1,
        rationale: "Opens down (a = -2 < 0), vertex at y = 5, so range is (-∞, 5]"
      }
    ],

    exitTicket: {
      title: "Exit Ticket - Show What You Know",
      problem: "For y = -½(x + 3)² + 8:",
      questions: [
        "Identify the vertex",
        "State the axis of symmetry",
        "Does it open up or down?",
        "What is the range?"
      ],
      solution: {
        vertex: "(-3, 8)",
        axis: "x = -3",
        direction: "down",
        range: "(-∞, 8]"
      }
    },

    reflection: {
      title: "Reflect on Your Learning",
      prompts: [
        "What was the trickiest part about h and the sign?",
        "How can you remember whether a parabola opens up or down?",
        "What strategy helps you find the range?",
        "On a scale of 1-5, how confident do you feel about vertex form?"
      ]
    }
  }
};
