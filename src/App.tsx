import { useState, DragEvent, useEffect, useRef } from "react";
import { flowers } from "./data/flowers";
import DraggableComponent from "./components/Draggable";
import { Flower, Positions } from "./globals";
import useSetItemPositions from "./hooks/useSetItemPositions";
import { Flex, Image } from "@chakra-ui/react";
import { toJpeg } from "html-to-image";
import ExhibitionButtons from "./components/ExhibitionButtons";
import useHandleClickOutside from "./hooks/useHandleClickOutside";

function App() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [flowerState] = useState<Flower[]>(flowers);
  const [exhibitionState, setExhibitionState] = useState<Flower[]>([]);
  const [positions, setPositions] = useState<Positions>({});
  const [selected, setSelected] = useState<string>("");

  const onDragStart = (
    e: DragEvent<HTMLDivElement>,
    flowerItem: Flower
  ): void => {
    e.dataTransfer.setData("flower", JSON.stringify(flowerItem));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>): void => {
    const flowerObjectStringified = e.dataTransfer.getData("flower");
    const flowerObject = JSON.parse(flowerObjectStringified);

    if (flowerObject) {
      setExhibitionState((current) => [...current, flowerObject]);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const clearCanvas = (): void => {
    setExhibitionState([]);
    localStorage.removeItem("positions_div");
    setSelected("")
  };

  useSetItemPositions({
    positions: { state: positions, setPositions },
    exhibition: { state: exhibitionState, setExhibitionState },
  });

  const downloadArrangement = (): void => {
    toJpeg(document.getElementById("exhibitionPanel") as HTMLElement, { quality: 0.95 }).then(
      function (dataUrl) {
        var link = document.createElement("a");
        link.download = `flower-arrangement-${Math.random().toFixed(2)}.jpeg`;
        link.href = dataUrl;
        link.click();
      }
    );
  };

  const clearSelected = () => {
    const savedPositions = {...positions}
    delete savedPositions[selected]
    const clearedExhibitionState = exhibitionState.filter((e)=>e.title !== selected);
    setPositions(savedPositions);
    setExhibitionState(clearedExhibitionState);
  }

  useHandleClickOutside(ref, setSelected);
  
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Flex
        h="70vh"
        w="100vw"
        bgColor="grey"
        display="flex"
        justifyContent="center"
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => onDragOver(e)}
        scale={1}
      >
        <Flex w="100vw" direction="column" h="100%">
          <Flex ref={ref} id="exhibitionPanel" w="100vw" h="100%" overflowX="scroll">
            {exhibitionState.map(({ title, imgSource }) => {
              return (
                <DraggableComponent
                  key={title}
                  image={{title: title, url: imgSource}}
                  position={{get: positions, set: setPositions}}
                  selected={{get: selected, set: setSelected}}
                />
              );
            })}
          </Flex>
          <ExhibitionButtons clearSelected={clearSelected} clearCanvas={clearCanvas} downloadArrangement={downloadArrangement} />
        </Flex>
      </Flex>
      <Flex
        direction="column"
        justifyContent="center"
        height="30vh"
        width="100vw"
        backgroundColor="gray.600"
      >
        <Flex>
          {flowerState.map((flower) => {
            const flowerCopy = flower;
            const uniqueId = `${flower.title}-${Math.random().toFixed(2)}`;
            flowerCopy.title = uniqueId;

            return (
              <Flex
                onDragStart={(e) => onDragStart(e, flowerCopy)}
                key={flower.title}
                draggable={true}
              >
                <Image
                  src={flower.imgSource}
                  height="200px"
                  maxHeight={"200px"}
                  objectFit={"contain"}
                  objectPosition={"center"}
                />
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
