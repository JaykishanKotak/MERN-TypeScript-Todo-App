import { FC } from "react"

interface Props {
    title?: string,
    type?: "danger" | "normal" | "regular",
    onClick?(): void
}

/**
Types to defince Fun in ts
    onClick: () => void
    onClick?(): void
 */
const AppButton: FC<Props> = ({ title, type, onClick }) => {
    let color = "";

    switch (type) {
        case "danger":
            color = "bg-red-500"
            break;
        case "normal":
            color = "bg-gray-500"
            break;
        case "regular":
            color = "bg-blue-500"
            break;
        default:
            color = "bg-blue-500"
            break;
    }

    return (<button className={color + " text-white px-5 py-2 rounded"} onClick={onClick}>
        {title}
    </button>)
}

export default AppButton