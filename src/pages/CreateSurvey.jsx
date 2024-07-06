import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [inputType, setInputType] = useState("text");
  const [options, setOptions] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const addQuestion = () => {
    const newQuestion = {
      title: questionTitle,
      type: inputType,
      options: inputType === "dropdown" ? options.split(",") : [],
      min: inputType === "number" || inputType === "slider" ? minValue : null,
      max: inputType === "number" || inputType === "slider" ? maxValue : null,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionTitle("");
    setInputType("text");
    setOptions("");
    setMinValue("");
    setMaxValue("");
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl">Create Survey</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add a new question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="questionTitle">Question Title</Label>
            <Input
              id="questionTitle"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="inputType">Input Type</Label>
            <Select onValueChange={setInputType} value={inputType}>
              <SelectTrigger id="inputType">
                <SelectValue placeholder="Select input type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="dropdown">Dropdown</SelectItem>
                <SelectItem value="slider">Slider</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {inputType === "dropdown" && (
            <div>
              <Label htmlFor="options">Options (comma separated)</Label>
              <Textarea
                id="options"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
              />
            </div>
          )}
          {(inputType === "number" || inputType === "slider") && (
            <div className="flex space-x-4">
              <div>
                <Label htmlFor="minValue">Min Value</Label>
                <Input
                  id="minValue"
                  type="number"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="maxValue">Max Value</Label>
                <Input
                  id="maxValue"
                  type="number"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                />
              </div>
            </div>
          )}
          <Button onClick={addQuestion}>Add Question</Button>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h2 className="text-xl">Survey Questions</h2>
        {questions.map((question, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{question.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {question.type}</p>
              {question.type === "dropdown" && (
                <p>Options: {question.options.join(", ")}</p>
              )}
              {(question.type === "number" || question.type === "slider") && (
                <p>
                  Range: {question.min} - {question.max}
                </p>
              )}
              <Button variant="destructive" onClick={() => removeQuestion(index)}>
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreateSurvey;