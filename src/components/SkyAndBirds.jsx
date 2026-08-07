import React, { useEffect, useRef } from 'react';
import AnimeSkybox from './AnimeSkybox';

const SkyAndBirds = ({ isDark, onOpenModal, activeModal }) => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* 3D BACKGROUND */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}>
        <AnimeSkybox onOpenModal={onOpenModal} activeModal={activeModal} />
      </div>
    </div>
  );
};

export default SkyAndBirds;