# Admin Formation Editor - User Guide

## Overview

The admin formation editor allows you to create and manage formations with rich workflow elements including **Courses**, **QCMs** (Quizzes), and **Evaluations**.

## Features

### 1. Formation Creation

Navigate to `/admin/formations/new` or click "Créer une formation" button to create a new formation.

#### Basic Information
- **Name**: Formation title (required)
- **Subtitle**: Optional subtitle
- **Type**: Catalogue or Sur-mesure
- **Status**: Brouillon (draft) or Publié (published)
- **Modalités**: E-learning, Présentiel, Distanciel (multi-select)
- **Description**: Formation description
- **Image URL**: Cover image URL

#### Learning Objectives
Add multiple learning objectives that describe what participants will learn.

#### Content
Add multiple content items that describe what the formation covers.

### 2. Workflow Builder

Build your formation's learning path by adding different types of elements:

#### Course (Cours)
Video-based learning content:
- Title
- Description
- Duration (e.g., "30 min")
- Video URL (link to video content)

#### QCM (Quiz)
Interactive quiz to test knowledge:
- Title and description
- Duration
- **Questions**: Add multiple questions
  - Each question has exactly **4 answers**
  - Mark the correct answer with radio button
  - **Detailed response**: Explanation shown after answer selection

#### Evaluation
Comprehensive final assessment:
- Title and description
- Duration
- **Detailed description**: Extended information about the evaluation
- **Documents**: Add reference materials (PDF, guides, etc.)
  - Document title
  - Document URL
- **Questions**: Same structure as QCM (4 answers each with detailed responses)

### 3. Workflow Management

- **Reorder elements**: Use up/down arrows to change order
- **Edit elements**: Click pencil icon to modify
- **Delete elements**: Click trash icon to remove
- **Preview**: Elements display with type badges and icons

### 4. Saving

- **Save as draft**: Keeps status as "Brouillon"
- **Save**: Updates the formation with current status
- Changes are preserved when navigating away

## Usage Flow

### Creating a New Formation

1. Go to `/admin/formations`
2. Click "Créer une formation" button
3. Fill in basic information
4. Add objectives and content
5. Build workflow:
   - Add a course (intro video)
   - Add a QCM (knowledge check)
   - Add an evaluation (final assessment)
6. Save as draft or publish

### Editing an Existing Formation

1. From admin formations table, click "Actions" → "Modifier"
2. Update any field
3. Modify workflow elements
4. Save changes

### Creating a Course

1. Click "Cours" button in workflow section
2. Fill in:
   - Title (e.g., "Introduction to React")
   - Description
   - Duration (e.g., "45 min")
   - Video URL
3. Click "Enregistrer"

### Creating a QCM

1. Click "QCM" button in workflow section
2. Fill in title, description, duration
3. Add questions:
   - Click "Ajouter une question"
   - Enter question text
   - Fill 4 answers (required)
   - Check the correct answer
   - Add detailed response for each answer
4. Click "Enregistrer"

### Creating an Evaluation

1. Click "Évaluation" button
2. Fill in title, description, detailed description
3. Add documents:
   - Click "Ajouter" under Documents
   - Enter document title and URL
4. Add questions (same as QCM)
5. Click "Enregistrer"

## Best Practices

### Question Writing
- Make questions clear and specific
- Ensure only one correct answer
- Write helpful detailed responses for all answers
- Explain why incorrect answers are wrong

### Workflow Structure
Recommended order:
1. **Intro Course**: Overview video
2. **QCM**: Quick knowledge check
3. **Main Courses**: Detailed content
4. **Evaluation**: Final comprehensive assessment

### Document References
For evaluations:
- Add relevant guides, documentation, or reference materials
- Use permanent URLs (not temporary links)
- Name documents clearly

## Technical Details

### Routes
- List: `/admin/formations`
- Create: `/admin/formations/new`
- Edit: `/admin/formations/[id]/edit`

### Components
- `FormationEditor`: Main editor interface
- `WorkflowElementDialog`: Modal for adding/editing workflow elements
- `AdminFormationsTable`: Formation list with actions

### Data Structure
```typescript
Formation {
  name, subtitle, type, modalities, status
  objectives: string[]
  content: string[]
  workflow: (Course | Qcm | Evaluation)[]
}

Course {
  title, description, duration, videoUrl
}

Qcm {
  title, description, duration
  questions: [
    {
      text, order
      answers: [4 answers with detailedResponse]
    }
  ]
}

Evaluation {
  title, description, detailedDescription, duration
  documents: []
  questions: []
}
```

## Troubleshooting

### Changes not saving
- Check that required fields are filled (marked with *)
- Ensure at least one modality is selected
- Check console for error messages

### Questions not appearing
- Make sure to click "Enregistrer" after adding questions
- Verify that all 4 answers are filled

### Video not playing
- Verify video URL is accessible
- Check that URL points directly to video file or supported player

## Future Enhancements

- [ ] Drag and drop for reordering workflow elements
- [ ] Duplicate workflow elements
- [ ] Bulk import questions
- [ ] Question bank library
- [ ] Preview formation as learner
- [ ] Auto-save drafts
- [ ] Rich text editor for descriptions
- [ ] File upload for documents
- [ ] Video upload integration
