'use client';

import { useState } from 'react';
import { Typography, Select, Button, Form, message, Layout } from 'antd';
import HeaderMenu from '@/components/header'; // adjust path if needed

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const availableCourses = [
  { id: 'C001', name: 'Mathematics' },
  { id: 'C002', name: 'Computer Science' },
  { id: 'C003', name: 'Physics' },
];

export default function InscriptionCoursPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const handleSubmit = () => {
    if (!selectedCourse) {
      message.error('Veuillez sélectionner un cours.');
      return;
    }

    message.success(`Vous êtes inscrit au cours : ${selectedCourse}`);
    setSelectedCourse(undefined);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderMenu active="inscription" />
      <Content style={{ padding: '50px' }}>
        <div style={{ background: '#fff', padding: 24, maxWidth: 600, margin: '0 auto', borderRadius: 8 }}>
          <Title level={2}>Inscription à un cours</Title>

          <Form layout="vertical">
            <Form.Item label="Choisissez un cours">
              <Select
                placeholder="Sélectionner un cours"
                value={selectedCourse}
                onChange={(value) => setSelectedCourse(value)}
              >
                {availableCourses.map((course) => (
                  <Option key={course.id} value={course.name}>
                    {course.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                S'inscrire
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}
