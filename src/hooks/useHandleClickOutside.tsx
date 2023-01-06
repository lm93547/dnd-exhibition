import {Dispatch, MutableRefObject, SetStateAction, useEffect} from "react";

const useHandleClickOutside = (
    ref: MutableRefObject<HTMLDivElement | null>,
    setSelected: Dispatch<SetStateAction<string>>
): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                ref.current &&
                ref.current.contains(event.target as HTMLElement)
            ) {
                setSelected("");
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);
};

export default useHandleClickOutside;