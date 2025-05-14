"use client";

import { useEffect, useState } from "react";
import { Typography, Select, Button, Form, message, Layout } from "antd";
import HeaderMenu from "@/components/header";
import api from "@/lib/http";

const { Title } = Typography;
const { Content } = Layout;

export default function InscriptionCoursPage() {
  const [courses, setCourses] = useState<{ id: string; nom: string }[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  useEffect(() => {
    api
      .get("/formations")
      .then((res: any) => setCourses(res.data))
      .catch(() => message.error("Échec de récupération des formations"));
  }, []);

  const handleSubmit = () => {
    if (!selectedCourse) {
      message.error("Veuillez sélectionner un cours.");
      return;
    }

    message.success(`Vous êtes inscrit au cours : ${selectedCourse}`);
    setSelectedCourse(undefined);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderMenu active="inscription" />
      <Content style={{ padding: "50px" }}>
        <div
          style={{
            background: "#fff",
            padding: 24,
            maxWidth: 600,
            margin: "0 auto",
            borderRadius: 8,
          }}
        >
          <Title level={2}>Inscription à un cours</Title>

          <Form layout="vertical">
            <Form.Item label="Choisissez un cours">
              <Select
                placeholder="Sélectionner un cours"
                style={{ width: 300 }}
                onChange={setSelectedCourse}
                options={courses.map((course) => ({
                  label: course.nom,
                  value: course.id,
                }))}
              />
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
