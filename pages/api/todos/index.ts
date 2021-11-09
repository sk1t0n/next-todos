import type { NextApiRequest, NextApiResponse } from 'next';
import {
  collection,
  getDocs,
  addDoc,
  FirestoreError
} from 'firebase/firestore/lite';
import { db } from '../../../firebase';
import type { Todo } from '../../../components/todos/types';

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404
}

export type GetTodosResult = {
  todos?: Todo[];
  error?: FirestoreError;
  status: StatusCode;
};

export type AddTodoResult = {
  todo?: Todo;
  error?: FirestoreError;
  status: StatusCode;
}

type Response = GetTodosResult | AddTodoResult;

const collectionName = process.env.FIREBASE_TODOS_COLLECTION;

const getTodos = async (): Promise<GetTodosResult> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const todos = []
    querySnapshot.forEach(doc => {
      const todo = doc.data();
      todo.id = doc.id;
      todos.push(todo);
    })
    return { todos, status: StatusCode.OK };
  } catch (_error) {
    const error: FirestoreError = _error;
    return { error, status: StatusCode.BAD_REQUEST };
  }
};

const addTodo = async (todo: Todo): Promise<AddTodoResult> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), todo);
    const modifyTodo = { id: docRef.id, ...todo };
    return { todo: modifyTodo, status: StatusCode.CREATED };
  } catch (_error) {
    const error: FirestoreError = _error;
    return { error, status: StatusCode.BAD_REQUEST };
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method === 'GET') {
    const result = await getTodos();
    res.status(result.status).json(result);
  }

  if (req.method === 'POST') {
    const newTodo: Todo = {
      completed: !!req.body.completed,
      text: req.body.text as string
    };
    const result = await addTodo(newTodo);
    res.status(result.status).json(result);
  }
};

export default handler;