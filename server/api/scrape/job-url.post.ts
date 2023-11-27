import * as cheerio from 'cheerio'

export default defineEventHandler(async (event) => {
  const { jobUrl } = await readBody(event)
  try {
    const data = await $fetch(`${jobUrl}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_7; en-US) Gecko/20100101 Firefox/65.0'
      },
      method: 'GET'
    })
    if (data) {
      const job = await processDom(data)
      return {
        status: 200,
        job: job
      }
    } else {
      throw createError({ statusCode: 401, statusMessage: 'No html received' })
    }
  } catch (e) {
    throw createError({ statusCode: 401, statusMessage: 'Could not scrape url' })
  }
})

const processDom = async (responseBody: string) => {
  try {
    const $ = cheerio.load(responseBody)
    //Linkedin -- currently not working anymore
    const jobTitle = $('h1.topcard__title').text()
    const jobDetails = $('.show-more-less-html').text()
    const company = $('a.sub-nav-cta__optional-url').text()
    return {
      jobTitle: jobTitle,
      jobDetails: jobDetails,
      company: company
    }
  } catch (e) {
    throw createError({ statusCode: 401, statusMessage: 'Could not parse response body' })
  }
}
