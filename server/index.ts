import express from 'express'
import fs from 'fs/promises'
import path from 'path'

const server = express()

server.get('/posts/:id', async (req, res) => {
  const { id } = req.params
  console.log(`${new Date().toISOString()}: GET /posts/${id}`)
  try {
    const jsonPath = path.join(__dirname, 'data', `${id}.json`)
    const json = await fs.readFile(jsonPath, 'utf-8')
    const post = JSON.parse(json)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    res.json(post)
  } catch {
    res.status(404)
    res.json({})
  }
})

server.get('/posts', async (req, res) => {
  console.log(`${new Date().toISOString()}: GET /posts`)
  const dirPath = path.join(__dirname, 'data')
  const files = await fs.readdir(dirPath)
  const posts = files.map((file) => {
    return file.split('.')[0]
  })
  await new Promise((resolve) => setTimeout(resolve, 3000))
  res.json(posts)
})

server.listen(3001)