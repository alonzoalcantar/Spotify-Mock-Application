import styled from 'styled-components/macro';

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 10px;
  list-style: none;



  .list_item {
    background-color: grey;
    border-radius: 20px;


      img {
        box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
      }
    }

    a {
      display: block;
      width: 100%;
      height: 100%;

    }
  

  .inner_list_item {
    padding: auto;

  }

  .list_item_image {
    position: relative;
    padding-top: 100%;
    margin: auto auto auto;

    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: grey;
      border-radius: ${props => props.type === 'artist' ? '50%' : '2px'};
    }
  }

  .list_item_name {
    margin: auto auto auto;
    font-size: 20px;
    letter-spacing: normal;
  }

  .list_item_label {
    font-size: 14px;
    color: gray;
  }
`;