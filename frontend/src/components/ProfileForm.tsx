import { useState } from 'react'
import { motion } from 'framer-motion'
import type { UserProfile } from '../types'

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void
}

const ProfileForm = ({ onSubmit }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    educationLevel: 'SHS' as UserProfile['educationLevel'],
    financialStatus: 'MODERATE' as UserProfile['financialStatus'],
    skills: [] as string[],
    location: ''
  })

  const [skillInput, setSkillInput] = useState('')

  const educationOptions = [
    { value: 'SHS', label: 'Senior High School Student', icon: '🎓' },
    { value: 'SHS_GRADUATE', label: 'SHS Graduate', icon: '🎯' },
    { value: 'UNIVERSITY', label: 'University Student', icon: '🏛️' },
    { value: 'OTHER', label: 'Other', icon: '🌟' }
  ]

  const financialOptions = [
    { value: 'LOW', label: 'Limited financial resources', icon: '💰' },
    { value: 'MODERATE', label: 'Some financial flexibility', icon: '💳' },
    { value: 'HIGH', label: 'Good financial resources', icon: '💎' }
  ]

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }))
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.email && formData.location) {
      onSubmit(formData as UserProfile)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <span className="text-3xl">🚀</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold gradient-text mb-2"
        >
          Welcome to AspirePath
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg"
        >
          Let's start by understanding your current situation
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
            📧 Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="input-field"
            placeholder="Enter your email address"
            required
          />
        </motion.div>

        {/* Education Level */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label htmlFor="education" className="block text-sm font-semibold text-gray-700 mb-3">
            🎓 Current Education Level
          </label>
          <select
            id="education"
            value={formData.educationLevel}
            onChange={(e) => setFormData(prev => ({ ...prev, educationLevel: e.target.value as UserProfile['educationLevel'] }))}
            className="input-field"
          >
            {educationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Financial Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label htmlFor="financial" className="block text-sm font-semibold text-gray-700 mb-3">
            💰 Financial Situation
          </label>
          <select
            id="financial"
            value={formData.financialStatus}
            onChange={(e) => setFormData(prev => ({ ...prev, financialStatus: e.target.value as UserProfile['financialStatus'] }))}
            className="input-field"
          >
            {financialOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            🛠️ Current Skills (Optional)
          </label>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="input-field flex-1"
              placeholder="Add a skill (e.g., programming, writing)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <button
              type="button"
              onClick={addSkill}
              className="btn-outline whitespace-nowrap"
            >
              Add
            </button>
          </div>
          {formData.skills.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formData.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-3">
            📍 Location (City/Region)
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="input-field"
            placeholder="e.g., Accra, Ghana"
            required
          />
        </motion.div>

        <motion.button 
          type="submit" 
          className="btn-primary w-full text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue to Goals 🎯
        </motion.button>
      </form>
    </motion.div>
  )
}

export default ProfileForm 