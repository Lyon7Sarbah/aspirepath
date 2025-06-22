import { useState } from 'react'
import { motion } from 'framer-motion'
import ProfileForm from './ProfileForm'
import GoalSetting from './GoalSetting'
import RoadmapGeneration from './RoadmapGeneration'
import type { UserProfile, Goal, Roadmap } from '../types'

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile, roadmap: Roadmap) => void
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])

  const handleProfileSubmit = (userProfile: UserProfile) => {
    setProfile(userProfile)
    setCurrentStep(2)
  }

  const handleGoalsSubmit = (userGoals: Goal[]) => {
    setGoals(userGoals)
    setCurrentStep(3)
  }

  const handleRoadmapGenerated = (roadmap: Roadmap) => {
    if (profile) {
      onComplete(profile, roadmap)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <ProfileForm onSubmit={handleProfileSubmit} />
          )}
          {currentStep === 2 && (
            <GoalSetting onSubmit={handleGoalsSubmit} />
          )}
          {currentStep === 3 && (
            <RoadmapGeneration 
              profile={profile!} 
              goals={goals} 
              onComplete={handleRoadmapGenerated} 
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default OnboardingFlow 