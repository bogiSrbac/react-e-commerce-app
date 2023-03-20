import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
  H2,
  P
} from './directory-item.styles.jsx'

import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({category})=> {

    const {imageUrl, title, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route)

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
          <BackgroundImage style={{
            backgroundImage: `url(${imageUrl})`,            
          }} />
          <Body>
            <H2>{title}</H2>
            <P>Shop now</P>
          </Body>

        </DirectoryItemContainer>
    )

}


export default DirectoryItem;