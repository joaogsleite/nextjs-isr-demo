## NextJS Incremental Static Regeneration Demo

https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration


## NextJS

### Pages

`http://localhost:3000/posts/{id}`

Everytime this page is requested, a cached version is served.

Every 60s, the post is fetched from the server.

### API

`http://localhost:3000/api/revalidate/{id}`

Call this endpoint to force update the post.

The post is fetched again from the server and the cache is updated.

## Server

NodeJS Express server project in folder `./server`.

### Endpoints:

`http://localhost:3001/posts`

`http://localhost:3001/posts/{id}`

### Data

Posts returned live inside `./server/data/` folder.

Each post is a JSON file. 

The name of the JSON file is the post id.