import client from './client';

export const listQuestions = () => client.get('/faq');