import { memo } from 'react';

import styled, { css } from 'styled-components';

type Size = 'small' | 'medium' | 'large';

interface ButtonSize {
  height: string;
  fontSize: string;
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  border?: string;
  color?: string;
  fontWeight?: string;
  margin?: { t?: string; b?: string; l?: string; r?: string };
  shape?: string;
  size?: Size;
}

type StyleProps = Omit<Props, 'size'> & { buttonStyle: ButtonSize };

const getButtonSize = (size: Size): ButtonSize => {
  switch (size) {
    case 'small':
      return { height: '25px', fontSize: '14px' };
    case 'medium':
      return { height: '45px', fontSize: '17px' };
    case 'large':
      return { height: '65px', fontSize: '20px' };
  }
};

function Button({
  bgColor,
  border,
  color,
  children,
  fontWeight,
  margin,
  shape,
  size,
  onClick,
  ...props
}: Props) {
  const buttonStyle = getButtonSize(size);

  return (
    <Styled.Button
      bgColor={bgColor}
      border={border}
      buttonStyle={buttonStyle}
      color={color}
      fontWeight={fontWeight}
      margin={margin}
      shape={shape}
      onClick={onClick}
      {...props}
    >
      {children}
    </Styled.Button>
  );
}

Button.defaultProps = {
  bgColor: 'white',
  border: '0px',
  color: 'black',
  fontWeight: 'normal',
  shape: 'rectangle',
  size: 'medium',
  type: 'button',
};

const Styled = {
  Button: styled.button`
    cursor: pointer;

    ${({
      bgColor,
      border,
      shape,
      color,
      buttonStyle,
      fontWeight,
      margin,
    }: StyleProps) => css`
      background: ${bgColor};
      border: ${border};
      border-radius: ${shape === 'circle' && '50%'};
      color: ${color};
      font-size: ${buttonStyle.fontSize};
      font-weight: ${fontWeight};
      height: ${buttonStyle.height};
      margin: ${margin?.t || '0'} ${margin?.r || '0'} ${margin?.b || '0'}
        ${margin?.l || '0'};
      width: ${shape === 'circle' && buttonStyle.height};
    `}
  `,
};

export default memo(Button);
