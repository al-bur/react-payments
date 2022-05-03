import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e5e5e5;
    display: flex;
    font-family: 'Roboto', 'Malgun Gothic';
    justify-content: center;
  }
  
  ::placeholder {
    font-family: 'Roboto', 'Malgun Gothic';
  }
  `;

export default GlobalStyle;
