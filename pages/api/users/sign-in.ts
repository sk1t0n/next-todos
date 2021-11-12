import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AuthError,
  User,
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { StatusCode } from '../statusCodes';
import { runMiddleware } from '../middleware';

export type SignInResult = {
  user?: User;
  error?: AuthError;
  status: StatusCode;
};

const signIn = async (email: string, password: string): Promise<SignInResult> => {
  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    return { user: response.user, status: StatusCode.OK };
  } catch (_error) {
    const error: AuthError = _error;
    let status = StatusCode.BAD_REQUEST;
    if (error.code === 'auth/user-not-found') {
      status = StatusCode.NOT_FOUND;
    }
    if (error.code === 'auth/wrong-password') {
      status = StatusCode.FORBIDDEN;
    }
    return { error, status };
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SignInResult>
) => {
  const cors = Cors({
    methods: ['POST', 'OPTIONS'],
  });
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const email = req.body.email;
    const password = req.body.password;
    const result = await signIn(email, password);
    res.status(result.status).json(result);
  }
};

export default handler;
