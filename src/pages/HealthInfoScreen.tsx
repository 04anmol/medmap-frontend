import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';

const HealthInfoScreen = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<'habits' | 'quiz'>('habits');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFinalResult, setShowFinalResult] = useState(false);

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
        <button
          onClick={() => navigate('/home')}
          className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <h1 className="text-xl font-bold text-foreground">Health Information Center</h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Section Tabs */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setCurrentSection('habits')}
            className={`flex-1 px-4 py-3 rounded-xl transition-all font-medium ${
              currentSection === 'habits' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Daily Health Habits
          </button>
          <button
            onClick={() => setCurrentSection('quiz')}
            className={`flex-1 px-4 py-3 rounded-xl transition-all font-medium ${
              currentSection === 'quiz' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
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
            {healthHabits.map((habit, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{habit.icon}</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">{habit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{habit.description}</p>
                  </div>
                </div>
              </div>
            ))}
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
