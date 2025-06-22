export interface UserProfile {
  id?: string
  email: string
  educationLevel: 'SHS' | 'SHS_GRADUATE' | 'UNIVERSITY' | 'OTHER'
  financialStatus: 'LOW' | 'MODERATE' | 'HIGH'
  skills: string[]
  location: string
  createdAt?: Date
}

export interface Goal {
  id: string
  title: string
  category: 'CAREER' | 'EDUCATION' | 'BUSINESS' | 'PERSONAL'
  description: string
  timeline: 'SHORT_TERM' | 'MEDIUM_TERM' | 'LONG_TERM'
}

export interface RoadmapStep {
  id: string
  title: string
  description: string
  estimatedDuration: string
  resources: Resource[]
  isCompleted: boolean
  order: number
}

export interface Resource {
  id: string
  title: string
  type: 'COURSE' | 'VIDEO' | 'MENTOR' | 'COMMUNITY' | 'TOOL'
  url?: string
  description: string
  isFree: boolean
  location?: string
}

export interface Roadmap {
  id: string
  userId: string
  goals: Goal[]
  steps: RoadmapStep[]
  generatedAt: Date
  progress: number
  estimatedCompletionDate: Date
}

export interface OnboardingData {
  profile: UserProfile
  goals: Goal[]
} 