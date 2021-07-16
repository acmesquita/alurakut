import { MainGrid } from '../components/MainGrid'
import { Box } from '../components/Box'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'
import { useEffect, useState } from 'react'

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} alt="Image do usuário" style={{ borderRadius: '8px'}}/>
      <hr/>

      <a className="boxLink" href={`https://github.com/${githubUser}`}>
        @{githubUser}
      </a>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationBox({ data, title }) {
  return (
     <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {title} ({data.length})
          </h2>
          <ul>
            {data.splice(0, 6).map(item => (
              <li key={item.id}>
                <a href={`/users/${follow.login}`}>
                  <img src={follow.avatar_url} alt={follow.login}/>
                  <span>{follow.login}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProfileRelationsBoxWrapper>
  )
}

/**
 * {
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }
 */

export default function Home() {
  const githubUser = 'acmesquita'

  const [follows, setFollows] = useState([])
  const [comunidades, setComunidades] = useState([])

  const friends = [
    'tiagogodinho',
    'vitorkusiaki',
    'augustohub',
    'tkusuki',
    'squarizi',
    'AllanSiqueira'
  ]

  function findFollows() {
    fetch(`https://api.github.com/users/${githubUser}/followers`).then(response => {
      if(response.ok) return response.json()

      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
    })
    .then(data => {
      setFollows(data)
    })
    .catch(error => console.error(error))
  }

  function findComunidades() {
    fetch(`/api/comunidades`).then(response => {
      if(response.ok) return response.json()

      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
    })
    .then(data => {
      setComunidades(data)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    findFollows()
    findComunidades()
  }, [])

  function handleSubmitForm(event) {
    event.preventDefault()

    const dataForm = new FormData(event.target)
    const comunidade = {
      id: new Date().toISOString(),
      title: dataForm.get('title'),
      image: dataForm.get('image')
    }

    fetch('/api/comunidades', {
      method: 'POST',
      body: JSON.stringify(comunidade)
    }).then(response => {
      if(response.ok) {
        return response.json()
      }

      throw new Error('Erro ao adicionar a comunidade')
    })
    .then(data => setComunidades([...comunidades, data]))
    .catch(error => console.error(error))

  }

  return (
    <>
    <AlurakutMenu githubUser={githubUser}/>
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea'}}>
      <ProfileSidebar githubUser={githubUser}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className="title">
            Bem Vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>
        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={handleSubmitForm}>
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>
            <div>
              <input
                placeholder="Coloque uma URL para usarmos como capa"
                name="image"
                aria-label="Coloque uma URL para usarmos como capa"
                type="text"
              />
            </div>
            <button>
              Criar a comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationArea" style={{ gridArea: 'profileRelationArea'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Seguidores ({follows.length})
          </h2>
          <ul>
            {follows.filter((item, index) => index < 6 && item).map(follow => (
              <li key={follow.id}>
                <a href={`/users/${follow.login}`}>
                  <img src={follow.avatar_url} alt={follow.login}/>
                  <span>{follow.login}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.filter((item, index) => index < 6 && item).map(comunidade => (
              <li key={comunidade.id}>
                <a href={`/comunidade/${comunidade.title}`}>
                  <img src={comunidade.image} alt={comunidade.title}/>
                  <span>{comunidade.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Amigos ({friends.length})
          </h2>
          <ul>
            {friends.filter((item, index) => index < 6 && item).map(friend => (
              <li key={friend}>
                <a href={`/users/${friend}`}>
                  <img src={`https://github.com/${friend}.png`} alt={friend}/>
                  <span>{friend}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProfileRelationsBoxWrapper>

      </div>
    </MainGrid>
    </>
  )
}
