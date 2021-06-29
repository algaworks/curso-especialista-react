import NavBar from '../../components/NavBar'
import * as DL from './Default.layout.styles'

interface DefaultLayoutProps {
  children: React.ReactNode
}

function DefaultLayoyt (props: DefaultLayoutProps) {
  return <DL.Wrapper>
    <DL.Header>
      header
    </DL.Header>
    <DL.Main>
      <DL.Navigation>
        <NavBar />
      </DL.Navigation>
      <DL.FeaturedContent>
        { props.children }
      </DL.FeaturedContent>
      <DL.Aside>
        aside
      </DL.Aside>
    </DL.Main>
  </DL.Wrapper>
}

export default DefaultLayoyt