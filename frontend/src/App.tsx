// Refer to high-level product context in docs/PRD.md

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingFlow from './components/OnboardingFlow'
import Dashboard from './components/Dashboard'
import type { UserProfile, Roadmap } from './types'

function App() {
  const [currentStep, setCurrentStep] = useState<'onboarding' | 'dashboard'>('onboarding')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)

  const handleOnboardingComplete = (profile: UserProfile, generatedRoadmap: Roadmap) => {
    setUserProfile(profile)
    setRoadmap(generatedRoadmap)
    setCurrentStep('dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <AnimatePresence mode="wait">
        {currentStep === 'onboarding' ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard userProfile={userProfile!} roadmap={roadmap!} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
