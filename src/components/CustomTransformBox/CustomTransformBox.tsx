import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { NumberSize, Positions } from "../../globals";
import { Resizable } from "./ResizeWrapper";

type Props = {
  children: any;
  onDragMove: (e: MouseEvent, id: string) => void;
  style: any;
  image: {url: string, title: string, height: number, width: number, setSize: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >};
  selected: {set: Dispatch<SetStateAction<string>>, get: string}
  position: {set: Dispatch<SetStateAction<{}>>, get: Positions}
};

const CustomTransformBox = ({
  children,
  onDragMove,
  style,
  image,
  selected,
  position
}: Props) => {
  const onPointerDown = () => {};
  const onPointerUp = () => {};
  const onPointerMove = () => {};

  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(1);

  const handlePointerDown = () => {
    setIsDragging(true);
    onPointerDown();
  };

  const handlePointerUp = () => {
    setZIndex(1);
    setIsDragging(false);
    onPointerUp();
  };

  const handlePointerMove = (e: MouseEvent): void => {
    setZIndex(9999);
    if (isDragging) onDragMove(e, image.title);
    onPointerMove();
  };

  const handleSelected = () => {
    selected.set(image.title);
  };

  const handleDelete = () => {
    console.log(position.get);
  };

  const saveSize = (d: NumberSize) => {
    image.setSize({
      width: image.width + d.width,
      height: image.height + d.height,
    });
    let savedPositions = { ...position.get };
    const itemId = image.title;
    savedPositions[itemId]["width"] = image.width + d.width
    savedPositions[itemId]["height"] = image.height + d.height
    position.set(savedPositions);
  };

  return (
    <Box
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove as any}
      onPointerUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      zIndex={zIndex}
      onClick={handleSelected}
    >
      <Resizable
        size={{ width: image.width, height: image.height }}
        onResizeStop={(e, direction, ref, d) => {
          saveSize(d);
        }}
        selected={{set: selected.set, get: selected.get}}
        imageTitle={image.title}
      >
        {children}
      </Resizable>
    </Box>
  );
};

export default CustomTransformBox;
