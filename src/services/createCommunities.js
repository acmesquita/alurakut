export async function createCommunities(request, response) {
  const res = await fetch('http://localhost:3001/communities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: request.body
  })
  const data = await res.json()
  return data;
}