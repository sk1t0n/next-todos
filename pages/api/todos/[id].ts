import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  FirestoreError
} from 'firebase/firestore/lite';
import { db } from '../../../firebase';
import type { Todo } from '../../../components/todos/types';
import { StatusCode } from '../statusCodes';
import { runMiddleware } from '../middleware';

export type UpdateTodoResult = {
  id?: string;
  updatedFields?: Partial<Todo>;
  error?: FirestoreError;
  status: StatusCode;
}

export type RemoveTodoResult = {
  id?: string;
  error?: FirestoreError;
  status: StatusCode;
};

type Response = UpdateTodoResult | RemoveTodoResult;

const collectionName = process.env.FIREBASE_TODOS_COLLECTION;

const updateTodo = async (id: string, fieldsToUpdate: Partial<Todo>): Promise<UpdateTodoResult> => {
  try {
    const docRef =  doc(collection(db, collectionName), id);
    await updateDoc(docRef, fieldsToUpdate);
    return { id, updatedFields: fieldsToUpdate, status: StatusCode.OK };
  } catch (_error) {
    const error: FirestoreError = _error;
    let status = StatusCode.BAD_REQUEST;
    if (error.code === 'permission-denied') {
      status = StatusCode.UNAUTHORIZED;
    }
    return { error, status };
  }
};

const removeTodo = async (id: string): Promise<RemoveTodoResult> => {
  try {
    const docRef =  doc(collection(db, collectionName), id);
    await deleteDoc(docRef);
    return { id, status: StatusCode.OK };
  } catch (_error) {
    const error: FirestoreError = _error;
    let status = StatusCode.BAD_REQUEST;
    if (error.code === 'permission-denied') {
      status = StatusCode.UNAUTHORIZED;
    }
    return { error, status };
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const cors = Cors({
    methods: ['PATCH', 'DELETE', 'OPTIONS'],
  });
  await runMiddleware(req, res, cors);

  if (req.method === 'PATCH') {
    const id = req.query.id as string;
    const fieldsToUpdate: Partial<Todo> = {
      completed: !!req.body.completed
    };
    const result = await updateTodo(id, fieldsToUpdate);
    res.status(result.status).json(result);
  }

  if (req.method === 'DELETE') {
    const id = req.query.id as string;
    const result = await removeTodo(id);
    res.status(result.status).json(result);
  }
}

export default handler;
