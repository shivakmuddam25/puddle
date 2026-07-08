// app/quiz/[slug]/QuizClient.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Clock, Award, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Quiz {
  _id: string;
  title: string;
  description?: string;
  duration?: number;
  passingScore: number;
  questions: Array<{
    question: string;
    questionType: string;
    options?: string[];
    correctAnswer: string;
    explanation?: string;
    points: number;
  }>;
  difficulty?: string;
}

export default function QuizClient({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const totalQuestions = quiz.questions?.length || 0;
  const currentQ = quiz.questions?.[currentQuestion];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    let totalPoints = 0;
    
    quiz.questions.forEach((q, idx) => {
      totalPoints += q.points || 1;
      if (answers[idx]?.toLowerCase() === q.correctAnswer.toLowerCase()) {
        correct += q.points || 1;
      }
    });
    
    const percentage = (correct / totalPoints) * 100;
    setScore(percentage);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setSubmitted(false);
    setScore(0);
  };

  if (submitted) {
    const passed = score >= (quiz.passingScore || 40);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className={`bg-white rounded-xl shadow-lg p-8 text-center ${passed ? 'border-green-500' : 'border-red-500'} border-t-4`}>
              {passed ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <h1 className="text-2xl font-bold mb-2">Quiz Completed!</h1>
              <p className="text-gray-600 mb-4">You scored {Math.round(score)}%</p>
              <p className="text-sm text-gray-500 mb-6">
                Passing score: {quiz.passingScore || 40}%
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Retry Quiz
                </button>
                <Link
                  href="/student-dashboard"
                  className="px-6 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/student-dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ChevronLeft size={20} />
            Back to Dashboard
          </Link>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{quiz.title}</h1>
                {quiz.duration && (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} />
                    {quiz.duration} min
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {totalQuestions}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-olive-600 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-medium mb-6">{currentQ?.question}</h2>
              
              <div className="space-y-3">
                {currentQ?.questionType === 'truefalse' ? (
                  <>
                    <button
                      onClick={() => handleAnswer('True')}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        answers[currentQuestion] === 'True' ? 'border-olive-500 bg-olive-50' : 'border-gray-200 hover:border-olive-300'
                      }`}
                    >
                      True
                    </button>
                    <button
                      onClick={() => handleAnswer('False')}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        answers[currentQuestion] === 'False' ? 'border-olive-500 bg-olive-50' : 'border-gray-200 hover:border-olive-300'
                      }`}
                    >
                      False
                    </button>
                  </>
                ) : (
                  currentQ?.options?.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        answers[currentQuestion] === option ? 'border-olive-500 bg-olive-50' : 'border-gray-200 hover:border-olive-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))
                )}
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                {currentQuestion === totalQuestions - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!answers[currentQuestion]}
                    className={`px-4 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700 ${!answers[currentQuestion] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion]}
                    className={`px-4 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700 ${!answers[currentQuestion] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}