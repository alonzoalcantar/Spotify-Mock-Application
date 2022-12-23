import styled from "styled-components/macro";

export const StyledHistoryButton = styled.ul`
    display: flex;
    list-style: none;
    margin: auto auto auto;
    padding: 10px;
    justify-content: center;
    margin-top: 30px;



    li {
        margin: 0px 20px 0px 0px;
    }

    button {
        background-color: blueviolet;
        &:hover,
        &:focus{
            background-color: gold;
        }       
        
        &.focus {
        background-color: gold;
    }

}

`