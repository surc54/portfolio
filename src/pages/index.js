import * as React from "react"
import { Helmet } from 'react-helmet'

const PERSON_NAME = "Adithya Haridas"
const GITHUB_URL = 'https://www.github.com/surc54'
const LINKEDIN_URL = 'https://www.linkedin.com/in/adithyah54'

const IndexPage = () => {
  return (
    <main className="container mx-auto px-4" style={{ paddingTop: '30vh' }}>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>{PERSON_NAME} - Portfolio</title>
        <meta name="description" content="Discover Adithya's resume and personal projects, along with links to GitHub and LinkedIn." />
      </Helmet>

      <h1 className="text-4xl font-bold">{PERSON_NAME}</h1>

      <div className="flex space-x-2 mt-4">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
      </div>
    </main>
  )
}

export default IndexPage
