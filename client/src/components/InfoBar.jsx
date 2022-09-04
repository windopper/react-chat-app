import styled from "styled-components";

const InfoBar = ({room}) => {
    return (
        <OuterContainer>
            <LeftInnerContainer>
                <h3>{room}</h3>
            </LeftInnerContainer>
            <RightInnerContainer>
                <a href='/'>
                    home
                </a>
            </RightInnerContainer>
        </OuterContainer>
    )
}

const OuterContainer = styled.div`

`

const LeftInnerContainer = styled.div`
    
`

const RightInnerContainer = styled.div`
    
`



export default InfoBar;