import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes, { array } from "prop-types";
import styled from "styled-components";
import picto1 from "../../img/picto1.png";
import picto2 from "../../img/picto2.png";
import picto3 from "../../img/picto3.png";
import picto4 from "../../img/picto4.png";
import fashplat1 from "../../img/fashionPlat(1).jpg";
import fashplat5 from "../../img/fashionPlat(5).jpg";
import journal1 from "../../img/journal(1).jpg";
import journal4 from "../../img/journal(2).jpg";
import menu1 from "../../img/menuImg(1).png";
import menu2 from "../../img/menuImg(2).jpg";
import menu3 from "../../img/menuImg(3).jpg";
import menu4 from "../../img/menuImg(4).jpg";

const MainBox = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
`;

/* Video Box */
const VideoBox = styled.div`
    display: flex;
    width: 100%;
    height: 450px;
`;

const VideoDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const VideoImg = styled.img`
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const Hr = styled.hr`
    height: 3px;
    background-color: white;
    border: none;
`;

const Hr2 = styled.hr`
    height: 3px;
    background-color: white;
    border: 1.5px solid black;
    width:70%;
    border-radius: 25px;
`;

const LeftLink = styled(Link)`
    position: absolute;
    left: 0;
    text-align: center;
    line-height: 450px;
    width: 10%;
    z-index: 2;
    color: white;
    font-weight: bold;
    font-size: 50px;
`;

const RightLink = styled(Link)`
    position: absolute;
    right: 0;
    text-align: center;
    line-height: 450px;
    width: 10%;
    z-index: 2;
    color: white;
    font-weight: bold;
    font-size: 50px;
`;

const VideoCon = styled.div`
    position: absolute;
    top: 303px;
    left: 10%;
    width: 80%;
    z-index: 2;
`;

const VideoHead = styled.h1`

`;

const VideoFoot = styled.h3`

`;

/* Journal Box */
const JournalBox = styled.div`
    width: 80%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const JournalUL = styled.ul`
    display: flex;

`;

const JournalLI = styled.li`
    text-align: left;
    margin-right: 40px;
    :last-child{
        margin: 0;
    }
`;

const JournalHead = styled.h3`
    font-size: 24px;
    margin-bottom: 15px;
`;

const JournalBot = styled.h3`
    font-size: 14px;
    margin-bottom: 5px;
`;

const JournalShort = styled.h5`
    font-size: 18px;
`;

const JournalLink = styled(Link)`

`;

const JournalImg = styled.img`
    width: 150px;
    height: 218px;
    margin-bottom: 10px;
`;

/* Fashion Box */
const FashionBox = styled.div`
    width: 80%;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FashionUL = styled.ul`
    display: flex;

`;

const FashionLI = styled.li`
    text-align: center;
    margin-right: 20px;
    :last-child{
        margin: 0;
    }
`;

const FashionLink = styled(Link)`

`;

const FashionImg = styled.img`
    width: 140px;
    height: 140px;
`;

/* Picktogram Box */
const PickBox = styled.div`
    width: 80%;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PickSenBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const PickEx = styled.p`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
`;

const PickExBottom = styled.p`
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
`;

const PickListBox = styled.div`
    display: flex;
    justify-content: center;
`;

const PickList = styled.div`
    width: 145px;
    margin-right: 40px;
    :last-child{
        margin-right: 0;
    }
`;

const PickImg = styled.img`
    width: 100%;
    background-repeat: no-repeat;
`;

const PickTitle = styled.h3`
    color: black;
    font-weight: bold;
    text-align: center;
`;

const PickCont = styled.p`
    color: gray;
    text-align: center;
`;

const GoLogin = styled(Link)`
    line-height: 50px;
    font-size:25px;
`;

const Hellomessage = styled.div`
    padding-top:25px;
    font-size:15px;
`;

const GoLogout = styled.button`
    border:none;
    background-color:white;
    line-height: 50px;
    font-size:25px;
    width:150px;
`;

const Passportbtn = styled.button`
    background-color:white;
    border:none;
    font-size:20px;
    &:hover{
        color:blue;
    }
`;

const HomePresenter = ({
    isLogined,
    logout,
    nickname,
    passportClick
}) => (
    <>
        <MainBox>
            <VideoBox>
                <VideoDiv>
                    <VideoImg src={menu1} />
                    <LeftLink to={"/Rhee/board"}>←</LeftLink>
                    <VideoCon>
                        <Hr />
                    </VideoCon>
                    <RightLink to={"/Rhee/community"}>→</RightLink>
                </VideoDiv>
            </VideoBox>
            {isLogined ? 
            (
            <>
            <Hellomessage>{nickname}님, 환영합니다!!</Hellomessage>
            <GoLogout onClick={logout}>logout
            </GoLogout>
            <Hr2 />
            </>
            ):(
            <>
            <GoLogin to="/Rhee/login" >login</GoLogin>
            <Passportbtn onClick={passportClick}>Google ID 로 Login</Passportbtn>
            <Hr2 /> 
            </>
            )}
            <JournalBox>
                <JournalUL>
                    <JournalLI>
                        <JournalHead>NEWS</JournalHead>
                        <JournalLink to='/Rhee'>
                            <JournalImg src={journal1} />
                        </JournalLink>
                        <JournalBot>Journal</JournalBot>
                        <JournalShort>Sustainable brush</JournalShort>
                    </JournalLI>
                    <JournalLI>
                        <JournalHead>EDITORIAL</JournalHead>
                        <JournalLink to='/Rhee'>
                            <JournalImg src={journal1} />
                        </JournalLink>
                        <JournalBot>Fashion</JournalBot>
                        <JournalShort>Reformation piece</JournalShort>
                    </JournalLI>
                    <JournalLI>
                        <JournalHead>COMMUNITY</JournalHead>
                        <JournalLink to='/Rhee'>
                            <JournalImg src={journal1} />
                        </JournalLink>
                        <JournalBot>Journal</JournalBot>
                        <JournalShort>Sustainable tree</JournalShort>
                    </JournalLI>
                    <JournalLI>
                        <JournalHead>JOURNAL</JournalHead>
                        <JournalLink to='/Rhee'>
                            <JournalImg src={journal4} />
                        </JournalLink>
                        <JournalBot>Journal</JournalBot>
                        <JournalShort>Vegan foods</JournalShort>
                    </JournalLI>
                </JournalUL>
            </JournalBox>
            <FashionBox>
                <FashionUL>
                    <FashionLI>
                        <FashionLink to="/">
                            <FashionImg src={fashplat1} />
                        </FashionLink>
                    </FashionLI>
                    <FashionLI>
                        <FashionLink to="/">
                            <FashionImg src={fashplat1} />
                        </FashionLink>
                    </FashionLI>
                    <FashionLI>
                        <FashionLink to="/">
                            <FashionImg src={fashplat1} />
                        </FashionLink>
                    </FashionLI>
                    <FashionLI>
                        <FashionLink to="/">
                            <FashionImg src={fashplat1} />
                        </FashionLink>
                    </FashionLI>
                    <FashionLI>
                        <FashionLink to="/">
                            <FashionImg src={fashplat5} />
                        </FashionLink>
                    </FashionLI>
                </FashionUL>
            </FashionBox>
            <PickBox>
                <PickSenBox>
                    <PickEx>SUSTAINABLE ETHICAL FASHION PLATFORM</PickEx>
                    <PickExBottom>Against this packaging, sustainability is a major issue to study how humans
                         <br />can solve and protect in harmony with the natural environment surrounding us.</PickExBottom>
                </PickSenBox>
                <PickListBox>
                    <PickList>
                        <PickImg src={picto1} />
                        <PickTitle>Highest Accesibility</PickTitle>
                        <PickCont>Accesibility is good</PickCont>
                    </PickList>
                    <PickList>
                        <PickImg src={picto2} />
                        <PickTitle>Eco blah</PickTitle>
                        <PickCont>blahblah</PickCont>
                    </PickList>
                    <PickList>
                        <PickImg src={picto3} />
                        <PickTitle>Helping eco</PickTitle>
                        <PickCont>Eco is good</PickCont>
                    </PickList>
                    <PickList>
                        <PickImg src={picto4} />
                        <PickTitle>100% Eco packaging</PickTitle>
                        <PickCont>Can Eco Pack</PickCont>
                    </PickList>
                </PickListBox>
            </PickBox>
        </MainBox>
    </>
);

HomePresenter.propTypes = {
    isLogined:PropTypes.bool,
    logout:PropTypes.func.isRequired,
    nickname:PropTypes.string,
    passportClick:PropTypes.func.isRequired
}

export default HomePresenter;