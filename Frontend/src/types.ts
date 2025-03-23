export type packs = {
    id: string;
    name: string;
    description: string;
    imageUrl1: string;
    imageUrl2: string;
    prompt: [];
}

export type image = {
    id: string;
    imageUrl: string;
    prompt: string;
}

export type model = {
    id: string;
    thumbnail: string;
    name: string;
}