import React, { useRef, useState } from 'react';
import '../../assets/styles/image.css';
import ScrollingNavbar from './ScrollingNavBar';
interface FullImageContainerProps {
  imageList?: string[];
  tempImage?: string[];
}
const FullImageContainer = (props: FullImageContainerProps) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  /** 요소를 드래그하고 있는가? */
  const [isDragging, setIsDragging] = useState<boolean>(false);

  /** 드래그 시작 시점의 X축 좌표값 */
  const [startX, setStartX] = useState<number>(0);

  /** 드래그 시작 시점의 스크롤 포지션이 포함된 X축 좌표값 */
  const [totalX, setTotalX] = useState<number>(0);

  const throttle = (func: () => void, delay: number) => {
    let timer;
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        func();
      }, delay);
    }
  };

  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    const x = e.clientX;
    setStartX(x);
    if (
      imageContainerRef.current &&
      'scrollLeft' in imageContainerRef.current
    ) {
      setTotalX(x + imageContainerRef.current.scrollLeft);
    }
  };

  const onDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    // todo 스크롤 div 벗어나면 안되는 문제 있음
    throttle(function () {
      e.preventDefault();
      e.stopPropagation();

      const scrollLeft = totalX - e.clientX;

      if (
        imageContainerRef.current &&
        'scrollLeft' in imageContainerRef.current
      ) {
        // 스크롤 발생
        imageContainerRef.current.scrollLeft = scrollLeft;
      }
    }, 100);
  };
  const onDragEnd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isDragging) return;
    if (!imageContainerRef.current) return;
    setIsDragging(false);
  };

  return (
    <>
      <div className="full-image-container">
        <div
          className="image-scroll"
          ref={imageContainerRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          {props.tempImage?.map((image, idx) => (
            <div
              key={`image_${idx}`}
              id={`image_${idx}`}
              className="image"
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>

        {/*<div className="scroll-bar-list">*/}
        {/*  {props.tempImage?.map((image, idx) => <div />)}*/}
        {/*</div>*/}
        <ScrollingNavbar
          idxList={props.tempImage?.map((img, idx) => idx) || []}
        />
      </div>
    </>
  );
};

export default FullImageContainer;
