import styled from 'styled-components'

export const MainGrid = styled.main`
  width: 100%;
  max-width: 500px;

  margin: 0 auto;
  padding: 1rem;

  grid-gap: 10px;

  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }

  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationArea";
    grid-template-columns: 160px 1fr 312px;
  }
`;