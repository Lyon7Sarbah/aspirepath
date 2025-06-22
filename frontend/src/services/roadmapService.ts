import type { UserProfile, Goal, Roadmap } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export const generateRoadmap = async (profile: UserProfile, goals: Goal[]): Promise<Roadmap> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-roadmap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile,
        goals,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.roadmap
  } catch (error) {
    console.error('Error generating roadmap:', error)
    // Return mock data as fallback
    return generateMockRoadmap(profile, goals)
  }
}

const generateMockRoadmap = (profile: UserProfile, goals: Goal[]): Roadmap => {
  const mockSteps = [
    {
      id: '1',
      title: 'Research and Planning',
      description: 'Start by researching your chosen field and creating a detailed plan',
      estimatedDuration: '2-4 weeks',
      resources: [
        {
          id: '1',
          title: 'Online Research Guide',
          type: 'VIDEO' as const,
          description: 'Learn how to effectively research your career path',
          isFree: true,
          url: '#'
        }
      ],
      isCompleted: false,
      order: 1
    },
    {
      id: '2',
      title: 'Skill Development',
      description: 'Focus on building the core skills needed for your goals',
      estimatedDuration: '3-6 months',
      resources: [
        {
          id: '2',
          title: 'Free Online Courses',
          type: 'COURSE' as const,
          description: 'Access free courses to develop your skills',
          isFree: true,
          url: '#'
        }
      ],
      isCompleted: false,
      order: 2
    },
    {
      id: '3',
      title: 'Networking and Mentorship',
      description: 'Connect with professionals in your field and find mentors',
      estimatedDuration: '1-2 months',
      resources: [
        {
          id: '3',
          title: 'Local Professional Groups',
          type: 'COMMUNITY' as const,
          description: 'Join local professional communities',
          isFree: true,
          location: profile.location
        }
      ],
      isCompleted: false,
      order: 3
    }
  ]

  return {
    id: Date.now().toString(),
    userId: profile.id || 'temp',
    goals,
    steps: mockSteps,
    generatedAt: new Date(),
    progress: 0,
    estimatedCompletionDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months
  }
}

export const saveRoadmapToLocal = async (roadmap: Roadmap): Promise<void> => {
  try {
    const localforage = await import('localforage')
    await localforage.default.setItem(`roadmap_${roadmap.userId}`, roadmap)
  } catch (error) {
    console.error('Error saving roadmap to local storage:', error)
  }
}

export const loadRoadmapFromLocal = async (userId: string): Promise<Roadmap | null> => {
  try {
    const localforage = await import('localforage')
    return await localforage.default.getItem(`roadmap_${userId}`)
  } catch (error) {
    console.error('Error loading roadmap from local storage:', error)
    return null
  }
} 