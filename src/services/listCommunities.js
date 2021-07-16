
export async function listCommunities(request, response) {
  const res = await fetch('http://localhost:3001/communities')
  const data = await res.json()
  return data
}