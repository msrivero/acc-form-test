import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker, Result } from "antd";
import dayjs from "dayjs";
import { getUserDetails, postUserDetails } from "./FormComponent.service";
import "./FormComponent.css";
import { IResult, IResponse, IUser } from "./types";

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
};

const buttonContainerLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

const FormComponent = () => {
  const [form] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState<Boolean>(true);
  const [isResultVisible, setIsResultVisible] = useState<Boolean>(false);
  const [resultConfig, setResultConfig] = useState<IResult>({
    status: "info",
    title: "",
  });

  useEffect(() => {
    getUserDetails()
      .then((response) => {
        let [user] = response.data.results;
        form.setFieldsValue({
          firstname: user.name.first,
          lastname: user.name.last,
          email: user.email,
        });
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, []);

  const onFormSubmit = (result: IResponse) => {
    if (result.status === 200) {
      setResultConfig({
        status: "success",
        title: `Order ${result.data.requestId} successfully placed!`,
      });
      setIsFormVisible(false);
      setIsResultVisible(true);
    } else {
      setResultConfig({
        status: "error",
        title: "Something wrong, please try again!",
      });
      setIsFormVisible(false);
      setIsResultVisible(true);
    }
  };

  const onFinish = (values: IUser) => {
    postUserDetails(values, onFormSubmit);
  };
  const onReset = () => form.resetFields();

  const disabledDate = (current: any) => {
    return current.isBefore(dayjs("Jan 01 2018"));
  };

  return (
    <div className="vw-form-container">
      {isFormVisible && (
        <Form {...layout} form={form} onFinish={onFinish} className="vw-form">
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="car" label="Car" rules={[{ required: true }]}>
            <Select placeholder="Select car">
              <Select.Option value="golf">Golf</Select.Option>
              <Select.Option value="arteon">Arteon</Select.Option>
              <Select.Option value="tiguan">Tiguan</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="purchasedate"
            label="Purchase Date"
            rules={[{ required: true }]}
          >
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item {...buttonContainerLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "5px" }}
            >
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      )}
      {isResultVisible && (
        <Result
          {...resultConfig}
          extra={[
            <Button
              onClick={() => {
                form.resetFields();
                setIsFormVisible(true);
                setIsResultVisible(false);
              }}
            >
              Submit form again
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default FormComponent;
