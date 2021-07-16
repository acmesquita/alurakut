import { createCommunities } from '../../services/createCommunities'
import { listCommunities } from '../../services/listCommunities'

export default async function Comunidades(request, response) {
  if (request.method === 'GET') {
    const data = await listCommunities(request, response);
    console.log(data)
    response.json(data)
    return;
  }

  if (request.method === 'POST') {
    const data = await createCommunities(request, response);
    response.json(data)
    return;
  }
}