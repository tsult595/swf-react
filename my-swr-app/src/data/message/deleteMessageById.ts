
const API_URL = 'http://localhost:3001/api';

export const deleteMessageById = async (messageId: string): Promise<boolean> => {
  try {
    console.log('Deleting message with ID:', messageId);
    const response = await fetch(`${API_URL}/messages/${messageId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to delete message');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};