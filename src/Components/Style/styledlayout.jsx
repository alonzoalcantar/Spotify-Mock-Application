import styled from 'styled-components/macro';

export const StyledLayout = styled.section`

  .inner_layout {
    width: 100%;
    max-width: 500px;
    margin: auto auto;
    position: relative;
    padding: auto ;

  }

  .top_of_layout{
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: auto;
  }

  .layout_heading {
    display: flex;
    margin: auto;
    font-size: 20px;
  }

  .layout_breadcrumb {
    display: flex;
    color: grey;
  }

  .layout_see_all {
    display: flex;
    align-items: flex-end;
    text-transform: uppercase;
    color: grey;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    padding-bottom: auto;
  }
`;

