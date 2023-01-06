import { Image } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Positions } from "../globals";
import CustomTransformBox from "./CustomTransformBox/CustomTransformBox";
import useSetItem from "../hooks/useSetItem";
import "../style.css";

type Props = {
  image: { url: string; title: string };
  position: { set: Dispatch<SetStateAction<{}>>; get: Positions };
  selected: { set: Dispatch<SetStateAction<string>>; get: string };
};

const DraggableComponent = ({ image, position, selected }: Props) => {
  const { translate, setTranslate, imageSize, setImageSize } = useSetItem(
    image.title,
    position.get
  );

  const handleDragMove = (e: MouseEvent, id: string) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
    let savedPositions = { ...position.get };
    const itemId = id;
    savedPositions[itemId] = { x: 0, y: 0, height: 0, width: 0 };
    savedPositions[itemId]["x"] = translate.x;
    savedPositions[itemId]["y"] = translate.y;
    savedPositions[itemId]["height"] = imageSize.height;
    savedPositions[itemId]["width"] = imageSize.width;
    position.set(savedPositions);
  };

  return (
    <CustomTransformBox
      key={image.title}
      onDragMove={handleDragMove}
      style={{
        transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
        position: "absolute",
      }}
      image={{
        url: image.url,
        title: image.title,
        setSize: setImageSize,
        height: imageSize.height,
        width: imageSize.width,
      }}
      position={{set: position.set, get: position.get}}
      selected={{set: selected.set, get: selected.get}}
    >
      <Image
        src={image.url}
        height={imageSize.height}
        width={imageSize.width}
        objectFit={"contain"}
        objectPosition={"center"}
        pointerEvents="none"
        userSelect={"none"}
      />
    </CustomTransformBox>
  );
};

export default DraggableComponent;
