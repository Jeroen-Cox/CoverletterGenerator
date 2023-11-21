import { useFetch } from 'nuxt/app'
const baseUrl = 'https://api.openai.com/v1'

export default function useOpenAi(apiKey: string) {
  const chatCompletion = async () => {
    try {
      const { data: choices } = await useFetch(`${baseUrl}/chat/completions`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'POST',
        body: {
          model: 'gpt-3.5-turbo',
          temperature: 1,
          max_tokens: 240,
          messages: [
            { role: 'system', content: instructions },
            { role: 'user', content: 'I want to work at Apple' }
          ]
        }
      })
      return choices
    } catch (error) {
      return error
    }
  }

  return { chatCompletion }
}

const instructions =
  'You are an expert in writing coverletters. A coverletter is a letter that you write to a company when you apply for a job. Your job is to write the best coverletter possible.'
