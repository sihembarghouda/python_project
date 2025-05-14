"use client";

import { useEffect, useState } from "react";
import { Typography, Select, Button, Form, message, Layout } from "antd";
import HeaderMenu from "@/components/header";
import api from "@/lib/http";
import { useRouter } from "next/navigation";

const { Title } = Typography;
const { Content } = Layout;

export default function InscriptionCoursPage() {
  const [courses, setCourses] = useState<{ id: string; nom: string }[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const router = useRouter();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    api
      .get("/formations")
      .then((res: any) => setCourses(res.data))
      .catch(() => message.error("Échec de récupération des formations"));
  }, []);

  const onFinish = async (values: any) => {
    try {
      const res = await api.post("/inscription-cours", {
        etudiant_id: currentUser.id,
        formation_id: selectedCourse,
      });

      message.success("Inscription Cours réussie !");
      router.push("/dashboard");
    } catch (error: any) {
      console.log("HERE");
      message.error("Échec de la connexion");
    }
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
              <Button type="primary" onClick={onFinish}>
                S'inscrire
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}
