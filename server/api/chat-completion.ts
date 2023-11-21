import { ApplicationInfo } from '../../types/applicationInfo.interface'

export default defineEventHandler(async (event): Promise<string> => {
  const { applicationData } = await readBody(event)
  if (applicationData) {
    const response = await chatCompletion(applicationData)
    return response
  } else {
    throw new Error('No application data provided')
  }
})

const baseUrl = 'https://api.openai.com/v1'
interface ChatResponse {
  id: string
  object: string
  created: number
  choices: Choice[]
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number }
}

interface Choice {
  index: number
  message: { role: string; content: string }
  finish_reason: string
}

const chatCompletion = async (formData: ApplicationInfo): Promise<string> => {
  const config = await useRuntimeConfig()

  if (config.openAiApiKey) {
    try {
      const response: ChatResponse = await $fetch(`${baseUrl}/chat/completions`, {
        headers: { Authorization: `Bearer ${config.openAiApiKey}` },
        method: 'POST',
        body: {
          model: 'gpt-3.5-turbo',
          temperature: 1,
          messages: [
            { role: 'system', content: instructions },
            {
              role: 'user',
              content: `I want to work as a ${formData.jobTitle} at ${formData.company}, the job description is: . you can find all my relevant experience, skills and recommendations here: ${formData.linkedinUrl}. It would be great to summarize and mention my most important achievements in my coverletter. My last achievements are: ${formData.achievement_1} and ${formData.achievement_2} and ${formData.achievement_3}`
            }
          ]
        }
      })
      return response.choices[0].message.content
    } catch (error: any) {
      return error
    }
  } else {
    throw new Error('OpenAI API Key is not set')
  }
}

const instructions =
  'You are an expert in writing coverletters. A coverletter is an email that you write to a company when you apply for a job. Your job is to write the best coverletter possible. The coverletter should be maximum an A4 long.'
