
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Copy, RefreshCw } from "lucide-react";
import questionBank, { Question } from "@/data/questionBanks";
import { toast } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function QuestionGenerator() {
  const [role, setRole] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<"fresher" | "experienced">("fresher");
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const isMobile = useIsMobile();

  const handleRoleChange = (value: string) => {
    setRole(value);
    setQuestions([]);
  };

  const handleExperienceLevelChange = (value: "fresher" | "experienced") => {
    setExperienceLevel(value);
    setQuestions([]);
  };

  const generateQuestions = () => {
    if (!role) {
      toast.error("Please select a role first");
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const questionsForRole = questionBank[role]?.[experienceLevel] || [];
      setQuestions(questionsForRole);
      setIsGenerating(false);
      
      if (questionsForRole.length === 0) {
        toast.error("No questions found for this combination. Please try another selection.");
      } else {
        toast.success(`Generated ${questionsForRole.length} questions!`);
      }
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 max-w-4xl">
      <Card className="p-6 shadow-lg bg-white">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Generate Interview Questions
            </h2>
            <p className="text-center text-gray-600">
              Select a role and experience level to generate relevant interview questions
            </p>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
            <div className="space-y-3">
              <Label htmlFor="role">Job Role</Label>
              <Select onValueChange={handleRoleChange} value={role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                  <SelectItem value="backend-developer">Backend Developer</SelectItem>
                  <SelectItem value="full-stack-developer">Full Stack Developer</SelectItem>
                  <SelectItem value="data-scientist">Data Scientist</SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Experience Level</Label>
              <RadioGroup
                defaultValue="fresher"
                className="flex space-x-4"
                value={experienceLevel}
                onValueChange={(value: "fresher" | "experienced") => handleExperienceLevelChange(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fresher" id="fresher" />
                  <Label htmlFor="fresher">Fresher</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="experienced" id="experienced" />
                  <Label htmlFor="experienced">Experienced</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <Button
            className="w-full bg-purple-500 hover:bg-purple-600"
            onClick={generateQuestions}
            disabled={isGenerating || !role}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                {questions.length > 0 ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate Questions
                  </>
                ) : (
                  "Generate Questions"
                )}
              </>
            )}
          </Button>

          {questions.length > 0 && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <h3 className="text-xl font-medium text-gray-800">
                {questions.length} Questions for {role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ({experienceLevel})
              </h3>
              <div className="space-y-4">
                {questions.map((q) => (
                  <Card key={q.id} className="p-4 hover:shadow-md transition-shadow border-l-4" style={{ borderLeftColor: '#9b87f5' }}>
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">{q.question}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(q.question)}
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4 text-gray-500 hover:text-purple-500" />
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-blue-100 text-gray-700 px-2 py-1 rounded-full">
                        {q.category}
                      </span>
                      <span className="text-xs bg-purple-100 text-gray-700 px-2 py-1 rounded-full">
                        {q.difficulty}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
