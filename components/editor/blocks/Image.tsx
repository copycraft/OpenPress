interface ImageData {
    src: string;
    alt: string;
}

interface Props {
    data: ImageData;
    onChange: (imageData: ImageData) => void;
}

export default function Image({data, onChange}: Props) {
    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {

    }
}