import styled from "styled-components/macro";

export const StyledHeader = styled.header`
  display: flex;
  align-items: flex-end;
  position: relative;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
  background-color: gold;
  max-height: 500px;
  min-height: 250px;




  .header_inner {
    display: flex;
    align-items: flex-end;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: auto auto;

  }

  img.header_img {
    width: 20%;
    max-width: 250px;
    min-width: 150px;
    margin-right: auto;
    box-shadow: 0 100px 60px rgb(0 0 0 / 50%);
    background-color: grey;
    border-radius: ${props => props.type === 'user' ? '50%' : '0'};

  }

  .header_overline {
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: auto;
  }

  h1.header_name {
    font-size: 70px;
    font-weight: 900;
    line-height: 2;
    margin: auto auto auto auto;

  }

  .header_meta {
    display: flex;
    align-items: center;
    font-size: 17px;
    color: white;
    margin: auto;


     
  }
`;