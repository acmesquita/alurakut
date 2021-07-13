import { MainGrid } from '../components/MainGrid'
import { Box } from '../components/Box'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'
import { useState } from 'react'

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

export default function Home() {
  const [comunidades, setComunidades] = useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  const githubUser = 'acmesquita'
  const friends = [
    'tiagogodinho',
    'vitorkusiaki',
    'augustohub',
    'tkusuki',
    'squarizi',
    'AllanSiqueira'
  ]

  function handleSubmitForm(event) {
    event.preventDefault()

    const dataForm = new FormData(event.target)
    const comunidade = {
      id: new Date().toISOString(),
      title: dataForm.get('title'),
      image: dataForm.get('image')
    }

    setComunidades([...comunidades, comunidade])
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
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map(comunidade => (
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
            {friends.map(friend => (
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
