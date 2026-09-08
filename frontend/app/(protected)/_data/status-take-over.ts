export interface Status {
    label: string,
    value: string
}

// Data Dummy
export const selectData: Status[] =[
    { label: "All", value: "all" },
    { label: "Take Over", value: "take over" },
    { label: "Without Take Over", value: "without take over" }
]