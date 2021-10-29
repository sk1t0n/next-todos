import { Table, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';

const TodoList = ({ todos, onRemoveTodo, onChangeTodo }) => {
  const columns = [
    {
      title: 'Text',
      dataIndex: ['text'],
      sorter: (a, b) => a.text>b.text ? 1 : a.text<b.text ? -1 : 0,
      render: (...params) => {
        const text = params[0];
        const completed = params[1]['completed'];

        if (completed) {
          return (
            <span style={{ textDecoration: 'line-through' }}>{ text }</span>
          );
        }
        return <span>{ text }</span>;
      }
    },
    {
      title: 'Completed',
      dataIndex: ['completed'],
      render: (...params) => {
        const completed = params[0];
        const id = params[1]['id'];

        return (
          <Checkbox
            style={{ display: 'flex', justifyContent: 'center' }}
            defaultChecked={completed}
            onChange={() => onChangeTodo(id)}
          />
        );
      },
      filters: [
        { text: 'Completed', value: true }
      ],
      onFilter: (value, item) => item.completed === value,
      sorter: (a, b) => a.completed>b.completed
        ?  1 : a.completed<b.completed
        ? -1 : 0
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id) => (
        <Button
          type="primary"
          danger
          block
          onClick={() => onRemoveTodo(id)}
        >
          Remove
        </Button>
      )
    },
  ];

  const dataSource = todos.map(todo => ({
    ...todo,
    key: String(todo['id'])
  }));

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        defaultPageSize: '5',
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 15, 20]
      }}
    />
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onChangeTodo: PropTypes.func.isRequired
};

export default TodoList;
