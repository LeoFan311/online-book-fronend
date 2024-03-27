import { Table, Tag } from 'antd';
import { callOrderHistory } from '../../services/api';
import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        sorter: true,
    },
    {
        title: 'Time',
        dataIndex: 'createdAt',
        sorter: true,
    },
    {
        title: 'Price',
        dataIndex: 'totalPrice',
        render: (text, record, index) => {
            return (
                <div>
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(record.totalPrice)}
                </div>
            );
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (text, record, index) => {
            return <Tag color="green">Successful</Tag>;
        },
    },
    {
        title: 'Details',
        dataIndex: 'detailView',
        render: (text, record, index) => {
            return (
                <ReactJson
                    name="Order details"
                    src={record.detail}
                    displayDataTypes={false}
                    collapsed={false}
                    displayObjectSize={false}
                />
            );
        },
    },
];

const RenderHeader = () => <div style={{ fontWeight: 'bold', fontSize: '18px', opacity: 0.7 }}>Purchase History</div>;

const OrderHistory = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        const res = await callOrderHistory();
        if (res && res.data) {
            let data = res.data.map((item, index) => {
                item.stt = index + 1;
                return item;
            });
            setData(data);
        }
    };

    return (
        <div style={{ width: '1250px', maxWidth: 'calc(100% - 32px)', margin: '0 auto' }}>
            <Table title={RenderHeader} columns={columns} dataSource={data}></Table>
        </div>
    );
};
export default OrderHistory;
