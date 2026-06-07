import Heading from "@/components/editor/blocks/Heading";
import Paragraph from "@/components/editor/blocks/Paragraph";
import Image from "@/components/editor/blocks/Image";

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