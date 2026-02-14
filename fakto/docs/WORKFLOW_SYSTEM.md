# Formation Workflow System

## Overview

This document describes the new formation workflow system with support for **Courses**, **QCMs** (Quizzes), and **Evaluations**.

## 🏗️ Architecture

### Clean Type System (DRY Principle)

All types are defined in `/types/formations.ts` with a clear hierarchy:

```
BaseFormation (shared fields)
├── AdminFormation (admin view with lastModified)
└── Formation (user view with progress & status)

BaseWorkflowElement (shared fields)
├── Course (video-based learning)
├── Qcm (quiz with questions)
└── Evaluation (final assessment with documents)
```

### Key Features

- **Single source of truth**: No duplicate types
- **Type extensions**: Admin and user types extend base types
- **Reusable components**: `QcmAnswer` used in both QCMs and Evaluations
- **Type safety**: Full TypeScript support with Prisma

## 📦 Database Schema

### Formation
- Core entity containing metadata
- Links to objectives, content, and workflow elements

### Workflow Elements

#### 1. Course
```typescript
{
  title: string
  description: string
  videoUrl: string  // Link to video content
  duration: string
  order: number
}
```

#### 2. QCM (Quiz)
```typescript
{
  title: string
  description: string
  duration: string
  order: number
  questions: [
    {
      text: string
      order: number
      answers: [  // Always 4 answers
        {
          text: string
          isCorrect: boolean
          detailedResponse: string  // Shown after selection
        }
      ]
    }
  ]
}
```

#### 3. Evaluation
```typescript
{
  title: string
  description: string
  detailedDescription: string  // Extended description
  duration: string
  order: number
  documents: [  // Reference materials
    {
      title: string
      url: string
      order: number
    }
  ]
  questions: [  // Same structure as QCM questions
    {
      text: string
      order: number
      answers: [...]
    }
  ]
}
```

## 🔧 API Functions

### Formation CRUD

```typescript
// List all formations (admin)
getAdminFormations(): Promise<AdminFormation[]>

// Get formation details with workflow
getAdminFormationById(id: string): Promise<AdminFormationDetail | null>

// Create new formation
createFormation(data: AdminFormationInput): Promise<AdminFormation>

// Update formation
updateFormation(id: string, data: Partial<AdminFormationInput>): Promise<AdminFormation>

// Delete formation (cascade deletes workflow elements)
deleteFormation(id: string): Promise<void>

// Get statistics
getAdminFormationStats(): Promise<AdminFormationStats>
```

### Course CRUD

```typescript
createCourse(formationId: string, data: CourseInput): Promise<Course>
updateCourse(id: string, data: Partial<CourseInput>): Promise<Course>
deleteCourse(id: string): Promise<void>
```

### QCM CRUD

```typescript
createQcm(formationId: string, data: QcmInput): Promise<Qcm>
updateQcm(id: string, data: Partial<Omit<QcmInput, "questions">>): Promise<Qcm>
deleteQcm(id: string): Promise<void>
```

### Evaluation CRUD

```typescript
createEvaluation(formationId: string, data: EvaluationInput): Promise<Evaluation>
updateEvaluation(id: string, data: Partial<Omit<EvaluationInput, "documents" | "questions">>): Promise<Evaluation>
deleteEvaluation(id: string): Promise<void>
```

## 🚀 Migration Guide

### Step 1: Run Migration Script

```bash
./scripts/migrate-to-workflow.sh
```

This will:
1. Generate Prisma client
2. Push schema changes (drops `formation_steps` table)
3. Seed database with sample workflow data

### Step 2: Update Components

The type imports have been updated:
- ❌ ~~`@/types/admin-formations`~~
- ✅ `@/types/formations`

All formation types (admin and user) are now in a single file.

### Step 3: Test

```bash
npm run dev
```

Navigate to:
- `/admin/formations` - Admin view with formation management
- `/app/formations` - User view with formations list
- `/app/formations/[id]` - Formation detail with workflow steps

## 📝 Usage Examples

### Creating a Formation with Workflow

```typescript
import { createFormation, createCourse, createQcm, createEvaluation } from '@/lib/api/admin-formations';

// 1. Create formation
const formation = await createFormation({
  name: "React Advanced",
  type: "Catalogue",
  modalities: ["E-learning"],
  status: "Brouillon",
  objectives: ["Master React hooks"],
  content: ["Custom hooks", "Performance"],
});

// 2. Add a course
await createCourse(formation.id, {
  title: "Introduction to Hooks",
  description: "Learn useState and useEffect",
  videoUrl: "https://example.com/video.mp4",
  duration: "30 min",
  order: 0,
});

// 3. Add a QCM
await createQcm(formation.id, {
  title: "Hooks Quiz",
  description: "Test your knowledge",
  duration: "10 min",
  order: 1,
  questions: [
    {
      text: "What does useState return?",
      order: 0,
      answers: [
        {
          text: "An array with state and setter",
          isCorrect: true,
          detailedResponse: "Correct! useState returns [state, setState]",
        },
        {
          text: "Just the state value",
          isCorrect: false,
          detailedResponse: "Incorrect. It returns an array.",
        },
        // ... 2 more answers (always 4 total)
      ],
    },
  ],
});

// 4. Add an evaluation
await createEvaluation(formation.id, {
  title: "Final Assessment",
  description: "Validate your skills",
  detailedDescription: "Complete assessment covering all topics",
  duration: "20 min",
  order: 2,
  documents: [
    {
      title: "React Documentation",
      url: "https://react.dev",
      order: 0,
    },
  ],
  questions: [
    // Same structure as QCM questions
  ],
});
```

### Fetching Formation with Workflow

```typescript
import { getAdminFormationById } from '@/lib/api/admin-formations';

const formation = await getAdminFormationById(formationId);

// Access workflow elements
formation.workflow.forEach((element) => {
  switch (element.type) {
    case 'course':
      console.log('Course:', element.title, element.videoUrl);
      break;
    case 'qcm':
      console.log('QCM:', element.title, element.questions.length, 'questions');
      break;
    case 'evaluation':
      console.log('Evaluation:', element.title, element.documents.length, 'docs');
      break;
  }
});
```

## 🎯 Benefits

### For Developers
- **Type Safety**: Full TypeScript coverage
- **DRY Code**: No duplicate type definitions
- **Clean Architecture**: Clear separation between admin and user views
- **Easy to Extend**: Add new workflow element types easily

### For Content Creators
- **Rich Content**: Video courses, interactive quizzes, comprehensive evaluations
- **Detailed Feedback**: Each answer includes a detailed response
- **Resource Attachments**: Add documents to evaluations
- **Flexible Ordering**: Control workflow element sequence

### For Learners
- **Varied Learning**: Mix of videos, quizzes, and assessments
- **Immediate Feedback**: Detailed responses after each answer
- **Progress Tracking**: Visual progress through workflow
- **Resource Access**: Documents available during evaluations

## 🔐 Data Integrity

- **Cascade Deletes**: Removing a formation automatically removes all workflow elements
- **Referential Integrity**: Foreign keys ensure data consistency
- **Transaction Support**: Prisma transactions for complex operations

## 📊 Future Enhancements

- [ ] User progress tracking per workflow element
- [ ] Score calculation and passing thresholds
- [ ] Certificate generation on completion
- [ ] Advanced analytics dashboard
- [ ] Workflow templates
- [ ] Content versioning

## 🐛 Troubleshooting

### Migration Issues

If migration fails:

```bash
# Reset database completely
npx prisma migrate reset

# Or manually:
npx prisma db push --accept-data-loss
npm run db:seed
```

### Type Errors

Make sure all imports use the unified types:

```typescript
// ✅ Correct
import { Formation, AdminFormation } from '@/types/formations';

// ❌ Incorrect
import { AdminFormation } from '@/types/admin-formations';
```

## 📚 Related Files

- `/types/formations.ts` - All type definitions
- `/prisma/schema.prisma` - Database schema
- `/lib/api/admin-formations.ts` - Admin CRUD operations
- `/lib/api/formations.ts` - User-facing API
- `/lib/api/formation-detail.ts` - Formation detail with workflow
- `/prisma/seed.ts` - Sample data
