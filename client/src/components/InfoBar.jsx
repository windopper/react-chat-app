import styled from "styled-components";

const InfoBar = ({room}) => {
    return (
        <OuterContainer>
            <LeftInnerContainer>
                <h3>방 '{room}' 에 접속하였습니다</h3>
            </LeftInnerContainer>
            <RightInnerContainer>
                <a href='/'>
                    나가기
                </a>
            </RightInnerContainer>
        </OuterContainer>
    )
}

const OuterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    background-color: #ced4da;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
`

const LeftInnerContainer = styled.div`
    display: flex;
    flex-direction: row;

`

const RightInnerContainer = styled.div`

`



export default InfoBar;