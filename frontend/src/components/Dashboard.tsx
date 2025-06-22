import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { UserProfile, Roadmap, RoadmapStep } from '../types'

interface DashboardProps {
  userProfile: UserProfile
  roadmap: Roadmap
}

const Dashboard = ({ userProfile, roadmap }: DashboardProps) => {
  const [currentStep, setCurrentStep] = useState<RoadmapStep | null>(
    roadmap.steps.find(step => !step.isCompleted) || null
  )

  const completedSteps = roadmap.steps.filter(step => step.isCompleted)
  const progressPercentage = (completedSteps.length / roadmap.steps.length) * 100

  const markStepComplete = (stepId: string) => {
    const updatedSteps = roadmap.steps.map(step =>
      step.id === stepId ? { ...step, isCompleted: true } : step
    )
    const nextStep = updatedSteps.find(step => !step.isCompleted)
    setCurrentStep(nextStep || null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">AspirePath</h1>
                <p className="text-sm text-gray-600">Your personalized journey to success</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-900">{userProfile.email}</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="mr-3">📊</span>
                Your Progress
              </h2>
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {completedSteps.length} of {roadmap.steps.length} steps completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
              <motion.div
                className="progress-bar h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{Math.round(progressPercentage)}% complete</span>
              <span>Estimated completion: {roadmap.estimatedCompletionDate.toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Current Step */}
        <AnimatePresence>
          {currentStep && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🎯</span>
                Current Focus
              </h2>
              <motion.div
                className="card pulse-glow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {currentStep.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg">{currentStep.description}</p>
                    <span className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm px-4 py-2 rounded-full font-medium">
                      ⏱️ Estimated: {currentStep.estimatedDuration}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => markStepComplete(currentStep.id)}
                    className="btn-primary ml-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✅ Mark Complete
                  </motion.button>
                </div>

                {/* Resources */}
                {currentStep.resources.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">📚</span>
                      Recommended Resources
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentStep.resources.map((resource, index) => (
                        <motion.div
                          key={resource.id}
                          className="resource-card"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 text-sm mb-2">
                                {resource.title}
                              </h5>
                              <p className="text-gray-600 text-xs mb-3">
                                {resource.description}
                              </p>
                              <div className="flex items-center gap-2">
                                {resource.isFree && (
                                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">
                                    🆓 Free
                                  </span>
                                )}
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {resource.type}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🗺️</span>
            Your Roadmap
          </h2>
          <div className="space-y-4">
            {roadmap.steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`step-card ${step.isCompleted ? 'opacity-75' : ''}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      step.isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    }`}>
                      {step.isCompleted ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold text-gray-900 mb-2 ${
                        step.isCompleted ? 'line-through text-gray-500' : ''
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-gray-600 mb-3 ${
                        step.isCompleted ? 'line-through text-gray-400' : ''
                      }`}>
                        {step.description}
                      </p>
                      <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                        ⏱️ {step.estimatedDuration}
                      </span>
                    </div>
                  </div>
                  {!step.isCompleted && (
                    <motion.button
                      onClick={() => markStepComplete(step.id)}
                      className="btn-outline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Complete
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard 