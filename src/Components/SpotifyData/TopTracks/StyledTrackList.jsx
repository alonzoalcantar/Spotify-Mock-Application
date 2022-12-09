const { default: styled } = require("styled-components/macro");

export const StyledTrackList = styled.ul`
list-style: none;
margin: auto ;
padding: 20px 0px 0px 0px ;

.track_item {
  display: grid;
  align-items: center;
  grid-template-columns: 20px 1fr;
  grid-gap: 20px;
  padding: 10px;
  color: white;
  font-size: 15px;
  
}

.track_number {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 15px;
}

.track_title {
  display: flex;
  align-items: right;
}

.track_image {
  margin-right: 70px;
  width: 40px;
  height: 40px;
  background-color: grey;
}

.track_name {
  color: white;
  font-size: 15px;
  text-align: center;
}

.track_artist{
    text-align: center;
    font-weight: 200;
}


.track_album {
  display: none;
}

`