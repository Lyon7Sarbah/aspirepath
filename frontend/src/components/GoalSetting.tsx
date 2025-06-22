import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Goal } from '../types'

interface GoalSettingProps {
  onSubmit: (goals: Goal[]) => void
}

const GoalSetting = ({ onSubmit }: GoalSettingProps) => {
  const [goals, setGoals] = useState<Goal[]>([])
  const [currentGoal, setCurrentGoal] = useState({
    title: '',
    category: 'CAREER' as Goal['category'],
    description: '',
    timeline: 'MEDIUM_TERM' as Goal['timeline']
  })

  const categoryOptions = [
    { value: 'CAREER', label: 'Career Development', icon: '💼', color: 'from-blue-500 to-indigo-500' },
    { value: 'EDUCATION', label: 'Education', icon: '🎓', color: 'from-green-500 to-emerald-500' },
    { value: 'BUSINESS', label: 'Business/Entrepreneurship', icon: '🚀', color: 'from-purple-500 to-pink-500' },
    { value: 'PERSONAL', label: 'Personal Growth', icon: '🌟', color: 'from-orange-500 to-red-500' }
  ]

  const timelineOptions = [
    { value: 'SHORT_TERM', label: 'Short Term (3-6 months)', icon: '⚡' },
    { value: 'MEDIUM_TERM', label: 'Medium Term (6-18 months)', icon: '📅' },
    { value: 'LONG_TERM', label: 'Long Term (1-3 years)', icon: '🎯' }
  ]

  const addGoal = () => {
    if (currentGoal.title.trim() && currentGoal.description.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        ...currentGoal,
        title: currentGoal.title.trim(),
        description: currentGoal.description.trim()
      }
      setGoals(prev => [...prev, newGoal])
      setCurrentGoal({
        title: '',
        category: 'CAREER',
        description: '',
        timeline: 'MEDIUM_TERM'
      })
    }
  }

  const removeGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (goals.length > 0) {
      onSubmit(goals)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <span className="text-3xl">🎯</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold gradient-text mb-2"
        >
          Define Your Goals
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg"
        >
          What do you want to achieve? Choose 1-3 main goals
        </motion.p>
      </div>

      <div className="space-y-8">
        {/* Add New Goal Form */}
        <motion.div 
          className="card-glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">✨</span>
            Add a New Goal
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Goal Title */}
            <div>
              <label htmlFor="goalTitle" className="block text-sm font-semibold text-gray-700 mb-3">
                🏷️ Goal Title
              </label>
              <input
                type="text"
                id="goalTitle"
                value={currentGoal.title}
                onChange={(e) => setCurrentGoal(prev => ({ ...prev, title: e.target.value }))}
                className="input-field"
                placeholder="e.g., Become a Software Developer"
              />
            </div>

            {/* Goal Category */}
            <div>
              <label htmlFor="goalCategory" className="block text-sm font-semibold text-gray-700 mb-3">
                📂 Category
              </label>
              <select
                id="goalCategory"
                value={currentGoal.category}
                onChange={(e) => setCurrentGoal(prev => ({ ...prev, category: e.target.value as Goal['category'] }))}
                className="input-field"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Goal Description */}
            <div className="md:col-span-2">
              <label htmlFor="goalDescription" className="block text-sm font-semibold text-gray-700 mb-3">
                📝 Description
              </label>
              <textarea
                id="goalDescription"
                value={currentGoal.description}
                onChange={(e) => setCurrentGoal(prev => ({ ...prev, description: e.target.value }))}
                className="input-field"
                rows={3}
                placeholder="Describe your goal in detail..."
              />
            </div>

            {/* Timeline */}
            <div className="md:col-span-2">
              <label htmlFor="goalTimeline" className="block text-sm font-semibold text-gray-700 mb-3">
                ⏰ Timeline
              </label>
              <select
                id="goalTimeline"
                value={currentGoal.timeline}
                onChange={(e) => setCurrentGoal(prev => ({ ...prev, timeline: e.target.value as Goal['timeline'] }))}
                className="input-field"
              >
                {timelineOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <motion.button
                type="button"
                onClick={addGoal}
                className="btn-primary w-full"
                disabled={!currentGoal.title.trim() || !currentGoal.description.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ✨ Add Goal
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Selected Goals */}
        <AnimatePresence>
          {goals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">📋</span>
                Your Goals ({goals.length}/3)
              </h3>
              <div className="space-y-4">
                {goals.map((goal, index) => {
                  const category = categoryOptions.find(cat => cat.value === goal.category)
                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, scale: 0.95, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="step-card"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl bg-gradient-to-r ${category?.color} text-white shadow-lg`}>
                            {category?.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-xl font-bold text-gray-900">{goal.title}</h4>
                              <span className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">
                                {goal.timeline.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{goal.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">Category:</span>
                              <span className="text-sm font-medium text-gray-700">{category?.label}</span>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => removeGoal(goal.id)}
                          className="text-red-500 hover:text-red-700 ml-4 p-2 hover:bg-red-50 rounded-full transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="text-xl">×</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            type="submit"
            className="btn-primary w-full text-lg"
            disabled={goals.length === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🚀 Generate My Roadmap ({goals.length} goal{goals.length !== 1 ? 's' : ''})
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  )
}

export default GoalSetting 