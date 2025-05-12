'use client';

import { Layout, Typography, Table } from 'antd';
import HeaderMenu from '@/components/header'; // adjust path if your structure is different

const { Content } = Layout;
const { Title } = Typography;

// Dummy data for enrolled courses
const followedCourses = [
  { key: '1', id: 'C001', name: 'Mathematics' },
  { key: '2', id: 'C002', name: 'Computer Science' },
];

const columns = [
  {
    title: 'ID Formation',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nom Formation',
    dataIndex: 'name',
    key: 'name',
  },
];

export default function DashboardPage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderMenu active="dashboard" />
      <Content style={{ padding: '50px' }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, maxWidth: 800, margin: '0 auto' }}>
          <Title level={2}>Mes Formations</Title>
          <Table columns={columns} dataSource={followedCourses} pagination={false} />
        </div>
      </Content>
    </Layout>
  );
}
