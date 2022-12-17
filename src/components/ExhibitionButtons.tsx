import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import { Flex, Tooltip } from "@chakra-ui/react";

type Props = {
    clearCanvas: () => void,
    downloadArrangement: () => void
};

const ExhibitionButtons = ({clearCanvas, downloadArrangement}: Props) => {
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
