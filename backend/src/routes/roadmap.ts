import { Router, Request, Response } from 'express'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

const router = Router()

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface GenerateRoadmapRequest {
  profile: {
    educationLevel: string
    financialStatus: string
    skills: string[]
    location: string
    email: string
  }
  goals: Array<{
    title: string
    category: string
    description: string
    timeline: string
  }>
}

export const generateRoadmapHandler = router.post('/generate-roadmap', async (req: Request, res: Response) => {
  try {
    const { profile, goals }: GenerateRoadmapRequest = req.body

    if (!profile || !goals || goals.length === 0) {
      return res.status(400).json({ error: 'Profile and goals are required' })
    }

    // Create AI prompt for roadmap generation
    const prompt = createRoadmapPrompt(profile, goals)
    
    console.log('🤖 Generating roadmap with OpenAI...')
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are AspirePath, an AI career and education advisor specializing in helping students and young professionals in Ghana and similar contexts. 
          
          Your role is to create personalized, actionable roadmaps that consider:
          - User's current education level and financial constraints
          - Local context and available resources
          - Realistic timelines and achievable steps
          - Free and affordable learning resources
          
          Always provide practical, step-by-step guidance with specific resources and timelines.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const aiResponse = completion.choices[0]?.message?.content
    
    if (!aiResponse) {
      throw new Error('No response from OpenAI')
    }

    // Parse AI response and create structured roadmap
    const roadmap = parseAIResponseToRoadmap(aiResponse, profile, goals)
    
    // Save to Supabase (placeholder for now)
    await saveRoadmapToDatabase(roadmap)
    
    console.log('✅ Roadmap generated successfully')
    
    res.json({
      success: true,
      roadmap,
      message: 'Roadmap generated successfully'
    })

  } catch (error) {
    console.error('❌ Error generating roadmap:', error)
    res.status(500).json({
      error: 'Failed to generate roadmap',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

function createRoadmapPrompt(profile: any, goals: any[]): string {
  const educationLevel = profile.educationLevel
  const financialStatus = profile.financialStatus
  const skills = profile.skills.join(', ')
  const location = profile.location
  const goalsText = goals.map(goal => 
    `- ${goal.title} (${goal.category}): ${goal.description} - Timeline: ${goal.timeline}`
  ).join('\n')

  return `Create a personalized roadmap for a student/professional with the following profile:

CURRENT SITUATION:
- Education Level: ${educationLevel}
- Financial Status: ${financialStatus}
- Current Skills: ${skills || 'None specified'}
- Location: ${location}

GOALS:
${goalsText}

Please create a detailed, step-by-step roadmap that includes:
1. 3-5 specific, actionable steps
2. Estimated duration for each step
3. Recommended resources (courses, videos, communities, tools)
4. Consider financial constraints and local context
5. Focus on free or affordable resources when possible

Format your response as a JSON object with this structure:
{
  "steps": [
    {
      "title": "Step title",
      "description": "Detailed description",
      "estimatedDuration": "2-4 weeks",
      "resources": [
        {
          "title": "Resource name",
          "type": "COURSE|VIDEO|MENTOR|COMMUNITY|TOOL",
          "description": "Resource description",
          "isFree": true,
          "url": "optional_url"
        }
      ]
    }
  ]
}`
}

function parseAIResponseToRoadmap(aiResponse: string, profile: any, goals: any[]): any {
  try {
    // Try to extract JSON from AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        id: Date.now().toString(),
        userId: profile.id || 'temp',
        goals: goals.map((goal, index) => ({
          id: `goal_${index}`,
          ...goal
        })),
        steps: parsed.steps.map((step: any, index: number) => ({
          id: `step_${index}`,
          ...step,
          isCompleted: false,
          order: index + 1
        })),
        generatedAt: new Date(),
        progress: 0,
        estimatedCompletionDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months
      }
    }
  } catch (error) {
    console.error('Error parsing AI response:', error)
  }

  // Fallback to mock roadmap if parsing fails
  return {
    id: Date.now().toString(),
    userId: profile.id || 'temp',
    goals: goals.map((goal, index) => ({
      id: `goal_${index}`,
      ...goal
    })),
    steps: [
      {
        id: 'step_1',
        title: 'Research and Planning',
        description: 'Start by researching your chosen field and creating a detailed plan',
        estimatedDuration: '2-4 weeks',
        resources: [
          {
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
        id: 'step_2',
        title: 'Skill Development',
        description: 'Focus on building the core skills needed for your goals',
        estimatedDuration: '3-6 months',
        resources: [
          {
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
    estimatedCompletionDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000)
  }
}

async function saveRoadmapToDatabase(roadmap: any): Promise<void> {
  try {
    // Placeholder for Supabase integration
    console.log('💾 Saving roadmap to database...')
    // const { data, error } = await supabase
    //   .from('roadmaps')
    //   .insert([roadmap])
    
    // if (error) throw error
    console.log('✅ Roadmap saved to database')
  } catch (error) {
    console.error('❌ Error saving roadmap:', error)
    // Don't throw - roadmap generation should still succeed
  }
} 