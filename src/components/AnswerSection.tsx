
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Star, ThumbsUp } from "lucide-react";
import { apiService } from "@/services/api";

interface AnswerSectionProps {
  question: string;
  onNextQuestion: () => void;
}

export function AnswerSection({ question, onNextQuestion }: AnswerSectionProps) {
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      toast.error("Please provide an answer before submitting");
      return;
    }

    setIsSaving(true);
    
    try {
      // Save the answer to the backend
      const response = await apiService.saveAnswer(question, answer);
      
      if (!response.success) {
        toast.error("Failed to save your answer. Please try again.");
        return;
      }

      // Calculate rating and show feedback
      let score = 0;
      const answerLength = answer.trim().length;
      
      if (answerLength > 200) score += 3;
      else if (answerLength > 100) score += 2;
      else if (answerLength > 50) score += 1;

      const keywords = ['example', 'experience', 'because', 'therefore', 'however'];
      keywords.forEach(keyword => {
        if (answer.toLowerCase().includes(keyword)) score += 1;
      });

      const finalScore = Math.min(5, score);
      setRating(finalScore);
      setIsSubmitted(true);
      toast.success("Answer saved successfully!");
    } catch (error) {
      toast.error("Failed to save your answer. Please ensure the backend server is running.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    setAnswer("");
    setIsSubmitted(false);
    setRating(0);
    onNextQuestion();
  };

  return (
    <Card className="p-6 mt-4">
      <div className="space-y-4">
        <div className="font-medium text-gray-700">Your Answer:</div>
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[150px]"
          disabled={isSubmitted}
        />
        
        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit}
            className="w-full bg-purple-500 hover:bg-purple-600"
            disabled={!answer.trim() || isSaving}
          >
            {isSaving ? "Saving..." : "Submit Answer"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Your Rating:</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ThumbsUp className="text-purple-500 w-5 h-5" />
                <span className="font-medium text-gray-700">Feedback:</span>
              </div>
              <p className="text-gray-600">
                {rating >= 4 
                  ? "Excellent answer! You demonstrated good understanding and provided detailed explanations."
                  : rating >= 3
                  ? "Good answer! Consider adding more examples and explanations to make it even better."
                  : "Nice try! To improve your answer, try to be more specific and provide relevant examples."}
              </p>
            </div>
            <Button 
              onClick={handleNext}
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              Next Question
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
