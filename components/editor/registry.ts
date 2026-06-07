import Heading from "@/components/editor/blocks/Heading";
import Paragraph from "@/components/editor/blocks/Paragraph";
import Image from "@/components/editor/blocks/Image";

export type SettingField = {
    key: string;
    label: string;
    type: "text" | "number" | "select";
    options?: string[];
}

export const registry = {
    heading: {
        component: Heading,
        defaultData: {text:"", fontSize : "32", align:"left", customCss:""},
        label: "heading",
        settings: [
            {key:"fontSize", label: "fontSize", type: "number"},
            {key:"align", label:"alignment", type: "select", options: ["left", "center", "right"]},
        ] as SettingField[]
    },
    paragraph: {
        component: Paragraph,
        defaultData: {text:"", fontSize : "16", align:"left", customCss:""},
        label: "paragraph",
        settings: [
            {key:"fontSize", label: "fontSize", type: "number"},
            {key:"align", label:"alignment", type: "select", options: ["left", "center", "right"]},
        ] as SettingField[]
    },
    image: {
        component: Image,
        defaultData: {src:"", alt:"", width: "100%", align:"left", customCss:""},
        settings: [
            {key:"width", label: "width", type: "text"},
            {key:"align", label:"alignment", type: "select", options: ["left", "center", "right"]},
        ] as SettingField[]
    }
}

export type  BlockType = keyof typeof registry;

export type Block = {
    id: string;
    type: BlockType;
    data: Record<string, string>;
}