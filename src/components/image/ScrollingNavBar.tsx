import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../UseIntersectionObserver';

interface ScrollingNavbarProps {
  idxList: number[];
}
const ScrollingNavbar = (props: ScrollingNavbarProps) => {
  const [currentSelectIdx, setCurrentSelectIdx] = useState<number>(0);

  const { observe, unobserve } = useIntersectionObserver({
    onIntersection({ target }) {
      const id = target.id.split('_').at(-1) || '0';
      setCurrentSelectIdx(parseInt(id));
    },
  });

  useEffect(() => {
    const allSectionList = document.querySelectorAll('.image-scroll .image');
    allSectionList.forEach(observe);
    return () => allSectionList.forEach(unobserve);
  }, []);

  useEffect(() => {
    console.log('currentSelectIdx', currentSelectIdx);
  }, [currentSelectIdx]);
  const navItemElements = props.idxList.map((idx) => (
    <NavItem
      idx={idx}
      isActive={idx === currentSelectIdx}
      onClick={setCurrentSelectIdx}
    />
  ));

  return <div className="scroll-bar-list">{navItemElements}</div>;
};
export default ScrollingNavbar;

interface NavItemProp {
  idx: number;
  isActive: boolean;
  onClick: (idx: number) => void;
}

const NavItem = ({ idx, isActive, onClick }: NavItemProp) => {
  return (
    <div
      id={`${idx}`}
      onClick={() => onClick(idx)}
      className={`${isActive ? 'active' : ''}`}
    />
  );
};
