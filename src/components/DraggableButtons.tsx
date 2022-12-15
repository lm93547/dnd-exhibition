import { Flex, Tooltip } from "@chakra-ui/react";
import { DragHandleIcon, DeleteIcon } from "@chakra-ui/icons";

type Props = {
    toolbarOpacity: string;
    handleDelete: (imageTitle: string) => void;
    imageTitle: string;
};

function DraggableButtons({toolbarOpacity, handleDelete, imageTitle}: Props) {
  return (
    <Flex position="absolute">
      <Flex
        p="2"
        bg="red.300"
        h="fit-content"
        _hover={{ bg: "darkgray", cursor: "pointer", transition: "all 1s" }}
        opacity={toolbarOpacity}
      >
        <DragHandleIcon color="white" />
      </Flex>
      <Tooltip label="Delete Flower">
        <Flex
          p="2"
          bg="red.300"
          h="fit-content"
          _hover={{ bg: "darkgray", cursor: "pointer", transition: "all 1s" }}
          opacity={toolbarOpacity}
          onClick={() => handleDelete(imageTitle)}
        >
          <DeleteIcon color="white" />
        </Flex>
      </Tooltip>
    </Flex>
  );
}

export default DraggableButtons;
