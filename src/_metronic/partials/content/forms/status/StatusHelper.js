import { getOrderStatusList } from '../../../../../app/library/api.helper';
export const getStatusData = async () => {
    const resp = await getOrderStatusList();
    if (resp.success && resp.status_code === 200) {
        let list = [];
        resp.data && resp.data.length > 0 &&
            resp.data.map((item) => {
                const cmp = {
                    ...item,
                    label: item.title,
                    value: item.id
                }
                list.push(cmp)
            })
        return list;
    } else {
        return []
    }
}