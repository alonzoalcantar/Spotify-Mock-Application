import styled from "styled-components/macro";

export const StyledSelectDropDown = styled.div`
    select {
        background-color: ${props => props.active ? 'rgba(255,255,255,0.1)' : 'transparent'};
        appearance: none;
        border: 0;
        color: gold;
        font-size: 17px
    }
`;