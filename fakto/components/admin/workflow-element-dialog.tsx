"use client";

import { useState } from "react";
import { Course, Qcm, Evaluation } from "@/types/formations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface WorkflowElementDialogProps {
  type: "course" | "qcm" | "evaluation";
  element?: Course | Qcm | Evaluation | null;
  open: boolean;
  onClose: () => void;
  onSave: (element: Course | Qcm | Evaluation) => void;
}

export function WorkflowElementDialog({
  type,
  element,
  open,
  onClose,
  onSave,
}: WorkflowElementDialogProps) {
  // Initialize state from element prop
  const [title, setTitle] = useState(element?.title || "");
  const [description, setDescription] = useState(element?.description || "");
  const [duration, setDuration] = useState(element?.duration || "");
  const [videoUrl, setVideoUrl] = useState(element && element.type === "course" ? element.videoUrl : "");
  const [detailedDescription, setDetailedDescription] = useState(
    element && element.type === "evaluation" ? element.detailedDescription : ""
  );
  const [questions, setQuestions] = useState<Array<{ id: string; text: string; order: number; answers: Array<{ id: string; text: string; isCorrect: boolean; detailedResponse: string }> }>>(
    element && (element.type === "qcm" || element.type === "evaluation") ? element.questions || [] : []
  );
  const [documents, setDocuments] = useState<Array<{ id: string; title: string; url: string; order: number }>>(
    element && element.type === "evaluation" ? element.documents || [] : []
  );

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `temp-q-${Date.now()}`,
        text: "",
        order: questions.length,
        answers: [
          { id: `temp-a-${Date.now()}-1`, text: "", isCorrect: false, detailedResponse: "" },
          { id: `temp-a-${Date.now()}-2`, text: "", isCorrect: false, detailedResponse: "" },
          { id: `temp-a-${Date.now()}-3`, text: "", isCorrect: false, detailedResponse: "" },
          { id: `temp-a-${Date.now()}-4`, text: "", isCorrect: false, detailedResponse: "" },
        ],
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex: number, aIndex: number, field: string, value: string | boolean) => {
    const newQuestions = [...questions];
    const newAnswers = [...newQuestions[qIndex].answers];
    newAnswers[aIndex] = { ...newAnswers[aIndex], [field]: value };
    
    // If setting this answer as correct, unset others
    if (field === "isCorrect" && value === true) {
      newAnswers.forEach((a, i) => {
        if (i !== aIndex) a.isCorrect = false;
      });
    }
    
    newQuestions[qIndex].answers = newAnswers;
    setQuestions(newQuestions);
  };

  const handleAddDocument = () => {
    setDocuments([
      ...documents,
      {
        id: `temp-d-${Date.now()}`,
        title: "",
        url: "",
        order: documents.length,
      },
    ]);
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleDocumentChange = (index: number, field: string, value: string) => {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setDocuments(newDocuments);
  };

  const handleSave = () => {
    const baseElement = {
      id: element?.id || `temp-${Date.now()}`,
      title,
      description,
      duration,
      order: element?.order || 0,
    };

    let savedElement: Course | Qcm | Evaluation;

    if (type === "course") {
      savedElement = {
        ...baseElement,
        type: "course" as const,
        videoUrl,
      };
    } else if (type === "qcm") {
      savedElement = {
        ...baseElement,
        type: "qcm" as const,
        questions,
      };
    } else {
      // evaluation
      savedElement = {
        ...baseElement,
        type: "evaluation" as const,
        detailedDescription,
        documents,
        questions,
      };
    }

    onSave(savedElement);
  };

  const getDialogTitle = () => {
    const action = element ? "Modifier" : "Ajouter";
    const typeLabel = type === "course" ? "un cours" : type === "qcm" ? "un QCM" : "une évaluation";
    return `${action} ${typeLabel}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Introduction à React"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description courte"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Durée *</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Ex: 30 min"
              />
            </div>
          </div>

          {/* Course-specific fields */}
          {type === "course" && (
            <div className="space-y-2">
              <Label htmlFor="videoUrl">URL de la vidéo *</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
              />
            </div>
          )}

          {/* QCM/Evaluation-specific fields */}
          {(type === "qcm" || type === "evaluation") && (
            <>
              {type === "evaluation" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="detailedDescription">Description détaillée</Label>
                    <Textarea
                      id="detailedDescription"
                      value={detailedDescription}
                      onChange={(e) => setDetailedDescription(e.target.value)}
                      placeholder="Description complète de l'évaluation"
                      rows={3}
                    />
                  </div>

                  <Separator />

                  {/* Documents */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Documents de référence</Label>
                      <Button size="sm" variant="outline" onClick={handleAddDocument}>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                    {documents.map((doc, index) => (
                      <div key={doc.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Document {index + 1}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveDocument(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          value={doc.title}
                          onChange={(e) => handleDocumentChange(index, "title", e.target.value)}
                          placeholder="Titre du document"
                        />
                        <Input
                          value={doc.url}
                          onChange={(e) => handleDocumentChange(index, "url", e.target.value)}
                          placeholder="URL du document"
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />
                </>
              )}

              {/* Questions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Questions</Label>
                  <Button size="sm" variant="outline" onClick={handleAddQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une question
                  </Button>
                </div>

                {questions.map((question, qIndex) => (
                  <div key={question.id} className="border rounded-lg p-4 space-y-4 bg-accent/5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <Label>Question {qIndex + 1}</Label>
                        <Textarea
                          value={question.text}
                          onChange={(e) =>
                            handleQuestionChange(qIndex, "text", e.target.value)
                          }
                          placeholder="Énoncé de la question"
                          rows={2}
                        />
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveQuestion(qIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3 ml-4">
                      <Label className="text-sm text-muted-foreground">
                        Réponses (cochez la bonne réponse)
                      </Label>
                      {question.answers.map((answer, aIndex: number) => (
                        <div
                          key={answer.id}
                          className="border rounded-lg p-3 space-y-2 bg-background"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              checked={answer.isCorrect}
                              onChange={() =>
                                handleAnswerChange(qIndex, aIndex, "isCorrect", true)
                              }
                              className="h-4 w-4"
                            />
                            <Input
                              value={answer.text}
                              onChange={(e) =>
                                handleAnswerChange(qIndex, aIndex, "text", e.target.value)
                              }
                              placeholder={`Réponse ${aIndex + 1}`}
                              className="flex-1"
                            />
                          </div>
                          <Textarea
                            value={answer.detailedResponse}
                            onChange={(e) =>
                              handleAnswerChange(
                                qIndex,
                                aIndex,
                                "detailedResponse",
                                e.target.value
                              )
                            }
                            placeholder="Explication affichée après sélection"
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {questions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                    <p>Aucune question</p>
                    <p className="text-sm mt-1">Cliquez sur &quot;Ajouter une question&quot; pour commencer</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
