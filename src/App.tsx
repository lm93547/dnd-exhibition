import { Flex, Image } from "@chakra-ui/react";
import { useCallback, useEffect, useState, DragEvent } from "react";
import { DragHandleIcon } from "@chakra-ui/icons";
import GridLayout from "react-grid-layout";
import { flowers } from "./data/flowers";
import Draggable from "react-draggable";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import DraggableComponent from "./components/Draggable";

export type Flower = {
  title: string;
  imgSource: string;
};

function App() {
  const [flowerState, setFlowerState] = useState<Flower[]>(flowers);
  const [exhibitionState, setExhibitionState] = useState<Flower[]>([]);
  const [positions, setPositions] = useState({});

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
    setExhibitionState([])
    localStorage.removeItem("positions_div");
  }

  useEffect(() => {
    const existingDivPositions: string | null = JSON.parse(
      localStorage.getItem("positions_div") as string
    );

    const existingItemPositions: Flower[] = JSON.parse(
      localStorage.getItem("items_in_exhibition") as string
    );

    if(existingDivPositions){
        setPositions(existingDivPositions);
    }
    if(existingItemPositions){
        setExhibitionState(existingItemPositions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`positions_div`, JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem(`items_in_exhibition`, JSON.stringify(exhibitionState));
  }, [exhibitionState]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "gray",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div onClick={clearCanvas} >
        Clear Items
      </div>
      <div
        style={{
          height: "70vh",
          width: "100vw",
          backgroundColor: "grey",
          display: "flex",
        }}
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => onDragOver(e)}
      >
        <div style={{ display: "flex" }}>
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
        </div>
      </div>
      <div
        style={{
          height: "30vh",
          width: "100vw",
          backgroundColor: "lightgray",
        }}
      >
        <div style={{ display: "flex" }}>
          {flowerState.map(({ title, imgSource }) => {
            return (
              <div
                onDragStart={(e) => onDragStart(e, title)}
                key={title}
                draggable={true}
              >
                <img
                  src={imgSource}
                  width="800px"
                  height="200px"
                  style={{
                    maxHeight: "200px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
