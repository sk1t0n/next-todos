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
    const arg = {
      text,
      callbackSuccess: () => message.info('Task was successfully added!'),
      callbackFail: () => message.error('Something went wrong!')
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
      <Spin
        size="large"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '17vh' }}
      />
    );
  } else {
    return (
      <Form
        style={{ marginTop: 20 }}
        form={form}
        name="add-todo"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
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
              message: 'Please enter the task!'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit">
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
