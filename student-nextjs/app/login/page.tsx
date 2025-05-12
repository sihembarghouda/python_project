// app/login/page.tsx
"use client";
import { FC, useState } from "react";
import { Form, Input, Button, Card, Space } from "antd";
import { useRouter } from "next/navigation";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    // Example: Add your authentication logic here
    setLoading(false);
    router.push("/dashboard"); // Redirect to dashboard after successful login
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
      <Card title="Connexion" style={{ width: 400 }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Se connecter
              </Button>
            </Space>
          </Form.Item>

          <Form.Item>
            <Button type="default" block onClick={handleRegisterClick}>
              S'inscrire
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
