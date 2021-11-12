import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AuthError,
  getAuth,
  signOut as signOutFirebase
} from 'firebase/auth';
import { StatusCode } from '../statusCodes';
import { runMiddleware } from '../middleware';

export type SignOutResult = {
  error?: AuthError;
  status: StatusCode;
};

const signOut = async (): Promise<SignOutResult> => {
  try {
    const auth = getAuth();
    await signOutFirebase(auth);
    return { status: StatusCode.OK };
  } catch (_error) {
    const error: AuthError = _error;
    let status = StatusCode.BAD_REQUEST;
    return { error, status };
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SignOutResult>
) => {
  const cors = Cors({
    methods: ['GET', 'OPTIONS'],
  });
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    const result = await signOut();
    res.status(result.status).json(result);
  }
};

export default handler;
