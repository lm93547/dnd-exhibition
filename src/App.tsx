import { useEffect, useState, DragEvent } from "react";
import { flowers } from "./data/flowers";
import DraggableComponent from "./components/Draggable";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Tooltip } from "@chakra-ui/react";
import { Flower, Positions } from "./globals";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const [flowerState] = useState<Flower[]>(flowers);
  const [exhibitionState, setExhibitionState] = useState<Flower[]>([]);
  const [positions, setPositions] = useState<Positions>({});

  const onDragStart = (e: DragEvent<HTMLDivElement>, id: string): void => {
    e.dataTransfer.setData("id", id);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>): void => {
    let id = e.dataTransfer.getData("id");
    const itemDragged = flowerState.find((flower) => flower.title === id);
    const hasItemAlready = exhibitionState.find(
      (flower) => flower.title === itemDragged?.title
    );
    if (itemDragged && !hasItemAlready) {
      setExhibitionState((current) => [...current, itemDragged]);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const clearCanvas = (): void => {
    setExhibitionState([]);
    localStorage.removeItem("positions_div");
  };

  useEffect(() => {
    const existingDivPositions: Positions = JSON.parse(
      localStorage.getItem("positions_div") as string
    );

    const existingItemPositions: Flower[] = JSON.parse(
      localStorage.getItem("items_in_exhibition") as string
    );

    if (existingDivPositions) {
      setPositions(existingDivPositions);
    }
    if (existingItemPositions) {
      setExhibitionState(existingItemPositions);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(`positions_div`, JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem(
      `items_in_exhibition`,
      JSON.stringify(exhibitionState)
    );
  }, [exhibitionState]);



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
          <Flex w="100vw" h="100%">
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
      <Flex direction="column" justifyContent="center" height="30vh" width="100vw" backgroundColor="gray.600">
        <Flex>
          {flowerState.map(({ title, imgSource }) => {
            return (
              <Flex
                onDragStart={(e) => onDragStart(e, title)}
                key={title}
                draggable={true}
              >
                <Image
                  src={imgSource}
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
