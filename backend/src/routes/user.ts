import { Router, Request, Response } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Get user profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    // Placeholder for user profile retrieval
    console.log('👤 Getting user profile...')
    
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) {
    //   return res.status(401).json({ error: 'Unauthorized' })
    // }

    // const { data, error } = await supabase
    //   .from('profiles')
    //   .select('*')
    //   .eq('id', user.id)
    //   .single()

    // if (error) throw error

    res.json({
      success: true,
      profile: {
        id: 'temp_user_id',
        email: 'user@example.com',
        educationLevel: 'SHS',
        financialStatus: 'MODERATE',
        skills: [],
        location: 'Accra, Ghana'
      } // Placeholder
    })

  } catch (error) {
    console.error('❌ Error getting profile:', error)
    res.status(500).json({
      error: 'Failed to get profile',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Update user profile
router.put('/profile', async (req: Request, res: Response) => {
  try {
    const { profile } = req.body

    if (!profile) {
      return res.status(400).json({ error: 'Profile data is required' })
    }

    // Placeholder for profile update
    console.log('👤 Updating user profile...')
    
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) {
    //   return res.status(401).json({ error: 'Unauthorized' })
    // }

    // const { data, error } = await supabase
    //   .from('profiles')
    //   .upsert({
    //     id: user.id,
    //     ...profile,
    //     updated_at: new Date()
    //   })

    // if (error) throw error

    res.json({
      success: true,
      message: 'Profile updated successfully',
      profile
    })

  } catch (error) {
    console.error('❌ Error updating profile:', error)
    res.status(500).json({
      error: 'Failed to update profile',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get user roadmaps
router.get('/roadmaps', async (req: Request, res: Response) => {
  try {
    // Placeholder for roadmap retrieval
    console.log('🗺️ Getting user roadmaps...')
    
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) {
    //   return res.status(401).json({ error: 'Unauthorized' })
    // }

    // const { data, error } = await supabase
    //   .from('roadmaps')
    //   .select('*')
    //   .eq('user_id', user.id)
    //   .order('created_at', { ascending: false })

    // if (error) throw error

    res.json({
      success: true,
      roadmaps: [] // Placeholder
    })

  } catch (error) {
    console.error('❌ Error getting roadmaps:', error)
    res.status(500).json({
      error: 'Failed to get roadmaps',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export { router as userRoutes } 