import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const ViewSurvey = () => {
  const [responses, setResponses] = useState({});

  const surveyQuestions = [
    {
      title: "What is your name?",
      type: "text",
    },
    {
      title: "How old are you?",
      type: "number",
      min: 1,
      max: 100,
    },
    {
      title: "What is your favorite color?",
      type: "dropdown",
      options: ["Red", "Green", "Blue"],
    },
    {
      title: "Rate our service",
      type: "slider",
      min: 1,
      max: 10,
    },
  ];

  const handleChange = (index, value) => {
    setResponses({
      ...responses,
      [index]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl">Survey</h1>
      {surveyQuestions.map((question, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{question.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {question.type === "text" && (
              <Input
                type="text"
                value={responses[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            )}
            {question.type === "number" && (
              <Input
                type="number"
                min={question.min}
                max={question.max}
                value={responses[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            )}
            {question.type === "dropdown" && (
              <Select
                onValueChange={(value) => handleChange(index, value)}
                value={responses[index] || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {question.options.map((option, i) => (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {question.type === "slider" && (
              <div className="flex flex-col space-y-2">
                <Label>{responses[index] || question.min}</Label>
                <Slider
                  min={question.min}
                  max={question.max}
                  value={[responses[index] || question.min]}
                  onValueChange={(value) => handleChange(index, value[0])}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ViewSurvey;