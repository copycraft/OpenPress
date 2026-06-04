import Heading from "@/compontents/editor/blocks/Heading";
import Paragraph from "@/compontents/editor/blocks/Paragraph";
import Image from "@/compontents/editor/blocks/Image";

export const registry = {
    heading: {
        component: Heading,
        defaultData: {text:""},
        label: "heading",
    },
    paragraph: {
        component: Paragraph,
        defaultData: {text:""},
        label: "paragraph",
    },
    image: {
        component: Image,
        defaultData: {src:"", alt:""},
    }
}

export type  BlockType = keyof typeof registry;

export type Block = {
    id: string;
    type: BlockType;
    data: Record<string, string>;
}