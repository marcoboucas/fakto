"use client";

import { useState } from "react";
import { AdminFormationDetail, Course, Qcm, Evaluation } from "@/types/formations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, GripVertical, Video, ClipboardList, FileCheck, Pencil, Trash2, ArrowLeft, Save } from "lucide-react";
import { WorkflowElementDialog } from "@/components/admin/workflow-element-dialog";
import { useRouter } from "next/navigation";

interface FormationEditorProps {
  formation?: AdminFormationDetail;
}

type WorkflowElement = Course | Qcm | Evaluation;

export function FormationEditor({ formation }: FormationEditorProps) {
  const router = useRouter();
  const [name, setName] = useState(formation?.name || "");
  const [subtitle, setSubtitle] = useState(formation?.subtitle || "");
  const [type, setType] = useState<"Catalogue" | "Sur-mesure">(formation?.type || "Catalogue");
  const [modalities, setModalities] = useState<string[]>(formation?.modalities || []);
  const [status, setStatus] = useState<"Publié" | "Brouillon">(formation?.status || "Brouillon");
  const [description, setDescription] = useState(formation?.description || "");
  const [image, setImage] = useState(formation?.image || "");
  const [objectives, setObjectives] = useState<string[]>(formation?.objectives || [""]);
  const [content, setContent] = useState<string[]>(formation?.content || [""]);
  const [workflow, setWorkflow] = useState<WorkflowElement[]>(formation?.workflow || []);
  const [editingElement, setEditingElement] = useState<WorkflowElement | null>(null);
  const [dialogType, setDialogType] = useState<"course" | "qcm" | "evaluation" | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleModalityToggle = (modality: string) => {
    setModalities(prev =>
      prev.includes(modality)
        ? prev.filter(m => m !== modality)
        : [...prev, modality]
    );
  };

  const handleAddObjective = () => {
    setObjectives([...objectives, ""]);
  };

  const handleRemoveObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const handleAddContent = () => {
    setContent([...content, ""]);
  };

  const handleRemoveContent = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleContentChange = (index: number, value: string) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);
  };

  const handleAddWorkflowElement = (type: "course" | "qcm" | "evaluation") => {
    setEditingElement(null);
    setDialogType(type);
  };

  const handleEditWorkflowElement = (element: WorkflowElement) => {
    setEditingElement(element);
    setDialogType(element.type);
  };

  const handleDeleteWorkflowElement = (elementId: string) => {
    setWorkflow(workflow.filter(el => el.id !== elementId));
  };

  const handleSaveWorkflowElement = (element: WorkflowElement) => {
    if (editingElement) {
      // Update existing
      setWorkflow(workflow.map(el => el.id === element.id ? element : el));
    } else {
      // Add new
      const newElement = {
        ...element,
        id: `temp-${Date.now()}`,
        order: workflow.length,
      };
      setWorkflow([...workflow, newElement]);
    }
    setDialogType(null);
    setEditingElement(null);
  };

  const handleMoveElement = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === workflow.length - 1)
    ) {
      return;
    }

    const newWorkflow = [...workflow];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newWorkflow[index], newWorkflow[targetIndex]] = [newWorkflow[targetIndex], newWorkflow[index]];
    
    // Update order
    newWorkflow.forEach((el, i) => {
      el.order = i;
    });
    
    setWorkflow(newWorkflow);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to save/update formation
      console.log("Saving formation:", {
        name,
        subtitle,
        type,
        modalities,
        status,
        description,
        image,
        objectives: objectives.filter(o => o.trim()),
        content: content.filter(c => c.trim()),
        workflow,
      });
      
      // For now, just navigate back
      router.push("/admin/formations");
    } catch (error) {
      console.error("Error saving formation:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case "course":
        return <Video className="h-4 w-4" />;
      case "qcm":
        return <ClipboardList className="h-4 w-4" />;
      case "evaluation":
        return <FileCheck className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getElementTypeBadge = (type: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      course: { label: "Cours", className: "bg-blue-100 text-blue-800" },
      qcm: { label: "QCM", className: "bg-purple-100 text-purple-800" },
      evaluation: { label: "Évaluation", className: "bg-green-100 text-green-800" },
    };
    const variant = variants[type] || variants.course;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/admin/formations")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStatus("Brouillon")}>
            Enregistrer comme brouillon
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de la formation *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: La LCB-FT en assurance"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Sous-titre</Label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Formation complète"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={(v: "Catalogue" | "Sur-mesure") => setType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Catalogue">Catalogue</SelectItem>
                  <SelectItem value="Sur-mesure">Sur-mesure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={status} onValueChange={(v: "Publié" | "Brouillon") => setStatus(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brouillon">Brouillon</SelectItem>
                  <SelectItem value="Publié">Publié</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Modalités</Label>
            <div className="flex gap-2">
              {["E-learning", "Présentiel", "Distanciel"].map((modality) => (
                <Button
                  key={modality}
                  type="button"
                  variant={modalities.includes(modality) ? "default" : "outline"}
                  onClick={() => handleModalityToggle(modality)}
                >
                  {modality}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de la formation"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Objectifs pédagogiques</CardTitle>
            <Button size="sm" variant="outline" onClick={handleAddObjective}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {objectives.map((objective, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={objective}
                onChange={(e) => handleObjectiveChange(index, e.target.value)}
                placeholder={`Objectif ${index + 1}`}
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleRemoveObjective(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contenu de la formation</CardTitle>
            <Button size="sm" variant="outline" onClick={handleAddContent}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {content.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={item}
                onChange={(e) => handleContentChange(index, e.target.value)}
                placeholder={`Contenu ${index + 1}`}
                rows={2}
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleRemoveContent(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Workflow */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Parcours de formation</CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddWorkflowElement("course")}
              >
                <Video className="h-4 w-4 mr-2" />
                Cours
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddWorkflowElement("qcm")}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                QCM
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddWorkflowElement("evaluation")}
              >
                <FileCheck className="h-4 w-4 mr-2" />
                Évaluation
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {workflow.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Aucun élément dans le parcours</p>
              <p className="text-sm mt-2">Ajoutez des cours, QCMs ou évaluations</p>
            </div>
          ) : (
            <div className="space-y-2">
              {workflow.map((element, index) => (
                <div
                  key={element.id}
                  className="flex items-center gap-3 p-4 border rounded-lg bg-background hover:bg-accent/50 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => handleMoveElement(index, "up")}
                      disabled={index === 0}
                    >
                      ▲
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => handleMoveElement(index, "down")}
                      disabled={index === workflow.length - 1}
                    >
                      ▼
                    </Button>
                  </div>
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    {getElementIcon(element.type)}
                    {getElementTypeBadge(element.type)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{element.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {element.description} • {element.duration}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditWorkflowElement(element)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteWorkflowElement(element.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workflow Element Dialog */}
      {dialogType && (
        <WorkflowElementDialog
          type={dialogType}
          element={editingElement}
          open={!!dialogType}
          onClose={() => {
            setDialogType(null);
            setEditingElement(null);
          }}
          onSave={handleSaveWorkflowElement}
        />
      )}
    </div>
  );
}
