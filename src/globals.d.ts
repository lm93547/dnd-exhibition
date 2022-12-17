export type Flower = {
    title: string;
    imgSource: string;
};

export type Positions = {
    [x: string]: {x: number, y: number}
}

export type UseSetItemPositionsArgs = {
    positions: {
        state: Positions,
        setPositions: React.Dispatch<React.SetStateAction<Positions>>
    },
    exhibition: {
        state: Flower[]
        setExhibitionState: React.Dispatch<React.SetStateAction<Flower[]>>
    } 
}