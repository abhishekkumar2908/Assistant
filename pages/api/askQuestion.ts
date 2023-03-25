import admin from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'
import { adminDb } from '../../firebaseAdmin';
import query from '../../lib/queryApi';

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
//this adds into firestore database
    await adminDb
      .collection("users")
      .doc(session?.user?.email!)
      .collection("chats")
      .doc(chatid)
      .collection("messages")
      .add(message);
      


  res.status(200).json({ answer: message.text })
}
