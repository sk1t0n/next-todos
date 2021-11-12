import { NextApiRequest, NextApiResponse } from 'next';

export type { NextApiRequest, NextApiResponse } from 'next';

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
};
