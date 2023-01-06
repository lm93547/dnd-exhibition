import { DeleteIcon, DownloadIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { Flex, Tooltip } from "@chakra-ui/react";

type Props = {
  clearCanvas: () => void;
  downloadArrangement: () => void;
  clearSelected: () => void;
};

const ExhibitionButtons = ({ clearCanvas, downloadArrangement, clearSelected }: Props) => {
  return (
    <Flex>
      <Tooltip w="fit-content" label="Clear All Items">
        <Flex
          _hover={{ bg: "darkgray", cursor: "pointer" }}
          p={6}
          bg="red.400"
          w="fit-content"
          onClick={clearCanvas}
        >
          <NotAllowedIcon color="white" />
        </Flex>
      </Tooltip>
      <Tooltip w="fit-content" label="Clear Selected">
        <Flex
          _hover={{ bg: "darkgray", cursor: "pointer" }}
          p={6}
          bg="red.400"
          w="fit-content"
          onClick={clearSelected}
        >
          <DeleteIcon color="white" />
        </Flex>
      </Tooltip>
      <Tooltip w="fit-content" label="Download Exhibition">
        <Flex
          _hover={{ bg: "darkgray", cursor: "pointer" }}
          p={6}
          bg="red.400"
          w="fit-content"
          onClick={downloadArrangement}
        >
          <DownloadIcon color="white" />
        </Flex>
      </Tooltip>
    </Flex>
  );
};

export default ExhibitionButtons;
