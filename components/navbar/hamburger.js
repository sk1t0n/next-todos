import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  right: -30px;
  top: 12px;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.5);

  &:hover {
    border-color: #ccc;
    cursor: pointer;
    div {
      background-color: #ccc;
    }
  }
`;

const Line1 = styled.div`
  position: relative;
  left: 8px;
  top: 13px;
  width: 22px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.5s ease;

  .close & {
    transform: translateY(6px) rotate(45deg);
    transition: transform 0.5s ease;
  }
`;

const Line2 = styled.div`
  position: relative;
  left: 8px;
  top: 17px;
  width: 22px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.5s ease;

  .close & {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
`;

const Line3 = styled.div`
  position: relative;
  left: 8px;
  top: 21px;
  width: 22px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.5s ease;

  .close & {
    transform: translateY(-6px) rotate(-45deg);
    transition: transform 0.5s ease;
  }
`;

const handleClick = (ref, onClick) => {
  ref.current.classList.toggle('close');
  onClick();
};

const Hamburger = React.forwardRef(({ onClick }, ref) => (
  <Button
    ref={ref}
    onClick={() => handleClick(ref, onClick)}
  >
    <Line1 />
    <Line2 />
    <Line3 />
  </Button>
));
Hamburger.displayName = 'Hamburger';

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Hamburger;
