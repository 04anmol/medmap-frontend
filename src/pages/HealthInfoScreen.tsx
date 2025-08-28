import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import Navigation from '@/components/Navigation';

const HealthInfoScreen = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<'habits' | 'quiz'>('habits');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [likedHabits, setLikedHabits] = useState<Set<number>>(new Set());
  const [dislikedHabits, setDislikedHabits] = useState<Set<number>>(new Set());

  // Health habits and practices data
  const healthHabits = [
    {
      title: "Drink 8 Glasses of Water Daily",
      description: "Staying hydrated helps maintain body temperature, lubricate joints, and flush out waste. Dehydration can cause fatigue, headaches, and poor concentration.",
      icon: "💧"
    },
    {
      title: "Get 7-9 Hours of Sleep",
      description: "Quality sleep is essential for immune function, memory consolidation, and physical recovery. Poor sleep increases risk of heart disease and diabetes.",
      icon: "😴"
    },
    {
      title: "Exercise 30 Minutes Daily",
      description: "Regular physical activity strengthens heart, improves mood, and reduces risk of chronic diseases. Even walking counts as exercise!",
      icon: "🏃‍♂️"
    },
    {
      title: "Eat 5 Servings of Fruits/Vegetables",
      description: "Fruits and vegetables provide essential vitamins, minerals, and fiber. They help prevent heart disease, stroke, and some cancers.",
      icon: "🥗"
    },
    {
      title: "Wash Hands Frequently",
      description: "Proper handwashing prevents spread of infections. Wash for 20 seconds with soap and water, especially before eating and after using bathroom.",
      icon: "🧼"
    },
    {
      title: "Limit Screen Time Before Bed",
      description: "Blue light from screens can interfere with melatonin production, making it harder to fall asleep. Avoid screens 1 hour before bedtime.",
      icon: "📱"
    },
    {
      title: "Practice Deep Breathing",
      description: "Deep breathing reduces stress, lowers blood pressure, and improves oxygen flow to brain. Try 4-7-8 breathing technique.",
      icon: "🫁"
    },
    {
      title: "Maintain Good Posture",
      description: "Good posture prevents back pain, reduces muscle strain, and improves breathing. Sit with back straight and shoulders relaxed.",
      icon: "🧍‍♂️"
    },
    {
      title: "Take Regular Breaks",
      description: "Taking breaks every 30-60 minutes improves focus and reduces eye strain. Stand up, stretch, or walk around briefly.",
      icon: "⏰"
    },
    {
      title: "Limit Processed Foods",
      description: "Processed foods often contain high levels of salt, sugar, and unhealthy fats. Choose whole, unprocessed foods when possible.",
      icon: "🥑"
    }
  ];

  // Medical quiz questions
  const quizQuestions = [
    {
      question: "What is the normal body temperature in Celsius?",
      options: ["35°C", "36.5°C", "37°C", "38°C"],
      correct: 2,
      explanation: "Normal body temperature is around 37°C (98.6°F)."
    },
    {
      question: "How many times should you wash your hands to prevent COVID-19?",
      options: ["5 seconds", "10 seconds", "20 seconds", "30 seconds"],
      correct: 2,
      explanation: "Wash hands for at least 20 seconds with soap and water."
    },
    {
      question: "What is the recommended daily water intake for adults?",
      options: ["4 glasses", "6 glasses", "8 glasses", "10 glasses"],
      correct: 2,
      explanation: "Adults should drink about 8 glasses (2 liters) of water daily."
    },
    {
      question: "Which vitamin is produced when skin is exposed to sunlight?",
      options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      correct: 3,
      explanation: "Vitamin D is produced when skin is exposed to UVB sunlight."
    },
    {
      question: "What is the normal resting heart rate for adults?",
      options: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "120-140 bpm"],
      correct: 1,
      explanation: "Normal resting heart rate is 60-100 beats per minute."
    },
    {
      question: "How often should you replace your toothbrush?",
      options: ["Every month", "Every 3 months", "Every 6 months", "Every year"],
      correct: 1,
      explanation: "Replace toothbrush every 3-4 months or when bristles are frayed."
    },
    {
      question: "What is the recommended sleep duration for adults?",
      options: ["4-6 hours", "6-8 hours", "7-9 hours", "9-11 hours"],
      correct: 2,
      explanation: "Adults need 7-9 hours of quality sleep per night."
    },
    {
      question: "Which food group should make up the largest portion of your plate?",
      options: ["Proteins", "Grains", "Vegetables", "Fruits"],
      correct: 2,
      explanation: "Vegetables should make up about half of your plate."
    },
    {
      question: "What is the best way to treat a minor burn?",
      options: ["Apply ice", "Apply butter", "Run under cool water", "Pop blisters"],
      correct: 2,
      explanation: "Run cool (not cold) water over the burn for 10-20 minutes."
    },
    {
      question: "How often should you get a physical checkup?",
      options: ["Every 6 months", "Every year", "Every 2 years", "Only when sick"],
      correct: 1,
      explanation: "Adults should get an annual physical checkup."
    },
    {
      question: "What is the main cause of heart disease?",
      options: ["Genetics only", "Lifestyle factors", "Age only", "Stress only"],
      correct: 1,
      explanation: "Lifestyle factors like diet, exercise, and smoking are main causes."
    },
    {
      question: "Which is better for your heart: walking or running?",
      options: ["Running only", "Walking only", "Both are good", "Neither helps"],
      correct: 2,
      explanation: "Both walking and running are excellent for heart health."
    },
    {
      question: "What percentage of your body is water?",
      options: ["30-40%", "50-60%", "60-70%", "80-90%"],
      correct: 2,
      explanation: "The human body is about 60-70% water."
    },
    {
      question: "How long should you wait to eat after exercise?",
      options: ["Immediately", "15-30 minutes", "1 hour", "2 hours"],
      correct: 1,
      explanation: "Eat within 15-30 minutes after exercise for best recovery."
    },
    {
      question: "What is the best way to prevent the common cold?",
      options: ["Take vitamins", "Wash hands", "Avoid cold weather", "Drink hot tea"],
      correct: 1,
      explanation: "Frequent handwashing is the best way to prevent colds."
    }
  ];

  const handleLike = (habitIndex: number) => {
    setLikedHabits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(habitIndex)) {
        newSet.delete(habitIndex);
      } else {
        newSet.add(habitIndex);
        // Remove from disliked if it was there
        setDislikedHabits(prevDisliked => {
          const newDislikedSet = new Set(prevDisliked);
          newDislikedSet.delete(habitIndex);
          return newDislikedSet;
        });
      }
      return newSet;
    });
  };

  const handleDislike = (habitIndex: number) => {
    setDislikedHabits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(habitIndex)) {
        newSet.delete(habitIndex);
      } else {
        newSet.add(habitIndex);
        // Remove from liked if it was there
        setLikedHabits(prevLiked => {
          const newLikedSet = new Set(prevLiked);
          newLikedSet.delete(habitIndex);
          return newLikedSet;
        });
      }
      return newSet;
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentQuestionIndex((prev) => (prev + 1) % quizQuestions.length);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
                           {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex-1"></div> {/* Spacer for centering */}
        </div>

                                                               {/* Section Title */}
          <div className="px-6 mb-3 mt-1">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-t-lg border-4 border-purple-500 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-purple-600 mb-2">Health Information Center</h2>
                            <p className="text-purple-700 text-sm leading-relaxed">
                 Access health habits and medical quizzes to improve your well-being.
               </p>
            </div>
          </div>

                           {/* Section Tabs */}
        <div className="px-6 mb-6 mt-8">
          <div className="flex gap-2 bg-neutral-900 p-2 rounded-2xl max-w-sm mx-auto shadow-lg border border-neutral-800">
            <button
              onClick={() => setCurrentSection('habits')}
              className={`flex-1 px-3 py-2 rounded-xl transition-all font-medium text-sm ${
                currentSection === 'habits' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Daily Health Habits
            </button>
            <button
              onClick={() => setCurrentSection('quiz')}
              className={`flex-1 px-3 py-2 rounded-xl transition-all font-medium text-sm ${
                currentSection === 'quiz' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Medical Quiz
            </button>
          </div>
        </div>

      {/* Content */}
      <div className="px-6">
                 {currentSection === 'habits' ? (
           <div className="space-y-4">
                          {healthHabits.map((habit, index) => {
                // Different color schemes for each card
                const colorSchemes = [
                  { bg: 'from-blue-600 to-blue-800', accent: 'blue-400' },
                  { bg: 'from-purple-600 to-purple-800', accent: 'purple-400' },
                  { bg: 'from-emerald-600 to-emerald-800', accent: 'emerald-400' },
                  { bg: 'from-orange-600 to-orange-800', accent: 'orange-400' },
                  { bg: 'from-pink-600 to-pink-800', accent: 'pink-400' },
                  { bg: 'from-indigo-600 to-indigo-800', accent: 'indigo-400' },
                  { bg: 'from-teal-600 to-teal-800', accent: 'teal-400' },
                  { bg: 'from-rose-600 to-rose-800', accent: 'rose-400' },
                  { bg: 'from-cyan-600 to-cyan-800', accent: 'cyan-400' },
                  { bg: 'from-violet-600 to-violet-800', accent: 'violet-400' }
                ];
                
                const scheme = colorSchemes[index % colorSchemes.length];
                
                // Different decorative element patterns
                const decorativePatterns = [
                  // Pattern 1: Circles
                  () => (
                    <>
                      <div className={`absolute top-0 left-0 w-16 h-16 bg-${scheme.accent}/20 rounded-full -translate-x-4 -translate-y-4`}></div>
                      <div className={`absolute bottom-0 right-0 w-12 h-12 bg-${scheme.accent}/20 rounded-full translate-x-3 translate-y-3`}></div>
                    </>
                  ),
                  // Pattern 2: Squares
                  () => (
                    <>
                      <div className={`absolute top-0 right-0 w-8 h-8 bg-${scheme.accent}/30 rotate-45 translate-x-2 -translate-y-2`}></div>
                      <div className={`absolute bottom-0 left-0 w-6 h-6 bg-${scheme.accent}/30 rotate-45 -translate-x-2 translate-y-2`}></div>
                    </>
                  ),
                  // Pattern 3: Triangles
                  () => (
                    <>
                      <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-${scheme.accent}/30 translate-x-2 -translate-y-2`}></div>
                      <div className={`absolute bottom-0 left-0 w-0 h-0 border-r-[16px] border-r-transparent border-t-[16px] border-t-${scheme.accent}/30 -translate-x-2 translate-y-2`}></div>
                    </>
                  ),
                  // Pattern 4: Lines
                  () => (
                    <>
                      <div className={`absolute top-0 left-0 w-20 h-1 bg-${scheme.accent}/40 rotate-45 -translate-x-8 -translate-y-2`}></div>
                      <div className={`absolute bottom-0 right-0 w-16 h-1 bg-${scheme.accent}/40 -rotate-45 translate-x-6 translate-y-2`}></div>
                    </>
                  ),
                  // Pattern 5: Dots
                  () => (
                    <>
                      <div className={`absolute top-2 left-2 w-3 h-3 bg-${scheme.accent}/50 rounded-full`}></div>
                      <div className={`absolute top-6 left-6 w-2 h-2 bg-${scheme.accent}/50 rounded-full`}></div>
                      <div className={`absolute bottom-2 right-2 w-3 h-3 bg-${scheme.accent}/50 rounded-full`}></div>
                      <div className={`absolute bottom-6 right-6 w-2 h-2 bg-${scheme.accent}/50 rounded-full`}></div>
                    </>
                  )
                ];
                
                const pattern = decorativePatterns[index % decorativePatterns.length];
                
                return (
                  <div 
                    key={index}
                    className={`relative p-6 rounded-2xl bg-gradient-to-br ${scheme.bg} shadow-lg overflow-hidden`}
                  >
                    {/* Decorative elements */}
                    {pattern()}
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-4xl text-white/90">{habit.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-xl">{habit.title}</h3>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-white/80 leading-relaxed text-sm">{habit.description}</p>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleLike(index)}
                            className={`p-2 rounded-full transition-all duration-300 ${
                              likedHabits.has(index)
                                ? 'bg-green-500 text-white shadow-xl shadow-green-500/50 scale-125'
                                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80'
                            }`}
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDislike(index)}
                            className={`p-2 rounded-full transition-all duration-300 ${
                              dislikedHabits.has(index)
                                ? 'bg-red-500 text-white shadow-xl shadow-red-500/50 scale-125'
                                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80'
                            }`}
                          >
                            <ThumbsDown className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
           </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-3">Question {currentQuestionIndex + 1} of {quizQuestions.length}</h3>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

                         <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 shadow-sm">
               <h3 className="text-xl font-semibold mb-6 text-center">
                 {quizQuestions[currentQuestionIndex].question}
               </h3>

              <div className="space-y-4">
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                                         className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                       showResult && selectedAnswer === index
                         ? index === quizQuestions[currentQuestionIndex].correct
                           ? 'bg-green-500 text-white shadow-lg scale-105'
                           : 'bg-red-500 text-white shadow-lg scale-105'
                         : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm'
                     }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className={`mt-6 p-4 rounded-xl ${
                  selectedAnswer === quizQuestions[currentQuestionIndex].correct
                    ? 'bg-green-100 border border-green-200'
                    : 'bg-red-100 border border-red-200'
                }`}>
                  <p className={`font-medium text-lg ${
                    selectedAnswer === quizQuestions[currentQuestionIndex].correct
                      ? 'text-green-800'
                      : 'text-red-800'
                  }`}>
                    {selectedAnswer === quizQuestions[currentQuestionIndex].correct
                      ? '✅ Correct!'
                      : '❌ Incorrect!'
                    }
                  </p>
                  <p className="text-gray-700 mt-2">
                    {quizQuestions[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default HealthInfoScreen;
