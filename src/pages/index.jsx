import { MainGrid } from '../components/MainGrid'
import { Box } from '../components/Box'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} alt="Image do usuário" style={{ borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'acmesquita'
  const friends = [
    'tiagogodinho',
    'vitorkusiaki',
    'augustohub',
    'tkusuki',
    'squarizi',
    'AllanSiqueira'
  ]

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileAres" style={{ gridArea: 'profileArea'}}>
      <ProfileSidebar githubUser={githubUser}/>
      </div>
      <div style={{ gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className="title">
            Bem Vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>
      </div>
      <div style={{ gridArea: 'profileRelationArea'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Amigos ({friends.length})
          </h2>
          <ul>
            {friends.map(friend => (
              <li>
                <a href={`/users/${friend}`} key={friend}>
                  <img src={`https://github.com/${friend}.png`} alt={friend}/>
                  <span>{friend}</span>
                </a>
              </li>
            ))}
          </ul>
        </ProfileRelationsBoxWrapper>
        <Box>Comunidades</Box>
      </div>
    </MainGrid>
    </>
  )
}
