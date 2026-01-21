import React from 'react';
import styled from 'styled-components';

const MosaicWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${(props) => props.borderRadius || '8px'};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MosaicBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.thumbnail});
  background-repeat: repeat;
  background-size: ${(props) => `${props.tileSize}px ${props.tileSize}px`};
  filter: ${(props) => `blur(${props.blur}px)`};
  transform: scale(1.1);
  opacity: ${(props) => props.opacity};
  transition: opacity 0.3s ease, filter 0.3s ease;
`;

const MosaicContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Mosaic = ({
    thumbnail,
    children,
    blur = 12,
    tileSize = 120,
    opacity = 0.6,
    borderRadius = '8px'
}) => {
    return (
        <MosaicWrapper borderRadius={borderRadius}>
            <MosaicBackground
                thumbnail={thumbnail}
                blur={blur}
                tileSize={tileSize}
                opacity={opacity}
            />
            <MosaicContent>
                {children}
            </MosaicContent>
        </MosaicWrapper>
    );
};

export default Mosaic;
