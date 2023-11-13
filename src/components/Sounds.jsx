import { useRef } from 'react';

const Sounds = ({ moveSound, rotateSound, dropSound }) => {
  const moveSoundRef = useRef(new Audio(moveSound));
  const rotateSoundRef = useRef(new Audio(rotateSound));
  const dropSoundRef = useRef(new Audio(dropSound));

  const playMoveSound = () => {
    moveSoundRef.current.currentTime = 0;
    moveSoundRef.current.play();
  };

  const playRotateSound = () => {
    rotateSoundRef.current.currentTime = 0;
    rotateSoundRef.current.play();
  };

  const playDropSound = () => {
    dropSoundRef.current.currentTime = 0;
    dropSoundRef.current.play();
  };

  return { playMoveSound, playRotateSound, playDropSound };
};

export default Sounds;
