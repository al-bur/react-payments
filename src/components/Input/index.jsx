import styled from 'styled-components';

import PropTypes from 'prop-types';

export default function Input({
  description,
  margin,
  placeholder,
  textAlign,
  type,
  value,
  width,
  onChangeFunc,
}) {
  const StyledInput = styled.input`
    background: #ecebf1;
    border: none;
    border-radius: 7px;
    color: #04c09e;
    font-size: 18px;
    height: 45px;
    margin: ${margin?.t || '0'} ${margin?.r || '0'} ${margin?.b || '0'}
      ${margin?.l || '0'};
    text-align: ${textAlign};
    width: ${width};

    ::placeholder {
      color: #737373;
    }
  `;

  const StyledLabel = styled.label`
    display: block;
    font-size: 12px;
    color: #525252;
    margin-bottom: 3px;
  `;

  return (
    <>
      {description && <StyledLabel>{description}</StyledLabel>}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFunc}
      />
    </>
  );
}

Input.defaultProps = {
  textAlign: 'center',
  type: 'text',
  width: '318px',
};

Input.propTypes = {
  description: PropTypes.string,
  placeholder: PropTypes.string,
  textAlign: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  onChangeFunc: PropTypes.func,
};
