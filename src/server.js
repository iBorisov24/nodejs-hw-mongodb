import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { Contact } from './models/contacts.js';
import { env } from './env.js';
import { getAllContacts, getCurrentContact } from './services/contacts.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getCurrentContact(contactId);

    if (!contact) {
      return res.status(404).send('Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });
  app.get('*', async (reg, res) => {
    res.status(404).send({
      message: 'Not found',
    });
  });

  const PORT = Number(env('PORT', '3000'));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
