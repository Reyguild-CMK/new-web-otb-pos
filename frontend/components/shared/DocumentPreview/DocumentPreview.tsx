interface DocumentPreviewProps {
    title: string
    src: string
}

export default function DocumentPreview({
    title,src}: DocumentPreviewProps){
    return(
        <div className="space-y-2">
            <h6 className="text-xs font-semibold">
                {title}
            </h6>
            <a 
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="block">
                <img 
                    src={src}
                    alt={title}
                    className="w-full rounded-md border object-cover p-1">
                </img>
            </a>
        </div>
    )
}