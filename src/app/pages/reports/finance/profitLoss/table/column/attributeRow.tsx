import { FC } from 'react'

type Props = {
    row: any
    product: any
}

const AttributeRow: FC<Props> = ({ row, product }) => {
    return <tr className='border-gray-300 border-bottom-1'>
        <td></td>
        <td>{row.variant}</td>
        <td>{row.qty}</td>
        <td>{row.buying_price}</td>
        <td>{row.gross_sales}</td>
        {/* <td>{row.discount}</td> */}
        {/* <td>{row.tax}</td>
        <td>{row.net_sales}</td>
        <td>{row.gross_profit}</td> */}
    </tr>
}

export default AttributeRow
