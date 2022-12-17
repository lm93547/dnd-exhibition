import { useState, DragEvent } from "react";
import { flowers } from "./data/flowers";
import DraggableComponent from "./components/Draggable";
import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, Image, Tooltip } from "@chakra-ui/react";
import { Flower, Positions } from "./globals";
import useSetItemPositions from "./hooks/useSetItemPositions";

function App() {
  const [flowerState] = useState<Flower[]>(flowers);
  const [exhibitionState, setExhibitionState] = useState<Flower[]>([]);
  const [positions, setPositions] = useState<Positions>({});

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
  };

  useSetItemPositions({
    positions: { state: positions, setPositions },
    exhibition: { state: exhibitionState, setExhibitionState },
  });

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
          <Flex w="100vw" h="100%" overflowX="scroll">
            {exhibitionState.map(({ title, imgSource }) => {
              return (
                <DraggableComponent
                  key={title}
                  setPositions={setPositions}
                  positions={positions}
                  imageTitle={title}
                  imageSource={imgSource}
                  exhibitionState={exhibitionState}
                  setExhibitionState={setExhibitionState}
                />
              );
            })}
          </Flex>
          <Tooltip w="fit-content" label="Clear All Items">
            <Flex
              _hover={{ bg: "darkgray", cursor: "pointer" }}
              p={6}
              bg="red.400"
              w="fit-content"
              onClick={clearCanvas}
            >
              <DeleteIcon color="white" />
            </Flex>
          </Tooltip>
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
