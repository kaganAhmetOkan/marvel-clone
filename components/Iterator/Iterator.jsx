// Utility component for iterating over a given div element or a component for a given number of times, and returning them all together
// an alternative to .map() function


export default function Iterator ({ element: element, amount: amount}) {
    const elements = [];
    for (let i = 0; i < amount; i++) {
        elements.push(element);
    }

    return (
        <>{
            elements.map((object, index) => {
                return (
                    <div key={index}>
                        {object}
                    </div>
                )
            })
        }</>
    )
}