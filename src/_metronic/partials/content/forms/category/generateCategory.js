export const generateCatLabel = (data) => {
    let list = [];
    data && data.length > 0 &&
        data.map((item) => {
            const cat = {
                id: item.id,
                image: item.image,
                icon: item.icon,
                position: item.position,
                parent_id: item.parent_id,
                value: item.slug,
                label: item.text,
                name: item.text
            };
            list.push(cat);
            if (item.children && item.children.length > 0) {
                const child = makeChildren(item.children)
                list.push(...child)
            }
        })
    return list
}

const makeChildren = (cld) => {
    let list = [];
    cld.map((item) => {
        const cat = {
            id: item.id,
            image: item.image,
            icon: item.icon,
            position: item.position,
            parent_id: item.parent_id,
            value: item.slug,
            label: (item.__depth === 1 ? "—" : item.__depth === 2 ? "——" : item.__depth === 3 ? "———" : item.__depth === 4 ? "————" : item.__depth === 5 ? "—————" : '') + item.text,
            name: (item.__depth === 1 ? "—" : item.__depth === 2 ? "——" : item.__depth === 3 ? "———" : item.__depth === 4 ? "————" : item.__depth === 5 ? "—————" : '') + item.text
        };
        list.push(cat);
        if (item.children && item.children.length > 0) {
            const child = makeChildren(item.children)
            list.push(...child)
        }
    })
    return list
}