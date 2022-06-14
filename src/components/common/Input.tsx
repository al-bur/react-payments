import { memo } from 'react';

import styled, { css } from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  textAlign?: string;
  width?: string;
  margin?: { t?: string; b?: string; l?: string; r?: string };
}

function Input({
  description,
  margin,
  placeholder,
  type,
  value,
  textAlign = 'center',
  width = '343px',
  ...props
}: Props) {
  return (
    <>
      {description && <Styled.Label>{description}</Styled.Label>}
      <Styled.Input
        margin={margin}
        placeholder={placeholder}
        textAlign={textAlign}
        type={type || 'text'}
        value={value}
        width={width}
        {...props}
      />
    </>
  );
}

const Styled = {
  Input: styled.input`
    background: #ecebf1;
    border: none;
    border-radius: 7px;
    color: #04c09e;
    font-size: 18px;
    height: 45px;

    ::placeholder {
      color: #737373;
    }

    ${({ margin, textAlign, width }: Props) => css`
      margin: ${margin?.t || '0'} ${margin?.r || '0'} ${margin?.b || '0'}
        ${margin?.l || '0'};
      text-align: ${textAlign};
      width: ${width};
    `}
  `,

  Label: styled.label`
    display: block;
    font-size: 12px;
    color: #525252;
    margin-bottom: 3px;
  `,
};

export default memo(Input);
