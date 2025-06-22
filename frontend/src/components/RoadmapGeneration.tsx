import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { UserProfile, Goal, Roadmap } from '../types'
import { generateRoadmap } from '../services/roadmapService'

interface RoadmapGenerationProps {
  profile: UserProfile
  goals: Goal[]
  onComplete: (roadmap: Roadmap) => void
}

const RoadmapGeneration = ({ profile, goals, onComplete }: RoadmapGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Preparing your personalized roadmap...')

  useEffect(() => {
    generateRoadmapWithProgress()
  }, [])

  const generateRoadmapWithProgress = async () => {
    setIsGenerating(true)
    
    // Simulate progress updates
    const progressSteps = [
      { progress: 20, status: 'Analyzing your profile and goals...' },
      { progress: 40, status: 'Researching relevant resources...' },
      { progress: 60, status: 'Creating personalized steps...' },
      { progress: 80, status: 'Optimizing timeline and resources...' },
      { progress: 90, status: 'Finalizing your roadmap...' },
      { progress: 100, status: 'Roadmap ready!' }
    ]

    for (const step of progressSteps) {
      setProgress(step.progress)
      setStatus(step.status)
      await new Promise(resolve => setTimeout(resolve, 800))
    }

    try {
      const roadmap = await generateRoadmap(profile, goals)
      onComplete(roadmap)
    } catch (error) {
      console.error('Error generating roadmap:', error)
      // Fallback to mock data
      const mockRoadmap: Roadmap = {
        id: Date.now().toString(),
        userId: profile.id || 'temp',
        goals,
        steps: [
          {
            id: '1',
            title: 'Research and Planning',
            description: 'Start by researching your chosen field and creating a detailed plan',
            estimatedDuration: '2-4 weeks',
            resources: [
              {
                id: '1',
                title: 'Online Research Guide',
                type: 'VIDEO',
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
                type: 'COURSE',
                description: 'Access free courses to develop your skills',
                isFree: true,
                url: '#'
              }
            ],
            isCompleted: false,
            order: 2
          }
        ],
        generatedAt: new Date(),
        progress: 0,
        estimatedCompletionDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months
      }
      onComplete(mockRoadmap)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card text-center"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Creating Your Roadmap</h1>
        <p className="text-gray-600">We're analyzing your profile and goals to create a personalized plan</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            className="bg-primary-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-600">{progress}% Complete</p>
      </div>

      {/* Status Message */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          {isGenerating ? (
            <motion.div
              className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <p className="text-lg font-medium text-gray-900 mb-2">{status}</p>
        <p className="text-sm text-gray-600">
          This may take a few moments. Please don't close this page.
        </p>
      </div>

      {/* User Info Summary */}
      <div className="bg-gray-50 rounded-lg p-4 text-left">
        <h3 className="font-semibold text-gray-900 mb-3">Your Profile Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Education:</span>
            <span className="ml-2 font-medium">{profile.educationLevel.replace('_', ' ')}</span>
          </div>
          <div>
            <span className="text-gray-600">Location:</span>
            <span className="ml-2 font-medium">{profile.location}</span>
          </div>
          <div>
            <span className="text-gray-600">Financial Status:</span>
            <span className="ml-2 font-medium">{profile.financialStatus}</span>
          </div>
          <div>
            <span className="text-gray-600">Goals:</span>
            <span className="ml-2 font-medium">{goals.length} selected</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RoadmapGeneration 