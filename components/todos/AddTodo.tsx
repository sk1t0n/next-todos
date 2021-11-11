import React from 'react';
import styles from '../../styles/AddTodo.module.less';
import { Form, Input, Button, Spin, message } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../store/slices/todoSlice';
import { RootState } from '../../store';

type FinishHandler = (
  values: {
    text: string
  }
) => void;

const AddTodo: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.todos.isLoading);

  const onFinish: FinishHandler = ({ text }) => {
    let callbackFail: (message: string) => void;
    callbackFail = (errorMessage) => message.error(errorMessage);
    const arg = {
      text,
      callbackSuccess: () => message.info('Task was successfully added!'),
      callbackFail
    };
    dispatch(addTodo(arg));
    form.resetFields();
  };

  const onFinishFailed = (e: ValidateErrorEntity) => {
    message.error(e.errorFields[0].errors[0]);
  };

  const onReset = () => form.resetFields();

  if (isLoading) {
    return (
      <Spin size="large" className={styles.spin} />
    )
  } else {
    return (
      <Form
        className={styles.form}
        form={form}
        name="add-todo"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Text"
          name="text"
          rules={[
            {
              required: true,
              message: 'Please input your task!'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{sm: { offset: 6, span: 18 }}}>
          <Button type="primary" htmlType="submit" className={styles.submit}>
            Submit
          </Button>
          <Button onClick={onReset} className={styles.reset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddTodo;
