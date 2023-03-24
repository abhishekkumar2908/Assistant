import admin from 'firebase-admin';
import { collection, query } from 'firebase/firestore';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt, chatid, model, session} = req.body;

    if(!prompt){
      res.status(400).json({answer: "Please provide a Prompt!"});
      return;
    }
    if(!chatid){
      res.status(400).json({answer: "Please provide a valid chat ID!"});
      return;

    }
    //ChatGPT query
    const response = await query(prompt, chatid, model);

    const message: Message={
      text: response || "unable to find the answer",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: 'ChatGPT',
        name: 'ChatGPT',
        avatar: 'https://links.papareact.com/89k'
      }
    };

    await adminDb
      .collection("users")
      .doc(session?.user?.email!)
      .collection("chats")
      .doc(chatid)
      


  res.status(200).json({ name: 'John Doe' })
}
