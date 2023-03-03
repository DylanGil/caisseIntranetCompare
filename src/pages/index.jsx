import { useState, useRef } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Typography,
  Popconfirm,
} from "antd";

const { Title } = Typography;
const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 3,
    },
  },
};
const App = () => {
  const [totalCaisse, setTotalCaisse] = useState(0);
  const [totalIntranet, setTotalIntranet] = useState(0);
  const [nbCaisse, setNbCaisse] = useState(0);
  const [nbIntranet, setNbIntranet] = useState(0);
  const inputRef = useRef();
  const onFinish = (values, typeForm) => {
    console.log("Received values of form:", values);
    console.log("typeForm", typeForm);
    if (typeForm === "caisseForm") {
      setNbCaisse(values.names.length);
      setTotalCaisse(values.names.reduce((a, b) => a + b, 0));
    } else if (typeForm === "intranetForm") {
      setNbIntranet(values.names.length);
      setTotalIntranet(values.names.reduce((a, b) => a + b, 0));
    }
  };
  return (
    <div style={{ padding: 100 }}>
      <Row>
        <Col span={12} align="middle">
          <Title level={2}>Caisse/SumUp</Title>
          <Form
            name="caisseForm"
            {...formItemLayout}
            onFinish={(values) => onFinish(values, "caisseForm")}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.List
              name="names"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error("Au moins 2 infos"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...formItemLayout}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            message:
                              "S'il vous plaît entrer une info ou supprimer ce champ.",
                          },
                        ]}
                        noStyle
                      >
                        <InputNumber
                          placeholder="Entrer les données"
                          style={{
                            width: "60%",
                            textAlignLast: "center",
                          }}
                          autoFocus={true}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              add();
                            }
                          }}
                          ref={inputRef}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <Popconfirm
                          title="Êtes-vous sûr de vouloir supprimer?"
                          onConfirm={() => remove(field.name)}
                          cancelText="Non"
                          okText="Oui"
                        >
                          <MinusCircleOutlined className="dynamic-delete-button" />
                        </Popconfirm>
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{
                        width: "60%",
                        marginTop: "20px",
                        marginRight: "40px",
                      }}
                      icon={<PlusOutlined />}
                    >
                      Ajouter une info
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginRight: "40px",
                }}
              >
                Calculer
              </Button>
            </Form.Item>
            <Title
              level={2}
              style={{ marginLeft: "40px" }}
              type={
                totalCaisse == !0 || totalIntranet !== 0
                  ? totalCaisse === totalIntranet
                    ? "success"
                    : "danger"
                  : "default"
              }
            >
              Total: {totalCaisse} <br></br>
              Nombre de données: {nbCaisse}
            </Title>
          </Form>
        </Col>
        <Col span={12} align="middle">
          <Title level={2}>Intranet</Title>
          <Form
            name="intranetForm"
            {...formItemLayout}
            onFinish={(values) => onFinish(values, "intranetForm")}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.List
              name="names"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error("Au moins 2 infos"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...formItemLayout}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            message:
                              "S'il vous plaît entrer une info ou supprimer ce champ.",
                          },
                        ]}
                        noStyle
                      >
                        <InputNumber
                          placeholder="Entrer les données"
                          style={{
                            width: "60%",
                            textAlignLast: "center",
                          }}
                          autoFocus={true}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              add();
                            }
                          }}
                          ref={inputRef}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <Popconfirm
                          title="Êtes-vous sûr de vouloir supprimer?"
                          onConfirm={() => remove(field.name)}
                          cancelText="Non"
                          okText="Oui"
                        >
                          <MinusCircleOutlined className="dynamic-delete-button" />
                        </Popconfirm>
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{
                        width: "60%",
                        marginTop: "20px",
                        marginRight: "40px",
                      }}
                      icon={<PlusOutlined />}
                    >
                      Ajouter une info
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginRight: "40px",
                }}
              >
                Calculer
              </Button>
            </Form.Item>
            <Title
              level={2}
              style={{ marginLeft: "40px" }}
              type={
                totalCaisse == !0 || totalIntranet !== 0
                  ? totalCaisse === totalIntranet
                    ? "success"
                    : "danger"
                  : "default"
              }
            >
              Total: {totalIntranet} <br></br>
              Nombres de données: {nbIntranet}
            </Title>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default App;
